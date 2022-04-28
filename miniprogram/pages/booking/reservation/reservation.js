// pages/reservation/reservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseInfoList:[],
    dayList:[],//存放日期的数组
    nowDate:'', //系统当前日期

  },
 // 格式化日期，时间
 formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
},
// 格式化数字
formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
},

// 获取日期详情
getDateInfo(ts) {
  const date = new Date(ts);
  const weekArr = new Array("日", "一", "二", "三", "四", "五", "六");
  const week = date.getDay();
  let dateString = this.formatTime(date);
  let shortDateString = dateString.replace(/\//g, '-').substring(5, 10).replace(/-/g, '月') + "日";
  if (date.getDate() < 10) {
    shortDateString = shortDateString.replace(/0/g, '');
  }
  return {
    shortDateString,
    dateString,
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: weekArr[week]
  }
},
 // 初始化日期
 initData() {
  const nowDateTime = +new Date();
  let dateList = [];
  for (let i = -30; i < 30; i++) {
    let obj = this.getDateInfo(nowDateTime + i * 24 * 60 * 60 * 1000);
    obj.isChoose = i == 0;
    dateList.push(obj);
  }
  this.setData({
    dateList,
    clickIndex: 30,
    scrollLeftIndex: 30
    
  });
},
// 点击日期方法
clickDate(e) {
  var that = this;
  // console.log('点击日期携带的下标：', e.currentTarget.dataset.index);  //当前的点击的日期
  var index = e.currentTarget.dataset.index;
  that.setData({
    clickIndex: index
  });
  console.log(e)
  
  // console.log(that.data.scrollLeftIndex);
  // console.log('当前点击日期：',that.data.dateList[index].shortDateString);   //当前点击的日期
  // console.log(e)

},

  onLoad: function (options) {
    var that = this;
    var myDate = new Date(); //获取系统当前时间
    var sysmonth = myDate.getMonth() + 1
    var nowDate = myDate.getDate();   //当前是本月几日
    var today = myDate.toLocaleDateString();  //今日年月日
    that.setData({
      nowDate: nowDate,
      sysmonth: sysmonth
    }),
    // console.log('系统日期：',myDate);
    // console.log('系统日期（年/月/日）：',today);
    // console.log('系统日期（月）：', sysmonth);
    // console.log('系统日期（日）：', nowDate);
 
    
    wx.getSystemInfo({// 获取屏幕宽度，设置每个日期宽度
      success: (res) => {
        this.setData({
          windowWidth: res.windowWidth,
          itemWidth: parseInt(res.windowWidth / 7)
        });
      },
    })
    this.initData();
    wx.cloud.callFunction({
      name:"getcourseInfo",
      complete:res=>{
          this.setData({ // 动态设置获取数据库图片
            courseInfoList:res.result.data
          })
      }
    })

    },
    //跳转到教练详情页
    coachDeatil(e){
      // console.log(e)
      wx.navigateTo({
        url: '../coachInfo/coachInfo?id='+e.currentTarget.dataset.id,
      })
    },








  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})