// pages/mine/myBooking/myBooking.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  data: {
    id:''
  },

  onLoad: function (options) {//desc升序排序，asc降序排序
     db.collection('orderCenter').orderBy('currentTime','desc').get({
      success:res=>{
        console.log(res.data)
        this.setData({
          orderCenter:res.data,
          id:options.id
        })
      }
    })
  },
  //取消预约，从数据库中删除数据
  cancelTap(e){
    var that = this
    wx.showModal({
      title:'确定要取消预约吗？',
      success(res){
        if(res.confirm){
          console.log(e)
          db.collection('orderCenter').doc(that.data.id).remove({
            success:res=>{
              that.setData({
                orderCenter:res.data
              })
              console.log(res.data)
            }
          })
        }else if(res.cancel){}
      }
      
    })
    
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})