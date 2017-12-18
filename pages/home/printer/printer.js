// pages/home/data/data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:'../../../files/Tulips.jpg',
    deviceTable:{}
  },
  upfile:function(){
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          imgsrc: res.tempFilePaths[0]
        })  
      }
    })
  },
  connectBule:function(){
    //初始化蓝牙模块
    this.openBluetooth();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 蓝牙操作基本方法
  //初始化蓝牙适配器  
  openBluetooth: function () {
    var _this = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        _this.getBluetoothAdapterState();
      },
      fail: function (res) {
        //未开启蓝牙功能时提示开启
        wx.showModal({
          title: '提示',
          content: '请开启蓝牙功能',
          duration: 1000
        })

      }
    })
  },
  //关闭蓝牙模块  
  closeBluetooth: function () {
    wx.openBluetoothAdapter()

    wx.closeBluetoothAdapter({
      success: function (res) {
        // success  
        console.log("success" + res)
      }
    })
  },
  //获取本机蓝牙适配器状态  
  getBluetoothAdapterState: function () {
    
    var _this = this;
    wx.getBluetoothAdapterState({
        // success  
      success: function (res) {
        var available = res.available,
          discovering = res.discovering;
        if (!available) {
          wx.showToast({
            title: '设备无法开启蓝牙连接',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        }
        else {
          if (!discovering) {
            _this.startBluetoothDevicesDiscovery();
            //_this.getConnectedBluetoothDevices();
          }
        }
      }
    })
  },
  //监听蓝牙适配器状态变化事件  
  onBluetoothAdapterStateChange: function () {
    wx.onBluetoothAdapterStateChange(function (res) {
      console.log(`adapterState changed, now is`, res)
    })
  },
  // 开始搜寻附近的蓝牙外围设备  
  startBluetoothDevicesDiscovery: function () {
    console.log("disc")
    var _this = this;
    wx.startBluetoothDevicesDiscovery({
      services: [],
      allowDuplicatesKey: false,
      success: function (res) {
        if (!res.isDiscovering) {
          _this.getBluetoothAdapterState();
        }
        else {
          _this.onBluetoothDeviceFound();
          _this.getBluetoothDevices();
        }
      },
      fail: function (err) {
        console.log(err);
      }  
    })
  },
  // 停止搜寻附近的蓝牙外围设备
  stopBluetoothDevicesDiscovery: function () {
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log(res)
      }
    })
  },
  //获取所有已发现的蓝牙设备  
  getBluetoothDevices: function () {
    var _this = this;
    var arr = []
    wx.getBluetoothDevices({
      
      success: function (res) {
        // success 
       // var arr = []
        for (var i = 0; i < res.devices.length;i++){
          arr[i] = res.devices[i].name
          _this.setData({
            deviceTable: res.devices[i].name,
          }) 
        } 
        // _this.setData({
        //   deviceTable:arr,
        // })  
        console.log("arr:" + arr)
        console.log("deviceTable:" + _this.deviceTable)
      
      },
    })
  },
  //监听寻找到新设备的事件  
  onBluetoothDeviceFound: function () {
    wx.onBluetoothDeviceFound(function (res) {
      // callback  
      console.log("found")
      console.log(res)
    })
  },
  //根据 uuid 获取处于已连接状态的设备  
  getConnectedBluetoothDevices: function () {
    wx.getConnectedBluetoothDevices({
      success: function (res) {
        console.log(res)
      }
    })
  },
  //连接低功耗蓝牙设备  
  createBLEConnection: function () {
    wx.createBLEConnection({
      deviceId: 'AC:BC:32:C1:47:80',
      success: function (res) {
        // success  
        console.log(res)
      },
      fail: function (res) {
        // fail  
      },
      complete: function (res) {
        // complete  
      }
    })
  },
  //断开与低功耗蓝牙设备的连接  
  closeBLEConnection: function () {
    wx.closeBLEConnection({
      deviceId: 'AC:BC:32:C1:47:80',
      success: function (res) {
        console.log(res)
      }
    })
  },
  //监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等  
  onBLEConnectionStateChanged: function () {
    wx.onBLEConnectionStateChanged(function (res) {
      console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
    })
  },
  //获取蓝牙设备所有 service（服务）  
  getBLEDeviceServices: function () {
    wx.getBLEDeviceServices({
      deviceId: '48:3B:38:88:E3:83',
      success: function (res) {
        // success  
        console.log('device services:', res.services.serviceId)
      },
      fail: function (res) {
        // fail  
      },
      complete: function (res) {
        // complete  
      }
    })
  },
  //获取蓝牙设备所有 characteristic（特征值）  
  getBLEDeviceCharacteristics: function () {
    wx.getBLEDeviceCharacteristics({
      deviceId: '48:3B:38:88:E3:83',
      serviceId: 'serviceId',
      success: function (res) {
        // success  
      },
      fail: function (res) {
        // fail  
      },
      complete: function (res) {
        // complete  
      }
    })
  }  
})