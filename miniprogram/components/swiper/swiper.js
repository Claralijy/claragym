
// components/swiper/swiper.js
Component({
  options:{
    addGlobalClass:true,
  },
  properties: {
      swiperList:Array
  },
  data: {
    cardCur: 0, 
 
  },
  methods: {
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
   
  }
})



