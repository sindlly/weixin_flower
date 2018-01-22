// pages/cardbg/cardbg.js
const app = getApp()
Page({

  data: {
    $root: getApp().globalData.ROOTPATH,
    imgSrcArry: [],
  },

  onLoad: function (options) {
    var userInfo = app.getuserInfo();
    var _this = this;
    const id = options.q ? decodeURIComponent(options.q).match(/id=.*/)[0].substr(3) : options.id;

    wx.request({
      url: _this.data.$root + '/cards/' + id,
      success: function (res) {
        wx.setStorageSync('cardid', id);
        //如果status为BLANK，表示为首个用户
        if (res.data.data.card.status == "NONBLANK") {
          wx.reLaunch({
            url: '../greetingcard/greetingcard?id=' + id,  //若有数据则跳到贺卡页。
          })
        }
      }
    })
  },

  bindbg: function (e) {
    wx.navigateTo({
      url: '../editer/editer?bgid=' + e.currentTarget.dataset.bgid + "&blessing=" + e.currentTarget.dataset.blessing + "&category_id=" + e.currentTarget.dataset.category_id + "&music=" + e.currentTarget.dataset.music,
    })
  },

  onReady: function () {
    var _this = this;
    wx.request({
      url: _this.data.$root + '/card_categories',
      // url: _this.data.$root + '/cards',
      success: function (res) {
        var arr = res.data.data.items;
        var arry = [];
        for (var i in arr) {
          for (var j in arr[i].background_ids) {
            var bg = _this.data.$root + '/files/' + arr[i].background_ids[j];
            arry.push({
              bg: bg,
              blessings: arr[i].blessings[j],
              name: arr[i].name,
              bgid: arr[i].background_ids[j],
              category_id: arr[i].id,
              music: arr[i].music_ids[0],
            })
          }
        }
        _this.setData({
          imgSrcArry: arry
        })
      }
    })
  },
})