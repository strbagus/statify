<script lang="js">
  export default {
    mounted() {
      const tokenValid = localStorage.getItem('tokenCode')
      if(tokenValid!=='null'){this.$router.replace('/')}
    },
    data() {
      return {
        authUrl: null,
      }
    },
    mounted (){
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
      const state = this.generateString(16);
      const scope = 'user-read-private user-read-email';

      let authUrl = 'https://accounts.spotify.com/authorize?response_type=token&client_id='+clientId+'&scope'+encodeURI(scope)+'&redirect_uri='+redirect_uri+'&state='+state
      this.authUrl = authUrl.replace(' ', '')
    },
    methods: {
      generateString: function(length) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
      },
      testBtn: function() {
        window.location.href=this.authUrl
      }
    },
  }
</script>
<template>
  <main class="container mx-auto">
    <div class="auth-box absolute w-full md:w-1/2">
      <div class="auth mx-auto flex max-w-sm overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div class="hidden bg-cover lg:block lg:w-1/2" style="background-image:url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')"></div>
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-center text-gray-700">Statify</h2>
            <p class="text-xl text-center text-gray-600">Login With Spotify Account!</p>
          </div>
          <div class="flex flex-col">
            <button class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-200 transform border rounded-lg hover:bg-gray-50" @click="testBtn" >
              <div class="px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1DB954" class="bi bi-spotify" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
                </svg>
              </div>
              <span class="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Spotify
              </span>
            </button>
            <p class="text-gray-600 text-xs mt-3 text-center">
              We do not save your account credential
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
  main{
    min-height: 100vh;
  }
  .auth-box{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>