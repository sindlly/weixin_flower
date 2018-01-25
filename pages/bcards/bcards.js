Page({
  data: {
    $root: getApp().globalData.ROOTPATH,
    userInfo: '',
    isGuest: false,
    firstGuest: false,
    id: '',
    show: false
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

  gotoEditer: function () {
    wx.navigateTo({
      url: '../cardbg/cardbg?id=' + this.data.id,
    })
  },

  onLoad: function (options) {
    const _this = this;
    let id = options.id;
    if (options.q) id = decodeURIComponent(options.q).match(/id=.*/)[0].substr(3);

    if (id) {
      wx.request({
        url: _this.data.$root + '/cards/' + id,
        success: function (res) {
          if (!res.data.data) {
            wx.showModal({
              title: '提示',
              content: '无法获取贺卡信息',
              showCancel: false,
            })
            return;
          }
          wx.setStorageSync('cardid', id);
          const { user_id: userId, status } = res.data.data.card;
          wx.request({
            url: _this.data.$root + '/users/' + userId,
            success: function (res) {
              const userInfo = res.data.data;
              if (userInfo) {
                wx.setStorageSync("user_info", userInfo);
              } else {
                wx.showModal({
                  title: '提示',
                  content: '贺卡商家信息获取失败',
                  showCancel: false
                })
                return;
              }
              //如果status为BLANK，表示为首个用户
              if (status == "NONBLANK") {
                wx.reLaunch({
                  url: '../greetingcard/greetingcard?id=' + id,  //若有数据则跳到贺卡页。
                })
              } else {
                _this.setData({
                  isGuest: true,
                  firstGuest: true,
                  id,
                  show: true,
                  userInfo,
                  logo: userInfo.avatar_id ? `${_this.data.$root}/files/${userInfo.avatar_id}` : '../../files/defaultLog.png',
                  imgSrc: userInfo.picture_ids[0] ? `${_this.data.$root}/files/${userInfo.picture_ids[0]}` : '../../files/defaultLog.png',
                })
              }
            }
          })
        }
      })
    } else {
      const userInfo = wx.getStorageSync("user_info");
      _this.setData({
        userInfo,
        logo: userInfo.avatar_id ? `${_this.data.$root}/files/${userInfo.avatar_id}` : '../../files/defaultLog.png',
        imgSrc: userInfo.picture_ids[0] ? `${_this.data.$root}/files/${userInfo.picture_ids[0]}` : '../../files/defaultLog.png',
        show: true
      });
    }

    if (options.who == "guest") {
      _this.setData({
        isGuest: true
      })
    }
  },
})