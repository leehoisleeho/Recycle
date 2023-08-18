// store.js 
import {
  observable,
  action,
} from 'mobx-miniprogram';

export const staffOrder = observable({
  id : 0,
  setid:action(function(value){
    this.id = value
  })
})