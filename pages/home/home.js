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

  onLoad: function () {
    utils.dataInit(this);
  },

  onPullDownRefresh: function () {
    utils.dataInit(this);
    wx.stopPullDownRefresh();
  }
})
