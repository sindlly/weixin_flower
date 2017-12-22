Page({
  data:{
    id:'197bdfd0-e3d4-11e7-b1d3-63846c2dd592',
    token:"c8b056b0-76b3-4370-a259-ce321c843893",
    name:'',
    address:'',
    contact:'',
    url:'',

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const requestTask = wx.request({
      method: "PATCH",
      url: 'http://111.231.76.244:7001/api/v1/users/' + _this.data.id,
      header: {
        'content-type': 'application/json',
        "token": _this.data.token,
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
  formSubmit: function (e) {
    var _this = this;
    if (e.detail.value.url==" "){
      delete e.detail.value.url;
    }
    const requestTask = wx.request({
      method: "PATCH",
      url: 'http://111.231.76.244:7001/api/v1/users/' + _this.data.id,
      header: {
        'content-type': 'application/json',
        "token": _this.data.token,
      },
      data: e.detail.value,
      success: function (res) {
        console.log(res.data)
        wx.navigateTo({
          url: '../home/home'
        })
        
      }
    })
    
    
  }
})