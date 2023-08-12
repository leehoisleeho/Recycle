// index.js
const imageCdn = "http://recycleapi.haochentech.ltd";
import api from "../../API/api";
Page({
  data: {
    importantNotice: "",
    current: 0,
    autoplay: false,
    duration: 500,
    interval: 5000,
    swiperList:null,
    visible: true,
    marquee1: {
      speed: 80,
      loop: -1,
      delay: 0,
    },
    marquee2: {
      speed: 60,
      loop: -1,
      delay: 0,
    },
    categoryList:null,
    isIndex:false
  },
  onLoad() {
    this.getPageData()
  },
  // 获取页面所有数据 
  async getPageData() {
    // 获取重要通知接口
    let importantNotice = await api.getImportantNotice()
    // 获取首页轮播图接口
    let swiperList = await api.getSwiperList()
    // 获取列表品类列表接口
    let categoryList = await api.getCategoryList()
    console.log(categoryList.data.data)
    // 循环列表 设置录播图
    let list = swiperList.data.data
    let SwiperList = []
    list.forEach(item=>{
      SwiperList.push(`${imageCdn}`+ item.images)
    })
    this.setData({
      isIndex:true,
      importantNotice:importantNotice.data.data.notice,
      categoryList:categoryList.data.data,
      swiperList:SwiperList
    })
  },

  toRecyclingFrom(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../recyclingForm/recyclingForm?id="+id,
      
    });
  },
  // 点击轮播图
  onTap(e) {},
  // 滑动轮播图
  onChange(e) {},
});
