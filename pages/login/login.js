Page({
  formSubmit: function (e) {
    const $root = getApp().globalData.ROOTPATH;
    const requestTask = wx.request({
      url: $root + '/auth/login',
      method: "POST",
      data: e.detail.value,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.clearStorageSync();
          wx.setStorageSync("userid", res.data.data.user.id)
          wx.setStorageSync("token", res.data.data.token)
          wx.setStorageSync("user_info", res.data.data.user)
          //判断是否是第一次登录，如果不是就跳转到商家编辑页
          if (res.data.data.user.name) {
            wx.reLaunch({
              // url: '../home/home?id=' + res.data.data.user.id
              url: '../cardbg/cardbg?id=cbf1ade0-f43f-11e7-b5f3-c93673e5d7ba'
            });
          }
          else {
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