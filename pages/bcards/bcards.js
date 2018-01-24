Page({
  data: {
    $root: getApp().globalData.ROOTPATH,
    userInfo: '',
    isGuest:false,
    firstGuest:false,
    id:'',
    show:false
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
  gotoEditer:function(){
    wx.navigateTo({
      url: '../cardbg/cardbg?id='+this.data.id,
    })
  },
  onLoad: function (options) {
    const _this = this;
    console.log(options.id)
    if (options.id) {
      wx.request({
        url: _this.data.$root + '/cards/' + options.id,
        success: function (res) {
          wx.setStorageSync('cardid', options.id);
          //如果status为BLANK，表示为首个用户
          if (res.data.data.card.status == "NONBLANK") {
            wx.reLaunch({
              url: '../greetingcard/greetingcard?id=' + options.id,  //若有数据则跳到贺卡页。
            })
          }else{
            _this.setData({
              isGuest: true,
              firstGuest: true,
              id: options.id
            })
          }
        }
      })      
    }else{
      _this.setData({
        show:true
      })
    }
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