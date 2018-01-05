Page({
  formSubmit: function (e) {
    const $root = getApp().globalData.ROOTPATH;
    const requestTask = wx.request({
      url: $root+'/auth/login', 
      method:"POST",
      data: e.detail.value,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200){
          wx.setStorageSync("userid", res.data.data.user.id)
          wx.setStorageSync("token", res.data.data.token)
          wx.setStorageSync("user_info", res.data.data.user)
          // var cookie = res.header['set-cookie']
          // var crsrf = cookie.split(";")[0].split("=")[1]
          // wx.setStorageSync("csrfToken", crsrf)
          //判断是否是第一次登录，如果不是就跳转到商家编辑页
          if(res.data.data.user.name){
            wx.reLaunch({
              url: '../home/home'
              // url: '../detail/detail'
            });
          }
          else{
            wx.reLaunch({
              url: '../detail/detail'
            });
          }
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