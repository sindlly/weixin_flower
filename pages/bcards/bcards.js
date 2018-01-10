Page({

  data: {
    $root: getApp().globalData.ROOTPATH,
    userInfo: '',
  },

  onLoad: function (options) {
    const _this = this;
    const userInfo = wx.getStorageSync("user_info");

    _this.setData({
      userInfo,
      logo: userInfo.avatar_id ? `${_this.data.$root}/files/${userInfo.avatar_id}` : '../../files/defaultLog.png',
      imgSrc: userInfo.picture_ids[0] ? `${_this.data.$root}/files/${userInfo.picture_ids[0]}` : '../../files/defaultLog.png',
    })
  },
})