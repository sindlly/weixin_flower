const app = getApp();
const utils = require('../../utils/util.js');

Page({

  data: {
    $root: getApp().globalData.ROOTPATH,
    id: wx.getStorageSync("userid"),
    token: wx.getStorageSync("token"),
    pictrue: '',
    defaultImg: '../../files/default.jpg',
    imgSrc: '',
    avatar: '',
  },

  location: function () {
    var _this = this;
    wx.openLocation({
      latitude: _this.data.userInfo.address.lat,
      longitude: _this.data.userInfo.address.lon,
      name: _this.data.userInfo.address.location,
      scale: 28
    })
  },

  call: function () {
    var _this = this;
    console.log("userInfo:" + _this.data.userInfo.contact)
    wx.makePhoneCall({
      phoneNumber: _this.data.userInfo.contact
    })
  },

  onLoad: function () {
    utils.dataInit(this);
  },

  loginOut: function () {
    const userLogin = wx.getStorageSync('user_login');
    wx.clearStorageSync();
    wx.setStorageSync('user_login', userLogin);

    wx.reLaunch({
      url: '../index/index',
    })
  },

  onPullDownRefresh: function () {
    utils.dataInit(this);
    wx.stopPullDownRefresh();
  }
})
