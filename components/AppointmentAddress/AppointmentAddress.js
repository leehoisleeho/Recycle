Component({
  data: {
    description:'请填写详细地址',
  },
  methods:{
    ToAddress(){
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }
  }
});
