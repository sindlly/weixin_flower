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
  location:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: "重庆市渝北区金开大道",
          scale: 28
        })
      }
    })  
  },
  call:function () {
    var _this = this;
    console.log("userInfo:" + _this.data.userInfo.contact)
    wx.makePhoneCall({
      phoneNumber: _this.data.userInfo.contact
    })
  },
  onLoad: function () {
    utils.dataInit(this);
  },

  onPullDownRefresh: function () {
    utils.dataInit(this);
    wx.stopPullDownRefresh();
  }
})
