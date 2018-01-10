const app = getApp();

Page({

  data: {
    commodities: [],
    count: 0,
    token: '',
    $root: app.globalData.ROOTPATH,
  },

  onLoad: function (options) {
    const $root = app.globalData.ROOTPATH;
    const id = wx.getStorageSync('userid');
    const token = wx.getStorageSync('token');
    const { data: $data } = this;
    const _this = this;

    // 设置token
    _this.setData({
      token
    })

    wx.request({
      url: `${$root}/commodities`,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'access_token': $data.token,
      },
      success: function (res) {
        const result = res.data;
        if (result.code == 200) {
          _this.setData({
            commodities: result.data.items,
            count: result.data.count,
          })
        }
        else wx.showModal({ title: '提示', content: res.data.msg, showCancel: false })
      }
    })
  },
})