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
import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
Page({
  data: {
    options: data.areaList,
    note: "请选择地址",
    visible: false,
    name: "",
    mobile: "",
    address: "",
    detailAddress: "",
    addressName:'',
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
    const that = this
    let val = e.detail.value
    let url = `https://apis.map.qq.com/ws/place/v1/suggestion/?region=蒙自&keyword=${val}&key=DLBBZ-FUQLP-ITYDD-L6FWM-2AU7E-Z3F6I`
    wx.request({
      url: url,
      success:function(res){
        console.log(res.data)
        that.setData({
          addressList:res.data.data
        })
        if(that.data.addressList.length!==0){
          that.setData({
            isAddressBox:true
          })
        }
      },
      fail(err){
        console.log(err)
      }
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
      address: this.data.address + this.data.detailAddress,
      province_id: 2670,
      city_id: 2761,
      area_id: 2764,
      is_default: 0,
    })
    wx.navigateBack()
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
  showDialog() {
    if (this.data.name && this.data.mobile && this.data.address && this.data.detailAddress) {
      let info = {
        linkman: this.data.name,
        mobile: this.data.mobile,
        address: this.data.address + this.data.detailAddress,
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
        title: '请选择省市区',
        icon: 'error',
        duration: 2000
      })
    } else if (this.data.detailAddress === '') {
      wx.showToast({
        title: '请输入详细地址',
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
          addressName,
          iscellplaceholder:false
        })
  
      },
      fail:function(err){
        console.log(err)
      }
    })
  }
});