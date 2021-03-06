let backgroundAudioManager = wx.getBackgroundAudioManager();
const util = require('../../utils/util.js')

Page({

  data: {
    $root: getApp().globalData.ROOTPATH,
    bgurl: '',
    imgurl: '',
    blessing: '',
    hasVideo: false,
    hasVideo_bg: false,
    videoTag: false,
    videoSrc: '',
    hasVoice: false,
    voiceSrc: '',
    musicSrc: '',
    isPlay: false,
    isPlaybgMusic: false,
    animationData_1: '',
    animationData_2: '',
    animationData_3: '',
    zIndex_1: 4,
    zIndex_2: 6,
    zIndex_3: 2,
    headerUrl: '',
    user: '',
    time: '',
    name: '',
    log: '',
    over: false,
    shareClicked: false,
    isPreview: false,
    showCover: false,
    codeSrc: '',
    cardId: '',
    codePreview: '',
    cover: true,
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

  afterdo: function () {
    var _this = this;
    //显示视频
    setTimeout(function () {
      _this.setData({
        over: true,
        hasVideo: true,
      })
    }, 1000)
    this.videoContext = wx.createVideoContext('myVideo')

  },

  opencard: function () {
    var _this = this;
    var query = wx.createSelectorQuery();
    query.select('#open').boundingClientRect();
    var height = 0;
    query.exec(function (res) {
      //取高度
      height = res[0].height
    })
    var animation_2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      transformOrigin: '100% -50% 0',
    })
    this.animation_2 = animation_2;
    animation_2.rotateY(180).step()
    this.setData({
      animationData_2: this.animation_2.export()
    })
    setTimeout(function () {
      _this.move();
    }, 500);
    setTimeout(function () {
      _this.setData({
        zIndex_2: -1
      })
    }, 200);
    setTimeout(function () {
      _this.setData({
        zIndex_1: 0
      })
    }, 1400);
  },

  move: function () {
    var _this = this;
    var animation_3 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      scale: 0.6,
    })
    this.animation_3 = animation_3;
    animation_3.translateX(155).scale(0.6).step();
    animation_3.translateX(0).scale(1).step();
    _this.setData({
      animationData_3: _this.animation_3.export()
    })
  },

  play: function () {
    this.setData({
      cover: false
    })
    this.videoContext.play();
  },

  pause: function () {
    this.setData({
      cover: true
    })
    this.videoContext.pause();
  },

  onLoad: function (options) {
    var _this = this;
    let id = options.id;
    if (options.q) id = decodeURIComponent(options.q).match(/id=.*/)[0].substr(3);
    if (options.scene) id = _this.cn2uuid(decodeURIComponent(options.scene));

    _this.setData({
      codePreview: `https://buildupstep.cn/api/v1/mini_program/code?id=${id}`,
      cardId: id,
    })

    //获取贺卡信息
    if (!id) {
      wx.showModal({
        title: '提示',
        content: '贺卡id获取失败',
        showCancel: false
      })
      return;
    }

    return new Promise(function (resolve, reject) {
      wx.request({
        url: _this.data.$root + '/cards/' + id,
        success: function (res) {
          const musicLength = res.data.data.category.music_ids.length;
          const musics = musicLength === 0 ? 0 : musicLength - 1;
          const randomNum = _this.randomNumber(0, musics);

          //播放背景音乐
          const musicSrc = _this.data.$root + "/files/" + res.data.data.category.music_ids[randomNum];
          backgroundAudioManager.src = musicSrc;
          backgroundAudioManager.title = '花言心说背景音乐';
          backgroundAudioManager.epname = '花言心说背景音乐';
          backgroundAudioManager.singer = '花言心说';

          _this.setData({
            bgurl: _this.data.$root + "/files/" + res.data.data.card.background_id,
            imgurl: res.data.data.card.picture_id ? _this.data.$root + "/files/" + res.data.data.card.picture_id : '',
            videoSrc: res.data.data.card.video_url,
            voiceSrc: _this.data.$root + "/files/" + res.data.data.card.voice_id,
            musicSrc,
            blessing: res.data.data.card.blessing,
            headerUrl: res.data.data.card.editor_info.avatar_url,
            user: res.data.data.card.editor_info.nick_name,
            time: _this.changeTime(res.data.data.card.created_at)
          })

          if (res.data.data.card.video_url) {
            _this.setData({
              hasVideo_bg: true,
              videoTag: true,
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
            success: function (res) {
              wx.setStorageSync("user_info", res.data.data)
              _this.setData({
                name: res.data.data.name,
                log: _this.data.$root + "/files/" + res.data.data.avatar_id
              })
            }
          })
          resolve(res.data.data.card.user_id)
        }
      })
    })
  },

  changeTime: function (timeString) {
    var moonth = timeString.split("-")[1];
    var day = timeString.split("-")[2].split("T")[0];
    var time = "";
    switch (moonth) {
      case "01": {
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
    return time + "." + day;
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
    // backgroundAudioManager.pause();
    this.innerAudioContext.src = this.data.voiceSrc;

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
      });

      //播放背景音乐
      // backgroundAudioManager.play();
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    backgroundAudioManager.onPlay(function () {
      _this.setData({
        isPlaybgMusic: false
      })
    })
    backgroundAudioManager.onPause(function () {
      _this.setData({
        isPlaybgMusic: true
      })
    })
  },

  toStore: function () {
    wx.navigateTo({
      url: '../bcards/bcards?who=guest',
    })
  },

  onUnload: function () {
    backgroundAudioManager.stop();
    wx.stopBackgroundAudio();
    this.closeMusic();
  },

  onHide: function () {
    backgroundAudioManager.stop();
    wx.stopBackgroundAudio();
  },

  onShow: function () {
    this.openMusic();
    wx.playBackgroundAudio({
      dataUrl: this.data.musicSrc,
      title: '花言背景音乐'
    })
  },

  share: function () {
    this.setData({
      shareClicked: true,
    })
  },

  quit: function () {
    const _this = this;
    _this.setData({
      shareClicked: false,
      isPreview: false,
      showCover: false,
      videoTag: _this.data.hasVideo_bg ? true : false,
    })
  },

  onShareAppMessage: function () {
    const _this = this;
    return {
      title: `来自“${this.data.user}”的花言祝福。`,
      path: `pages/greetingcard/greetingcard?id=${this.data.cardId}`,
      imageUrl: '../../files/share_default.jpg',
      success: function (res) {
        wx.reLaunch({
          url: `../greetingcard/greetingcard?id=${_this.data.cardId}`,
        })
      },
    }
  },

  shareCircle: function () {
    const _this = this;
    const downloadPromisified = util.wxPromisify(wx.downloadFile);
    const requestPromisified = util.wxPromisify(wx.request);

    if (!this.data.cardId) {
      wx.showModal({
        title: '提示',
        content: '无法获取贺卡id',
        showCancel: false,
      })
      return
    }

    wx.showLoading({
      title: '生成中...',
    })
    downloadPromisified({
      url: this.data.codePreview,
    }).then((res) => {
      let filePath = '';
      if (res.statusCode === 200) {
        filePath = res.tempFilePath;

        // 保存二维码至本地相册
        wx.saveImageToPhotosAlbum({
          filePath,
          success(res) {
            wx.hideLoading();
            _this.setData({
              codeSrc: filePath,
              shareClicked: false,
              isPreview: true,
              showCover: true,
              videoTag: false,
            })
          },
          fail() {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '分享失败，无法获取小程序二维码',
              showCancel: false,
            })
          }
        });
      }
    }).catch(() => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '二维码下载失败',
        showCancel: false
      })
    });
  },

  randomNumber: function (Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  },

  cn2uuid(cn) {
    if (cn.length === 32) {
      return `${cn.slice(0, 8)}-${cn.slice(8, 12)}-${cn.slice(12, 16)}-${cn.slice(16, 20)}-${cn.slice(20, 32)}`;
    } else {
      wx.showModal({
        title: '提示',
        content: '贺卡id解析失败',
        showCancel: false
      })
    }
  },
})