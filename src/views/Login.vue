<template>
  <div>
    <form @submit.prevent="login" style="border: 1px solid black;margin: 1em">
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="text" v-model="password" placeholder="Password"><br>
      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      email:'admin@test.com',
      password:'admin'
    }
  },
  methods:{
    login(){
      let email=this.email
      let password=this.password
      this.$store.dispatch('login',{email,password})
          .then(()=>this.$router.push('/'))
          .catch(err=>console.log(err))
    }
  }
}
</script>
