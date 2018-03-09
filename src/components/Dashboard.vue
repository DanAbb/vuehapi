<template>
  <div class="dashboard-wrapper">
    <button @click="getRestaurant">My Restaurants</button>
    <button @click="newRestaurant">New Restaurant</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    async getRestaurant () {
      this.$router.push({ name: 'AllRestaurants' })
    },
    async newRestaurant () {
      this.$router.push({ name: 'NewRestaurant' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

</style>
