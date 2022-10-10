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
        user: {
          name: null,
          url: null,
        },
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
              this.user.name = data.display_name
              this.user.url = data.images[0].url
            })
            .catch(error => logout())
        fetch('https://api.spotify.com/v1/me/playlists?limit=4', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.authCode.accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.playlists = data.items
            console.log(data.items)
          })
        fetch('https://api.spotify.com/v1/me/top/artists', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.authCode.accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.playlists = data
            console.log(data)
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
    <div v-if="toogle===true" class="content-box container mx-auto absolute p-2 bg-blue-500 w-full md:w-1/2 lg:w-1/3">
      <div class="flex flex-col bg-green-500 py-3 px-1">
        <div class="flex bg-red-500 w-full justify-evenly">
          <div class="flex items-end bg-green-500 w-24 justify-center"><img :src="user.url" alt="" class="h-20 w-20 rounded-full"></div>
          <div class="bg-blue-500 w-24 justify-center"><img :src="user.url" alt="" class="h-24 w-24 rounded-full"></div>
          <div class="flex items-end bg-yellow-500 w-24 justify-center"><img :src="user.url" alt="" class="h-16 w-16 rounded-full"></div>
        </div>
        <div class="flex bg-red-500 w-full justify-evenly">
          <div class="flex items-start bg-green-500 w-24 justify-center"><span class="text-lg">Bol4</span></div>
          <div class="flex items-start bg-green-500 w-24 justify-center"><span class="text-xl">IU</span></div>
          <div class="flex items-start bg-green-500 w-24 justify-center"><span class="text-md">KimSejeong</span></div>
        </div>
      </div>
      <div class="flex flex-col bg-red-500 py-3 px-1 w-full">
        genre
      </div>
      <div class="flex bg-yellow-500 py-3 px-1 justify-evenly">
        <div v-for="playlist in playlists" class="bg-red-500 flex flex-wrap">
          <div class="mx-3">
            <img :src="playlist.images[1].url" alt="">
            <h3>{{ playlist.name }}</h3>
            <span class="text-xs">{{ playlist.owner.display_name+' '+playlist.tracks.total}}</span>
          </div>
        </div>
      </div>
      <div class="flex bg-white rounded-xl p-2 items-center">
        <img :src="user.url" alt="test" class="h-10 w-10 rounded-xl">
        <span class="text-xl px-3 text-gray-600 font-semibold italic">{{ user.name }}</span>
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