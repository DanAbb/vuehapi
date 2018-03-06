<template>
  <div class="dashboard-wrapper">
    <button @click="validateEmail">Validate Email</button>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  methods: {
    async validateEmail () {
      const result = await api('get', 'Login/VerifyEmail')

      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

</style>
