<script lang="js">
  export default {
    data() {
      return {
        authUrl: null,
      }
    },
    mounted (){
      const tokenValid = localStorage.getItem('authCode')
      if(tokenValid!==null){
        this.$router.replace('/')
      }else{
        this.getAuthURL()
      }
    },
    methods: {
      generateString: function(length) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      },
      getAuthURL: function() {
        const clientID = import.meta.env.VITE_CLIENT_ID
        const redirect_uri = encodeURI(import.meta.env.VITE_REDIRECT_URI)
        const state = this.generateString(16)
        const scope = 'user-read-email+user-read-private+user-top-read';
        this.authUrl = 'https://accounts.spotify.com/authorize?response_type=token&redirect_uri='+redirect_uri+'&client_id='+clientID+'&scope='+scope+'&state='+state
      },
      authButton: function() {
        window.location.href=this.authUrl
      }
    },
  }
</script>
<template>
  <main class="min-h-screen">
    <div class="relative block md:flex">
      <div class="w-full md:w-1/2 md:h-screen md:flex md:justify-end md:items-center">
        <div class="w-full md:max-w-[450px] h-screen md:max-h-[600px] fixed md:relative">
          <img src="../assets/images/eunji.jpg" class="absolute top-0 left-0 object-cover h-full w-full">
          <div class="absolute bottom-0 w-full flex md:hidden justify-center">
            <div class="pb-5 text-neutral-100 bouncing"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M6 17.59L7.41 19L12 14.42L16.59 19L18 17.59l-6-6z"/><path fill="currentColor" d="m6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="block md:hidden relative h-screen">
      </div>
      <div class="w-full md:1/2 md:h-screen md:flex md:items-center">
        <div class="relative top-0 w-full bg-gradient-to-t from-neutral-900 via-zinc-900 to-transparent">
          <div class="w-full px-6 pt-20 pb-12 md:px-8 lg:w-1/2 flex flex-col justify-between">
            <p class="text-xl text-center text-gray-50">Login With Spotify Account!</p>
              <button class="flex items-center mx-auto px-12 justify-center mt-4 text-gray-50 transition-colors duration-200 transform border rounded-lg hover:bg-neutral-800" @click="authButton" >
                <div class="pr-2 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1DB954" class="bi bi-spotify" viewBox="0 0 16 16"> <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/> </svg>
                </div>
                <span class="py-3 font-bold text-center">
                  Sign in with Spotify
                </span>
              </button>
              <p class="text-gray-50 text-xs mt-3 text-center">
                We do not save your account credential
              </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.bouncing {
  animation:bounce 2.5s infinite;
}
@keyframes bounce {
  0%       { bottom:0; }
  20%, 50% { bottom:20px; }
  35% { bottom: 10px; }
  75%     { bottom:0; }
}
</style>
