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
    pictrue:''
  },
  //事件处理函数
  register: function() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  onLoad: function () {
    var _this = this;
    const requestTask = wx.request({
      method: "GET",
      url: _this.data.$root + '/users/' + _this.data.id,
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
      }
    })
  },
  getUserInfo: function(e) {
    
  }
})
