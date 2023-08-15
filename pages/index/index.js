// index.js
const imageCdn = "https://recycleapi.hellochange.online";
import api from "../../API/api";
Page({
  data: {
    /**
     * categoryList 回收品类数组列表
     * isIndex 加载时 隐藏页面
     * 
    */
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
  onShow(){
    this.getPageData()
  },

  /**方法
   * getPageData 获取页面加载所需数据
   * toRecyclingFrom 去预约订单页面
   * onTap 点击轮播图触发
   * onChange 滑动轮播图触发
   * makePhoneCall 拨打电话
   * allTypeForm去一键下单
   */
  // 获取页面所有数据 
  async getPageData() {
    // 获取重要通知接口
    let importantNotice = await api.getImportantNotice()
    // 获取首页轮播图接口
    let swiperList = await api.getSwiperList()
    // 获取列表品类列表接口
    let categoryList = await api.getCategoryList()
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
  allTypeForm(){
    wx.navigateTo({
      url: "/pages/allTypeForm/allTypeForm"
    });
  },
  // 点击轮播图
  onTap(e) {},
  // 滑动轮播图
  onChange(e) {},
  makePhoneCall(){
    wx.makePhoneCall({
      phoneNumber: '15687308999', // 替换为要拨打的电话号码
    });
  },
});
