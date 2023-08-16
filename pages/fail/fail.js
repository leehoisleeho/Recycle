// pages/fail/fail.js
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
   * setLocation 引导客户打开位置
   */
  setLocation(){
    const that = this
    wx.showModal({
      title: '位置授权',
      content: '为了正常使用地理位置功能，请在小程序设置中开启位置授权。',
      confirmText: '去设置',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: function (settingRes) {
              if(settingRes.authSetting['scope.userFuzzyLocation']){
                wx.showToast({
                  title: '设置成功',
                  icon:'success'
                })
                that.toLogin()
              }else{
                wx.showToast({
                  title: '设置失败',
                  icon:'error'
                })
              }
            }
          });
        }
      }
    });
  },
  toLogin(){
    wx.reLaunch({
      url: '/pages/login/login',
    })
  }
})