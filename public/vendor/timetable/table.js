var courseList = [
  ['大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修', '大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修','毛概@14208','','','','选修','选修'],
  ['','','信号与系统@11302','信号与系统@11302','模拟电子技术基础@16204','模拟电子技术基础@16204','','','','','','', '大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修','毛概@14208','','','','选修','选修'],
  ['大学体育(Ⅳ)','大学体育(Ⅳ)','形势与政策(Ⅳ)@15208','形势与政策(Ⅳ)@15208','','','电路、信号与系统实验','电路、信号与系统实验','','','','', '大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修','毛概@14208','','','','选修','选修'],
  ['','','','','电装实习@11301','电装实习@11301','','','','大学体育','大学体育','', '大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修','毛概@14208','','','','选修','选修'],
  ['','','数据结构与算法分析','数据结构与算法分析','','','','','信号与系统','信号与系统','','', '大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修','毛概@14208','','','','选修','选修'],
  ['','','数据结构与算法分析','数据结构与算法分析','','','','','信号与系统','信号与系统','','', '大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修','毛概@14208','','','','选修','选修'],
  ['','','数据结构与算法分析','数据结构与算法分析','Something New','Something New','','','信号与系统','信号与系统','','Something', '大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修','毛概@14208','','','','选修','选修'],
];
var week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] :
  ['一', '二', '三', '四', '五', '六', '日'];
var day = new Date().getDay();
var courseType = [
  [{name: '8:00'}, 1],
  [{name: '8:30'}, 1],
  [{name: '9:00'}, 1],
  [{name: '9:30'}, 1],
  [{name: '10:00'}, 1],
  [{name: '10:30'}, 1],
  [{name: '11:00'}, 1],
  [{name: '11:30'}, 1],
  [{name: '12:00'}, 1],
  [{name: '12:00'}, 1],
  [{name: '13:00'}, 1],
  [{name: '13:30'}, 1],
  [{name: '14:00'}, 1],
  [{name: '14:30'}, 1],
  [{name: '15:00'}, 1],
  [{name: '15:30'}, 1],
  [{name: '16:00'}, 1],
  [{name: '16:30'}, 1],
  [{name: '17:00'}, 1],
  [{name: '17:30'}, 1],
  [{name: '18:00'}, 1],
  [{name: '18:30'}, 1],
  [{name: '19:00'}, 1],
  [{name: '19:30'}, 1],
  [{name: '20:00'}, 1],
  [{name: '20:30'}, 1],
  [{name: '21:00'}, 1],
  [{name: '21:30'}, 1],
  [{name: '22:00'}, 1],
  [{name: '22:30'}, 1],
];
// 实例化(初始化课表)
var Timetable = new Timetables({
  el: '#coursesTable',
  timetables: courseList,
  week: week,
  timetableType: courseType,
  highlightWeek: day,
  gridOnClick: function (e) {
    alert(e.name + '  ' + e.week +', 第' + e.index + '节课, 课长' + e.length +'节')
    console.log(e)
  },
  styles:{
    Gheight: 35
  }
});

//切换课表
function onChange() {
  var courseListOther = [
    ['','','','','毛概@14208','毛概@14208','','','','选修', '',''],
    ['大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','模拟电子技术基础@16204','模拟电子技术基础@16204','','','','','',''],
    ['','','信号与系统@11302','信号与系统@11302','','','电路、信号与系统实验','电路、信号与系统实验','','','',''],
    ['形势与政策(Ⅳ)@15208','形势与政策(Ⅳ)@15208','','','电装实习@11301','电装实习@11301','','','','大学体育','大学体育',''],
    ['大学体育(Ⅳ)','大学体育(Ⅳ)','','','数据结构与算法分析','数据结构与算法分析','','','信号与系统','信号与系统','',''],
  ];

  Timetable.setOption({
    timetables: courseListOther,
    week: ['一', '二', '三', '四', '五', '六', '日'],
    styles:{
      palette: ['#dedcda', '#ff4081']
    },
    timetableType:courseType,
    gridOnClick: function (e) {
      console.log(e)
    }})
};