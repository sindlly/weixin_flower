// pages/home/data/data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //开发用例
    $root: getApp().globalData.ROOTPATH,
    token: wx.getStorageSync("token"),
    //token: '353cf243-4667-4675-8d38-c3eae21bac72',
    csrfToken: wx.getStorageSync("csrfToken"),
    //csrfToken:'353cf243-4667-4675-8d38-c3eae21bac72',
    id:"98598110-e526-11e7-8da8-5fed89802120",
    text:"陪伴才是最好的礼物，用最好的陪伴，献给最美的母亲，在你老去前，我来疼爱你。 ",
    uploadUrl:'',
    hasPicture: false,
    pictureUrl:'',
    videoSrc:'',
    hasVideo:false,
    audioSrc:'',
    images:{},
  },
  addPicture:function(){
    var _this =this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          pictureUrl :res.tempFilePaths,
          hasPicture : true,
          hasVideo:false,
          // uploadUrl: res.tempFilePaths[0],
        }) 
        wx.setStorageSync("pictureUrl", res.tempFilePaths);//为预览暂存地址
        wx.setStorageSync("videoSrc", '')
      }
    })
  },
  bindTextAreaBlur:function(e){
    console.log(e.detail.value);
    wx.setStorageSync("blessing", e.detail.value);
  },
  upVideo: function(){
    var _this = this
    if (wx.getStorageSync("audioSrc")!='') {
      wx.showModal({
        title: '提示',
        content: '选择录像将清除录音，是否继续',
        success: function (res) {
          if (res.confirm) {
            //选择录像，则清除录音；
            wx.setStorageSync("audioSrc",'')
            wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 60,
              camera: 'back',
              success: function (res) {
                console.log(res)
                _this.setData({
                  videoSrc: res.tempFilePath,
                  hasVideo: true,
                  hasPicture: false,
                  uploadUrl: res.tempFilePath,
                  pictureUrl:'',
                })
                wx.setStorageSync("videoSrc", res.tempFilePath);//为预览暂存地址
                wx.setStorageSync("pictureUrl", '');//若有视频，则清除图片
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        }
      })
    }
    else{
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: function (res) {
          console.log(res)
          _this.setData({
            videoSrc: res.tempFilePath,
            hasVideo: true,
            hasPicture: false,
            uploadUrl: res.tempFilePath,
            pictureUrl: '',
          })
          wx.setStorageSync("videoSrc", res.tempFilePath);//为预览暂存地址
          wx.setStorageSync("pictureUrl", '');//若有视频，则清除图片
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    
    
  },
  upAdio: function(){
    var _this = this;
    if (wx.getStorageSync("videoSrc")){
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
              url: '../editer/editaudio/editaudio'
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../editer/editaudio/editaudio'
      })
    }
    
  },
  preview:function(){
    wx.navigateTo({
      url: '../editer/preview/preview'
    })
  },
  save: function(){
    var _this = this;
    var timestamp1 = Date.parse(new Date());
    var imgUrl = this.data.pictureUrl; //图片地址、
    var blessing = this.data.text; //祝福语
    //如果有录音
    if (wx.getStorageSync("audioSrc")) {
        _this.setData({
          uploadUrl: wx.getStorageSync("audioSrc")
        })
    }
    
    //上传录音或录像
    if (_this.data.uploadUrl!=''){
      console.log("上传录音或录像")
      wx.uploadFile({
        method: "POST",
        url: _this.data.$root + '/files',
        filePath: _this.data.uploadUrl,
        header: {
          'content-type': 'multipart/form-data',
          'access_token': _this.data.token,
          'x-csrf-token': _this.data.csrfToken
        },
        name: 'files',
        formData: {
          'files': _this.data.uploadUrl
        },
        success: function (res) {
          var timestamp2 = Date.parse(new Date());
          var usetime = timestamp2 - timestamp1;
          console.log("用时：" + usetime)
          var data = res.data
          console.log("录音或录像返回"+data);
          //do something
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
    
    //上传图片
    if(imgUrl!=''){
      console.log("有图片上传")
      wx.uploadFile({
        method: "POST",
        url: _this.data.$root + '/files',
        filePath: imgUrl[0],
        header: {
          'content-type': 'multipart/form-data',
          'access_token': _this.data.token,
          'x-csrf-token': _this.data.csrfToken
        },
        name: 'files',
        formData: {
          'files': imgUrl
        },
        success: function (res) {
          var timestamp2 = Date.parse(new Date());
          var usetime = timestamp2 - timestamp1;
          console.log("用时：" + usetime)
          var data = res.data
          console.log("图片返回："+data);
          //do something
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
    //上传文字
    wx.request({
      url: _this.data.$root+'/cards',
      data:{
        blessing:_this.data.text
      },
      method:"POST",
      header: {
        'access_token': _this.data.token,
        'x-csrf-token': _this.data.csrfToken
      },
      success: function (res) {
        console.log("上传文字返回"+res.data)
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
      if(ratio >= 1){
        viewWidth = 640,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight = 640 / ratio;    //计算的高度值
      }else{
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //清理缓存
    wx.setStorageSync("pictureUrl",'');
    wx.setStorageSync("audioSrc", '');
    wx.setStorageSync("videoSrc", '')
    wx.setStorageSync("blessing", this.data.text)
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