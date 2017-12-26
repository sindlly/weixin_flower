// pages/home/data/data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //开发用例
    $root: getApp().globalData.ROOTPATH,
    token: wx.getStorageSync("token"),
    csrfToken: wx.getStorageSync("csrfToken"),
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
          uploadUrl: res.tempFilePaths[0],
        }) 
      }
    })
  },
  upVideo: function(){
    var _this = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log(res)
        _this.setData({
          videoSrc: res.tempFilePath,
          hasVideo:true,
          uploadUrl: res.tempFilePath,
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  upAdio: function(){
    wx.navigateTo({
      url: '../editer/editaudio/editaudio'
    })
  },
  save: function(){
    var _this = this;
    var timestamp1 = Date.parse(new Date());
    //如果有录音
    console.log("录音地址：" + wx.getStorageSync("voiceSrc"))
    if (wx.getStorageSync("voiceSrc")) {
        _this.setData({
          uploadUrl: wx.getStorageSync("voiceSrc")
        })
    }
    console.log(_this.data.uploadUrl)
    wx.uploadFile({
      method: "POST",
      url: $root+'/files', 
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
        console.log("用时："+usetime)
        var data = res.data
        console.log(data);
        //do something
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail:function(res){
        console.log(res);
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