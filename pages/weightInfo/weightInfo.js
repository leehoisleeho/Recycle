import api from '../../API/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    note: '请选择付款方式',
    value: '',
    Visible: false,
    arr: [{
        label: '微信',
        value: '微信'
      },
      {
        label: '支付宝',
        value: '支付宝'
      },
      {
        label: '现金',
        value: '现金'
      },
    ],
    infoList: [],
    orderId: null,
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let orderId = Number(options.id)
    let info = JSON.parse(options.info)
    this.showInfo(info)
    this.setData({
      orderId
    })
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
   * onPicker 打开选择器
   * onPickerCancel 取消选择器
   * onConfirm 确认
   * showInfo 循环显示info内容
   * submit 提交订单
   */
  onPicker() {
    this.setData({
      Visible: true
    })
  },
  onPickerCancel() {
    this.setData({
      Visible: false,
    })
  },
  onConfirm(e) {
    this.setData({
      Visible: false,
      value: e.detail.label
    })
  },
  showInfo(arr) {
    let infoList = []
    let data = []
    let M = 0
    arr.forEach((item) => {
      if (item.categoryList.length !== 0) {
        data.push(item)
        let arr = item.categoryList
        arr.forEach(item => {
          infoList.push({
            title: item.title,
            price: item.price,
            n: item.n,
            m: item.m
          })
          M = M + Number(item.m)
        })
      }
    })
    this.setData({
      infoList,
      M,
      data
    })
  },
  submit() {
    if(this.data.value.length===0){
      wx.showToast({
        title: '请选择付款方式',
        icon:'error'
      })
      return
    }
    api.finishOrder({
      order_id: this.data.orderId,
      paytype: this.data.value[0],
      data: this.data.data
    }).then(res => {
      wx.navigateTo({
        url: '/pages/staffIndex/staffIndex',
      })
    })
  }
})