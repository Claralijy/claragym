// pages/personal/personal.js
const util = require('../../../utils/util.js')
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    notice:'',
    nickName:'',
    avatarUrl:'../../../images/avatar/userLog.png',//账号登录头像
    loginOk:true,
    accountOK:true,
    userInfo:{},
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },



  getuserinfo:function(e){
    app.globalData.userInfo = e.detail.userInfo
    const nickName = e.detail.userInfo.nickName
    const avatarUrl = e.detail.userInfo.avatarUrl

    wx.cloud.callFunction({
      name:'getopenid',
      complete:res=>{
      //调用openid并存入缓存
        const openid = res.result.openid
        wx.setStorageSync('openid', openid)
      //判断数据库中是否存在用户
       db.collection('user').where({
         _openid:openid//_openid 是数据库里的字段名
       }).get().then(res=>{
          // console.log(res)
          if(res.data == ''){ 
            db.collection('user').add({
              data:{
                nickName:nickName,
                avatarUrl:avatarUrl,
                time:util.formatTime(new Date()) //数据写入时间
              }
            }).then(res=>{//写入新用户信息
              console.log('用户信息添加成功！')
            })
            // console.log('数据库无数据')
           }
          else{//不再写入已存在的用户信息
            console.log('数据库存在数据')
          }

       })
      }
    })


    this.setData({
      nickName:nickName,
      avatarUrl:avatarUrl
    })
  },


  onLoad: function (options) {
    console.log("当前缓存的用户信息",options)
  // let userInfo = wx.getStorageSync('userInfo')
  // if(userInfo){
  //   this.setData({
  //     userInfo:JSON.parse(userInfo)
  //   })
  // }
   this.setData({
      nickName:options.nickName,
      avatarUrl:options.avatarUrl
   })
    db.collection('notice').get({ //信息
      success:res=>{
        // console.log(res.data)
        this.setData({
          notice:res.data[0].content
        })
      }
    })
  },

  onShow(){ 
    //小程序生命周期的可见性函数里面来控制显示
    let userInfo = wx.getStorageSync('userInfo')
    let accountInfo = wx.getStorageSync('accountInfo')
    // console.log("微信登录缓存信息userINfo",userInfo)
    // console.log("我的缓存信息accountINfo",accountInfo)
    if(userInfo){
      this.setData({
        loginOk:true,
        nickName:userInfo.nickName, //从缓存中拿数据
        avatarUrl:userInfo.avatarUrl
      })
    }else if(accountInfo){
       this.setData({
        accountOK:true,
        nickName: accountInfo
      })
    }
    else{
      this.setData({
        loginOk:false,accountInfo,
        accountOK:false
      })
    }
  },

  //点击登录
  load(){
    wx.reLaunch({
      url: '../login/login',
    })
  },
  //退出登录
  exit(){
    wx.showModal({
      content:"是否确定退出？"
    })
    .then(res=>{
      if(res.confirm){
        console.log("用户点击确认退出")
        this.setData({
          loginOk:false
        })
        //清空登录缓存
        wx.setStorageSync('userInfo', null)
      }else if(res.cancel){
        console.log("用户点击了取消")
      }
    })
  },
  //我的预约
  myBooking(){
    wx.navigateTo({
      url: '../myBooking/myBooking',
    })
  },
  //我的订单
  orderlist(){
    wx.navigateTo({
      url: '../../marketing/order-list/order-list',
    })
  },
  //购物车
  cartlist(){
    wx.navigateTo({
      url: '../../mine/cart/cart',
    })
  },
  //每日打卡
  punched(){
    wx.navigateTo({
      url: '../punched/punched',
    })
  },
  // 联系客服
  // makephone(){
  //   wx.makePhoneCall({
  //     phoneNumber: '12345',
  //   })
   
  // },






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