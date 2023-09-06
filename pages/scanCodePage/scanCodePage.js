import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from "../../store/store";
import api from "../../API/api";
import {
  judge
} from '../../utils/util'
const updataUrl = "https://recycleapi.hellochange.online/api/common/upload";

Page({
  data: {
    current: 1,
    visible: false,
    id: undefined,
    CategoryInfo: null,
    imgurl: "",
    categorylist: [],
    isShow: true,
    category_id:"",
    imgStr: "",
    /** 显示更多数据
     * isMore 是否显示查看更多
     * list 类目价格数据的长度
     * moreHeight 点击查看更多的高度
     * isDonw 上下箭头的现实
     */
    isMore: false,
    list: [],
    moreHeight: 0,
    isDonw: true,
    /** 品类选择数据
     * isMore 是否显示查看更多
     * list 类目价格数据的长度
     * moreHeight 点击查看更多的高度
     * isDonw 上下箭头的现实
     */
    recyclingTypeText: '请选择品类',
    recyclingTypeValue: [],
    description: '回收的品类',
    recyclingTypeValue: [],
    recyclingTypes: [],
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
      actions: ["setIsDialog_form", "setCategoryType", "setAddress", "setImgUrlList"],
    });
    this.getPageData()
  },
  // typeMore
  showMore() {
    if (this.data.moreHeight > 320) {
      this.setData({
        moreHeight: 4 * 80,
        isDonw: !this.data.isDonw
      })
      console.log(this.data.moreHeight)
    } else {
      this.setData({
        moreHeight: this.data.list.length * 80,
        isDonw: !this.data.isDonw
      })
    }
  },
  typeMore() {
    // 数据的长度
    let list = this.data.list.length
    if (list > 4) {
      this.setData({
        isMore: true,
        moreHeight: 4 * 80
      })
    } else {
      this.setData({
        moreHeight: list * 80
      })
      this.setData({
        isMore: false
      })
    }
  },
  // 页面写着的时候 重置store
  onUnload() {
    this.setAddress('请选择地址')
  },
  /**
   * getPageData 获取页面数据
   * 
   */
  async getPageData() {
    let allList = await api.getAllList()
    let categoryList = allList.data.data
    allList = allList.data.data
    let recyclingTypes = []
    let list = []
    for (let index = 0; index < categoryList.length; index++) {
      recyclingTypes.push({
        label: categoryList[index].title,
        value: categoryList[index].id
      })
      let allList = categoryList[index].categorylist
      for (let i = 0; i < allList.length; i++) {
        list.push({
          title: allList[i].title,
          price: allList[i].price
        })
      }
    }
    this.setData({
      recyclingTypes,
      list
    })
    this.typeMore()
  },
  onChange(event) {
    const {
      value
    } = event.detail;
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
  handleChange(e) {
    this.setData({
      activeValues: e.detail.value,
    });
  },
  // 判断要上传的值是不是为空
  // judge() {
  //   if (!this.data.weight) {
  //     wx.showToast({
  //       title: "请选择重量",
  //       icon: "error",
  //     });
  //   } else if (!this.data.time) {
  //     wx.showToast({
  //       title: "请选择预约时间",
  //       icon: "error",
  //     });
  //   } else if (!this.data.category_id) {
  //     wx.showToast({
  //       title: "请选择回收品类",
  //       icon: "error",
  //     });
  //   } else if (this.data.address === "请选择地址") {
  //     wx.showToast({
  //       title: "请选择预地址",
  //       icon: "error",
  //     });
  //   } else {
  //     this.setIsDialog_form(true);
  //   }
  // },
  isShowDialog() {
    let arr = [
      {
        field:this.data.category_id,
        msg:'请选择品类'
      },
      {
        field:this.data.weight,
        msg:'请选择重量'
      },
      {
        field:this.data.time,
        msg:'请选择时间'
      },
    ]
    let res = judge(arr)
    if(res===1){
      console.log('提交了')
      // this.setIsDialog_form(true)
    }
  },
  // 上传图片方法 并且拼接字符串
  async updataImg(files) {
    let that = this;
    wx.showLoading({
      title: "上传图片", // 加载提示的文本
      mask: false, // 是否显示透明蒙层，防止用户操作
    });
    let token = wx.getStorageSync("token")
    let id = wx.getStorageSync("id")
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
          let imgStr = that.data.imgStr
          if (imgStr === "") {
            imgStr = url
          } else {
            imgStr = imgStr + ',' + url
          }
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
    api.submitOrder({
      category_id: this.data.category_id,
      weight: this.data.weight,
      appointment_time: this.data.time,
      address_id: this.data.addressId,
      image: this.data.imgStr,
    }).then(res => {
      wx.reLaunch({
        url: '/pages/order/order',
      })
      // 重置全局数据
      this.setImgUrlList([])
      this.setAddress('请选择地址')
    })
  },

  onPickerCancel() {
    this.setData({
      recyclingTypeVisible: false
    })
  },
  onconfirm(e) {
    console.log(e.detail)
    let note = e.detail.label[0]
    let id = e.detail.value[0]
    this.setData({
      recyclingTypeVisible: false,
      recyclingTypeText: note,
      category_id: id
    })
    this.setCategoryType(note)
    console.log(this.data.category_id)
  },
  onCityPicker() {
    this.setData({
      recyclingTypeVisible: true
    })
  },
});