// pages/marketing/shopDetail/shopDetail.js
const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
    shop:[]
  },

  onLoad: function (options) {
    console.log('当前进入商品详情页')
    db.collection('shop')
    .doc(options.id)
    .get()
    .then(res=> {
      // console.log(res)
      this.setData({
        shop:res.data
      })
    })
    .catch(err=>{
      console.log(err)
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