<script lang="js">
  import { RouterLink } from 'vue-router'
  import Icon from '@/components/Icon.vue'
  export default {
    mounted() {
      // if(!localStorage.getItem('authCode')||localStorage.getItem('authCode').accessToken===null){
      //   this.logout()
      // }else{
        this.localToData()
        this.spotCallAPI()
        this.toogle = true
      // }
    },
    components: {
      RouterLink,
      Icon,
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
        artists: [],
        playlists: [],
        errors: null,
      }
    },
    watch: {
      'errors': function () {
        this.logout()
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
            .catch(error => this.errors=error)

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
          })

        fetch('https://api.spotify.com/v1/me/top/artists?limit=15', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.authCode.accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.artists = data.items
            console.log(data.items)
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
    <div class="bg-white">
      <h1 class="text-green-500 text-3xl italic text-center py-2 font-bold">Statify</h1>
    </div>
    <div v-if="toogle===true" class="content-box container mx-auto absolute p-2 w-full md:w-1/2 lg:w-1/3">
      <div>
        <h2 class="text-xl text-white">Favourite Artist</h2>
      </div>
      <div class="flex flex-col py-3 px-1 my-3">
        <div class="flex w-full justify-evenly">
          <div class="flex items-end w-24 justify-center"><img :src="artists[1].images[2].url" alt="" class="h-20 w-20 border border-2 shadow-lg shadow-neutral-100 border-neutral-200 rounded-full"></div>
          <div class=" w-24 justify-center"><img :src="artists[0].images[2].url" alt="" class="h-24 w-24 rounded-full border border-2 shadow-lg shadow-yellow-400 border-yellow-500"></div>
          <div class="flex items-end w-24 justify-center"><img :src="artists[2].images[2].url" alt="" class="h-16 w-16 rounded-full border border-2 shadow-lg shadow-amber-600 border-amber-700"></div>
        </div>
        <div class="flex text-white w-full justify-evenly">
          <div class="flex items-start w-24 justify-center"><span class="truncate text-xd">{{ artists[1].name }}</span></div>
          <div class="flex items-start w-24 justify-center"><span class="truncate text-md">{{ artists[0].name }}</span></div>
          <div class="flex items-start w-24 justify-center"><span class="truncate text-xs">{{ artists[2].name }}</span></div>
        </div>
        <div class="flex flex-wrap justify-evenly">
        <template v-for="(artist,index) in artists" :key="index++">
          <div v-if="index!==1&&index!==2&&index!==3" class="flex items-center bg-white rounded-xl p-1 mx-1 mt-1">
            <img :src="artist.images[2].url" alt="test" class="h-5 w-5 rounded-xl">
            <span class="text-xs px-3 text-gray-600 font-semibold italic">{{ artist.name }}</span>
          </div>
        </template>
        </div>
      </div>
      <div class="flex flex-col py-3 px-1 w-full">
        <h2 class="text-xl text-white">Favourite Playlist</h2>
      </div>
      <div class="flex px-1 justify-evenly">
        <div v-for="playlist in playlists" class="flex flex-wrap">
          <div class="w-20">
            <img :src="playlist.images[1].url" alt="" class="h-20 w-20">
            <div class="flex flex-col">
              <span class="truncate text-white text-md">{{ playlist.name }}</span>
              <span class="text-xs truncate text-gray-300">{{ 'Song: '+playlist.tracks.total}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center pt-5">
        <div class="flex items-center bg-white rounded-xl p-1">
          <img :src="user.url" alt="test" class="h-6 w-6 rounded-xl">
          <span class="text-md px-3 text-gray-600 font-semibold italic">{{ user.name }}</span>
          <button>
            <icon name="icon_logout" class="h-4 w-4 fill-red-500 hover:fill-red-600 focus:fill-red-100" @click="logout" />
          </button>
        </div>
      </div>
      
    </div>
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