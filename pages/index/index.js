const app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    cooperations: [],
    $root: getApp().globalData.ROOTPATH,
  },

  register: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },

  login: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  callSecond: function () {
    wx.makePhoneCall({
      phoneNumber: '15711552109'
    })
  },

  callFirst: function () {
    wx.makePhoneCall({
      phoneNumber: '16602136688'
    })
  },

  onLoad: function () {
    const requestPromisified = util.wxPromisify(wx.request);
    const _this = this;

    requestPromisified({
      method: "GET",
      url: `${_this.data.$root}/users?cooperation=TRUE`,
    }).then((res) => {
      if (res.data.code == 200) {
        const cooperations = res.data.data.items.map((item) => {
          let logo = '';
          if (item.avatar_id) logo = `${_this.data.$root}/files/${item.avatar_id}`
          else logo = '../../files/defaultLog.png'
          return logo
        })

        _this.setData({
          cooperations
        })
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
        content: '合作花店获取失败',
        showCancel: false
      })
    })
  },
})
