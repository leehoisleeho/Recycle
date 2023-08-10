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
Component({
  data: {
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
  methods: {
    onTap(e) {
      const { index } = e.detail;
      console.log(index);
    },
    onChange(e) {
      const { current, source } = e.detail;
      console.log(current, source);
    },
    onImageLoad(e) {
      console.log(e.detail.index);
    },
  },
});