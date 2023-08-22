// pages/staffLogin/staffLogin.js
import api from '../../API/api'
Page({

  /**
   * 页面的初始数据
   * account 账号
   * password 密码
   */
  data: {
    account: '',
    password: '',
    text: 'Copyright © 2021-2031 废预清再生资源回收平台'
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
   * accountchange 监听账号
   * passwordchange 监听密码
   * submit 登录
   */
  accountchange(e) {
    this.setData({
      account: e.detail.value
    })
  },
  passwordchange(e) {
    this.setData({
      password: e.detail.value
    })
  },
  async submit() {
    let account = this.data.account
    let password = this.data.password
    api.staffLogin({
      username: account,
      password: password
    }).then(res => {
      let code = res.data.code
      /**
       * code = 0 账号密码错误
       * code = 1 登录成功
       */
      if (code === 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'error'
        })
      } else if (code === 1) {
        let workerId = res.data.data.id
        let workerInfo = res.data.data
        wx.setStorageSync('workerId', workerId)
        wx.setStorageSync('workerInfo', workerInfo)
        wx.reLaunch({
          url: '/pages/staffIndex/staffIndex',
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})