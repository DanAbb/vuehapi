<template>
  <div class="restaurant-card">
    <div class="pic">
      <img :src="img.restaurant" alt="restaurant">
    </div>
    <div class="text">
      <div class="restaurant-name">
        <p>{{ restaurant.name }}</p>
        <p class="tel">{{ restaurant.telephone }}</p>
        <div class="line"></div>
      </div>
      <div class="restaurant-address">
        <p>{{ restaurant.address }}</p>
      </div>
      <div class="restaurant-opening">
        <p>{{ restaurant.time_open }} to {{ restaurant.time_closed }}</p>
      </div>
      <div class="restaurant-actions">
        <button @click="gotorestaurant(restaurant._id)">Bookings</button>
        <button class="warning" @click="deleterestaurant(restaurant._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import restaurant from 'img/restaurant.jpg'

import { api } from 'services/api'

export default {
  props: ['restaurant'],
  data () {
    return {
      img: {
        restaurant
      }
    }
  },
  methods: {
    gotorestaurant (id) {
      this.$router.push({ name: 'Bookings', params: { id } })
    },
    async deleterestaurant (id) {
      const sure = confirm('Are you sure?')

      if (sure) {
        const restaurant = await api('delete', 'Restaurant/Delete', { id })
        console.log(restaurant)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '~styles/global';

  .restaurant-card {
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    margin: 10px;
    position: relative;
    width: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    &:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .pic {
      img {
        width: 100%;
        border-top-right-radius: 2px;
        border-top-left-radius: 2px;
      }
    }
  }

  .text {
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    padding-top: 60px;
    text-align: center;
  }

  .restaurant-name {
    width: auto;
    position: absolute;
    background: #fff;
    padding: 10px 30px;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 50%;
    text-align: center;

    p {
      font-size: 1.8rem;
      margin-top: 10px;
    }

    .tel {
      font-size: 1.4rem;
      color: darken($lightest, 15%);
      margin: 10px auto;
    }

    .line {
      width: 40px;
      margin: 15px auto 0;
      border-bottom: 1px solid darken($lightest, 15%);
    }
  }

  .restaurant-address {
    margin: 20px auto;

    p {
    }
  }

  .restaurant-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto 0;

    button {
      min-width: 100px;
      margin: 10px;
      padding: 0 10px;
      height: 40px;
    }
  }

</style>
