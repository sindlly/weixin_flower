const app = getApp();

Page({

  data: {
    commodity: null,
    commodityId: '',
    count: 1,
    totalPrice: 0,
    disabled: true,
    userInfo: '',
    $root: app.globalData.ROOTPATH,
    DEFALUT_IMG: app.globalData.DEFALUT_IMG,
    token: '',
  },

  countMinus: function () {
    if (this.data.count > 1) this.setData({
      count: this.data.count - 1
    })
    else this.setData({
      disabled: true,
    })
  },

  countAdd: function () {
    this.setData({
      count: this.data.count + 1,
      disabled: false
    })
  },

  submitOrder: function () {
    const $root = app.globalData.ROOTPATH;
    const id = wx.getStorageSync('userid');
    const { data: $data } = this;

    // 获取登录token
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: `${$root}/trades`,
            method: "POST",
            header: {
              'content-type': 'application/json',
              'access_token': $data.token,
            },
            data: {
              code: res.code,
              count: $data.count,
              commodity_id: $data.commodityId,
            },
            success: function (res) {
              const result = res.data;
              if (result.code == 200) {
                const payload = result.data.payload;

                // 调起微信支付
                wx.requestPayment({
                  'timeStamp': payload.timeStamp,
                  'nonceStr': payload.nonceStr,
                  'package': payload.package,
                  'signType': 'MD5',
                  'paySign': payload.paySign,
                  'success': function (res) {
                  },
                  'fail': function (res) {
                    wx.showModal({ title: '提示', content: res, showCancel: false })
                  }
                })
              }
              else wx.showModal({ title: '提示', content: res.data.msg, showCancel: false })
            }
          })
        } else wx.showModal({ title: '提示', content: res.errMsg, showCancel: false })
      }
    });
  },

  onLoad: function (options) {
    const $root = app.globalData.ROOTPATH;
    const id = wx.getStorageSync('userid');
    const userInfo = wx.getStorageSync('user_info');
    const token = wx.getStorageSync('token');
    const commodityId = this.options.id || 'f799d4d0-f1e8-11e7-a76c-7f2436ca4e8b';
    const { data: $data } = this;
    const _this = this;

    // 设置用户信息及token
    _this.setData({
      userInfo,
      token
    })

    wx.request({
      url: `${$root}/commodities/${commodityId}`,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'access_token': $data.token,
      },
      success: function (res) {
        const result = res.data;
        if (result.code == 200) {
          _this.setData({
            commodity: result.data,
            commodityId,
          })
        }
        else wx.showModal({ title: '提示', content: res.data.msg, showCancel: false })
      }
    })
  },

  onPullDownRefresh: function () {
    const userInfo = wx.getStorageSync('user_info');
    const _this = this;

    _this.setData({
      userInfo
    })
    wx.stopPullDownRefresh();
  }
})