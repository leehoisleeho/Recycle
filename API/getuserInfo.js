// Desc: 获取用户信息
import map from './map';
import wxLogin from './wxLogin';
async function getuserInfo() {
  // 获取模糊位置
  const data = await map.FuzzyLocation();
  // 登录
  const code = await wxLogin();
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://recycleapi.hellochange.online/api/user/jscode2session',
      method: 'GET',
      data: {
        js_code: code.code,
        lat: data.latitude,
        lng: data.longitude,
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject("userInfo失败")
      }
    });
  })
}
export default getuserInfo;