//app.js
App({
  globalData: {
    // bookingName:'',
    // phone:'',
    openid:null,
    userInfo:{},
    account:[],
    shopInfo:null,
    classifyList: {},  //商品列表
    cart: [],       //购物车信息
    cartTotal: 0,     //购物车数量
    cartTotalPrice: 0,  //购物车价值
    cartAllIn: false,   //购物车是否全选
    // userInfo: wx.getStorageSync('userInfo')
  },
  onLaunch: function() {
    wx.cloud.init({  //云开发小程序端初始化
      // env: 'wx.cloud.DYNAMIC_CURRENT_ENV',
      env:'cloud1-6gokbkto6720cfce',
      traceUser:'true'
    })
  
   
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    // // 获取系统状态栏信息
    // wx.getSystemInfo({
    //   success: e => {
    //     this.globalData.StatusBar = e.statusBarHeight;
    //     let capsule = wx.getMenuButtonBoundingClientRect();
    //     if (capsule) {
    //      	this.globalData.Custom = capsule;
    //     	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
    //     } else {
    //     	this.globalData.CustomBar = e.statusBarHeight + 50;
    //     }
    //   }
    // })
  },
 
})