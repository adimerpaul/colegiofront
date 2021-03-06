import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status:'',
    token:localStorage.getItem('token')||'',
    user:{}
  },
  mutations: {
      auth_request(state){
          state.status = 'loading'
      },
      auth_success(state, token, user){
          state.status = 'success'
          state.token = token
          state.user = user
      },
      auth_error(state){
          state.status = 'error'
      },
      logout(state){
          state.status = ''
          state.token = ''
      },
  },
  actions: {
      login({commit},user){
          // console.log('a');
          // commit('auth_request');
          // axios.post('http://localhost:8000/api/login').then(res=>{
          //     console.log(res.data)
          // }).catch(err=>{
          //     commit('auth_error')
          //     localStorage.removeItem('token');
          //     console.log(err)
          // })
          return new Promise(((resolve,reject) => {
              commit('auth_request')
              axios.post('http://localhost:8000/api/login',user)
                  .then(resp=>{
                      const  token=resp.data.token;
                      const  user=resp.data.user;
                      localStorage.setItem('token', token)
                      axios.defaults.headers.common['Authorization'] = 'Bearer '+token
                      commit('auth_success', token, user)
                      resolve(resp)
                  }).catch(err=>{
                  commit('auth_error')
                  localStorage.removeItem('token')
                  reject(err)
                    })
          }))
      }
  },
  modules: {
  },
    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})
