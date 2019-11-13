function format(date, format) {
  var __this = date;
  var o = {
    "M+": _this.getMonth() + 1, //month
    "d+": _this.getDate(),    //day
    "h+": _this.getHours(),   //hour
    "m+": _this.getMinutes(), //minute
    "s+": _this.getSeconds(), //second
    "q+": Math.floor((_this.getMonth() + 3) / 3),  //quarter
    "S": _this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}

module.exports = {
  format
}