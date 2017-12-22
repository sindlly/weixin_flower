Page({
  formSubmit: function (e) {
    const requestTask = wx.request({
      url: 'http://111.231.76.244:7001/api/v1/users', 
      method:"POST",
      data: e.detail.value,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.code == 200){
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