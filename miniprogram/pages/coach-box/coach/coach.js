const app = getApp();
const db = wx.cloud.database();//获取云数据库引用
const userCollection = db.collection('user')
// pages/coach/coach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("123")
    userCollection.get({
      success:res=>{
        this.setData({
          accountList:res.data
        })
        
        console.log(res)
      }
    })
    // wx.getStorageInfoSync('account')
    // console.log(app.globalData)
    // this.setData({
    //   account:app.globalData.account
    // })
  },




  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})