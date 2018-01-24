// pages/editer/preview/preview.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  data: {
    $root: getApp().globalData.ROOTPATH,
    text: "",
    isPlaybgMusic: false,
    hasPicture: false,
    pictureUrl: '',
    videoSrc: '',
    hasVideo: false,
    audioSrc: '',
    hasAudio: false,
    isPlay: false,
    seek: 0,
    bgurl: '',
  },

  closeMusic: function () {
    backgroundAudioManager.pause()
    this.setData({
      isPlaybgMusic: true
    })
  },

  openMusic: function () {
    backgroundAudioManager.play()
    this.setData({
      isPlaybgMusic: false
    })
  },

  audioPlay: function () {
    //暂停背景音乐
    backgroundAudioManager.pause()
    // 测试用例
    var _this = this;
    this.innerAudioContext.src = this.data.audioSrc;
    if (this.data.seek) {
      this.innerAudioContext.startTime = this.data.seek;
      this.innerAudioContext.play();
    }
    else {
      this.innerAudioContext.play();
    }

    this.setData({
      isPlay: true
    });
  },

  audioPause: function () {
    this.innerAudioContext.pause();
    this.setData({
      isPlay: false,
    })
    //播放背景音乐
    backgroundAudioManager.play()
  },

  onLoad: function (options) {
    this.setData({
      bgurl: this.data.$root + "/files/" + options.bgid,
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

  onReady: function () {
    this.innerAudioContext = wx.createInnerAudioContext();
    var _this = this;
    this.innerAudioContext.onPause(() => {
      var ct = this.innerAudioContext.currentTime
      _this.setData({
        seek: ct
      })
    })
    this.innerAudioContext.onEnded(() => {
      _this.setData({
        isPlay: false,
      })
      //播放背景音乐
      backgroundAudioManager.play()
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
})