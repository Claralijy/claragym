
const app = getApp();
const db = wx.cloud.database();//获取云数据库引用
Page({
  data: {
    account:[],
    password:[],
  },
  getAccount(e){ 
    this.setData({
      account:e.detail.value
    })
  },
  getPwd(e) {
    this.setData({
      password:e.detail.value
    })
  },
  coachLogin(e){ // 登录
      let account = this.data.account
      wx.setStorageSync('coachInfo', account)
      const coachCollection = db.collection('coach');
      let flag = false //表示账户是否存在，false为初始值
      // console.log(this.data.account)
      if(this.data.account == '' || this.data.password == ''){ // 账号密码为空时弹出提示
        wx.showToast({
          title: '账号或密码为空！',
          icon: 'none',
          duration:2000
        })
      }else{
        coachCollection.get({
          success:res=>{
            let user = res.data
            console.log(user)
            for(let i = 0; i < user.length; i++){ //遍历数据库对象集合
              if(this.data.account === user[i].account){ //数据库教练端的账号字段是account，用户端是username
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
                  wx.navigateTo({ //登录成功后跳转页面
                    url: '../coach/coach',
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
  onLoad: function (options) {

  },




  onShow: function () {

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