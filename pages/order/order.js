import api  from "../../API/api";

Page({
  //点击
  onTabsClick(event) {
    let index = Number(event.detail.value)
    if(index===0){
      // 全部
      this.getPageDate()
    }else if(index===1){
      // 上门
      this.getPageDate("0")
    }else if(index===2){
      // 完成
      
    }else if(index===3){
      // 取消
      
    }
  },
  toDetails() {
    wx.navigateTo({
      url: "../orderDetails/orderDetails",
    });
  },
  data:{
    orderList : [],
    isEmpty:null,
    isShow:false,
  },
  // 补零函数
  padZero(num) {
    return num < 10 ? '0' + num : num;
  },
  // 时间戳转换
  formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // 转换为毫秒
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); // 月份从0开始，所以需要+1
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  onShow() {
    this.setData({
      isShow:false
    })
    this.getPageDate()
  },
  // 获取页面数据
  async getPageDate(){
    let orderList = await api.getOrderList({
      
    })
    orderList = orderList.data.data.data
    console.log(orderList)
    if(orderList.length == 0 ){
      this.setData({
        orderList,
        isEmpty:true,
        isShow:true
      })
    }else{
      orderList.map(item=>{
        const formattedTime = this.formatTimestamp(item.createtime)
        item.createtime = formattedTime
      })
      this.setData({
        orderList,
        isEmpty:false,
        isShow:true
      })
    }
  }
});
