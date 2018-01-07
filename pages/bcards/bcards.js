// pages/bcards/bcards.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $root: getApp().globalData.ROOTPATH,
    log:'',
    name:"",
    addr:'',
    phone:'',
    imgsrc:'',
    defaultImg: '../../files /default.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  gotoEditer:function(){
    wx.reLaunch({
      url: '../cardbg/cardbg',
    })
  },
  onLoad: function (options) {
    this.setData({
      log: wx.getStorageSync('avatar_id') ? wx.getStorageSync('avatar_id'):'../../files/defaultLog.png',
      name: wx.getStorageSync('name'),
      address: wx.getStorageSync('address'),
      contact: wx.getStorageSync('contact'),
    })
    if (wx.getStorageSync("picture_ids")){
      this.setData({
        imgSrc: this.data.$root + '/files/' + wx.getStorageSync("picture_ids"),
      })
    } else {
      _this.setData({
        imgSrc: this.data.defaultImg
      })
    }
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
    this.onLoad();
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