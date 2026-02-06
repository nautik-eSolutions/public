import { defineStore }  from 'pinia'

export default defineStore('authStore',{
  state:()=>({
    userId:'',
    userName:'',
    token:''
  })
});