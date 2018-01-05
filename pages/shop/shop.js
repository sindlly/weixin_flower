// pages/home/data/data.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodities: [],
    count: 0,
    token: wx.getStorageSync('token'),
    $root: app.globalData.ROOTPATH,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const $root = app.globalData.ROOTPATH;
    const id = wx.getStorageSync('userid');
    const { data: $data } = this;
    const that = this;

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
          that.setData({
            commodities: result.data.items,
            count: result.data.count,
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