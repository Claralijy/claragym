// pages/reservation/coachInfo/coachInfo.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    bookingName:'',
    phone:'',
    tip:''
  },

  onLoad: function (options) {
    db.collection('reservation')
    .doc(options.id)
    .get()
    .then(res=> {
      console.log('成功进入教练预约页面')
      this.setData({
        // reservation:res.data,
        title:res.data.title,
        time:res.data.bookingTime,
        coachName:res.data.coachName,
        courseType:res.data.type,
        coursePrice:res.data.price,
        tag:res.data.tag
      })
    })
  },
  //会员姓名
  onBookingName(e){
    let bookingName = e.detail
    this.setData({
      bookingName
    })
  },
  //联系电话
  onPhone(e){
    let phone = e.detail
    this.setData({
      phone
    })
  },
  //备注
  onTip(e){
    let tip = e.detail
    this.setData({
      tip
    })
  },
  myBooking(e){
    let bookingName = this.data.bookingName
    let phone = this.data.phone
    let title = this.data.title
    let time = this.data.time
    let coachName = this.data.coachName
    let courseType = this.data.courseType
    let coursePrice = this.data.coursePrice
    let tag = this.data.tag
    let tip = this.data.tip
    // console.log(time)
    console.log(coachName)
    // console.log(coursePrice)
    // console.log(tag)
    // console.log(tip)
    wx.showModal({
      title:'是否确认提交？',
      success(res){
        console.log(res)
        if(res.confirm){
          db.collection('orderCenter').add({
            data:{
              username:bookingName,
              userphone:phone,
              currentTime:db.serverDate(), //小程序官方提供的wx.cloud.database().serverDate()作为时间戳
              title,
              time:time,
              coachName:coachName,
              courseType:courseType,
              coursePrice:coursePrice,
              tag:tag,
              tip:tip
            },
            success:function(res){
              console.log(res)
            }
          })
          wx.navigateTo({
            url: '../../mine/myBooking/myBooking'
          })
        }else if(res.cancel){}
      }
    })
  },
  

  onShow: function () {

  },

  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})