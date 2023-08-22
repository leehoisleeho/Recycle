// pages/askForLeave/askForLeave.js
import api from '../../API/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason:null
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
   * submit 提交请假申请
   * textareaChange 监听文本变化
   */
  submit(){
    if(this.data.reason===null){
      wx.showToast({
        title: '请填写请假原因',
        icon:'error'
      })
    }else{
      api.staffLeave({
        reason:this.data.reason
      }).then(res=>{
        wx.showToast({
          title: '提交成功，等待审核',
          icon:'success',
          duration: 2000,
          success:()=>{
            wx.reLaunch({
              url: '/pages/staffCenter/staffCenter',
            })
          },
        })
      })
    }
  },
  textareaChange(e){
    this.setData({
      reason:e.detail.value
    })
  }
})