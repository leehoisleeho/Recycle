// pages/staffOrderDetails/staffOrderDetails.js
Page({

  /**
   * 页面的初始数据
   * visible 显示录播图片
   * showIndex 是否显示有几张图片
   * closeBtn 是否有关闭按钮
   * images 图片的数组
   */
  data: {
    visible: false,
    showIndex: true,
    closeBtn: true,
    images: [],
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
  /** 方法
   * onClick点击图片区域 轮播显示图片
   * onClose 关闭轮播
   * call 拨打电话
   * toLocation 导航
   */
  onClick() {
    this.setData({
      images: [
        'https://tdesign.gtimg.com/miniprogram/images/swiper1.png',
        'https://tdesign.gtimg.com/miniprogram/images/swiper2.png',
      ],
      showIndex: true,
      visible: true,
    });
  },
  onClose(e) {
    const {
      trigger
    } = e.detail;
    this.setData({
      visible: false,
    });
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: '18608735101',
    });
  },
  toLocation() {
    let address = '蒙自市'
    let key = '2d65fb54172705ad72f9d69ee4631b7f'
    let url = `https://restapi.amap.com/v3/geocode/geo?address=${address}&output=JSON&key=${key}`
    console.log(url)
    wx.request({
      url: url,
      success: function (res) {
        let location = res.data.geocodes[0].location
        let locationArr = location.split(",");
        let lng = Number(locationArr[0])
        let lat = Number(locationArr[1])
        wx.openLocation({
          latitude: lat,
          longitude: lng,
          address: address,
          scale: 18,
          success: function () {
            console.log("打开地图成功！");
          },
          fail: function (err) {
            console.error("打开地图失败：", err);
          }
        });
      },
      fail: function (err) {
        console.error("获取坐标失败：", err);
      }
    });
  }
})