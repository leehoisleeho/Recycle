// pages/staffIndex/staffIndex.js
import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
import api from '../../API/api'
import {
  TimestampToTime
} from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   * status假设的订单状态
   * isShow加载页面时 隐藏页面
   * isEmpty数据为空显示
   * transferVisible 转单选择器
   * workers可选员工
   * ordreId 订单id
   * tabIndex 订单的index
   */
  data: {
    orderList: [],
    isShow: true,
    status: 2,
    isEmpty: true,
    transferVisible: false,
    workers: [],
    ordreId: '',
    tabIndex: 0
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['active'], // 数据 this.data.avtive,
      actions: ["setactive"], // 操作数据的方法 this.setactive()
    });
    this.setactive(this.data.tabIndex)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getOrderList(this.data.tabIndex)
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
    this.setData({
      tabIndex: index
    })
    this.getOrderList(this.data.tabIndex)
  },
  async getOrderList(index) {
    let data = await api.staffOrderList({
      status: index
    })
    let orderList = data.data.data.data
    orderList.forEach( item => {
       item.createtime = TimestampToTime(item.createtime)
    })
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
  takeOrder(e) {
    api.takeOrder({
      order_id: e.currentTarget.dataset.orderid
    }).then(res => {
      this.getOrderList(this.data.tabIndex)
    })
  },
  onSeasonPicker(e) {
    this.setData({
      transferVisible: true
    })
    
    this.setData({
      ordreId: e.currentTarget.dataset.orderid,
    })
    api.getStaffList().then(res => {
      let data = res.data.data
      let me = wx.getStorageSync('workerInfo')
      let arr = []
      data.forEach(item => {
        if (item.id === me.id) return
        arr.push({
          label: item.name,
          value: item.id
        })
      });
      this.setData({
        workers: arr
      })
    })
  },
  onPickerCancel() {
    this.setData({
      transferVisible: false
    })
  },
  onConfirm(e) {
    let id = e.detail.value[0]
    api.transferOrder({
      order_id: this.data.ordreId,
      to_id: id
    }).then(res => {
      this.getOrderList(this.data.tabIndex)
      this.setData({
        transferVisible: false
      })
    })

  }
})