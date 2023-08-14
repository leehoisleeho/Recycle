import api from '../../API/api'
Page({
  data: {
    addressList: [],
    msg: '什么内容都没有，请新增地址。',
    show: false
  },
  onLoad(options) {
    
  },
  onShow() {
    this.getPageData()
  },
  /**
   * 方法
   * getPageData 获取页面加载时所属数据
   * toaddAddress 去新增地址表单
   */
  async getPageData() {
    let AddressList = await api.getAddressList()
    AddressList = AddressList.data.data
    console.log(AddressList)
    this.setData({
      addressList: AddressList
    })
    if (this.data.addressList.length === 0) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        show: false
      })
    }
  },
  toaddAddress() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
});