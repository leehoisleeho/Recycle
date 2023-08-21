import api from "../../API/api";

// pages/staffOrderDetails/staffOrderDetails.js
Page({
  /** 页面的初始数据
   * visible 显示录播图片
   * showIndex 是否显示有几张图片
   * closeBtn 是否有关闭按钮
   * images 图片的数组
   * orderInfo 订单的详细信息
   * showTextAndTitleWithInput 显示对话框
   */
  data: {
    visible: false,
    showIndex: true,
    closeBtn: true,
    images: [],
    orderInfo: {},
    orderId:'',
    showTextAndTitleWithInput:false,
    inputVal:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id
    this.setData(
      {
        orderId:id
      }
    )
    api.getStaffOrderDetails({
      order_id: id
    }).then(res => {
      let data = res.data.data
      console.log(data)
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
   * toWeightInfo 去称重页面
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
  },
  toWeightInfo(){
    wx.navigateTo({
      url: '/pages/weighing/weighing?id=' + this.data.orderId,
    })
  },
  showDialog(){
    this.setData({
      showTextAndTitleWithInput:true
    })
  },
  onConfirm(){
    console.log(this.data.inputVal)
    if(this.data.inputVal===""){
      wx.showToast({
        title: '请输入取消原因',
        icon:'error'
      })
      return
    }
    api.staffCanceOrder({
      reason:this.data.inputVal,
      order_id:this.data.orderId
    }).then(res=>{
      this.setData({
        showTextAndTitleWithInput:false
      })
      wx.reLaunch({
        url: '/pages/staffIndex/staffIndex',
      })
    })
  },
  closeDialog(){
    console.log('qx')
    this.setData({
      showTextAndTitleWithInput:false
    })
  },
  inputchange(e){
    this.setData({
      inputVal:e.detail.value
    })
  }
})