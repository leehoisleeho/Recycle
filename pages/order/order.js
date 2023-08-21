import api  from "../../API/api";
Page({
  /**
   * tabsIndex tabs的索引
   * orderList 请求到订单的数据
   * isEmpty orderList为空的时候显示的空状态
   * isShow 加载页面时候的显示或者隐藏页面
   * defaultIndex 默认选项
   */
  data:{
    orderList : [],
    isEmpty:null,
    isShow:false,
    tabsIndex:0,
    defaultIndex:0
  },
  onShow() {
    this.setData({
      isShow:false
    })
    this.getPageDate(this.data.tabsIndex)
  },
  /**
   * 方法
   * onTabsClick 切换顶部导航栏触发的函数
   * toDetails 去订单详情页
   * formatTimestamp 时间戳 转成 时间
   * padZero 补零
   * getPageDate 获取订单数据
   */
  onTabsClick(event) {
    this.setData({
      isShow:false
    })
    /**
     * index = 0 全部订单
     * index = 1 待接单
     * index = 2 上门中
     * index = 3 已取消
     * index = 4 已完成
     */
    let index = Number(event.detail.value)
    this.setData({
      tabsIndex:index
    })
    this.getPageDate(index)
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
