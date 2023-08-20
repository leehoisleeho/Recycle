import api from "../../API/api";
import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
Page({
  data: {
    visible: false,
    name: "",
    mobile: "",
    address: "",
    detailAddress: "",
    lat:"",
    lng:"",
    iscellplaceholder:true
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["isDialog"],
      actions: ["setinfo", "setIsDialog", "setAdd"],
    });
  },
  handleInputChange(e) {
    // 取出实时的变量值
    let dataVal = e.currentTarget.dataset.val;
    let val = e.detail.value;
    this.setData({
      [`${dataVal}`]: val,
    });
  },
  addressOnchange(e){
    let val = e.detail.value
    this.setData({
      detailAddress:val
    })
  },
  showCascader() {
    this.setData({
      visible: true,
    });
  },
  onPick(e) {},
  // 判断名字,手机号,地址,详细地址是否为空
  async submit() {
    const res = await api.addAddress({
      linkman: this.data.name,
      mobile: this.data.mobile,
      address: this.data.address,
      province_id: 2670,
      city_id: 2761,
      area_id: 2764,
      is_default: 0,
      lat:this.data.lat,
      lng:this.data.lng,
      addressdetail:this.data.detailAddress
    })
    wx.navigateBack()
  },
  showDialog() {
    if (this.data.name && this.data.mobile && this.data.address && this.data.detailAddress) {
      let info = {
        linkman: this.data.name,
        mobile: this.data.mobile,
        address: this.data.address,
        addressdetail:this.data.addressdetail,
        is_default: 0,
        province_id: 2670,
        city_id: 2761,
        area_id: 2764
      }
      this.setinfo(info)
      this.setIsDialog(true)
    } else if (this.data.name === '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'error',
        duration: 2000
      })
    } else if (this.data.mobile === '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'error',
        duration: 2000
      })
    } else if (this.data.address === '') {
      wx.showToast({
        title: '请选择地址',
        icon: 'error',
        duration: 2000
      })
    } else if (this.data.detailAddress === '') {
      wx.showToast({
        title: '请输入门牌号',
        icon: 'error',
        duration: 2000
      })
    }
  },
  loaction(){
    const that = this
    wx.chooseLocation({
      success:function(res){
        console.log(res)
        let address = res.address
        let addressName = res.name
        that.setData({
          lat:res.latitude,
          lng:res.longitude,
          address:address,
          detailAddress:addressName,
          iscellplaceholder:false
        })
        console.log(that.data)
      },
      fail:function(err){
        console.log(err)
      }
    })
  }
});