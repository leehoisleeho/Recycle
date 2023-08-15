import getuserInfo from '../../API/getuserInfo'
Page({
  data: {
    text: 'Copyright © 浩辰科技开发',
    userId:''
  },
  onLoad(options) {
    this.getPageData()
  },
  onReady() {
    
  },
  onShow() {
    
  },
  onHide() {

  },
  onUnload() {

  },
  /** 方法
   * toFeedback 去到Feedback页面
   * toAddressList 去到我的地址列表
   * toOrderList 去到订单页面
   * makePhoneCall 点击拨打电话
   * showDevelopment 提示开发中
   * getPageData 获取页面所属数据
   * toAbout 去关于们页面
   * toRecruit 去招募合伙人页面
  */ 
  toFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  toAddressList(){
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    })
  },
  toOrderList(){
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
  toAbout(){
    wx.navigateTo({
      url: '/pages/about/about?id=1',
    })
  },
  toRecruit(){
    wx.navigateTo({
      url: '/pages/recruit/recruit?id=3',
    })
  },
  makePhoneCall(){
    wx.makePhoneCall({
      phoneNumber: '15687308999', // 替换为要拨打的电话号码
    });
  },
  showDevelopment(){
    wx.showToast({
      title: '开发中敬请期待',
      icon:"none"
    })
  },
  getPageData(){
    getuserInfo().then(res=>{
      this.setData({
        userId:res.data.data.userinfo.id
      })
    })
  },
});