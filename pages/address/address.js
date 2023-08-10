Page({
  data: {
    addressList: [{
        addressName: '云南省红河州蒙自市崇文街4号',
        name: '张三',
        phone: '12345678910'
      },
      {
        addressName: '云南省红河州蒙自市崇文街4号',
        name: '张三',
        phone: '12345678910'
      },
      {
        addressName: '云南省红河州蒙自市崇文街4号',
        name: '张三',
        phone: '12345678910'
      },
    ],
    msg:'什么内容都没有，请新增地址。',
    show:true
  },
  onLoad(options) {

  },
  onReady() {

  },
  onShow() {
    this.setData({
      addressList:[]
    })
    if (this.data.addressList.length == 0) {

      this.setData({
        show:true
      })
    }else{
      this.setData({
        show:false
      })
    }
  },
  onHide() {

  },
  onUnload() {

  },
  toaddAddress() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  }
});