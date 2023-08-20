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
   */
  data: {
    orderList: [],
    isShow: true,
    status: 2,
    isEmpty: true
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getOrderList(0)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /** 方法
   * onTabsChange 切换tab的回调
   * getOrderList 获取订单数据
   * toStaffOrderDetails
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
  }
})