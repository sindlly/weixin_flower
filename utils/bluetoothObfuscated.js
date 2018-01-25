var CqWPQMwF1;
var _trVQR2 = 0;
var jdNsOgl3 = 0;
var VKAdP4 = 100;
var eOCsVtzb5 = 0;
var YMsFh6 = require('\x70\x6f\x73\x2e\x6a\x73');
var dr7 = '\x44\x65\x6d\x69\x64\x39';
var Tz$z8 = '\x34\x36\x31\x36';
var IBA9 = '';
var vVimp10 = '';
var sPZYFI$11 = '';
var CaHYm12 = '';
var D13 = '';
var WBwhIrVa14 = '\x34\x39\x35\x33\x35\x33\x34\x33\x2d\x46\x45\x37\x44\x2d\x34\x41\x45\x35\x2d\x38\x46\x41\x39\x2d\x39\x46\x41\x46\x44\x32\x30\x35\x45\x34\x35\x35';
var $kVNXs15 = '\x34\x39\x35\x33\x35\x33\x34\x33\x2d\x38\x38\x34\x31\x2d\x34\x33\x46\x34\x2d\x41\x38\x44\x34\x2d\x45\x43\x42\x45\x33\x34\x37\x32\x39\x42\x42\x33';
var lycSsng16 = '\x34\x39\x35\x33\x35\x33\x34\x33\x2d\x31\x45\x34\x44\x2d\x34\x42\x44\x39\x2d\x42\x41\x36\x31\x2d\x32\x33\x43\x36\x34\x37\x32\x34\x39\x36\x31\x36';
var ocv17 = false;
var NcseOId18 = false;
var hKmLWgEiD19 = false;
var B_rt20 = false;
var r_cFd$21 = 0;
var AYmHizw22 = -1;
var wuhiKE23 = '';
var r24;
var TZZgRjPZT25;
module["\x65\x78\x70\x6f\x72\x74\x73"] = {
  GetCurLog: b1_4nt,
  GetResLast: a___yl,
  OpenPrint: hN_29w,
  ClosePirint: fM_23o,
  GetAvailable: s_43ny,
  GetConnected: i__3Xr,
  GetCanPrint: fM_23p,
};

function hN_29w() {
  wuhiKE23 = '\u5f00\u59cb\u521d\u59cb\u5316\u6253\u5370';
  t8bjJe()
}

function fM_23o() {
  o__l_o();
  ibh3lr();
  bP_P6d()
}

function fM_23p() {
  if (AYmHizw22 == 0) return true;
  else return false
}

function s_43ny() {
  return NcseOId18
}

function i__3Xr() {
  return hKmLWgEiD19
}

function b1_4nt() {
  return wuhiKE23
}

function a___yl() {
  return r_cFd$21
}

function t8bjJe() {
  try {
    CqWPQMwF1 = setTimeout(pHplag, VKAdP4)
  } catch (err) { }
}

function o__l_o() {
  try {
    clearInterval(CqWPQMwF1)
  } catch (err) { }
}

function pHplag() {
  try {
    if (!NcseOId18 || AYmHizw22 == 1) {
      bP_P6d();
      NcseOId18 = false;
      hKmLWgEiD19 = false;
      AYmHizw22 = -1;
      B_rt20 = false;
      _trVQR2++;
      if (_trVQR2 > 3) {
        VKAdP4 = 1000
      } else {
        VKAdP4 = 100
      }
      eq_qFl()
    } else if (B_rt20 && !hKmLWgEiD19) {
      _trVQR2 = 0;
      jdNsOgl3++;
      if (jdNsOgl3 > 3) {
        VKAdP4 = 1000
      } else {
        VKAdP4 = 100
      } if (vVimp10) {
        o_sEbh(vVimp10)
      } else {
        kupA3k()
      }
    } else if (NcseOId18 && hKmLWgEiD19) {
      jdNsOgl3 = 0;
      VKAdP4 = 100;
      if (oN_L6c() > 0) {
        u8f_2q()
      } else {
        VKAdP4 = 1000
      }
    }
  } catch (err) { }
  CqWPQMwF1 = setTimeout(pHplag, VKAdP4)
}

function u8f_2q() {
  if (NcseOId18 && hKmLWgEiD19) {
    jdNsOgl3 = 0;
    if (oN_L6c() > 0) {
      VKAdP4 = 10;
      var pkQfEPo26 = v__1_t();
      var jVzSl_27 = 20;
      var saFTYqgs28 = p____l(pkQfEPo26["\x6c\x65\x6e\x67\x74\x68"], jVzSl_27);
      for (var CibtCH29 = 0; CibtCH29 < saFTYqgs28; CibtCH29++) {
        var BrgYqEf30 = CibtCH29 * jVzSl_27;
        var oR31 = BrgYqEf30 + jVzSl_27;
        if (BrgYqEf30 >= pkQfEPo26["\x6c\x65\x6e\x67\x74\x68"]) {
          break
        }
        if (oR31 > pkQfEPo26["\x6c\x65\x6e\x67\x74\x68"]) {
          oR31 = pkQfEPo26["\x6c\x65\x6e\x67\x74\x68"]
        }
        var JQglBaD32 = j__5Qv(pkQfEPo26, BrgYqEf30, oR31);
        v3jP_y(JQglBaD32)
      }
    }
  }
}

function s8jq_j(JA35) {
  r_cFd$21 = 1000;
  wuhiKE23 = '\u521d\u59cb\u5316\u84dd\u7259\u9002\u914d\u5668\u6210\u529f';
  sGO_Rs()
}

function p7n8_b(IQKGfhpc36) {
  r_cFd$21 = 1001;
  wuhiKE23 = '\u8bf7\u5148\u6253\u5f00\u624b\u673a\u84dd\u7259\u5f00\u5173';
  AYmHizw22 = 1
}

function eq_qFl() {
  if (!fd_S0s()) {
    AYmHizw22 = 1;
    wuhiKE23 = '\u5fae\u4fe1\u7248\u672c\u8fc7\u4f4e';
    return
  }
  AYmHizw22 = 2;
  if (r_cFd$21 == 1002 || r_cFd$21 == 2002) {
    return
  }
  r_cFd$21 = 1002;
  wuhiKE23 = '\u5f00\u59cb\u521d\u59cb\u5316\u84dd\u7259\u9002\u914d\u5668';
  ds7__l()
}

function bP_P6d() {
  try {
    wuhiKE23 = '\u5f00\u59cb\u65ad\u5f00\u6253\u5370\u673a';
    n9i2bc(vVimp10);
    k_i7Rx()
  } catch (err) { }
}

function yPp1_v(cEVbvYUDD37) {
  r_cFd$21 = 1100;
  wuhiKE23 = '\u65ad\u5f00\u6253\u5370\u673a\u6210\u529f';
  ocv17 = false;
  NcseOId18 = false;
  hKmLWgEiD19 = false
}

function l__RGg(res) {
  r_cFd$21 = 1101
}

function k_i7Rx() {
  if (r_cFd$21 == 1102) {
    return
  }
  r_cFd$21 = 1102;
  try {
    y__UPv()
  } catch (err) { }
}

function xHFW_i(E38, _DVWD_T39, jkl40) {
  r_cFd$21 = 2000;
  ocv17 = _DVWD_T39;
  NcseOId18 = jkl40;
  if (jkl40) {
    lL___u();
    if (!_DVWD_T39) {
      wbx__p()
    }
  } else {
    wuhiKE23 = '\u84dd\u7259\u672a\u6253\u5f00';
    AYmHizw22 = 1
  }
}

function uH_7hb(res) {
  r_cFd$21 = 2001;
  AYmHizw22 = 1
}

function sGO_Rs() {
  if (r_cFd$21 == 2002) {
    return
  }
  r_cFd$21 = 2002;
  x__8Bn()
}

function c_HC_d(dUKphuf41, st42) {
  if (!dUKphuf41) {
    NcseOId18 = dUKphuf41;
    AYmHizw22 = 1
  }
  ocv17 = st42
}

function lL___u() {
  try {
    x_Q_4f()
  } catch (err) { }
}

function y0mvsn(hmKJuh43) {
  B_rt20 = true;
  r_cFd$21 = 3000
}

function o9I_9x(res) {
  r_cFd$21 = 3001;
  wuhiKE23 = '\u67e5\u627e\u5468\u8fb9\u8bbe\u5907\u5931\u8d25';
  AYmHizw22 = 1
}

function wbx__p() {
  if (r_cFd$21 == 3002) {
    return
  }
  r_cFd$21 = 3002;
  wuhiKE23 = '\u67e5\u627e\u53ef\u8fde\u63a5\u6253\u5370\u673a';
  yT_9qp()
}

function getBluetoothDevicesComplete() {
  r_cFd$21 = 9003
}

function at2_Oa(_deviceName, O44) {
  r_cFd$21 = 9000;
  if (_deviceName == "huayanxinshuo") {
    vVimp10 = O44;
    wuhiKE23 = '\u627e\u5230\u53ef\u8fde\u63a5\u6253\u5370\u673a';
    vTN_Ci();
    return true
  }
  return false
}

function xs_a9r(EEU_h45) {
  r_cFd$21 = 9001;
  wuhiKE23 = '\u83b7\u53d6\u6240\u6709\u84dd\u7259\u8bbe\u5907\u5931\u8d25';
  AYmHizw22 = 1
}

function kupA3k() {
  if (r_cFd$21 == 9002) {
    return
  }
  r_cFd$21 = 9002;
  k_9__s()
}

function i5_dou(MoJpHp46, lorqssg47, I48, zRsYGJ49) {
  try {
    r_cFd$21 = 4000;
    if (I48 == dr7) {
      vVimp10 = lorqssg47;
      vTN_Ci();
      wuhiKE23 = '\u627e\u5230\u53ef\u8fde\u63a5\u6253\u5370\u673a';
      return true
    }
  } catch (err) { }
  return false
}

function g5_CAm() {
  if (r_cFd$21 == 4002) {
    return
  }
  r_cFd$21 = 4002;
  p_K_rk()
}

function bdeC4f(jf50, pVs51, dDocYIJ52) {
  r_cFd$21 = 5000;
  if (pVs51["\x69\x6e\x64\x65\x78\x4f\x66"]('\x6f\x6b') != -1) {
    wuhiKE23 = '\u8fde\u63a5\u6253\u5370\u673a\u6210\u529f';
    hKmLWgEiD19 = true;
    bg_d3h();
    v__4Hh(dDocYIJ52)
  } else {
    r_cFd$21 = 5001;
    wuhiKE23 = '\u8fde\u63a5\u6253\u5370\u673a\u9519\u8bef'
  }
}

function rj_Epp(res) {
  r_cFd$21 = 5001;
  wuhiKE23 = '\u8fde\u63a5\u6253\u5370\u673a\u5931\u8d25';
  AYmHizw22 = 1
}

function o_sEbh(_deviceId) {
  if (r_cFd$21 == 5002) {
    return
  }
  r_cFd$21 = 5002;
  wuhiKE23 = '\u5f00\u59cb\u8fde\u63a5\u6253\u5370\u673a';
  sL3_3n(_deviceId)
}

function x12H2r(ojRspL53) {
  r_cFd$21 = 5100
}

function h__y_j(res) {
  r_cFd$21 = 5101;
  wuhiKE23 = '\u5173\u95ed\u84dd\u7259\u8fde\u63a5\u5931\u8d25'
}

function n9i2bc(_deviceId) {
  if (!_deviceId) {
    return
  }
  if (r_cFd$21 == 5102) {
    return
  }
  r_cFd$21 = 5102;
  try {
    n_badw(_deviceId)
  } catch (err) { }
}

function lB_I2m(hYdUJC54, zbaPhS55, MomWHWrG56) {
  if (zbaPhS55 == vVimp10) {
    hKmLWgEiD19 = MomWHWrG56;
    if (!MomWHWrG56) {
      AYmHizw22 = 1
    }
  }
}

function iA_36e(_deviceId, shsKKo57) {
  try {
    r_cFd$21 = 6001;
    if (shsKKo57["\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65"]() == WBwhIrVa14) {
      sPZYFI$11 = shsKKo57;
      c6k_Ib(_deviceId, shsKKo57);
      return true
    }
  } catch (err) { }
  return false
}

function aw_4_w() {
  r_cFd$21 = 6001;
  wuhiKE23 = '\u83b7\u53d6\u6253\u5370\u670d\u52a1\u5931\u8d25';
  AYmHizw22 = 1
}

function v__4Hh(_deviceId) {
  if (r_cFd$21 == 6002) {
    return
  }
  r_cFd$21 = 6002;
  g9od7a(_deviceId)
}

function vl__7y(ji58) {
  r_cFd$21 = 7000;
  if (ji58["\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65"]() == $kVNXs15) {
    CaHYm12 = ji58;
    AYmHizw22 = 0
  }
  if (ji58["\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65"]() == lycSsng16) {
    D13 = ji58
  }
}

function bf95xj(res) {
  r_cFd$21 = 7001;
  AYmHizw22 = 1
}

function c6k_Ib(_deviceId, TIeY59) {
  if (r_cFd$21 == 7002) {
    return
  }
  r_cFd$21 = 7002;
  m02_yk(_deviceId, TIeY59)
}

function pabmSt(nuqFu60, DLVyX61, zhzmjbZs62) {
  if (r_cFd$21 == 8002) {
    return
  }
  r_cFd$21 = 8002;
  w2eE7u(nuqFu60, DLVyX61, zhzmjbZs62)
}

function nmhK_e(kwT63) {
  try {
    r_cFd$21 = 8100;
    eOCsVtzb5 = 0;
    kwT63
  } catch (err) { }
}

function lm_ojv(wYtMfz$64) {
  try {
    r_cFd$21 = 8101;
    eOCsVtzb5 = 1;
    wYtMfz$64
  } catch (err) { }
}

function i_pOTn(fe65, wzztKf66, YEgIs67, BJq68, vea69, vs70) {
  r_cFd$21 = 8102;
  eOCsVtzb5 = 2;
  uw_hyf(fe65, wzztKf66, YEgIs67, BJq68["\x62\x75\x66\x66\x65\x72"], vea69, vs70)
}

function v3jP_y(pZ_hhX71) {
  if (!NcseOId18) {
    return "\x61\x76\x61\x69\x6c\x61\x62\x6c\x65 \x69\x73 \x66\x61\x6c\x73\x65"
  }
  if (!vVimp10) {
    return "\x70\x72\x69\x6e\x74\x65\x72\x44\x65\x76\x69\x63\x65\x49\x64 \x69\x73 \x6e\x75\x6c\x6c"
  }
  if (!hKmLWgEiD19) {
    return "\x63\x6f\x6e\x6e\x65\x63\x74\x65\x64 \x69\x73 \x66\x61\x6c\x73\x65"
  }
  i_pOTn(vVimp10, sPZYFI$11, CaHYm12, pZ_hhX71, null, null)
}

function heQ__q() {
  try { } catch (e) { }
}

function he_sPb() {
  IBA9 = '';
  vVimp10 = '';
  sPZYFI$11 = '';
  CaHYm12 = '';
  D13 = ''
}

function fd_S0s() {
  return wx.openBluetoothAdapter
}

function ds7__l() {
  wx.openBluetoothAdapter({
    success: function (res) {
      s8jq_j(res)
    },
    fail: function (res) {
      p7n8_b(res)
    },
    complete: function (res) { }
  })
}

function y__UPv() {
  wx.closeBluetoothAdapter({
    success: function (res) {
      yPp1_v(res)
    },
    fail: function (res) {
      l__RGg(res)
    },
    complete: function (res) { }
  })
}

function x__8Bn() {
  wx.getBluetoothAdapterState({
    success: function (res) {
      xHFW_i(res, res.discovering, res.available)
    },
    fail: function (res) {
      uH_7hb(res)
    },
    complete: function (res) { }
  })
}

function x_Q_4f() {
  wx.onBluetoothAdapterStateChange(function (res) {
    c_HC_d(res.available, res.discovering)
  })
}

function yT_9qp() {
  wx.startBluetoothDevicesDiscovery({
    success: function (res) {
      y0mvsn(res)
    },
    fail: function (res) {
      o9I_9x(res)
    },
    complete: function (res) { }
  })
}

function vTN_Ci() {
  wx.stopBluetoothDevicesDiscovery({
    success: function (res) { }
  })
}

function k_9__s() {
  wx.getBluetoothDevices({
    success: function (res) {
      for (var p in res.devices) {
        if (at2_Oa(res.devices[p].name, res.devices[p].deviceId)) {
          break
        }
      }
    },
    fail: function (res) {
      xs_a9r(res)
    },
    complete: function (res) {
      getBluetoothDevicesComplete()
    }
  })
}

function p_K_rk() {
  wx.onBluetoothDeviceFound(function (res) {
    try {
      if (i5_dou(res, res.deviceId, res.name, res.RSSI)) {
        return
      }
    } catch (err) { }
    try {
      for (var p in res.devices) {
        if (i5_dou(res, res.devices[p].deviceId, res.devices[p].name, res.devices[p].RSSI)) {
          return
        }
      }
    } catch (err) { }
  })
}

function uflycd() {
  wx.getConnectedBluetoothDevices({
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { }
  })
}

function sL3_3n(_deviceId) {
  wx.createBLEConnection({
    deviceId: _deviceId,
    success: function (res) {
      bdeC4f(res, res.errMsg, _deviceId)
    },
    fail: function (res) {
      rj_Epp(res)
    },
    complete: function (res) { }
  })
}

function p44m_f() {
  wx.onBLECharacteristicValueChange(function (res) { })
}

function n_badw(_deviceId) {
  wx.closeBLEConnection({
    deviceId: _deviceId,
    success: function (res) {
      x12H2r(res)
    },
    fail: function (res) {
      h__y_j(res)
    },
    complete: function (res) { }
  })
}

function bg_d3h() {
  wx.onBLEConnectionStateChanged(function (res) {
    lB_I2m(res, res.deviceId, res.connected)
  })
}

function g9od7a(_deviceId) {
  wx.getBLEDeviceServices({
    deviceId: _deviceId,
    success: function (res) {
      for (var p in res.services) {
        {
          if (iA_36e(_deviceId, res.services[p].uuid)) {
            return
          }
        }
      }
    },
    fail: function (res) {
      aw_4_w()
    },
    complete: function (res) { }
  })
}

function m02_yk(_deviceId, _serviceId) {
  wx.getBLEDeviceCharacteristics({
    deviceId: _deviceId,
    serviceId: _serviceId,
    success: function (res) {
      for (var p in res.characteristics) {
        vl__7y(res.characteristics[p].uuid)
      }
    },
    fail: function (res) {
      bf95xj(res)
    },
    complete: function (res) { }
  })
}

function j0_fJc(_deviceId, _serviceId, _characteristicId) {
  wx.readBLECharacteristicValue({
    deviceId: _deviceId,
    serviceId: _serviceId,
    characteristicId: _characteristicId,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { }
  })
}

function w2eE7u(_deviceId, _serviceId, _characteristicId) {
  wx.notifyBLECharacteristicValueChange({
    state: true,
    deviceId: _deviceId,
    serviceId: _serviceId,
    characteristicId: _characteristicId,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { }
  })
}

function uw_hyf(_deviceId, _serviceId, _characteristicId, _buffervalue, _success, _fail) {
  wx.writeBLECharacteristicValue({
    deviceId: _deviceId,
    serviceId: _serviceId,
    characteristicId: _characteristicId,
    value: _buffervalue,
    success: function (res) {
      nmhK_e(_success)
    },
    fail: function (res) {
      lm_ojv(_fail)
    },
    complete: function (res) { }
  })
}

function sw_Hkw(key, value) {
  wx.setStorage({
    key: key,
    data: value
  })
}

function mPs2Uo() {
  wx.showToast({
    title: "打印失败",
    duration: 5000
  })
}

function g__9_y() {
  wx.showToast({
    title: "打印成功",
    duration: 5000
  })
}

function ibh3lr() {
  try {
    YMsFh6.ClearQueue()
  } catch (err) { }
}

function oN_L6c() {
  return YMsFh6.QueueWrite.length
}

function v__1_t() {
  return YMsFh6.QueueWrite.shift()
}

function p____l(_len1, _len2) {
  return Math.ceil(_len1 / _len2)
}

function j__5Qv(_buffer, _start, _end) {
  return _buffer.slice(_start, _end)
}