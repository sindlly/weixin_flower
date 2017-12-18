Page({
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const requestTask = wx.request({
      url: 'http://111.231.76.244:7001/api/v1/users', 
      method:"POST",
      data: e.detail.value,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    // wx.navigateTo({
    //   url: '../detail/detail'
    // })
  }
})