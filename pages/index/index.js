const app = getApp()

Page({
  data: {
    img_list: [1, 2, 3, 4, 5, 6]
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

  onLoad: function () {

  },
})
