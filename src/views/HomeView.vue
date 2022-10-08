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
        // user: {
        //   test: null,
        //   display_name: 'bagusw',
        //   images_url: 'https://i.scdn.co/image/ab6775700000ee85f481b036d08c4dde97633fd1',
        // },
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
        fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': 'Bearer '+this.authCode.accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.user = data
          })
      },
    }
  }
</script>

<template>
  <main>
    <h1 class="text-green-500 text-3xl italic text-center py-2">Statify</h1>
    <div class="content-box container mx-auto bg-yellow-500 absolute p-2">
      <div class="flex bg-red-500 p-2 items-center">
        <img :src="user.images.url" alt="test" class="h-12 w-12 rounded-xl">
        <span class="text-xl px-3">{{ user.display_name }}</span>
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