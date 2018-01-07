// pages/editerbcard/editerbcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $root: getApp().globalData.ROOTPATH,
    token: wx.getStorageSync("token"),
    isSave:false,
    defaultImgSrc: '../../files/default.jpg',
    imgSrc:'',
    picture_ids:[],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("picture_ids")) {
      this.setData({
        imgSrc: this.data.$root + '/files/' + wx.getStorageSync("picture_ids"),
      })
    } else {
      _this.setData({
        imgSrc: this.data.defaultImgSrc
      })
    }
  },
  upImg:function(){
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          imgSrc: res.tempFilePaths[0],
          isSave:true
        })
      }
    })
  },
  deleImg: function () {
    var _this = this;
    _this.setData({
      imgSrc: _this.data.defaultImgSrc,
      isSave: false
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '是否删除图片',
    //   success: function (res) {
    //     if (res.confirm) {
    //       wx.request({
    //         url: _this.data.$root + '/users/' + wx.getStorageSync('userid'),
    //         method: 'PATCH',
    //         data: {
    //           picture_ids: []
    //         },
    //         header: {
    //           'content-type': 'application/json', // 默认值
    //           'access_token': _this.data.token,
    //         },
    //         success: function (res) {
    //           _this.setData({
    //             imgSrc: _this.data.defaultImgSrc,
    //             isSave: false
    //           })
    //           wx.showToast({
    //             title: '删除成功',
    //             icon: 'success',
    //             duration: 1000
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    
  },
  saveImg:function(){
    var _this =this;
    wx.uploadFile({
      method: "POST",
      url: _this.data.$root + '/files',
      filePath: _this.data.imgSrc,
      header: {
        'content-type': 'multipart/form-data',
        'access_token': _this.data.token,
      },
      name: 'files',
      formData: {
        'files': _this.data.imgSrc
      },
      success: function (res) {
        var obj = JSON.parse(res.data)
        _this.setData({
          picture_ids: obj.data[0].id
        })
        wx.request({
          url: _this.data.$root + '/users/'+wx.getStorageSync('userid'),
          method:'PATCH',
          data: {
            picture_ids:[obj.data[0].id]
          },
          header: {
            'content-type': 'application/json', // 默认值
            'access_token': _this.data.token,
          },
          success: function (res) {
            wx.setStorageSync("picture_ids", obj.data[0].id )
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
        //do something
        
      },
      fail: function (res) {
        console.log(res);
      }
    })
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