const util = require('../../utils/util.js')

Page({
  data: {
    $root: getApp().globalData.ROOTPATH,
    token: '',
    userInfo: '',
    isSave: false,
    imgSrc: '',
  },

  onLoad: function (options) {
    const _this = this;
    const userInfo = wx.getStorageSync("user_info");
    const token = wx.getStorageSync("token");

    _this.setData({
      userInfo,
      token,
      logo: userInfo.avatar_id ? `${_this.data.$root}/files/${userInfo.avatar_id}` : '../../files/defaultLog.png',
      imgSrc: userInfo.picture_ids[0] ? `${_this.data.$root}/files/${userInfo.picture_ids[0]}` : '../../files/defaultLog.png',
    })
  },

  uploadImg: function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        _this.setData({
          imgSrc: res.tempFilePaths[0],
          isSave: true
        })
      }
    })
  },

  deleImg: function () {
    const _this = this;
    const { userInfo } = _this.data;

    _this.setData({
      isSave: false,
      imgSrc: userInfo.picture_ids[0] ? `${_this.data.$root}/files/${userInfo.picture_ids[0]}` : '../../files/defaultLog.png',
    })
  },

  saveImg: function () {
    const _this = this;
    const uploadPromisified = util.wxPromisify(wx.uploadFile);
    const requestPromisified = util.wxPromisify(wx.request);

    wx.showLoading({
      title: '保存中...',
    })
    uploadPromisified({
      method: "POST",
      url: _this.data.$root + '/files',
      filePath: _this.data.imgSrc,
      header: {
        'access_token': _this.data.token,
      },
      name: 'files'
    }).then((res) => {
      const obj = JSON.parse(res.data);
      requestPromisified({
        url: _this.data.$root + '/users/' + _this.data.userInfo.id,
        method: 'PATCH',
        data: {
          picture_ids: [obj.data[0].id]
        },
        header: {
          'content-type': 'application/json',
          'access_token': _this.data.token,
        }
      }).then((res) => {
        wx.hideLoading();
        if (res.data.code == 200) {
          wx.setStorageSync("user_info", res.data.data);
          wx.reLaunch({
            url: '../home/home'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg
          })
        }
      }).catch((e) => {
        console.log(e);
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '用户信息保存失败'
        })
      })
    }).catch(() => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '上传失败'
      })
    });
  },
})