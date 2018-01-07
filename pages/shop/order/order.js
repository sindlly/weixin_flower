// pages/home/data/data.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity: null,
    commodityId: '',
    count: 1,
    totalPrice: 0,
    disabled: true,
    userInfo: wx.getStorageSync('user_info'),
    $root: app.globalData.ROOTPATH,
    DEFALUT_IMG: app.globalData.DEFALUT_IMG,
    token: wx.getStorageSync('token'),
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
    const that = this;
    console.log(this.route);

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
                    wx.showModal({ title: '提示', content: res })
                  }
                })
              }
              else wx.showModal({ title: '提示', content: res.data.msg })
            }
          })
        } else wx.showModal({ title: '提示', content: res.errMsg })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const $root = app.globalData.ROOTPATH;
    const id = wx.getStorageSync('userid');
    const commodityId = this.options.id || 'f799d4d0-f1e8-11e7-a76c-7f2436ca4e8b';
    const { data: $data } = this;
    const that = this;

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
          that.setData({
            commodity: result.data,
            commodityId,
          })
        }
        else wx.showModal({ title: '提示', content: res.data.msg })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})