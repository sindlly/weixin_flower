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
    animationData_1: '',
    animationData_2: '',
    animationData_3: '',
    zIndex_1: 2,
    zIndex_2: 3,
    zIndex_3: 1,
    x: 0,
    y: 0
  },
  afterdo:function(){
    console.log("afterdo")
    this.move();
  },
  opencard: function () {
    var _this =this;
    var animation_2 = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
      transformOrigin: 'right',
    })
    this.animation_2 = animation_2;
    animation_2.rotateY(180).step()
    this.setData({
      animationData_2: this.animation_2.export()
    })
    // setTimeout(function(){
    //   _this.move();
    // },1000);
    setTimeout(function () {
      _this.setData({
        zIndex_1: 0
      })
    }, 3000);
    
    
    // var animation_1 = wx.createAnimation({
    //   duration: 3000,
    //   timingFunction: 'ease',
    //   transformOrigin: 'left',
    // })
    // this.animation_1 = animation_1;
    // animation_1.rotateY(180).step()
    // this.setData({
    //   animationData_1: this.animation_1.export()
    // })

  },
  move: function () {
    var _this = this;
    var animation_3 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
      scale: 0.6,
    })
    this.animation_3 = animation_3; 
    animation_3.translateX(160).scale(0.6).step();
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
    wx.request({
      url: _this.data.$root + '/cards/' + options.id,
      success: function (res) {
        _this.setData({
          bgurl: _this.data.$root + "/files/" + res.data.data.card.background_id,
          imgurl: _this.data.$root + "/files/" + res.data.data.card.picture_id,
          blessing: res.data.data.card.blessing,
        })


      }
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var _this = this;
    // setInterval(function(){
    //   console.log(_this.target());
    //   if (_this.target()>0){
    //     _this.setData({
    //       zIndex:10
    //     })
    //   }
    // })

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