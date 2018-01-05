// pages/editer/editaudio/editaudio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $root: getApp().globalData.ROOTPATH,
    text: ["好汉，干了这碗长寿酒"],
    audioSrc: '',
    isStart: false,
    isSave: false,
    isPlay: false,
    time_min: '00',
    time_sec: '00',
    timer_id: 0,
    bgurl:''

  },
  // 开始录音
  startAudio: function () {
    const _this = this;
    const recorderManager = wx.getRecorderManager();
    recorderManager.start();
    recorderManager.onStart(function () {
      _this.timer()
    })
    recorderManager.onStop((res) => {
      console.log("timeid:" + _this.data.timer_id);
      clearInterval(_this.data.timer_id);
      wx.setStorageSync("audioSrc", res.tempFilePath)
      _this.setData({
        audioSrc: res.tempFilePath
      })
    })
    _this.setData({
      isStart: true
    })

  },
  //结束录音
  endAudio: function () {
    const _this = this;
    const recorderManager = wx.getRecorderManager();
    recorderManager.stop();
    _this.setData({
      isSave: true
    });
  },
  //试播
  playVoice: function () {
    const _this = this;
    // 测试用例
    //const innerAudioContext = wx.createInnerAudioContext()
    var path = ''
    // this.audioCtx.setSrc(path)
    // this.audioCtx.play()
    // this.innerAudioContext.src = path;
    console.log("录音文件"+this.data.audioSrc)
    this.innerAudioContext.src = this.data.audioSrc
    this.innerAudioContext.play();
    this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    _this.setData({
      isPlay: true
    });
  },
  //试播暂停
  pauseVoice: function () {
    const _this = this;
    this.innerAudioContext.pause();
    _this.setData({
      isPlay: false
    })
  },
  //保存录音
  saveAudio: function () {
    wx.navigateBack({
      url: '../editer'
    })
  },
  //重录
  reset: function () {
    //重置数据
    this.setData({
      audioSrc: '',
      isStart: false,
      isSave: false,
      isPlay: false,
      time_min: '00',
      time_sec: '00',
      timer_id: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      bgurl: this.data.$root + "/files/" + options.bgid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.audioCtx = wx.createAudioContext('myAudio')
    this.innerAudioContext = wx.createInnerAudioContext()
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

  },
  // 计时器
  timer: function () {
    var sec = 0;
    var _this = this;
    var id = setInterval(function () {
      sec++;
      var date = new Date(0, 0)
      date.setSeconds(sec);
      var m = date.getMinutes(), s = date.getSeconds();
      _this.setData({
        time_min: _this.two_char(m),
        time_sec: _this.two_char(s)
      })
    }, 1000);
    console.log("id1:" + _this.data.timer_id)
    _this.setData({
      timer_id: id
    })
    console.log("id2:" + _this.data.timer_id)


  },
  two_char: function (n) {
    return n >= 10 ? n : "0" + n;
  }

})