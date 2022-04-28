// pages/search/search.js
const db = wx.cloud.database();//初始化数据库
Page({
  data: {
  },
  onLoad: function (options) {
  },
  searchOnChange(e){  //搜索框
    this.setData({
      value:e.detail
    })
  },
  onClick(e){ //触发显示前端搜索框内容
    let key = this.data.value
    if(key !== ''){
      db.collection("articleList").where({
          title:{
           $regex:'.*'+ key, //模糊搜索
           $options:'i' //不区分大小写
          }
      }).get({
        success:res=>{
          console.log(res)
          this.setData({
            articleList:res.data
          })
        }
      })
    }else{
      wx.showToast({
        title: '请输入内容！',
        icon:'none',
      })
      
      // wx.showToast({
      //   title: that.data.value,
      //   icon:'none',
      // })
    }
  },
  artiDetail(e){
    wx.navigateTo({
      url: '../articleDetail/articleDetail?id='+e.currentTarget.dataset.id,
    })
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