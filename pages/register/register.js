Page({
  formSubmit: function (e) {
    const $root = getApp().globalData.ROOTPATH;
    const requestTask = wx.request({
      url: $root+'/users', 
      method:"POST",
      data: e.detail.value,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.code == 200){
          wx.reLaunch({
            url: '../login/login'
          })
        }
        else{
          wx.showModal({
            title: '提示',
            content: res.data.msg
          })
        }
      },
      fail:function(res){
        wx.showModal({
          title: '提示',
          content: res.data.msg
        })
      }
    })
    
  }
})