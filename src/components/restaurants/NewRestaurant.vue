<template>
  <div class="new-restaurant-wrapper">
    <div class="new-restaurant-form">
      <div class="input-container">
        <label for="restaurant.name">Name</label>
        <input type="text" name="restaurant.name" v-model="restaurant.name">
      </div>
      <div class="input-container">
        <label for="restaurant.address">Address</label>
        <input type="text" name="restaurant.address" v-model="restaurant.address">
      </div>
      <div class="input-container">
        <label for="restaurant.telephone">Telephone</label>
        <input type="text" name="restaurant.telephone" v-model="restaurant.telephone">
      </div>
      <div class="input-container">
        <label for="restaurant.number_of_tables">Number of Tables</label>
        <input type="text" name="restaurant.number_of_tables" v-model="restaurant.number_of_tables">
      </div>
      <div class="input-container">
        <label for="restaurant.time_open">Time Open</label>
        <input type="text" name="restaurant.time_open" v-model="restaurant.time_open">
      </div>
      <div class="input-container">
        <label for="restaurant.time_closed">Time Closed</label>
        <input type="text" name="restaurant.time_closed" v-model="restaurant.time_closed">
      </div>
      <div class="input-container">
        <label for="restaurant.table_duration">Table Duration</label>
        <input type="text" name="restaurant.table_duration" v-model="restaurant.table_duration">
      </div>
      <div class="input-container">
        <input type="submit" name="submit" @click="submitNewRestaurant">
      </div>
    </div>
  </div>
</template>

<script>
import { api } from 'services/api'

export default {
  data () {
    return {
      restaurant: {
        name: '',
        address: '',
        telephone: '',
        number_of_tables: '',
        time_open: '',
        time_closed: '',
        table_duration: ''
      }
    }
  },
  methods: {
    async submitNewRestaurant () {
      await api('post', 'Restaurant/NewRestaurant', this.restaurant)

      this.$router.push({ name: 'AllRestaurants' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';
  .new-restaurant-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
  }

  .input-container {
    margin: 20px 10px;
    width: 340px;

    input {
      width: 100%;
      height: 50px;
      font-size: 20px;
    }
  }
</style>
