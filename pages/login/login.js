Page({
  data: {
    userPhone: '15086915671',
    userPassword: '003020'
  },

  onLoad: function () {
    const user_login = wx.getStorageSync('user_login');
    const { userPhone, userPassword } = user_login;

    if (userPhone && userPassword) {
      this.setData({
        userPhone,
        userPassword
      })
    }
  },

  formSubmit: function (e) {
    const $root = getApp().globalData.ROOTPATH;
    const dataValue = e.detail.value;

    wx.request({
      url: $root + '/auth/login',
      method: "POST",
      data: dataValue,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          const { user } = res.data.data;
          wx.clearStorageSync();
          wx.setStorageSync("userid", res.data.data.user.id);
          wx.setStorageSync("token", res.data.data.token);
          wx.setStorageSync("user_info", res.data.data.user);
          wx.setStorageSync("user_login", {
            userPhone: dataValue.phone,
            userPassword: dataValue.password,
          });

          //判断是否是首次登录
          if (user.name || user.address || user.contact) {
            wx.reLaunch({
              // url: '../home/home?id=' + res.data.data.user.id
              url: '../cardbg/cardbg?id=cbf1ade0-f43f-11e7-b5f3-c93673e5d7ba'
            });
          } else {
            wx.reLaunch({
              url: '../detail/detail'
            });
          }
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  }
})