const data = {
  areaList: [{
    label: "云南省",
    children: [{
      label: "红河哈尼彝族自治州",
      children: [{
        label: "蒙自市",
      }, ],
    }, ],
  }, ],
};
import api from "../../API/api";
Page({
  data: {
    options: data.areaList,
    note: "请选择地址",
    visible: false,
    name: "",
    mobile: "",
    address: "",
    detailAddress: ""
  },
  handleInputChange(e) {
    // 取出实时的变量值
    let dataVal = e.currentTarget.dataset.val;
    let val = e.detail.value;
    this.setData({
      [`${dataVal}`]: val,
    });
  },
  showCascader() {
    this.setData({
      visible: true,
    });
  },
  onPick(e) {},
  // 判断名字,手机号,地址,详细地址是否为空
  judge(data) {
    if (data.name && data.mobile && data.address && data.detailAddress) {
      // 调用添加地址接口
      // api.addAddress({
      //   linkman:data.name,
      //   mobile:data.mobile,
      //   address:data.address+data.detailAddress,
      //   is_default:0
      // }).then(res=>{
      //   console.log(res)
      // })
    } else if (data.name === '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
    } else if (data.mobile === '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (data.address === '') {
      wx.showToast({
        title: '请选择省市区',
        icon: 'none',
        duration: 2000
      })
    } else if (data.detailAddress === '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onChange(e) {
    const {
      selectedOptions
    } = e.detail;
    this.setData({
      note: selectedOptions.map((item) => item.label).join("/"),
      address: selectedOptions.map((item) => item.label).join(""),
    });
  },
  add() {
    this.judge({
      name: this.data.name,
      mobile: this.data.mobile,
      address: this.data.address,
      detailAddress: this.data.detailAddress
    });
  },
  onShow(){
    console.log(this)
  }
});