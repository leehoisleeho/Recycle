import Toast from 'tdesign-miniprogram/toast/index';
import api from '../../API/api'
Page({
  data: {
    visible: false,
    closeBtn: true,
    index: 0,
    details: null,
    dialogKey: '',
    showWithInput: true,
    showTextAndTitleWithInput: false,
    order_id:null,
    reason:''
  },
  onLoad(options) {
    let order_id = Number(options.id)
    this.setData({
      order_id
    })
    api.getOrderDetails({
      order_id
    }).then(res => {
      console.log(res)
      res.data.data.createtime = this.formatTimestamp(res.data.data.createtime)
      let str = res.data.data.image
      if (str !== '') {
        let imgList = str.split(',')
        res.data.data.image = imgList
      }
      this.setData({
        details: res.data.data
      })
    })
  },
  showSuccessToast() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: `请点击左上角关闭按钮`,
    });
  },
  onClick() {
    this.setData({
      showIndex: true,
      visible: true,
    });
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
  onClose(e) {
    const {
      trigger
    } = e.detail;
    if (trigger == "overlay") {
      this.showSuccessToast()
    } else if (trigger == "button") {
      this.setData({
        visible: false,
      });
    }
  },
  onChange(e) {
    this.setData({
      index: e.detail.index
    })
  },
  showDialog() {
    this.setData({ showTextAndTitleWithInput:true });
  },
  // 取消 取消订单 😂
  async closeDialog() {
    this.setData({ showTextAndTitleWithInput:false });
  },
  async onConfirm(){
    // 取消订单
    const res = await api.cancelOrder({
      reason:this.data.reason,
      order_id:this.data.order_id
    })
    this.setData({ showTextAndTitleWithInput:false});
    console.log(this.data.reason)
    wx.navigateBack()
  },
  // 监听input数据变化
  InputChange(e){
    this.setData({
      reason:e.detail.value
    })
  },
  // 拨打电话
  call(e){
    let phoneNumber = e.currentTarget.dataset.mobile
    wx.makePhoneCall({
      phoneNumber: phoneNumber, 
    });
  }
});