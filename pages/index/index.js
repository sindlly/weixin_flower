//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World dxy!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  register: function() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    
  }
})
