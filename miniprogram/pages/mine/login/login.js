// pages/login/login.js
const app = getApp();
const db = wx.cloud.database();//获取云数据库引用
Page({

  data: {
    account:[],
    password:[],
    accountOK:true,
  },
  getAccount(e){ //账号数据存入data
    this.setData({
      account:e.detail.value
    })
  },
  getPwd(e) {//密码数据存入data
    this.setData({
      password:e.detail.value
      // pwd: e.detail.value.replace(/\s+/g, "")
    })
  },
  navReg(e){
    wx.navigateTo({
      url:'../register/register'
    })
  },

  wechatLogin(){//微信授权登录
    wx.getUserProfile({ //该函数--使微信授权登录获取用户信息
      desc: '用户信息',
    })
    .then(res=>{
      // console.log("用户允许微信授权登录", res.userInfo)
      wx.reLaunch({ //该函数--携带用户登录头像和名字跳转到tab页面。此时不能用wx.switchtab--因为不支持传参
        url: '../../mine/personal/personal?nickName=' +res.userInfo.nickName+ '&avatarUrl=' + res.userInfo.avatarUrl,
      })
      wx.setStorageSync('userInfo', res.userInfo) //保存用户登录信息到缓存（同步缓存）
    })
    .catch(err=>{
      console.log("用户拒绝微信授权登录",err)
    })

  }, 
  accountLogin:function(e){  // 登录
    let account = this.data.account
    wx.setStorageSync('accountInfo', account)
    const userCollection = db.collection('user');
    let flag = false //表示账户是否存在，false为初始值
    // console.log(this.data.account)
    if(this.data.account == '' || this.data.password == ''){ // 账号密码为空时弹出提示
      wx.showToast({
        title: '账号或密码为空！',
        icon: 'none',
        duration:2000
      })
    }else{
      userCollection.get({
        success:res=>{
          let user = res.data
          console.log(user)
          for(let i = 0; i < user.length; i++){ //遍历数据库对象集合
            if(this.data.account === user[i].username){ //账号已存在
              flag = true;
              if(this.data.password !== user[i].password){ //判断密码正确与否
                wx.showToast({ //显示密码错误信息
                  title: '密码错误，请重新输入！',
                  icon:'none',
                  duration:2000
                })
                break
              }else{
                wx.showToast({ //显示登录成功信息
                  title: '登录成功！',
                  icon:'none',
                  duration:2000
                })
                flag = true;     
                wx.reLaunch({ //登录成功后跳转页面
                  url: '../personal/personal',
                }) 
                break
              }
            }
          } 
          if(flag == false){ //遍历完数据后发现没有该账户
            wx.showToast({
              title: '该用户不存在！',
              icon:'none',
              duration:2000
            })
          }
        },
        })
      }
    },      

//教练端登录
  coach(){
      wx.showModal({
        title:'教练端入口',
        confirmText:'登录',
        success:res=>{
          if(res.confirm){
            wx.navigateTo({
            url: '../../coach-box/coach-login/coach-login',
          })
          }
        },
        
        
      })
  
  
    
    
  },
  onLoad: function (options) {
   
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