// pages/shop/shop.js
const app = getApp();
const db = wx.cloud.database();
Page({
	data: {
		// activeKey: 0,
		selected:false,
		windowHeight: 0,    //高度
		currentTab: 0,	 	//导航栏指向
		cart: [],			//购物车
		cartTotal: 0,		//购物车件数
		cartTotalPrice: 0,   //购物车价格总计
		// shopList: [            // 分类
		// 	{
		// 		id: 0,
		// 		name: '健康食品'
		// 	},
		// 	{
		// 		id: 1,
		// 		name: '女子服饰'
		// 	},
		// 	{
		// 		id: 2,
		// 		name: '男子服饰'
		// 	},
		// 	{
		// 		id: 3,
		// 		name: '室内健身'
		// 	},
		// 	{
		// 		id: 4,
		// 		name: '户外运动'
		// 	}
		// ],
		shop : [],   //所有商品信息
		isActive:true
	},
	//改变当前导航
	changeNav: function (e) {
		var index = e.currentTarget.dataset.currentab
		console.log(index)
		this.setData({
			currentTab: index,
		})
		
	},
	//添加菜品操作
	ordinInCart: function (e) {
		console.log(e);
		this.setData({
			selected:true
		})
		let id = e.currentTarget.dataset.id;
		// let stock = e.currentTarget.dataset.stock;
		console.log(id)
		// if (stock) {
		// 	this.changes(id);
		// } else {		
		// }
	},
	//查看商品详情
	shopDetail(e){
		// console.log(e)
		wx.navigateTo({
			url: '../shopDetail/shopDetail?id='+ e.currentTarget.dataset.id,
		})
	},
	//前往购物车
	gotoCart:function(){
		wx.navigateTo({
			url:'/pages/marketing/myCart/myCart',
		  })
	},
	//改变按钮，购物车操作
	// changes: function (id) {
	// 	var carts = app.globalData.carts;
	// 	for (let key of this.data.shop) {
	// 		key.forEach((item) => {
	// 			if (item.id == id  && item.stock) {
	// 				if (!item.selected) {
	// 					console.log("addsuccess");
	// 					carts.push(item);
	// 					app.globalData.cartTotal++;
	// 					app.globalData.cartTotalPrice += item.price;
	// 					item.selected = true;
	// 					console.log( this.data);
	// 				}else if(item.selected){
	// 					console.log( this.data);
	// 					console.log( this.data.cart);
	// 					app.globalData.carts = carts.filter((cartItem)=>{   //filter返回新数组，所以不能用carts接受，
	// 																		//不然app.globalData.carts不能改变
	// 						console.log(cartItem.id);
	// 					 	return cartItem.id !=id;
	// 					 }); 
	// 					console.log("deletesuccess");
	// 					console.log(carts);
	// 					app.globalData.cartTotal--;
	// 					app.globalData.cartTotalPrice -= item.price;
	// 					item.selected = false;
	// 				}
	// 			}
	// 		});
	// 	}
	
	// 	app.globalData.classifyList.myFruits=this.data.classifyList;
	// 	console.log(app.globalData.carts);
	// 	this.setData({
	// 		cart : app.globalData.carts,
	// 		cartTotal: app.globalData.cartTotal,
	// 		cartTotalPrice : app.globalData.cartTotalPrice,
	// 		classifyList: this.data.classifyList,
	// 	});
	// 	   //将信息加入全局的购物车中
	// 	console.log(app.globalData.carts);
	// },

	onLoad: function (options) {
        wx.cloud.callFunction({
            name:"getShopdata",
            success:res=>{
                this.setData({ 
                  shop:res.result.data
								})
								console.log('成功进入商城页面')
						},
						fail:err=>{
							console.log(err)
						}
          })
		
		wx.getSystemInfo({
			success: (res) => {
				// console.log(res);
			  this.setData({
				windowHeight: res.windowHeight
			  })
			  // console.log(`屏幕高度：${res.windowHeight}`);
			}
		  })
		//   console.log(app.globalData);
		//   this.setData({
		// 	cart : app.globalData.carts,
		// 	cartTotal: app.globalData.cartTotal,
		// 	cartTotalPrice : app.globalData.cartTotalPrice,
		// 	classifyList: app.globalData.classifyList.myFruits,
		//   });
		  
	},

	onShow: function () {
		// 展示的时候刷新全局信息
		this.setData({
			cart : app.globalData.carts,
			cartTotal: app.globalData.cartTotal,
			cartTotalPrice : app.globalData.cartTotalPrice,
			shop: app.globalData.classifyList.myFruits,
		  });
	},



	onPullDownRefresh: function () {

	},
	onReachBottom: function () {

	},
	onShareAppMessage: function () {

	}
})