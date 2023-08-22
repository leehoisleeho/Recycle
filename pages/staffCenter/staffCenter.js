// pages/staffCenter/staffCenter.js
import api from '../../API/api'
import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workerInfo: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['active'], // 数据 this.data.avtive
      actions: ["setactive"], // 操作数据的方法 this.setactive()
    });
    this.setactive(1)
    
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
    let workerInfo = wx.getStorageSync("workerInfo")
    api.staffLogin({
      username: workerInfo.mobile,
      password: workerInfo.password
    }).then(res => {
      let workerInfo = res.data.data
      wx.setStorageSync('workerInfo', workerInfo)
      this.setData({
        workerInfo
      })
    })
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
  /**
   * toAskForLeave 去请假页面 
   * showDevelop提示开发中
   * toMyOrder 去我的订单页面
   */
  showDevelop() {
    wx.showToast({
      title: '开发中',
      icon: 'error'
    })
  },
  toAskForLeave() {
    if (this.data.workerInfo.is_leave === 2) {
      wx.showToast({
        title: '你已经在请假了',
        icon: 'error'
      })
    } else if (this.data.workerInfo.is_leave === 1) {
      wx.navigateTo({
        url: '/pages/askForLeave/askForLeave',
      })
    }
  },
  toReturnToWork() {
   api.staffReturnWork()
    .then(res=>{
      wx.showToast({
        title: '复工申请已提交,等待审核',
        icon:'success'
      })
    })
  },
  toMyOrder(){
    wx.navigateTo({
      url: '/pages/staffMyOrder/staffMyOrder',
    })
  }
})