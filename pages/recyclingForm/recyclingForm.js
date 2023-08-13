import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
import api from "../../API/api";
import getuserInfo from "../../API/getuserInfo";
const updataUrl = "http://recycleapi.haochentech.ltd/api/common/upload";
Page({
  data: {
    current: 1,
    visible: false,
    id: undefined,
    CategoryInfo: null,
    imgurl: "",
    categorylist: [],
    isShow: false,
    category_id: null,
    imgStr: "",
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: [
        "weight",
        "address",
        "time",
        "addressId",
        "isDialog_form",
        "imgUrlList",
      ],
      actions: ["setIsDialog_form", "setCategoryType"],
    });
    let id = options.id;
    this.setData({
      id: id,
      category_id: Number(id),
    });
    this.getPageData();
  },
  async getPageData() {
    let data = await api.getCategoryInfo({
      category_id: this.data.id,
    });
    data = data.data.data;
    this.setCategoryType(data.list[0].title);
    let imgurl = "http://recycleapi.haochentech.ltd" + data.list[0].image;
    let categorylist = data.list[0].categorylist;
    this.setData({
      CategoryInfo: data,
      imgurl: imgurl,
      categorylist: categorylist,
      isShow: true,
    });
  },
  onChange(event) {
    const { value } = event.detail;
    this.setData({
      current: value,
    });
  },
  statement() {
    this.setData({
      visible: true,
    });
  },
  closeDrawer(e) {
    this.setData({
      visible: false,
    });
  },
  // 判断要上传的值是不是为空
  judge() {
    console.log("weight:" + this.data.weight);
    console.log("time:" + this.data.time);
    console.log("address:" + this.data.address);
    console.log("id:" + this.data.addressId);
    // this.setIsDialog_form(true)
    if (!this.data.weight) {
      wx.showToast({
        title: "请选择重量",
        icon: "error",
      });
    } else if (!this.data.time) {
      wx.showToast({
        title: "请选择预约时间",
        icon: "error",
      });
    } else if (this.data.address === "请选择地址") {
      wx.showToast({
        title: "请选择预地址",
        icon: "error",
      });
    } else {
      this.setIsDialog_form(true);
    }
  },
  isShowDialog() {
    this.judge()
  },
  // 上传图片方法 并且拼接字符串
  async updataImg(files) {
    let that = this;
    wx.showLoading({
      title: "上传图片", // 加载提示的文本
      mask: false, // 是否显示透明蒙层，防止用户操作
    });
    const data = await getuserInfo();
    const token = data.userinfo.token;
    const id = data.area.id;
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: updataUrl,
        filePath: files,
        name: "file",
        header: {
          token,
          areaid: id,
        },
        success: function (res) {
          resolve("ok")
          let data = JSON.parse(res.data);
          let url = data.data.fullurl;
          let imgStr = that.data.imgStr + "," + url;
          that.setData({
            imgStr,
          });
          wx.hideLoading();
        },
        fail: function (error) {
          reject(error);
          wx.hideLoading();
          console.log(error);
        },
      });
    });
  },

  // 提交
  async submit() {
    let list = this.data.imgUrlList;
    const promises = list.map((item) => {  
      return this.updataImg(item.url);
    });
    const results = await Promise.all(promises); // 等待所有图片请求完成
    console.log(results);
    api.submitOrder({
      category_id: this.data.category_id,
      weight: this.data.weight,
      appointment_time: this.data.time,
      address_id: this.data.addressId,
      image: this.data.imgStr,
    }).then(res => {
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })
      wx.switchTab({
        url: '/pages/order/order',
      })
    })
  },
});
