// pages/login/login.js
import map from '../../API/map';
Page({
  /**
   * 页面的初始数据
   * show 加载动画
   */
  data: {
    show: false
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.Login()
  },
  /**
   * 方法
   * Login 登录
   *  获取用户位置信息和token，并且保存去缓存里面。
   * getToken 
   *  获取token和城市id 并存储到缓存里面
   */
  Login() {
    const that = this
    wx.login({
      success: (res) => {
        const code = res.code
        wx.authorize({
          scope: 'scope.userFuzzyLocation',
          success() {
            wx.getFuzzyLocation({
              type: 'wgs84',
              success(res) {
                let lat = res.latitude
                let lng = res.longitude
                let js_code = code
                that.getToken({
                  lat,
                  lng,
                  js_code
                })
              },
              fail() {
                wx.showToast({
                  title: '假装成功',
                })
                let lat = 23.369627442365566
                let lng = 103.36702845886398
                let js_code = code
                that.getToken({
                  lat,
                  lng,
                  js_code
                })
              }
            })
          },
          /**
           *  用户误触或者拒绝了 获取定位就跳转到fail页面 
           *  引导用户重新设置，然后重新获取位置
           */
          fail(err) {
            wx.showToast({
              title: '获取地址失败',
              icon: 'error'
            })
            wx.reLaunch({
              url: '/pages/fail/fail',
            })
          }
        })
      },
    })
  },
  async getToken(data) {
    const that = this
    wx.request({
      url: 'https://recycleapi.hellochange.online/api/user/jscode2session',
      method: 'GET',
      data: {
        lat: data.lat,
        lng: data.lng,
        js_code: data.js_code
      },
      success: (res) => {
        that.setData({
          show: true
        })
        let data = res.data.data
        console.log(data)
        let id = data.area.id
        let token = data.userinfo.token
        wx.setStorageSync('id', id)
        wx.setStorageSync('token', token)
        wx.reLaunch({
          url: '/pages/index/index',
        })
      },
      fail: (err) => {
        console.log(err)
      }
    });
  }
})