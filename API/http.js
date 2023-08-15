const Base_URL = "https://recycleapi.hellochange.online";
import getuserInfo from './getuserInfo';
/**
 * @param {Object} 
 * data.url: 请求地址
 * data.method: 请求方式
 * data.data: 请求参数
 * data.header: 请求头
 **/
async function http(param) {
  wx.showLoading({
    title: '加载中', // 加载提示的文本
    mask: false // 是否显示透明蒙层，防止用户操作 
  });
  wx.hideTabBar()
  // console.log(1)
  // const data = await getuserInfo()
  // const token = data.userinfo.token
  // const id = data.area.id
  let token = wx.getStorageSync("token")
  let id = wx.getStorageSync("id")
  return new Promise((resolve, reject) => {
    wx.request({
      url: Base_URL + param.url,
      method: param.method,
      header: {
        token,
        areaid: id
      },
      data: param.data,
      success(res) {
        resolve(res)
        wx.hideLoading()
        wx.showTabBar()
      },
      fail(err) {
        reject(err)
        wx.showToast({
          title: err,
          icon: 'none', // 提示图标，支持 "success"、"loading"、"none"
          duration: 2000 // 提示框显示时间，单位毫秒
        });
      }
    })
  })
}
export default http;