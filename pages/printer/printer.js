/**
 * 使用方法：
 * 1.添加2个引用
 * var bluetooth = require('../../utils/bluetoothObfuscated.js')
 * var pos = require('../../utils/pos.js')
 * 2.执行打开打印机连接 bluetooth.OpenPrint();//只需执行一次
 * 3.查看打印机是否就绪 bluetooth.GetCanPrint();//就绪后，就可以发送打印数据
 * 4.发送需要打印的指令，如打印条码 pos.PrintBarcode('1234567890');
 * 5.打印会自动按照先后顺序进行打印
 * 6.具体打印指令参照pos.js文件，可自己参照完善打印指令
 */
const app = getApp()
const bluetooth = require('../../utils/bluetoothObfuscated.js')
const pos = require('../../utils/pos.js')

let TimerCheck;
Page({
  data: {
    motto: '连接打印机中....',
    disabled: false, // 按钮是否可用
    loading: true,
    tag: false, // 是否打印店铺名称
    userInfo: wx.getStorageSync('user_info') || null,
    token: wx.getStorageSync('token'),
    rePrint: true, // 是否可重复打印
    printUrl: '', // 二维码url地址
    printImgUrl: '../../files/print_disabled.png',
    reprintImgUrl: '../../files/reprint_disabled.png',
    tprintImgUrl: '../../files/tprint_disabled.png',
    reprintCount: 0, // 重打次数
  },

  printQrCode: function () {
    const $root = app.globalData.ROOTPATH;
    const $host = app.globalData.HOST;
    const { data: $data } = this;
    const that = this;

    // 请求生成贺卡
    if (!$data.disabled) {
      wx.request({
        url: $root + '/cards',
        method: "POST",
        header: {
          'content-type': 'application/json',
          'access_token': $data.token,
        },
        success: function (res) {
          if (res.data.code == 200) {
            const url = `${$host}/public/two_dimension_code?id=${res.data.data.id}`;

            // 根据url打印二维码
            PrintQRcode(url, $data.tag, $data.userInfo.name);
            that.setData({
              rePrint: true,
              reprintCount: 0,
              printUrl: url,
              reprintImgUrl: '../../files/reprint.png',
            });
          }
          else wx.showModal({ title: '提示', content: res.data.msg })
        },
        fail: function (e) {
          wx.showModal({ title: '提示', content: '生成二维码失败！' })
        }
      })
    }
  },

  rePrintQrCode: function () {
    const { data: $data } = this;
    let { reprintCount } = $data;
    if ($data.rePrint && $data.reprintCount < 2) {
      PrintQRcode($data.printUrl, $data.tag, $data.userInfo.name);
      reprintCount += 1;
      this.setData({
        reprintCount
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '同一张二维码重打次数不超过2次',
        showCancel: false
      })
      this.setData({
        rePrint: false,
        reprintImgUrl: '../../files/reprint_disabled.png',
      })
    }
  },

  QrCodeTest: function () {
    const testUrl = 'https://www.baidu.com/s?wd=%E5%B0%8F%E7%A8%8B%E5%BA%';
    const { data: $data } = this;
    if (!$data.disabled) PrintQRcode(testUrl, $data.tag, '花言小程序');
  },

  checkboxChange: function (e) {
    const { value } = e.detail;
    this.data.tag = value[0] === "checked";
  },

  onShow: function () {
    bluetooth.OpenPrint();//打开打印机
    timer(this);
  },

  onHide: function () {
    clearInterval(TimerCheck);
    bluetooth.ClosePirint();   //关闭打印机
  }
})

const PrintQRcode = (url, tag = false, name) => {
  if (!tag) {
    pos.PrintJumpLines(3);
    pos.PrintQRcode(url);
    pos.PrintJumpLines(6);
  } else {
    pos.PrintJumpLines(1);
    pos.PrintMiddleText(`------${name}------`);
    pos.PrintJumpLines(1);
    pos.PrintQRcode(url);
    pos.PrintJumpLines(2);
    pos.PrintMiddleText(`------${name}------`);
    pos.PrintJumpLines(3);
  }
}

const timer = (that) => {
  try {
    if (bluetooth.GetCanPrint()) {//打印机是否就绪
      that.setData({
        disabled: false,
        motto: '打印机准备就绪',
        loading: false,
        printImgUrl: '../../files/print.png',
        tprintImgUrl: '../../files/tprint.png',
      });
    }
    else {
      //console.log("resLast", bluetooth.GetResLast()); //打印机初始化日志代码   
      // console.log("available", bluetooth.GetAvailable());//蓝牙是否有效
      // console.log("connected", bluetooth.GetConnected());//蓝牙是否连接
      that.setData({
        disabled: true,
        motto: bluetooth.GetCurLog(),//打印机状态日志
        loading: true,
        printImgUrl: '../../files/print_disabled.png',
        reprintImgUrl: '../../files/reprint_disabled.png',
        tprintImgUrl: '../../files/tprint_disabled.png',
      });
    }
  }
  catch (err) { }
  TimerCheck = setTimeout(function () {
    timer(that);
  }, 3000);
}
