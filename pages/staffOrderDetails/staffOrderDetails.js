import api from "../../API/api";

// pages/staffOrderDetails/staffOrderDetails.js
Page({
  /** 页面的初始数据
   * visible 显示录播图片
   * showIndex 是否显示有几张图片
   * closeBtn 是否有关闭按钮
   * images 图片的数组
   * orderInfo 订单的详细信息
   */
  data: {
    visible: false,
    showIndex: true,
    closeBtn: true,
    images: [],
    orderInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id
    api.getStaffOrderDetails({
      order_id: id
    }).then(res => {
      let data = res.data.data
      let images = data.image.split(',')
      this.setData({
        orderInfo: data,
        images: images
      })
    })
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
  call(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    });
  },
  toLocation(e) {
    console.log(e.currentTarget.dataset.address)
    let addressInfo = e.currentTarget.dataset.address
    wx.openLocation({
      latitude: Number(addressInfo.lat),
      longitude: Number(addressInfo.lng),
      name:addressInfo.addressdetail,
      address: addressInfo.address,
      scale: 18,
      success: function () {
        console.log("打开地图成功！");
      },
      fail: function (err) {
        console.error("打开地图失败：", err);
      }
    });
  }
})