Page({
  data: {
    text: 'Copyright © 浩辰科技开发',
  },
  onLoad(options) {

  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  /* 方法 
    toFeedback 去到Feedback页面
    toAddressList 去到我的地址列表
    toOrderList 去到订单页面
    makePhoneCall 点击拨打电话
    showDevelopment 提示开发中
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
  makePhoneCall(){
    wx.makePhoneCall({
      phoneNumber: '18608735101', // 替换为要拨打的电话号码
    });
  },
  showDevelopment(){
    wx.showToast({
      title: '开发中敬请期待',
      icon:"none"
    })
  }
});