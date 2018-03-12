<template>
  <div class="signup-wrapper">
    <div class="input-container">
      <label for="firstName">First Name</label>
      <input type="firstName" name="firstName" v-model="firstName">
    </div>
    <div class="input-container">
      <label for="lastName">Last Name</label>
      <input type="lastName" name="lastName" v-model="lastName">
    </div>
    <div class="input-container">
      <label for="email">Email</label>
      <input type="email" name="email" v-model="email">
    </div>
    <div class="input-container">
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password">
    </div>
    <div class="input-container">
      <input type="submit" value="Submit" @click="submit()">
    </div>
    <div class="login">
      <p>Already have an account? <a href="/">login here</a></p>
    </div>
  </div>
</template>

<script>
import { api } from '../services/api'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        hashedPassword: this.password
      }

      const signup = await api('post', 'Signup/ManualSignup', data)

      console.log(signup)

      if (signup.status === 200) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

  .signup-wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
  }

  .input-container {
    margin: 10px;
    width: 340px;

    input {
      width: 100%;
      height: 50px;
      font-size: 20px;
    }
  }

  .login {
    width: 340px;
    text-align: right;
  }
</style>
