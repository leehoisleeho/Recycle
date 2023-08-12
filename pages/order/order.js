import api  from "../../API/api";
const app = getApp()
Page({
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },

  toDetails() {
    wx.navigateTo({
      url: "../orderDetails/orderDetails",
    });
  },
  data:{
    orderList : [],
    isEmpty:null,
    isShow:false
  },
  onShow() {
    this.setData({
      isShow:false
    })
    if (app.globalData.isLoading) {
      wx.showToast({
        title: '请等待数据加载完成',
        icon: 'none'
      });
      // 阻止切换 Tab
      wx.switchTab({
        url: '/pages/当前Tab页面的路径'
      });
    }
    this.getPageDate()
  },
  // 获取页面数据
  async getPageDate(){
    let orderList = await api.getOrderList()
    orderList = orderList.data.data.data
    if(orderList.length == 0 ){
      this.setData({
        orderList,
        isEmpty:true,
        isShow:true
      })
    }else{
      this.setData({
        orderList,
        isEmpty:false,
        isShow:true
      })
    }
  }
});
