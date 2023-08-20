// pages/staffIndex/staffIndex.js
import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
import api from '../../API/api'
Page({
  /**
   * 页面的初始数据
   * status假设的订单状态
   * isShow加载页面时 隐藏页面
   * isEmpty数据为空显示
   * transferVisible 转单选择器
   * workers可选员工
   */
  data: {
    orderList: [],
    isShow: true,
    status: 2,
    isEmpty: true,
    transferVisible:false,
    workers:[
      { label: '李建国', value: '李建国' },
      { label: '张建国', value: '张建国' },
      { label: '马建国', value: '马建国' },
      { label: '王建国', value: '王建国' },
    ]
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['active'], // 数据 this.data.avtive,
      actions: ["setactive"], // 操作数据的方法 this.setactive()
    });
    this.setactive(0)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getOrderList(0)
  },

  /** 方法
   * onTabsChange 切换tab的回调
   * getOrderList 获取订单数据
   * toStaffOrderDetails 
   * takeOrder 接受订单
   * onSeasonPicker 转单选择器
   * onPickerCancel 取消选择器
   * onConfirm 确认选择
   */
  onTabsChange(event) {
    let index = Number(event.detail.value)
    this.getOrderList(index)
  },
  async getOrderList(index) {
    let data = await api.staffOrderList(
      {
        status:index
      }
    )
    let orderList = data.data.data.data
    this.setData({
      orderList
    })
    const len = this.data.orderList.length
    if (len === 0) {
      this.setData({
        isEmpty: true
      })
    } else {
      this.setData({
        isEmpty: false
      })
    }
  },
  toStaffOrderDetails(e) {
    wx.navigateTo({
      url: '/pages/staffOrderDetails/staffOrderDetails?id=' + e.currentTarget.dataset.orderid
    })
  },
  takeOrder(e){
    api.takeOrder({
      order_id:e.currentTarget.dataset.orderid
    }).then(res=>{
      this.getOrderList(0)
    })
  },
  onSeasonPicker(){
    this.setData({
      transferVisible:true
    })
  },
  onPickerCancel(){
    this.setData({
      transferVisible:false
    })
  },
  onConfirm(){
    this.setData({
      transferVisible:false
    })
  }
})