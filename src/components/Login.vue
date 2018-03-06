<template>
  <div class="login-wrapper">
    <div class="input-container">
      <label for="email">Email</label>
      <input type="email" name="email" v-model="email">
    </div>
    <div class="input-container">
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password">
    </div>
    <div class="input-container">
      <input type="submit" value="Submit" @click="submit($event)">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit (ev) {
      ev.preventDefault()
      try {
        const login = await axios({
          method: 'post',
          url: 'http://localhost:3001/Login/ManualLogin',
          data: {
            email: this.email,
            password: this.password
          }
        })

        console.log(login)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

  .login-wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
  }

  .input-container {
    margin: 10px;
    width: 240px;

    input {
      width: 200px;
      height: 50px;
      font-size: 20px;
    }
  }
</style>
