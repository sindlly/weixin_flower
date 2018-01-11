// pages/greetingcard/greetingcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $root: getApp().globalData.ROOTPATH,
    bgurl: '',
    imgurl: '',
    blessing: '',
    hasVideo:false,
    hasVideo_bg:false,
    videoSrc:'',
    hasVoice:false,
    voiceSrc:'',
    isPlay:false,
    animationData_1: '',
    animationData_2: '',
    animationData_3: '',
    zIndex_1: 2,
    zIndex_2: 3,
    zIndex_3: 1,
    headerUrl:'',
    user:'校长',
    time:'Nov.7'

  },
  afterdo:function(){
    var _this =this;
    setTimeout(function(){
     _this.setData({
        hasVideo: true,
      })
    },1000)
   
  },
  opencard: function () {
    var _this =this;
    var animation_2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      transformOrigin: 'right',
    })
    this.animation_2 = animation_2;
    animation_2.rotateY(180).step()
    this.setData({
      animationData_2: this.animation_2.export()
    })
    setTimeout(function(){
      _this.move();
    },500);
    setTimeout(function () {
      _this.setData({
        zIndex_1: 0
      })
    }, 1100);

  },
  move: function () {
    var _this = this;
    var animation_3 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      scale: 0.6,
    })
    this.animation_3 = animation_3; 
    animation_3.translateX(130).scale(0.6).step();
    animation_3.translateX(0).scale(1).step();
    //  animation_3.scale(1).step();
    // animation_3.translateX(-160).step();
    _this.setData({
      zIndex_2: 0,
      animationData_3: _this.animation_3.export()
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //获取贺卡信息
    return new Promise(function (resolve, reject) {
      wx.request({
        url: _this.data.$root + '/cards/' + options.id,
        success: function (res) {
          _this.setData({
            bgurl: _this.data.$root + "/files/" + res.data.data.card.background_id,
            imgurl: _this.data.$root + "/files/" + res.data.data.card.picture_id,
            videoSrc: _this.data.$root + "/files/" + res.data.data.card.video_id,
            voiceSrc: _this.data.$root + "/files/" + res.data.data.card.voice_id,
            blessing: res.data.data.card.blessing,
            headerUrl: res.data.data.card.editor_info.avatar_url,
            user: res.data.data.card.editor_info.nick_name,
          })
          if (res.data.data.card.video_id) {
            _this.setData({
              hasVideo_bg: true,
            })
          }
          if (res.data.data.card.voice_id) {
            _this.setData({
              hasVoice: true,
            })
          }
          resolve(res.data.data.card.user_id)
        }
      })
    })
  },
  previewImg: function () {
    var src = [this.data.imgurl];
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: src // 需要预览的图片http链接列表
    })

  },
  audioPlay: function () {
    // 测试用例
    var _this = this;
    var path = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    console.log("voiceSrc:"+this.data.voiceSrc)
    // this.innerAudioContext.src = this.data.voiceSrc;
    this.innerAudioContext.src = path;
    
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
    });
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

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