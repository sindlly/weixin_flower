const app = getApp();

Page({
  data: {
    quota: 0,
    print: 0,
    read: 0,
    jump: 0,
    token: wx.getStorageSync('token'),
  },

  onLoad: function (options) {
    const $root = app.globalData.ROOTPATH;
    const id = wx.getStorageSync('userid');
    const { data: $data } = this;
    const that = this;

    wx.request({
      url: `${$root}/users/${id}`,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'access_token': $data.token,
      },
      success: function (res) {
        const result = res.data;
        if (result.code == 200) {
          that.setData({
            quota: result.data.card_num,
            print: result.data.cards,
            read: result.data.click_total,
            jump: result.data.jump_num,
          })
        }
        else wx.showModal({ title: '提示', content: res.data.msg, showCancel: false })
      }
    })
  },
})