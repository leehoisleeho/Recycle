// pages/getAvatar/getAvatar.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import {judge} from '../../utils/util'
import api from '../../API/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:defaultAvatarUrl,
    nickName:""
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
    this.getUserInfo()
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
   * onChooseAvatar 获取用户头像
   * submit提交昵称和偷袭那个
   * changeInput 监听input内容变化
   * getUserInfo 获取用户信息
   */
   onChooseAvatar(e) {
    const that = this
    const { avatarUrl } = e.detail
    api.upImg(avatarUrl).then((res)=>{
      let fullurl = JSON.parse(res.data).data.fullurl
      that.setData({
        avatarUrl:fullurl
      })
    })
  },
  async submit(){
    if(this.data.avatarUrl=== defaultAvatarUrl){
      this.data.avatarUrl = ''
    }
    let arr = [
      {
        field:this.data.nickName,
        msg:'请填写昵称'
      },
      {
        field:this.data.avatarUrl,
        msg:'请选择图片'
      }
    ]
    let code = judge(arr)
    // 必需数据都不为空
    if(code===1){
      let Avatar = await api.updataUserAvatar({
        avatar:this.data.avatarUrl
      })
      let Name = await api.updataUserName({
        name:this.data.nickName
      })
      wx.switchTab({
        url: '/pages/user/user',
      })
    }
  },
  changeInput(e){
    this.setData({
      nickName:e.detail.value
    })
  },
  getUserInfo(){
    const that = this
    api.getUserInfo().then(res=>{
      let {nickname} = res.data.data.userinfo
      let {avatar} = res.data.data.userinfo
      that.setData({
        avatarUrl:avatar,
        nickName:nickname
      })
    })
  }
})