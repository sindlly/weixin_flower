const util = require('../../utils/util.js')

Page({
  data: {
    token: '',
    url: '',
    $root: getApp().globalData.ROOTPATH,
    avatarUrl: '', // logo地址
    qrUrl: '', // 二维码图片地址
    isFirstLogin: '',
    userInfo: '',
    address:'花店地址'
  },

  onLoad: function (options) {
    const _this = this;
    const userInfo = wx.getStorageSync("user_info");
    const token = wx.getStorageSync("token");

    _this.setData({
      qrUrl: userInfo.url ? `${_this.data.$root}/files/${userInfo.url}` : '../../files/defaultLog.png',
      avatarUrl: userInfo.avatar_id ? `${_this.data.$root}/files/${userInfo.avatar_id}` : '../../files/defaultLog.png',
      userInfo,
      token,
      isFirstLogin: _this.options.isFirstLogin || 'true'
    })
  },

  formSubmit: function (e) {

    const _this = this;
    const logoSelected = _this.isFileSelected(_this.data.avatarUrl);
    const qrSelected = _this.isFileSelected(_this.data.qrUrl);    
    const uploadPromisified = util.wxPromisify(wx.uploadFile);
    const promiseArray = [];

    const { name, address, contact } = e.detail.value;

    if (!/^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/.test(name)) {
      wx.showModal({
        title: '提示',
        content: '花店名称只能包含字母、数字及中文字符，且长度不能超过10',
        showCancel: false
      })
      return;
    }

    if (!/^[a-zA-Z0-9\u4e00-\u9fa5]{1,15}$/.test(address)) {
      wx.showModal({
        title: '提示',
        content: '联系地址只能包含字母、数字及中文字符，且长度不能超过15',
        showCancel: false
      })
      return;
    }

    if (!/^[1][0-9]{10}$/.test(contact)) {
      wx.showModal({
        title: '提示',
        content: '联系电话需为手机号',
        showCancel: false
      })
      return;
    }

    wx.showLoading({
      title: '保存中...',
    })

    // 上传logo
    if (logoSelected) {
      console.log('asdf');
      promiseArray.push(uploadPromisified({
        url: _this.data.$root + '/files',
        filePath: _this.data.avatarUrl,
        header: {
          "access_token": _this.data.token,
        },
        name: 'files',
      }));
    }

    // 上传公众号二维码
    if (qrSelected) {
      console.log('=====?asdfssss');
      promiseArray.push(uploadPromisified({
        url: _this.data.$root + '/files',
        filePath: _this.data.qrUrl,
        header: {
          "access_token": _this.data.token,
        },
        name: 'files',
      }));
    }

    if (promiseArray[0]) {
      Promise.all(promiseArray).then((files) => {
        console.log(files);
        let avatar = undefined;
        let qr = undefined;
        if ( promiseArray.length === 2 ) {
          [avatar, qr] = files;
        } else {
          avatar = logoSelected ? files[0] : undefined;
          qr = qrSelected ? files[0] : undefined;          
        }
        
        const parsedAvatar = avatar && JSON.parse(avatar.data);
        const parsedQr = qr && JSON.parse(qr.data);
        const requestData = e.detail.value;

        if (parsedAvatar && parsedAvatar.data[0].id) requestData.avatar_id = parsedAvatar.data[0].id;
        if (parsedQr && parsedQr.data[0].id) requestData.url = parsedQr.data[0].id;
        console.log(requestData);

        _this.saveInfo(_this, requestData); // 保存信息
      }).catch((reason) => {
        console.log(reason);        
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '图片上传失败',
          showCancel: false
        })
      });
    } else {
      const requestData = e.detail.value;
      _this.saveInfo(_this, requestData); // 保存信息
    }
  },

  getQr: function () {
    wx.showModal({
      title: '获取步骤',
      content: '进入“公众号管理中心”，点击“设置”进入“账号信息”页面，找到“二维码”，随后点击“更多尺寸”下载需要的二维码。',
      showCancel: false
      // confirmColor: '#ff3630',
    })
  },

  changeAvatar: function () {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        _this.setData({
          avatarUrl: res.tempFilePaths[0], // tempFilePaths
        })
      }
    })
  },
  chooseLocation:function(){
    var _this= this;
    wx.chooseLocation({
      success:function(res){
        console.log(res.name)
        console.log(res.address)
        console.log(res.latitude)
        console.log(res.longitude)
        _this.setData({
          address: res.address
        })
      }
    })
  },
  changeQr: function () {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        _this.setData({
          qrUrl: res.tempFilePaths[0], // tempFilePaths
        })
      }
    })
  },

  isFileSelected: function (fileUrl) {
    return !~fileUrl.indexOf('defaultLog.png') && /(.bmp|.png|.jpg|jpeg)$/i.test(fileUrl)
  },

  saveInfo: function (_this, data) {
    const requestPromisified = util.wxPromisify(wx.request);

    requestPromisified({
      method: "PUT",
      url: _this.data.$root + '/users/' + _this.data.userInfo.id,
      header: {
        'content-type': 'application/json',
        "access_token": _this.data.token,
      },
      data,
    }).then((res) => {
      wx.hideLoading();
      if (res.data.code == 200) {
        wx.setStorageSync("user_info", res.data.data);
        if (_this.data.isFirstLogin === 'true') {
          wx.reLaunch({
            url: '../home/home'
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false
        })
      }
    }).catch(() => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '信息保存失败',
        showCancel: false
      })
    })
  }
})