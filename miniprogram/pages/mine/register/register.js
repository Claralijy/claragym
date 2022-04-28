const db = wx.cloud.database();//获取云数据库引用
Page({
  data: {
    account:[]
  },
  getAccount(e){
    this.setData({//获取用户输入的用户名
      account:e.detail.value 
    })
  },
  getPwd(e){
    this.setData({
      password: e.detail.value  //获取用户输入的密码
    })
  },
  navLog(e){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  regClick:function(e){
   const userCollection = db.collection('user')
   let flag = false //表示账户是否存在，false为初始值
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
            break
          }
        }     
        if(flag === true){ //账户已存在
          wx.showToast({
            title: '账号已注册！',
            icon:'none',
            duration:2000
          })
        }else{ //账户未注册时---注册功能
          userCollection.add({
              data:{
                username: this.data.account,
                password: this.data.password
              }
          })
          wx.showToast({ //显示注册成功信息
            title: '注册成功！',
            icon:'none',
            duration:2000
          })
          wx.navigateTo({
            url: '../login/login',//注册后跳转到登录页面
          })
        }
      }
    })
    }      
  }     


})