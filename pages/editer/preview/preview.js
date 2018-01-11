// pages/editer/preview/preview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $root: getApp().globalData.ROOTPATH,
    text: "",
    hasPicture: false,
    pictureUrl: '',
    videoSrc: '',
    hasVideo: false,
    audioSrc: '',
    hasAudio: false,
    isPlay:false,
    seek:0,
    bgurl:''

  },
  audioPlay:function(){
    // 测试用例
    var _this = this;
    this.innerAudioContext.src = this.data.audioSrc;
    // this.innerAudioContext.src = path;
    // console.log("seek"+this.data.seek);
    if(this.data.seek){
      this.innerAudioContext.startTime=this.data.seek;
      this.innerAudioContext.play();
    }
    else{
      this.innerAudioContext.play();
    }
    
    this.setData({
      isPlay: true
    });
  },
  audioPause:function(){
    this.innerAudioContext.pause();
    this.setData({
      isPlay: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bgurl: this.data.$root + "/files/" + options.bgid
    })
  },
  previewImg: function () {
    var src = this.data.pictureUrl;
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: src // 需要预览的图片http链接列表
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.innerAudioContext = wx.createInnerAudioContext();
    var _this = this;
    this.innerAudioContext.onPause(() => {
      var ct = this.innerAudioContext.currentTime
      console.log(ct)
      _this.setData({
        seek: ct
      })
    })
    this.setData({
      text: wx.getStorageSync("blessing"),
    })
    if (wx.getStorageSync("videoSrc")) {
      this.setData({
        videoSrc: wx.getStorageSync("videoSrc"),
        hasVideo: true,
      })
    }
    if (wx.getStorageSync("pictureUrl")) {
      this.setData({
        pictureUrl: wx.getStorageSync("pictureUrl"),
        hasPicture: true,
      })
    }
    console.log('voice:' + wx.getStorageSync("audioSrc"))
    if (wx.getStorageSync("audioSrc")) {
      this.setData({
        audioSrc: wx.getStorageSync("audioSrc"),
        hasAudio: true
      })
    }
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