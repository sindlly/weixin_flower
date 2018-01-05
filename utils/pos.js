var util = require('util.js');
var QueueWrite = new Array();//等待写入蓝牙的执行队列
module.exports = {
  QueueWrite: QueueWrite,//打印队列
  ClearQueue: ClearQueue,//清空打印机待执行队列
  AddPrintQueue: AddPrintQueue,//添加到打印队列
  PrintTitle: PrintTitle,//打印标题（居中加粗）
  PrintText: PrintText,//打印普通文字（从左至右，不加粗）
  PrintBigTitle: PrintBigTitle, //打印加粗文字（从左至右）
  PrintNameValue: PrintNameValue,//打印键值文字（左边加粗，右边不加粗）
  PrintMiddleText: PrintMiddleText,//居中打印，不加粗
  PrintMiddleTextBold: PrintMiddleTextBold,//居中打印，加粗
  PrintJumpLines: PrintJumpLines,//跳行
  PrintBarcode: PrintBarcode,//打印条码
  PrintQRcode: PrintQRcode,//打印二维码
}

function PrintNameValue(name, value) {
  AddPrintQueue('InitPos');
  AddPrintQueue('Bold');
  AddPrintQueue('WriteText', name);
  AddPrintQueue('UnBold');
  AddPrintQueue('Print', value);
}
function PrintBigTitle(text) {
  AddPrintQueue('InitPos');
  AddPrintQueue('Bold');
  AddPrintQueue('FontDouble');
  AddPrintQueue('AlignMiddle');
  //Underline(2);
  AddPrintQueue('Print', text);
  AddPrintQueue('PrintJumpLine', 1);
}
function PrintTitle(text) {
  AddPrintQueue('InitPos');
  AddPrintQueue('Bold');
  AddPrintQueue('FontHighDouble');
  AddPrintQueue('AlignMiddle');
  //Underline(2);
  AddPrintQueue('Print', text);
  AddPrintQueue('PrintJumpLine', 1);
}
function PrintMiddleTextBold(text) {
  AddPrintQueue('InitPos');
  AddPrintQueue('AlignMiddle');
  AddPrintQueue('Bold');
  AddPrintQueue('Print', text);
  AddPrintQueue('PrintJumpLine', 1);
}
function PrintJumpLines(n) {
  AddPrintQueue('PrintJumpLine', n);
}
function PrintMiddleText(text) {
  AddPrintQueue('InitPos');
  AddPrintQueue('AlignMiddle');
  AddPrintQueue('Print', text);
 // AddPrintQueue('AlignLeft');
  AddPrintQueue('PrintJumpLine', 1);
}
function PrintText(text) {
  AddPrintQueue('InitPos');
  AddPrintQueue('Print', text);
  // AddPrintQueue('AlignLeft');
  AddPrintQueue('PrintJumpLine', 1);
}
function ClearQueue() {
  QueueWrite.splice(0, QueueWrite.length);//清空队列 
}
function AddPrintQueue(key, value) {
  var bf = null;
  switch (key.toLowerCase()) {
    case 'InitPos'.toLowerCase():
      QueueWrite.push(InitPos());//初始化蓝牙打印POS机
      break;
    case 'Bold'.toLowerCase():
      QueueWrite.push(Bold(1));////字体加粗
      break;
    case 'UnBold'.toLowerCase():
      QueueWrite.push(Bold(0));//取消字体加粗
      break;
    case 'FontDouble'.toLowerCase():
      QueueWrite.push(FontDouble(1, 1));//字体增大
      break;
    case 'FontHighDouble'.toLowerCase():
      QueueWrite.push(FontDouble(0, 1));//字体高度增大
      break;
    case 'UnFontDouble'.toLowerCase():
      QueueWrite.push(FontDouble(0, 0));//取消字体增大
      break;
    case 'AlignMiddle'.toLowerCase():
      bf = AlignMiddle();
      console.log("AlignMiddle:", bf);
      QueueWrite.push(bf);//设置居中
      break;
    case 'AlignLeft'.toLowerCase():
      QueueWrite.push(AlignLeft());//设置居左
      break;
    case 'AlignRight'.toLowerCase():
      QueueWrite.push(AlignRight());//设置居右
      break;
    case 'Print'.toLowerCase()://打印
      var hexstr = util.encodeToGb2312(value);
      QueueWrite.push(util.Arry2Arry(Hex2Arry(hexstr), Print()));
      break;
    case 'PrintJumpLine'.toLowerCase()://打印并走n行
      QueueWrite.push(PrintJumpLine(value));
      break;
    case 'Underline'.toLowerCase()://下划线0-2
      QueueWrite.push(Underline(value));
      break;
    case 'WriteText'.toLowerCase()://将打印数据发送到打印机缓存区
      QueueWrite.push(Hex2Arry(util.encodeToGb2312(value)));
      break;
    case 'Newlines'.toLowerCase()://下划线0-2
      QueueWrite.push(LfLines(value));
      break;
    case 'CharSet'.toLowerCase()://设置字符集
      QueueWrite.push(CharSet(0));
      break;
    case 'CodePage'.toLowerCase()://设置代码页
      QueueWrite.push(CodePage(0));
      break;
    case 'CharSpacing'.toLowerCase()://设置字间距
      QueueWrite.push(CharSpacing(value));
      break;
    case 'RowSpacing'.toLowerCase()://设置行间距
      QueueWrite.push(RowSpacing(value));
      break;
    case 'PrintBarcode'.toLowerCase()://打印条码
      PrintBarcode(value);
      break;      
    default:
      break;
  }
}
function PrintQRcode(code)
{
  var QRcode = Hex2Arry(util.encodeToGb2312(code));
  GS_k_pL_pH_cn_fn_n[3] = QRcode.length+3;
  QueueWrite.push(GS_k_pL_pH_cn_fn_n);
  QueueWrite.push(QRcode);
}
function PrintBarcode(code)
{
  console.log("PrintBarcode", code);
  var barcode = Hex2Arry(util.encodeToGb2312(code));
  console.log("barcode", barcode);
  console.log("barcode.length", barcode.length);
  GS_H_n[2]=2;
  QueueWrite.push(GS_H_n);
  GS_k_m_n[3] = barcode.length;
  QueueWrite.push(GS_k_m_n);
  QueueWrite.push(barcode);
}
//设置打印字符双倍宽度,n 的低 4 位表示高度是否放大，等于 0 表示不放大,n 的高 4 位表示宽度是否放大，等于 0 表示不放大。
function FontDouble(x,y)
{
  GS_exclamationmark_n[2]=x*16+y;
  return GS_exclamationmark_n.slice(0); 
}
function PrintJumpLine(n)
{
  ESC_d_n[2] = n;
  return ESC_d_n.slice(0);
}
function PrintJump(n)
{
  ESC_J_n[2]=n;
  return ESC_J_n.slice(0);
}
function Print()
{return FF;}
//下划线，0-2
function Underline(n)
{
  ESC_line_n[2]=n;
  return ESC_line_n.slice(0);
}
//是否加粗,0不加粗，1加粗
function Bold(n)
{
  GS_E_n[2]=n;
  return GS_E_n.slice(0);
}
//是否有纸
function QueryOnline(){
  return Lack_Paper.slice(0);
}
function InitPos()
{
  return ESC_ALT.slice(0);
}
function LfLines(n)
{
  if(n<1)
  {
    return LF.slice(0);
  }
var b = new Uint8Array(n);
for(var i=0;i<n;i++)
{
  b[i]=LF;
}
  return b.slice(0);
}
function CrLines(n) {
  if (n < 1) {
    return CR.slice(0);
  }
  var b = new Uint8Array(n);
  for (var i = 0; i < n; i++) {
    b[i] = CR;
  }
  return b.slice(0);
}
//设置字符集
function CharSet(nCharSet) {
  console.log('CharSetAndCodePage');
  ESC_R_n[2] = 15;// nCharSet;
  return ESC_R_n.slice(0);
}
//设置代码页 
function CodePage( nCodePage)
{
  console.log('CharSetAndCodePage');
  ESC_t_n[2] =255;// nCodePage; 
  return ESC_t_n.slice(0);
}
//设置输出对齐方式 缺省：左对齐 左对齐：n = 0, 48  居中对齐：n = 1, 49 右对齐 ：n = 2, 50
function AlignLeft()
{
  ESC_a_n[2]=0;
  return ESC_a_n.slice(0);
}
//居右
function AlignRight() {
  ESC_a_n[2] = 2;
  return ESC_a_n.slice(0);
}
//居中
function AlignMiddle() {
  ESC_a_n[2] = 1;  
  return ESC_a_n.slice(0).slice(0); 
}
//字间距
function CharSpacing(n)
{
  ESC_SP_n[2]=n;
  return ESC_SP_n.slice(0)
}
//行间距
function RowSpacing(n)
{
ESC_3_n[2]=n;
return ESC_3_n.slice(0);
}
function Hex2Arry(str)
{
  var sa = str.split("%");
  var b = new Uint8Array(sa.length - 1);
  for (var i = 1; i < sa.length; i++) {
    b[i - 1] = parseInt(sa[i], 16);
  }
  return b;
}

//是否缺纸
var Lack_Paper = new Uint8Array([29, 114, 1]);

var DES_SETKEY = new Uint8Array([31, 31, 0, 8, 0, 1, 1, 1, 1, 1, 1, 1, 1]);
var DES_ENCRYPT = new Uint8Array([31, 31, 1]);
var DES_ENCRYPT2 = new Uint8Array([31, 31, 2]);
var ERROR = new Uint8Array([0]);
//打印机初始化
var ESC_ALT = new Uint8Array([27, 64]);
//打印并走纸 n 点行
var ESC_J_n = new Uint8Array([27, 74,0]);
//打印并走纸 n 行
var ESC_d_n = new Uint8Array([27, 100, 0]);
//
var ESC_L = new Uint8Array([27, 76]);
//
var ESC_CAN = new Uint8Array([24]);
//打印缓冲区的数据并进纸到下一个黑标位置
var FF = new Uint8Array([12]);
//（页模式命令）打印缓冲区的数据并进纸到下一个黑标位置
var ESC_FF = new Uint8Array([27, 12]);
//
var ESC_S = new Uint8Array([27, 83]);
//
var GS_P_x_y = new Uint8Array([29, 80, 0, 0]);
//选择国际字符集 (该指令暂不支持)USA
var ESC_R_n = new Uint8Array([27, 82, 0]);
//选择字符代码页
var ESC_t_n = new Uint8Array([27, 116, 0]);
//打印并换行
var LF = new Uint8Array([10]);
//打印并换行
var CR = new Uint8Array([13]);
//设置行间距为 n 点行
var ESC_3_n = new Uint8Array([27, 51, 0]);
//设置字符间距
var ESC_SP_n = new Uint8Array([27, 32, 0]);
//
var DLE_DC4_n_m_t = new Uint8Array([16, 20, 1, 0, 1]);
//
var GS_V_m = new Uint8Array([29, 86, 0]);
//
var GS_V_m_n = new Uint8Array([29, 86, 66, 0]);
//
var GS_W_nL_nH = new Uint8Array([29, 87, 118, 2]);
//
var ESC_dollors_nL_nH = new Uint8Array([27, 36, 0, 0]);
//设置输出对齐方式 缺省：左对齐 左对齐：n=0,48  居中对齐：n=1,49 右对齐 ：n=2,50
var ESC_a_n = new Uint8Array([27, 97, 0]);
//用于设置打印字符的方式。默认值是 0,位 1：1：字体反白,位 2：1：字体上下倒置,位 3：1：字体加粗,位 4：1：双倍高度,位 5：1：双倍宽度,位 6：1：删除线
//设置打印字符双倍宽度
var GS_exclamationmark_n = new Uint8Array([29, 33, 0]);
//
var ESC_M_n = new Uint8Array([27, 77, 0]);
//设置取消打印字体是否加粗,n 最低位有效,等于 0 时取消字体加粗,非 0 时设置字体加粗
var GS_E_n = new Uint8Array([27, 69, 0]);
//n=0-2,下划线的高度,默认：0
var ESC_line_n = new Uint8Array([27, 45, 0]);
//n=1:设置字符上下倒置,n=0:取消字符上下倒置
var ESC_lbracket_n = new Uint8Array([27, 123, 0]);
//n=1:设置字符反白打印,n=0:取消字符反白打印
var GS_B_n = new Uint8Array([29, 66, 0]);
//
var ESC_V_n = new Uint8Array([27, 86, 0]);
//打印下装点图
var GS_backslash_m = new Uint8Array([29, 47, 0]);
//打印下载到 FLASH  中的位图
var FS_p_n_m = new Uint8Array([28, 112, 1, 0]);

/*************条码打印开始***********************************************************/
//设定条码对应的字符(HRI)打印方式
//n=0不打印HRI,1HRI在条码上方，2HRI在条码下方，3HRI在条码上方和下方
var GS_H_n = new Uint8Array([29, 72, 0]);
//
var GS_f_n = new Uint8Array([29, 102, 0]);
//设置条形码高度
//1<<n<<255默认值:50
var GS_h_n = new Uint8Array([29, 104, -94]);
//设置条形码左边距0->255
var GS_x_n = new Uint8Array([29, 120, -94]);
// 设置条形码宽度,n=2,3,默认2
var GS_w_n = new Uint8Array([29, 119, 3]);
//打印条形码类型UPC-A，长度12
var GS_k_m_n = new Uint8Array([29, 107, 73, 12]);
//
var GS_k_m_v_r_nL_nH = new Uint8Array([29, 107, 97, 0, 2, 0, 0]);

/*************条码打印结束******************************************************/

//
var ESC_W_xL_xH_yL_yH_dxL_dxH_dyL_dyH = new Uint8Array([27, 87, 0, 0, 0, 0, 72, 2, -80, 4]);
//
var ESC_T_n = new Uint8Array([27, 84, 0]);
//
var GS_dollors_nL_nH = new Uint8Array([29, 36, 0, 0]);
//
var GS_backslash_nL_nH = new Uint8Array([29, 92, 0, 0]);
//
var FS_line_n = new Uint8Array([28, 45, 0]);

/*************二维码打印开始******************************************************/

//设置二维码尺寸大小
var GS_leftbracket_k_pL_pH_cn_67_n = new Uint8Array([29, 40, 107, 3, 0, 49, 67, 3]);
//设置二维码尺寸大小
var GS_leftbracket_k_pL_pH_cn_69_n = new Uint8Array([29, 40, 107, 3, 0, 49, 69, 48]);
//设置二维码尺寸大小
var GS_leftbracket_k_pL_pH_cn_80_m__d1dk = new Uint8Array([29, 40, 107, 3, 0, 49, 80, 48]);
//打印二维码
var GS_leftbracket_k_pL_pH_cn_fn_m = new Uint8Array([29, 40, 107, 3, 0, 49, 81, 48]);

var GS_k_pL_pH_cn_fn_n = new Uint8Array([29, 40, 107, 3, 0, 49, 80, 48]);
/*************二维码打印结束******************************************************/