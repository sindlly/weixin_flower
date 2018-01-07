//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    $root: getApp().globalData.ROOTPATH,
    id: wx.getStorageSync("userid"),
    token: wx.getStorageSync("token"),
    name:'',
    address:'',
    contact:'',
    url:'',
    pictrue:'',
    defaultImg:'../../files/default.jpg',
    imgSrc:'',
  },
  //事件处理函数
  register: function() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  onLoad: function (option) {
    var _this = this;
    const requestTask = wx.request({
      method: "GET",
      url: _this.data.$root + '/users/' +option.id,
      header: {
        'content-type': 'application/json',
        "access_token": _this.data.token,
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          name: res.data.data.name,
          address: res.data.data.address,
          contact: res.data.data.contact,
          url: res.data.data.url,
        })
        if (res.data.data.picture_ids){
          //如果有图片
          _this.setData({
            imgSrc: _this.data.$root + '/files/' + res.data.data.picture_ids[0],
          })
          wx.setStorageSync("picture_ids", res.data.data.picture_ids[0])
        }else{
          _this.setData({
            imgSrc: _this.data.defaultImg
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    
  },
  onShow: function () {
    //图片是否有更新
    this.setData({
      imgSrc: this.data.$root + '/files/' + wx.getStorageSync('picture_ids') ? this.data.$root + '/files/' + wx.getStorageSync('picture_ids') : this.data.defaultImg,
    })
  },
})
