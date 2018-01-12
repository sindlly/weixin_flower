Page({

  data: {
    $root: getApp().globalData.ROOTPATH,
    userInfo: '',
    isGuest:false
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