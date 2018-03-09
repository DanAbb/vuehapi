<template>
  <div class="all-restaurants-wrapper" >
    <h1 class="page-title">My Restaurants</h1>
    <div
      v-if="!loading"
      class="restaurant"
      v-for="restaurant in restaurants" :key="restaurant._id">
      <div class="name-wrapper">
        <h4>Restaurant Name</h4>
        <p>{{ restaurant.name }}</p>
      </div>
      <div class="address-wrapper">
        <h4>Restaurant Address</h4>
        <p>{{ restaurant.address }}</p>
      </div>
      <div class="telephone-wrapper">
        <h4>Restaurant telephone</h4>
        <p>{{ restaurant.telephone }}</p>
      </div>
      <div class="options-wrapper">
        <button @click="gotorestaurant(restaurant._id)">More Details</button>
      </div>
      <div class="options-wrapper">
        <button @click="deleterestaurant(restaurant._id)">Delete Restaurant</button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from 'services/api'
import { mapGetters } from 'vuex'

export default {
  async created () {
    this.loading = true
    const restaurants = await api('get', 'Restaurants')
    this.$store.commit('update_restaurants', restaurants.data)
    this.loading = false
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'restaurants'
    ])
  },
  methods: {
    gotorestaurant (id) {
      this.$router.push({ name: 'Restaurant', params: { id } })
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
  @import '~styles/global.scss';

  .restaurant {
    display: flex;
    margin: 20px;
    border: 1px solid $dark;

    > * {
      margin: 10px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-flow: column nowrap;

      h4, p {
       margin: 10px 0;
      }
    }

    h3 {
      font-weight: normal;
    }
  }

</style>
