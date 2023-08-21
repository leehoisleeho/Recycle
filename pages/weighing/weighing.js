// pages/weighing/weighing.js
import api from '../../API/api'
Page({

  /**
   * 页面的初始数据
   * tabList 主品类
   */
  data: {
    tabList: [],
    tabInfo: [],
    generate: [],
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      orderId:options.id
    })
    this.getAll()
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
  /** 方法
   * 
   * change 监听数值变化 thorui
   */
  change(e) {
    let id = e.currentTarget.dataset.id
    let n = e.detail.value
    let list = this.data.tabInfo
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].n = n
        list[i].m = Math.floor(list[i].price * n * 100) / 100
        this.setData({
          tabInfo: list
        })
      }
    }
  },
  onTabsChange(event) {
    let index = Number(event.detail.value)
    let data = this.data.tabList[index].categorylist
    this.setData({
      tabInfo: data
    })
  },
  getAll() {
    api.getAllList().then(res => {
      let data = res.data.data
      let tabInfo = data[0].categorylist
      for (let i = 0; i < data.length; i++) {
        // 子品类数组 arr
        let arr = data[i].categorylist
        for (let j = 0; j < arr.length; j++) {
          // 给每个子类添加了一个n 数量
          arr[j].n = 0
          arr[j].price = Number(arr[j].price)
          arr[j].m = arr[j].n * arr[j].price
        }
      }
      this.setData({
        tabList: data,
        tabInfo: tabInfo
      })
    })
  },
  generateToweightInfo() {
    let LIST = []
    let Arr = this.data.tabList
    for (let i = 0; i < Arr.length; i++) {
      let arr = Arr[i].categorylist
      let obj = {
        categoryId: Arr[i].id,
        categoryTitle: Arr[i].title,
        categoryList: []
      }
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].m !== 0) {
          obj.categoryList.push({
            id: arr[j].id,
            title: arr[j].title,
            price: arr[j].price,
            n: arr[j].n,
            m: arr[j].m
          })
        }
      }
      LIST.push(obj)
    }
    this.setData({
      generate: LIST
    })
    let info = JSON.stringify(this.data.generate)
    wx.navigateTo({
      url: '/pages/weightInfo/weightInfo?info='+info+"&id="+this.data.orderId,
    })
  }
})