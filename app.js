// app.js
import getuserInfo from './API/getuserInfo'
App({
  async onLaunch() {
    const userInfo = await getuserInfo()
    const token = userInfo.data.data.userinfo.token
    const id = userInfo.data.data.area.id
    wx.setStorageSync("token", token)
    wx.setStorageSync("id", id)
  },
});
