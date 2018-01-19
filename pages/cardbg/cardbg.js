// pages/cardbg/cardbg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $root: getApp().globalData.ROOTPATH,
    imgSrcArry:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.getuserInfo();
    var _this = this;
    wx.request({
      url: _this.data.$root+'/cards/'+options.id,
      success:function(res){
        wx.setStorageSync('cardid', options.id)
        //如果status为BLANK，表示为首个用户
        if (res.data.data.card.status == "NONBLANK"){
          wx.reLaunch({
            url: '../greetingcard/greetingcard?id=' + options.id,  //若有数据则跳到贺卡页。
          })
        }
        else{

        }
      }
    })
  },
  bindbg:function(e){
    wx.navigateTo({
      url: '../editer/editer?bgid=' + e.currentTarget.dataset.bgid + "&blessing=" + e.currentTarget.dataset.blessing + "&category_id=" + e.currentTarget.dataset.category_id + "&music=" + e.currentTarget.dataset.music,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    wx.request({
      url: _this.data.$root +'/card_categories',
      // url: _this.data.$root + '/cards',
      success:function(res){
         var arr = res.data.data.items;
         var arry = [];
        for(var i in arr){
          for (var j in arr[i].background_ids){
           var bg = _this.data.$root + '/files/' + arr[i].background_ids[j] + '/thumbnail';
            arry.push({
              bg: bg,
              blessings: arr[i].blessings[j],
              name:arr[i].name,
              bgid: arr[i].background_ids[j],
              category_id: arr[i].id,
              music: arr[i].music_ids[0],
            })
          }
        }
       _this.setData({
          imgSrcArry:arry
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取用户数据
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