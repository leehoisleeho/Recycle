// pages/addBusiness/addBusiness.js
import {
  judge
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    address: '',
    addressName: '',
    name: '',
    phone: ''
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
   * handleAdd 添加图片
   * handleRemove 移除图片
   * openMap 打开地图选择位置
   * inputChange input输入时触发
   * submit 提价表单
   */
  handleAdd(e) {
    const {
      fileList
    } = this.data;
    const {
      files
    } = e.detail;
    this.setData({
      fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
    });
  },
  handleRemove(e) {
    const {
      index
    } = e.detail;
    const {
      fileList
    } = this.data;
    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },
  openMap() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        let address = res.address
        let addressName = res.name
        console.log(addressName)
        that.setData({
          address,
          addressName
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  inputChange(e) {
    let dataVal = e.currentTarget.dataset.val;
    console.log(dataVal)
    let value = e.detail.value
    this.setData({
      [dataVal]: value
    })
  },
  submit() {
    let arr = [{
        field: this.data.name,
        msg: '商家名称不能为空'
      },
      {
        field: this.data.phone,
        msg: '商家电话不能为空'
      },
      {
        field: this.data.address,
        msg: '商家地址不能为空'
      },
      {
        field:this.data.fileList.length ? this.data.fileList.length : '',
        msg: '商家图片不能为空'
      }
    ]
    let res = judge(arr)
    if (res === 1) {
      console.log('submit')
    }
  }
})