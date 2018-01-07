Page({
  data:{
    id: wx.getStorageSync("userid"),
    token: wx.getStorageSync("token"),
    name:'',
    address:'',
    contact:'',
    url:'',
    $root :getApp().globalData.ROOTPATH

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const requestTask = wx.request({
      method: "GET",
      url: _this.data.$root+'/users/' + _this.data.id,
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
  formSubmit: function (e) {
    var _this = this;
    if (e.detail.value.url==""){
      delete e.detail.value.url;
    }
    const requestTask = wx.request({
      method: "PATCH",
      url: _this.data.$root+'/users/' + _this.data.id,
      header: {
        'content-type': 'application/json',
        "access_token": _this.data.token,
      },
      data: e.detail.value,
      success: function (res) {
        if(res.data.code==200){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            complete:function(){
              wx.reLaunch({
                url: '../bcards/bcards'
              })
            }
          })

          
        }
        else{
          wx.showModal({
            title: '提示',
            content: res.data.msg
          })
        }
      }
    })
    
    
  },
  goto:function(){
    
  }
})