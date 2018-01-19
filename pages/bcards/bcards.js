Page({

  data: {
    $root: getApp().globalData.ROOTPATH,
    userInfo: '',
    isGuest:false
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
  onLoad: function (options) {
    const _this = this;
    const userInfo = wx.getStorageSync("user_info");
    _this.setData({
      userInfo,
      logo: userInfo.avatar_id ? `${_this.data.$root}/files/${userInfo.avatar_id}` : '../../files/defaultLog.png',
      imgSrc: userInfo.picture_ids[0] ? `${_this.data.$root}/files/${userInfo.picture_ids[0]}` : '../../files/defaultLog.png',
    });
    if(options.who=="guest"){
      _this.setData({
        isGuest:true
      })
    }
  },
})