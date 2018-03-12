<template>
<div class="restaurants-page-wrapper" v-if="!loading">
  <div class="restaurant-wrapper" v-if="restaurant">
    <p>Name: {{ restaurant.name }}</p>
    <p>Address: {{ restaurant.address }}</p>
    <p>Telephone: {{ restaurant.telephone }}</p>
    <p>Number of Tables: {{ restaurant.number_of_tables }}</p>
    <p>Table Duration: {{ restaurant.table_duration }}</p>
    <p>Opening Time: {{ restaurant.time_open }}</p>
    <p>Closing Time: {{ restaurant.time_closed }}</p>
  </div>
  <div v-else>
    <h1>Cannot find restaurant</h1>
  </div>
  <div class="bookings-wrapper" v-if="bookings">
    <div v-for="booking in bookings" :key="booking._id">
      <p>Booking Date: {{ booking.date }}</p>
      <p>Booking Time: {{ booking.time }}</p>
      <p>Booking Name: {{ booking.name }}</p>
      <p>Booking Contact: {{ booking.contact_number }}</p>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api } from 'services/api'

export default {
  props: ['id'],
  mounted () {
    this.getData()
  },
  data () {
    return {
      restaurant: null,
      loading: true,
      bookings: null
    }
  },
  computed: {
    ...mapGetters([
      'restaurants'
    ])
  },
  methods: {
    async getData () {
      if (this.restaurants) {
        this.restaurant = this.restaurants.filter(x => x._id === this.id)[0]
      } else {
        const restaurant = await this.fetchRestaurant()
        this.restaurant = restaurant.data
      }

      const bookings = await this.fetchBookings()
      this.bookings = bookings.data
      this.loading = false
    },
    async fetchRestaurant () {
      try {
        return await api('get', `Restaurant/${this.id}`)
      } catch (error) {
        return error
      }
    },
    async fetchBookings () {
      try {
        return await api('get', `Bookings/${this.id}`)
      } catch (error) {
        return error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .restaurant-wrapper {
  }
</style>
