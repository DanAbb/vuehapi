<template>
<div class="bookings-page-wrapper" v-if="!loading">
  <h1 class="page-title">{{ restaurant.name }} bookings</h1>
  <div class="booking-menu">
    <button @click="addNewBooking">Add new booking</button>
    <div class="toggle-viewtype" @click="toggleViewtype">
      <img v-if="viewType === 'list'" :src="img.gridview" alt="List view">
      <img v-else :src="img.listview" alt="Grid view">
    </div>
  </div>
  <div class="bookings-wrapper" v-if="bookings" :class="viewType === 'list' ? 'list' : 'card'">
    <div class="booking" v-for="booking in bookings" :key="booking._id">
      <div class="heading">
        <img :src="img.booking" alt="booking">
        <div class="info">
          <h1>{{ booking.name }}</h1>
          <h4>{{ formatDate(booking.date) }} at {{ booking.time }}</h4>
        </div>
      </div>
      <div class="main">
        <div>
          <p class="title">Tel</p>
          <p>{{ booking.contact_number }}</p>
        </div>
        <div>
          <p class="title">Email</p>
          <p>{{ booking.contact_email }}</p>
        </div>
        <div>
          <p class="title" v-if="booking.extra">Extra</p>
          <p>{{ booking.extra }}</p>
        </div>
      </div>
      <div class="booking-actions">
        <button>Contact</button>
        <button class="warning" @click="deleteBooking(booking._id)">Delete</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api } from 'services/api'
import moment from 'moment'
import booking from 'img/list.png'
import listview from 'img/listview.png'
import gridview from 'img/gridview.png'

export default {
  props: ['id'],
  mounted () {
    this.getData()
  },
  data () {
    return {
      restaurant: null,
      loading: true,
      bookings: null,
      img: {
        booking,
        listview,
        gridview
      },
      viewType: 'list'
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
    },
    formatDate (dt) {
      return moment(dt).format('MM/DD/YYYY')
    },
    async deleteBooking (id) {
      try {
        await api('delete', 'Booking/Delete', { id })

        this.bookings = this.bookings.filter(x => x._id !== id)
      } catch (error) {
        console.log(error)
      }
    },
    addNewBooking () {
      this.$router.push({ name: 'NewBooking' })
    },
    toggleViewtype () {
      this.viewType = this.viewType === 'grid' ? 'list' : 'grid'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/global.scss';

  .page-title {
    margin: 0 auto 50px;
  }

  .booking-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

  .bookings-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: row wrap;
  }

  .booking {
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    margin: 1rem;
    position: relative;
    width: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    box-sizing: border-box;

    &:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .heading {
      background: $primary;
      padding: 10px;
      box-sizing: border-box;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      img {
        height: 50px;
        margin-right: 15px;
      }

      h1 {
        color: #fff;
      }

      h4 {
        color: darken(#fff, 15%);
        font-weight: normal;
        margin-top: 10px;
      }
    }

    .main {
      padding: 10px;
      text-align: center;

      p {
        font-size: 1.4rem;
        color: darken(#fff, 50%);
      }

      .title {
        font-size: 1.6rem;
        color: $dark;
        margin-top: 15px;
      }
    }
  }

  .list {
    .booking {
      width: 100%;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
    }

    .heading {
      width: 200px;
      // align-items: flex-start;

      .info {
        align-self: center;
        margin-left: 20px;
      }

      img {
        height: 40px;
        display: none;
      }
    }

    .main {
      width: 400px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex: 1 1 auto;
      text-align: left;

      > div {
        margin: 0 10px;
      }
    }

    .booking-actions {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column nowrap;
    }
  }

  .booking-actions {
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

  .toggle-viewtype {
    margin: 10px;
    cursor: pointer;

    img {
      height: 30px;
    }
  }
</style>
