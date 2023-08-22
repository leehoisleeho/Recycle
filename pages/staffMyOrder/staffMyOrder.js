// pages/staffMyOrder/staffMyOrder.js
import api from "../../API/api";
import {TimestampToTime} from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    monthVisible: false,
    monthText: null,
    date: null, //默认初始时间
    dateText: "", //cell显示时间
    // 指定选择区间起始值
    start: "2022-08-22",
    end: null,
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let date = this.getDay();
    this.setData({
      date,
      dateText: date,
      end: date,
    });
    this.getOrderListByTime(date);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  /**
   * showPicker 显示时间选择器
   * hidePicker 关闭时间选择器
   * onConfirm 确定时间
   * getOrderListByTime 获取选取的时间的订单
   */
  showPicker() {
    this.setData({
      dateVisible: true,
    });
  },
  hidePicker() {
    this.setData({
      dateVisible: false,
    });
  },
  onConfirm(e) {
    console.log(e.detail.value);
    this.setData({
      dateText: e.detail.value,
    });
    this.getOrderListByTime(e.detail.value);
    this.hidePicker();
  },
  getDay() {
    // 获取今天是几号 格式为 2020-08-08 月份要补零
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  },
  getOrderListByTime() {
    api.staffGetOrderListByTime({
      time: this.data.dateText,
    }).then((res) => {
      console.log(res);
      let data = res.data.data.data;
      data.forEach(item=>{
        item.createtime = TimestampToTime(item.createtime)
      })
      this.setData({
        orderList: data,
      });
    });
  },
  showInfo(e) {
    wx.showToast({
      title: "请返回订单中心操作",
      icon: "error",
    });
  }
});
