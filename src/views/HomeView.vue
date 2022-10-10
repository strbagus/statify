<script lang="js">
  import { RouterLink } from 'vue-router';
  export default {
    mounted() {
      if(!localStorage.getItem('authCode')||localStorage.getItem('authCode').accessToken===null){
        this.logout()
      }else{
        this.localToData()
        this.spotCallAPI()
        this.toogle = true
      }
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
        toogle: false,
        user: [],
        playlists: [],
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
      spotCallAPI: function(){
        function handleErrors(response) {
          if (!response.ok) throw new Error(response.status);
          return response;
        }
          fetch('https://api.spotify.com/v1/me', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+this.authCode.accessToken,
            },
          })
            .then(handleErrors)
            .then((response) => response.json())
            .then((data) => {
              this.user = data
            })
            .catch(error => this.logout())

        fetch('https://api.spotify.com/v1/me/playlists?limit=4', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.authCode.accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.playlists = data
          })
      },
      logout: function(){
        localStorage.removeItem('authCode')
        this.$router.replace('/login')
      }
    },
  }
</script>

<template>
  <main>
    <h1 class="text-green-500 text-3xl italic text-center py-2 font-bold">Statify</h1>
    <div v-if="toogle===true" class="content-box container mx-auto absolute p-2">
      <div class="flex bg-yellow-500 py-3 px-1">
        <div v-for="playlist in playlists.items" class="bg-red-500 flex flex-wrap">
          <div class="mx-3">
            <img :src="playlist.images[2].url" alt="">
            <h3>{{ playlist.name }}</h3>
            <span class="text-xs">{{ playlist.owner.display_name+' '+playlist.tracks.total}}</span>
          </div>
        </div>
      </div>
      <div class="flex bg-white rounded-xl p-2 items-center">
        <img :src="user.images[0].url" alt="test" class="h-10 w-10 rounded-xl">
        <span class="text-xl px-3 text-gray-600 font-semibold italic">{{ user.display_name }}</span>
      </div>
    </div>
    <button class="bg-red-500 px-5 py-1 rounded font-semibold" @click="logout">Logout</button>
  </main>
</template>

<style scoped>
  main{
    min-height: 100vh;
  }
  .content-box{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>