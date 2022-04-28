// miniprogram/pages/detailPage.js
const app = getApp();//获取全局实例
const db = wx.cloud.database();
let artiCollection = db.collection('articleList')
const _ = db.command
Page({

  data: {
    zan:false,
    articleList:[],
    comlength:0,
    disabled:true,
    like:''
  },
  like:function(e){
    console.log(e)
    artiCollection.where({
        _id:e.id
    }).update({
      data:{
        like:_.inc(1)//自增1
      }
    })
    .then(res=>{
      console.log(res)
    })
    console.log(this.data.zan)
    this.setData({
      zan:!this.data.zan,
      like:this.data.like + 1 //所加的值传递给视图层
    })
  },
  onLoad: function (options) {
    artiCollection.doc(options.id).get({
      success:res=>{
        const detail = res.data
        console.log(detail)
        this.setData({
          title:detail.title,
          nickname:detail.nickname,
          time:detail.time,
          image:detail.image,
          tag:res.data.tag,
          contents:detail.contents,
          like:detail.like,
          view:detail.view
        })
      }
    })
    artiCollection.where({
      _id:options.id
    }).update({
      data:{
        view:_.inc(1)//自增1
      }
    })
    .then(res=>{
      console.log(res)
    })
  },


  //文章发表
  comment_submit(e){
    console.log(e)
  },
  //文章转发
  onShareAppMessage(){
    
  }
})