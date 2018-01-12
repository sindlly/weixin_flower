// pages/greetingcard/greetingcard.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
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
    user:'',
    time:'',
    name:'',
    log:'',

  },
  afterdo:function(){
    var _this =this;
    //显示视频
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
          //播放背景音乐
          backgroundAudioManager.src = _this.data.$root + "/files/" + res.data.data.category.music_ids[0],

          _this.setData({
            bgurl: _this.data.$root + "/files/" + res.data.data.card.background_id,
            imgurl: _this.data.$root + "/files/" + res.data.data.card.picture_id,
            videoSrc: _this.data.$root + "/files/" + res.data.data.card.video_id,
            voiceSrc: _this.data.$root + "/files/" + res.data.data.card.voice_id,
            blessing: res.data.data.card.blessing,
            headerUrl: res.data.data.card.editor_info.avatar_url,
            user: res.data.data.card.editor_info.nick_name,
            time: _this.changeTime(res.data.data.card.created_at) 
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
          //获取花店信息
          wx.request({
            url: _this.data.$root + '/users/' + res.data.data.card.user_id,
            success:function(res){
              wx.setStorageSync("user_info", res.data.data)
              _this.setData({
                name:res.data.data.name,
                log: _this.data.$root + "/files/" +res.data.data.avatar_id
              })
            }
          })
          resolve(res.data.data.card.user_id)
        }
      })
    })
  },
  changeTime:function(timeString){
    var moonth = timeString.split("-")[1];
    var day = timeString.split("-")[2].split("T")[0];
    var time ="";
    switch(moonth){
      case "01":{
        time = "Jan";
        break;
      }
      case "02": {
        time = "Feb";
        break;
      }
      case "03": {
        time = "Mar";
        break;
      }
      case "04": {
        time = "Apr";
        break;
      }
      case "05": {
        time = "May";
        break;
      }
      case "06": {
        time = "Jun";
        break;
      }
      case "07": {
        time = "Jul";
        break;
      }
      case "08": {
        time = "Aug";
        break;
      }
      case "09": {
        time = "Sep";
        break;
      }
      case "10": {
        time = "Oct";
        break;
      }
      case "11": {
        time = "Nov";
        break;
      }
      case "12": {
        time = "Dec";
        break;
      }
    }
    return time+"."+day;
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
    //暂停背景音乐
    backgroundAudioManager.pause();
    this.innerAudioContext.src = this.data.voiceSrc;
    // this.innerAudioContext.src = path;
    
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
    backgroundAudioManager.play();
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
    this.innerAudioContext.onEnded(() => {
      _this.setData({
        isPlay: false,
      })
      //播放背景音乐
      backgroundAudioManager.play()
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  toStore:function(){
    wx.reLaunch({
  url: '../bcards/bcards?who=guest',
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
    backgroundAudioManager.stop();
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