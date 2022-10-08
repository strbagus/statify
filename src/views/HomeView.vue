<script lang="js">
  import { RouterLink } from 'vue-router';
  export default {
    mounted() {
      if(localStorage.getItem('authCode')){
        this.localToData()
      }
      // if(this.authCode.accessToken===null){this.$router.replace('/login')}
      this.spotUser()
    },
    component: {
      RouterLink,
    },
    data() {
      return {
        authCode: {
          accessToken: null,
          tokenType: null,
          expiredIn: null,
          state: null,
        },
        user: [],
      }
    },
    methods: {
      localToData: function(){
        const authCode = JSON.parse(localStorage.getItem('authCode'))
        this.authCode.accessToken = authCode.accessToken
        this.authCode.tokenType = authCode.tokenType
        this.authCode.expiredIn = authCode.expiredIn
        this.authCode.state = authCode.state
      },
      spotUser: function(){
        // fetch('https://api.spotify.com/v1/me', {
        //   method: 'GET',
        //   mode: 'cors',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authentication': 'Bearer '+this.authCode.accessToken,
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     this.user = data
        //   })
      },
    }
  }
</script>

<template>
  <main>
    <h1 class="text-yellow-500 text-3xl">Spotify</h1>
    <router-link to="/login">Login</router-link>
    {{ authCode }}
  </main>
</template>
