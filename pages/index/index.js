// index.js
// 获取应用实例
const app = getApp();
const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];
import{ storeBindingsBehavior }from'mobx-miniprogram-bindings'
import{ store }from'../../store/store'
Component({
  // behavior 绑定
  behaviors:[storeBindingsBehavior],
  data: {
    someData:'...',
    current: 0,
    autoplay: false,
    duration: 500,
    interval: 5000,
    swiperList,
    visible: true,
    marquee1: {
      speed: 80,
      loop: -1,
      delay: 0,
    },
    marquee2: {
      speed: 60,
      loop: -1,
      delay: 0,
    },
  },
  storeBindings:{
    store:store,
    fields:{
      numA:()=> store.numA,
      numB:(store)=> store.numB,
      sum:'sum'
    },
    actions:{
      buttonTap:'update'
    },
  },
  methods: {
    toRecyclingFrom() {
      wx.navigateTo({
        url: '../recyclingForm/recyclingForm',
      })
    },
    onTap(e) {
      const {
        index
      } = e.detail;
      console.log(index);
    },
    onChange(e) {
      const {
        current,
        source
      } = e.detail;
      console.log(current, source);
    },
    onImageLoad(e) {

    },
  },
});
