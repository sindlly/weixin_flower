Page({
  formSubmit: function (e) {
    const requestTask = wx.request({
      url: 'http://111.231.76.244:7001/api/v1/auth/login', 
      method:"POST",
      data: e.detail.value,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200){
          wx.setStorageSync("userid", res.data.data.user.id)
          wx.setStorageSync("token", res.data.data.token)
          // var cookie = res.header['set-cookie']
          // var crsrf = cookie.split(";")[0].split("=")[1]
          // wx.setStorageSync("csrfToken", crsrf)
          wx.reLaunch({
            // url: '../home/home'
            url: '../editer/editer'
          });
        } 
        else {
          wx.showModal({
            title: '提示',
            content: res.data.msg
          })
        }
        
      }
    })
  }
})