App({
  getuserInfo: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code ;
        wx.getUserInfo({
          success: function (res) {
            wx.setStorageSync("union_id", code)
            wx.setStorageSync("nick_name", res.userInfo.nickName)
            wx.setStorageSync("avatar_url", res.userInfo.avatarUrl)
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    ROOTPATH: 'https://buildupstep.cn/api/v1',
    HOST: 'https://buildupstep.cn',
    DEFAULT_IMG: '38ec2f40-f352-11e7-b5f3-c93673e5d7ba'
  }
})