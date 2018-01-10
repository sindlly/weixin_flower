const util = require('../../../utils/util.js')

Page({
  data: {
    $root: getApp().globalData.ROOTPATH,
    token: '',
    userInfo: '',
    imgSrc: '',
  },

  onLoad: function (options) {
    const _this = this;
    const userInfo = wx.getStorageSync("user_info");
    const token = wx.getStorageSync("token");

    _this.setData({
      userInfo,
      token,
      imgSrc: userInfo.url ? `${_this.data.$root}/files/${userInfo.url}` : '../../files/defaultLog.png',
    })
  },

  downloadImg: function () {
    const _this = this;
    const downloadPromisified = util.wxPromisify(wx.downloadFile);
    const requestPromisified = util.wxPromisify(wx.request);

    wx.showLoading({
      title: '下载中...',
    })
    downloadPromisified({
      url: `${_this.data.$root}/files/${_this.data.userInfo.url}`,
      header: {
        'access_token': _this.data.token,
      },
    }).then((res) => {
      let filePath ='';
      if (res.statusCode === 200) {
        filePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath,
          success(res) {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '二维码已保存至相册，用微信扫描二维码，即可关注花店',
              showCancel: false
            })
          }
        })
      }

      // requestPromisified({
      //   url: _this.data.$root + '/users/' + _this.data.userInfo.id,
      //   method: 'PUT',
      //   data: {
      //     picture_ids: [obj.data[0].id]
      //   },
      //   header: {
      //     'content-type': 'application/json',
      //     'access_token': _this.data.token,
      //   }
      // }).then((res) => {
      //   wx.hideLoading();
      //   if (res.data.code == 200) {
      //     wx.setStorageSync("user_info", res.data.data);
      //     wx.reLaunch({
      //       url: '../home/home'
      //     })
      //   } else {
      //     wx.showModal({
      //       title: '提示',
      //       content: res.data.msg
      //     })
      //   }
      // }).catch((e) => {
      //   console.log(e);
      //   wx.hideLoading();
      //   wx.showModal({
      //     title: '提示',
      //     content: '用户信息保存失败'
      //   })
      // })
    }).catch(() => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '二维码下载失败',
        showCancel: false        
      })
    });
  },
})