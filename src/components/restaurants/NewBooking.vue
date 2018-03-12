<template>
  <div class="new-booking-wrapper">
    <div class="new-booking-form">
      <div class="input-container">
        <label for="booking.name">Name</label>
        <input type="text" name="booking.name" v-model="booking.name">
      </div>
      <div class="input-container">
        <label for="booking.time">Time</label>
        <vue-timepicker v-model="time" format="HH:mm"></vue-timepicker>
      </div>
      <div class="input-container">
        <label for="booking.date">Date</label>
        <datepicker :disabled="disabled" v-model="booking.date" name="booking.date"></datepicker>
      </div>
      <div class="input-container">
        <label for="booking.number_of_people">Number of people</label>
        <input type="text" name="booking.number_of_people" v-model="booking.number_of_people">
      </div>
      <div class="input-container">
        <label for="booking.contact_number">Contact number</label>
        <input type="text" name="booking.contact_number" v-model="booking.contact_number">
      </div>
      <div class="input-container">
        <label for="booking.email">Email</label>
        <input type="text" name="booking.email" v-model="booking.contact_email">
      </div>
      <div class="input-container">
        <label for="booking.extra_information">Extra information</label>
        <textarea type="text" name="booking.extra_information" v-model="booking.extra"></textarea>
      </div>
      <div class="input-container">
        <input type="submit" name="submit" @click="submitNewBooking">
      </div>
    </div>
  </div>
</template>

<script>
import { api } from 'services/api'
import Datepicker from 'vuejs-datepicker'
import VueTimepicker from 'vue2-timepicker'

export default {
  props: ['id'],
  data () {
    return {
      booking: {
        restaurant: this.id,
        name: '',
        time: '',
        date: '',
        number_of_people: '',
        contact_number: '',
        contact_email: '',
        extra: ''
      },
      time: {
        HH: '',
        mm: ''
      },
      disabled: {
        to: new Date()
      }
    }
  },
  methods: {
    async submitNewBooking () {
      console.log(this.booking)
      this.booking.time = `${this.time.HH}:${this.time.mm}`
      await api('post', 'Booking/NewBooking', this.booking)

      this.$router.push({ name: 'Bookings', params: { id: this.id } })
    }
  },
  components: {
    Datepicker,
    VueTimepicker
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';
  .new-booking-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
  }

  .input-container {
    margin: 20px 10px;
    width: 340px;

    input,
    textarea,
    .vdp-datepicker {
      width: 100%;
      height: 50px;
      font-size: 2rem;
    }

    textarea {
      height: 100px;
    }
  }

  label {
    margin-bottom: 10px;
    display: block;
  }
</style>
