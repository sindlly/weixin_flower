// pages/editer/editaudio/editaudio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:["好汉，干了这碗长寿酒"],
    audioSrc: 'http://111.231.76.244:7001/api/v1/files/2f0ceea0-e6e7-11e7-82cb-b5eb11453251',
    isStart: false,
    isSave:false,
  },
  // 开始录音
  startAudio:function(){
    const _this = this;
    const recorderManager = wx.getRecorderManager();
    recorderManager.start();
    recorderManager.onStop((res) => {
      wx.setStorageSync("voiceSrc", res.tempFilePath)
      console.log("录音url：" + res.tempFilePath)
    })
    _this.setData({
      isStart:true
    })
    // setTimeout(function () {
    //   //结束录音  
    //   recorderManager.stop();
    //   console.log("end")
    // }, 3000)
  },
 //结束录音
  endAudio:function(){
    const _this = this;
    const recorderManager = wx.getRecorderManager();
    recorderManager.stop();
    _this.setData({
      isSave: true
    });
  },
  //保存录音
  saveAudio: function(){
    wx.navigateTo({
      url: '../editer'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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