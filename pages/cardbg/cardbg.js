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
    let id = options.id;
    if (options.q) id = decodeURIComponent(options.q).match(/id=.*/)[0].substr(3);
    if (options.scene) id = _this.tn2uuid(decodeURIComponent(options.scene));

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

  tn2uuid: function (tn) {
    return `${tn.slice(0, 8)}-${tn.slice(8, 12)}-${tn.slice(12, 16)}-${tn.slice(16, 20)}-${tn.slice(20, 32)}`;
  },

  onReady: function () {
    var _this = this;
    wx.request({
      url: _this.data.$root + '/card_categories',
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