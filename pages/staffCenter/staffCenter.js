// pages/staffCenter/staffCenter.js
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
   * 
   * toAskForLeave 去请假页面 
   * showDevelop提示开发中
   */
  showDevelop(){
    wx.showToast({
      title: '开发中',
      icon:'error'
    })
  },
  toAskForLeave(){
    wx.navigateTo({
      url: '/pages/askForLeave/askForLeave',
    })
  },
  toReturnToWork(){
    wx.navigateTo({
      url: '/pages/returnToWork/returnToWork',
    })
  }
})