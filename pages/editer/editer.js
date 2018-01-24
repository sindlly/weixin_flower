// pages/home/data/data.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  data: {
    $root: getApp().globalData.ROOTPATH,
    token: wx.getStorageSync("token"),
    csrfToken: wx.getStorageSync("csrfToken"),
    isPlaybgMusic: false,
    id: "",
    blessing: "",
    voice_id: '',
    video_url: '',
    picture_id: '',
    union_id: wx.getStorageSync('union_id'),
    editor_info: {
      nick_name: wx.getStorageSync('nick_name'),
      avatar_url: wx.getStorageSync('avatar_url')
    },
    uploadUrl: '',
    hasPicture: false,
    pictureUrl: '',
    videoSrc: '',
    hasVideo: false,
    audioSrc: '',
    images: {},
    bgurl: '',
    bgid: '',
    media_id: '',
    saveData: {
    },
    category_id: ''
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
  addPicture: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          pictureUrl: res.tempFilePaths,
          hasPicture: true,
          hasVideo: false,
          // uploadUrl: res.tempFilePaths[0],
        })
        wx.setStorageSync("pictureUrl", res.tempFilePaths);//为预览暂存地址
        wx.setStorageSync("videoSrc", '')
      }
    })
  },

  bindTextAreaBlur: function (e) {
    this.setData({
      blessing: e.detail.value
    })
    wx.setStorageSync("blessing", e.detail.value);
  },
  upVideo: function () {
    var _this = this
    if (wx.getStorageSync("audioSrc") != '') {
      wx.showModal({
        title: '提示',
        content: '选择录像将清除录音，是否继续',
        success: function (res) {
          if (res.confirm) {
            //选择录像，则清除录音；
            wx.setStorageSync("audioSrc", '')
            wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 40,
              camera: 'back',
              success: function (res) {
                console.log(res)
                if(res.duration>40){
                  wx.showModal({
                    title: '提示',
                    content: '上传录像不得超过40秒',
                    })
                }else{
                  _this.setData({
                    videoSrc: res.tempFilePath,
                    hasVideo: true,
                    hasPicture: false,
                    uploadUrl: res.tempFilePath,
                    pictureUrl: '',
                  })
                  wx.setStorageSync("videoSrc", res.tempFilePath);//为预览暂存地址
                  wx.setStorageSync("pictureUrl", '');//若有视频，则清除图片
                }
                
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        }
      })
    } else {
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: function (res) {
          console.log(res)
          if (res.duration > 40) {
            wx.showModal({
              title: '提示',
              showCancel:false,
              content: '上传录像不得超过40秒',
            })
          }else{
            _this.setData({
              videoSrc: res.tempFilePath,
              hasVideo: true,
              hasPicture: false,
              uploadUrl: res.tempFilePath,
              pictureUrl: '',
            })
            wx.setStorageSync("videoSrc", res.tempFilePath);//为预览暂存地址
            wx.setStorageSync("pictureUrl", '');//若有视频，则清除图片
          }
          
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },

  upAdio: function () {
    var _this = this;
    if (wx.getStorageSync("videoSrc")) {
      wx.showModal({
        title: '提示',
        content: '选择录音将清除视频，是否继续',
        success: function (res) {
          if (res.confirm) {
            //选择录音，则清除视频；
            wx.setStorageSync("videoSrc", '');
            _this.setData({
              uploadUrl: '',
              hasPicture: false,
              pictureUrl: '',
              videoSrc: '',
              hasVideo: false,
            })
            wx.navigateTo({
              url: '../editer/editaudio/editaudio?bgid=' + _this.data.bgid + '&category_id=' + _this.data.category_id
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../editer/editaudio/editaudio?bgid=' + _this.data.bgid + '&category_id=' + _this.data.category_id
      })
    }
  },

  preview: function () {
    var _this = this;
    wx.navigateTo({
      url: '../editer/preview/preview?bgid=' + _this.data.bgid
    })
  },

  getPicture_id: function () {
    //上传图片
    var _this = this;
    return new Promise(function (resolve, reject) {
      wx.uploadFile({
        method: "POST",
        url: _this.data.$root + '/files',
        filePath: _this.data.pictureUrl[0],
        header: {
          'content-type': 'multipart/form-data'
        },
        name: 'files',
        formData: {
          'files': _this.data.pictureUrl
        },
        success: function (res) {
          var obj = JSON.parse(res.data)
          resolve(obj.data.id);
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  },

  uploadMedia: function () {
    var _this = this;
    //如果有录音
    if (wx.getStorageSync("audioSrc")) {
      _this.setData({
        uploadUrl: wx.getStorageSync("audioSrc")
      })
    }
    //上传录音或录像
    if (_this.data.uploadUrl != '') {
      return new Promise(function (resolve, reject) {
        wx.uploadFile({
          method: "POST",
          url: _this.data.$root + '/files',
          filePath: _this.data.uploadUrl,
          header: {
            'content-type': 'multipart/form-data'
          },
          name: 'files',
          formData: {
            'files': _this.data.uploadUrl
          },
          success: function (res) {
            var obj = JSON.parse(res.data);
            resolve(obj.data)
          },
          fail: function (res) {
            reject(res);
          }
        })
      })

    }
  },

  save: function () {
    var _this = this;
    wx.showLoading({
      title: '上传中...',
    });

    if (_this.data.pictureUrl && !wx.getStorageSync("audioSrc")) {
      _this.getPicture_id().then(function (id) {
        var data = {
          picture_id: id,
          blessing: _this.data.blessing,
          status: 'NONBLANK',
          editor_info: _this.data.editor_info,
          union_id: _this.data.union_id,
          background_id: _this.data.bgid,
          category_id: _this.data.category_id
        }
        _this.upText(data);
      });
    } else if (wx.getStorageSync("audioSrc") && _this.data.pictureUrl) {
      _this.getPicture_id().then(function (id) {
        var picture_id = id;
        _this.uploadMedia().then(function (res) {
          var data = {
            voice_id: res.id,
            picture_id: picture_id,
            blessing: _this.data.blessing,
            status: 'NONBLANK',
            editor_info: _this.data.editor_info,
            union_id: _this.data.union_id,
            background_id: _this.data.bgid,
            category_id: _this.data.category_id
          }
          _this.upText(data);
        })
      })
    } else if (wx.getStorageSync("videoSrc")) {
      _this.uploadMedia().then(function (res) {
        var data = {
          video_url: res.url,
          blessing: _this.data.blessing,
          status: 'NONBLANK',
          editor_info: _this.data.editor_info,
          union_id: _this.data.union_id,
          background_id: _this.data.bgid,
          category_id: _this.data.category_id
        }
        _this.upText(data);
      })
    } else {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '请上传图片或视频',
        showCancel: false,
      })
    }
  },

  //保存
  upText: function (data) {
    var _this = this;
    wx.request({
      url: _this.data.$root + '/cards/' + wx.getStorageSync('cardid'),
      data: data,
      method: "PUT",
      success: function (res) {
        wx.hideLoading();
        if (res.data.code === 200) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000,
            complete: function () {
              wx.reLaunch({
                url: '../greetingcard/greetingcard?id=' + wx.getStorageSync('cardid'),
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '保存失败',
          })
        }
      }
    })
  },

  //处理图片
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      viewWidth = 0,
      viewHeight = 0,
      ratio = $width / $height;    //图片的真实宽高比例
    if (ratio >= 1) {
      viewWidth = 640,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight = 640 / ratio;    //计算的高度值
    } else {
      viewWidth = 480,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight = 480 / ratio;    //计算的高度值
    }

    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },

  onLoad: function (options) {
    let { blessing } = options;
    blessing = blessing === "undefined" ? "请写下您想要送出的祝福语" : blessing;

    //清理缓存
    wx.setStorageSync("pictureUrl", '');
    wx.setStorageSync("audioSrc", '');
    wx.setStorageSync("videoSrc", '')
    wx.setStorageSync("blessing", blessing);
    this.setData({
      bgid: options.bgid,
      bgurl: this.data.$root + "/files/" + options.bgid,
      blessing,
      category_id: options.category_id
    })
    backgroundAudioManager.src = this.data.$root + "/files/" + options.music;
  },
})