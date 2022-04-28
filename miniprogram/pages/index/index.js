// pages/course/course.js
var times = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database()
wx.cloud.init({
  env:'cloud1-6gokbkto6720cfce',
  traceUser:true
})
Page({
  data: {
    src:'',
    avatar:'',
    value:'',
    TabCur:0,
    swiperList: [],
    bannerList:[],
    articleList:[],
    courseList:[],
    article:[]
  },
  //搜索页面跳转
  searchArti(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  searchOnChange(e){  //搜索框
    wx.navigateTo({
      url: '../search/search',
    })
    this.setData({
      value:e.detail
    })
  },
  onClick(e){ //触发显示前端搜索框内容
    if(this.data.value == ''){
      wx.showToast({
        title: '请输入内容！',
        icon:'none',
      })
    }
    else{
      wx.showToast({
        title: this.data.value,
        icon:'none',
      })
    }
  },
 
  onChange(e){
    this.setData({
      TabCur:e.detail.index
    })
    // console.log(this.data.TabCur)
  },
 //小程序初始时显示数据
  onLoad: function (options) {
    console.log('当前进入首页')
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: (res) => {
        var usid = res.result.openid
        console.log(usid)
        this.setData({
          openid: res.result.openid,
        })
        getApp().globalData.openid = res.result.openid
        db.collection("user").where({ openid: res.result.openid }).get().then(res => {
          console.log(res.data)
          this.setData({
            userInfo: res.data
          })
          wx.setStorageSync('userinfo', res.data)
        })
        wx.setStorageSync('openid', res.result.openid)
      },
    })
    this.getBanner()
    this.getArticle()
    this.getCourse()
  },
  //获取数据库中的轮播图
  getBanner(){
    db.collection("banner").get({
      success:res=>{
        this.setData({
          swiperList:res.data
        })
      }
    })
  },
  //获取热门文章列表
  getArticle(){
     db.collection("articleList").get({
      success:res=>{
        // console.log(res.data.length)
        // for(let i=0; i < res.data.length;i++){
        //   // console.log(res.data[i]["_createTime"])
        //   res.data[i]["_createTime"] = times.toDate(res.data[i]["_createTime"])
        // }
        this.setData({
          articleList:res.data
        })
      }
    })
  },
  //获取课程视频列表
    getCourse(){
      db.collection("courseList").get({
      success:res=>{
        this.setData({
          courseList:res.data
        })
      }
    })
    },

    onShow(){
      this.getArticle()
      var userinfo = wx.getStorageSync('userInfo')
      let accountinfo = wx.getStorageSync('accountInfo')
       if(userinfo == '' && accountinfo == '')
       wx.showModal({
         title:'请登录账号！',
         cancelText:'注册',
         confirmText:'登录',
         success(res){
           if(res.cancel){
             wx.navigateTo({
               url: '../mine/register/register',
             })
           }else if(res.confirm){
             wx.navigateTo({
               url: '../mine/login/login',
             })
           }
         }
       })
    },
    artiDetail(e){
      wx.navigateTo({
        url: '../articleDetail/articleDetail?id='+e.currentTarget.dataset.id,
      })
    },
    // 视频课程
    videoErrorCallback: function(e) {
      console.log('视频错误信息:')
      console.log(e.detail.errMsg)
    },




 
  onPullDownRefresh: function () {

  },
  onShareAppMessage: function () {

  }
})