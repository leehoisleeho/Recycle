// logs.js
import map from '../../API/map'
Page({
  data: {
    logs: []
  },
  onLoad() {
    map.FuzzyLocation()
  }
})
