// pages/weightInfo/weightInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note:'请选择付款方式',
    value:'',
    Visible:false,
    arr:[
      { label: '微信', value: '微信' },
      { label: '支付宝', value: '支付宝' },
      { label: '现金', value: '现金' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
   */
  onPicker(){
    console.log(123)
    this.setData({
      Visible:true
    })
  },
  onPickerCancel(){
    this.setData({
      Visible:false,
    })
  },
  onConfirm(e){
    this.setData({
      Visible:false,
      value:e.detail.label
    })
  }
})