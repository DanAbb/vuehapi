<template>
  <div class="restaurant-wrapper">
    <p>Name: {{ restaurant.name }}</p>
    <p>Address: {{ restaurant.address }}</p>
    <p>Telephone: {{ restaurant.telephone }}</p>
    <p>Number of Tables: {{ restaurant.number_of_tables }}</p>
    <p>Table Duration: {{ restaurant.table_duration }}</p>
    <p>Opening Time: {{ restaurant.time_open }}</p>
    <p>Closing Time: {{ restaurant.time_closed }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  created () {
    this.restaurant = this.restaurants.filter(x => x._id === this.id)[0]
  },
  data () {
    return {
      restaurant: null
    }
  },
  computed: {
    ...mapGetters([
      'restaurants'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .restaurant-wrapper {
  }
</style>
