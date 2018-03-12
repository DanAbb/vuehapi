<template>
  <div class="dashboard-wrapper">
    <div class="menu">
      <div class="logo">
        <img :src="img.logo" alt="table systems">
      </div>
      <div class="profile">
        <div class="picture">
          <div class="img"></div>
        </div>
        <div class="text">
          <h1>Dan Abbott</h1>
        </div>
      </div>
      <div class="action-button">
        <button class="primary" @click="newRestaurant">Add restaurant</button>
      </div>
      <div class="menu-items">
        <div class="item">
          <img :src="img.home" alt="Overview">
          <p>Overview</p>
        </div>
        <div class="item" @click="getRestaurant">
          <img :src="img.dinner" alt="Restaurants">
          <p>Restaurants</p>
        </div>
        <div class="item">
          <img :src="img.list" alt="Bookings">
          <p>Bookings</p>
        </div>
      </div>
      <div class="sign-out">
        <h4 @click="signout">Sign out</h4>
      </div>
    </div>
    <div class="content-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import logo from 'img/logo.png'
import dinner from 'img/dinner.png'
import home from 'img/home.png'
import list from 'img/list.png'
import { api } from 'services/api'
import CookieStorage from 'services/cookie.storage'

export default {
  data () {
    return {
      img: {
        logo,
        dinner,
        home,
        list
      }
    }
  },
  methods: {
    async getRestaurant () {
      this.$router.push({ name: 'AllRestaurants' })
    },
    async newRestaurant () {
      this.$router.push({ name: 'NewRestaurant' })
    },
    async signout () {
      const refreshToken = CookieStorage.getRefreshToken()
      await api('post', 'signout', { refreshToken })

      CookieStorage.setUserId('')
      CookieStorage.setAuthToken('')
      CookieStorage.setRefreshToken('')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

  $menu-width: 240px;

  .menu {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: $menu-width;
    background: $primary;
    padding: 10px;
    box-sizing: border-box;
    color: $lightest;

    h1 {
      color: $lightest;
    }
  }

  .content-main {
    margin-left: $menu-width;
    padding: 50px;
    box-sizing: border-box;
    background: $background;
  }

  .logo {
    margin: 10px 20px auto;
    box-sizing: border-box;

    img {
      width: 100%;
      height: auto;
    }
  }

  .profile {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    margin-top: 20px;
  }

  .picture {
    .img {
      height: 150px;
      width: 150px;
      border-radius: 1000px;
      border: 2px solid $lightest;
    }
  }

  .text {
    h1 {
      font-weight: 300;
    }
  }

  .action-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px auto;

    button {
      margin: 0 auto;
    }
  }

  .menu-items {
    margin-left: 20px;

    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 20px auto;
      cursor: pointer;

      &:hover {
        animation: pulse;
        animation-duration: .4s;
        animation-timing-function: ease-in-out;
      }

      img {
        height: 25px;
        width: auto;
        margin-right: 10px;
      }

      p {
        color: $lightest;
        font-size: 1.4rem;
      }
    }
  }

  .sign-out {
    text-align: center;
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
    margin-left: 20px;
    box-sizing: border-box;
    cursor: pointer;

    h4 {
      color: $lightest;
    }
  }
</style>
