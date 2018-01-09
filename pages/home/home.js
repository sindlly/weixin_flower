const app = getApp()

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

  onLoad: function (option) {
    const _this = this;
    const userInfo = wx.getStorageSync("user_info");

    _this.setData({
      userInfo,
      avatar: userInfo.avatar_id ? `${_this.data.$root}/files/${userInfo.avatar_id}` : '../../files/defaultLog.png',
      imgSrc: userInfo.picture_ids[0] ? `${_this.data.$root}/files/${userInfo.picture_ids[0]}` : '../../files/defaultLog.png',
    })
  },
})
