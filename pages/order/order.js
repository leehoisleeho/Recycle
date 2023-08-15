import api  from "../../API/api";
Page({
  data:{
    orderList : [],
    isEmpty:null,
    isShow:false,
  },
  onShow() {
    this.setData({
      isShow:false
    })
    this.getPageDate(0)
  },
  /**
   * 
   * onTabsClick 切换顶部导航栏触发的函数
   * toDetails 去订单详情页
   * formatTimestamp 时间戳 转成 时间
   * padZero 补零
   * getPageDate 获取订单数据
   * 
   */
  onTabsClick(event) {
    this.setData({
      isShow:false
    })
    let index = Number(event.detail.value)
    console.log(event.detail.label)
    console.log("index=" + event.detail.value)
    if(index===0){
      // 全部
      this.getPageDate(index)
    }else if(index===1){
      // 上门
      this.getPageDate(index)
    }else if(index===2){
      // 取消
      this.getPageDate(index)
    }else if(index===3){
      // 完成
      this.getPageDate(index)
    }
  },
  toDetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../orderDetails/orderDetails?id="+id,
    });
  },
  padZero(num) {
    return num < 10 ? '0' + num : num;
  },
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
  async getPageDate(index){
    let orderList = await api.getOrderList({
      status:index
    })
    orderList = orderList.data.data.data.reverse()
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
