<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { cookieValueOrNull } from '@/utils/isCookieExist.js'
import Icon from '@/components/Icon.vue'

const router = useRouter()

onMounted(() => {
  spotCallAPI()
  timeRange.value = 'short_term'
  fetchAPI('me/top/artists?limit=7', 'artist')
  fetchAPI('me/top/tracks?limit=4', 'song')
})

const user = reactive({
  name: null,
  url: null,
})
const displays = reactive({
  nav: false,
  artist: true,
  playlist: false,
  song: true,
  show: false,
})
const timeRange = ref<string>("short_term")
const artists = ref<any>([])
const songs = ref<any>([])
const errors = ref<any>(null)

const fetchAPI = async (rawUrl: string, name: string) => {
  const url = `${import.meta.env.VITE_ROOT_API_URL}${rawUrl}&time_range=${timeRange.value}`
  try {
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookieValueOrNull('accessToken'),
      }
    })
    const data = await response.json()
    name == 'artist' ? artists.value = data.items : songs.value = data.items
  } catch (error) {
    import.meta.env.VITE_APP_ENV == 'dev' && console.error('Error fetching data:', error)
  }
}
const spotCallAPI = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_ROOT_API_URL}me`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookieValueOrNull('accessToken'),
      },
    })
    const data = await response.json()
    user.name = data.display_name
    user.url = data.images.length > 0 ? data.images[0].url : null
  } catch (error) {
    import.meta.env.VITE_APP_ENV == 'dev' && console.error('Error fetching data:', error)
  }
}
const logout = () => {
  document.cookie = 'state=; Max-Age=0'
  document.cookie = 'tokenType=; Max-Age=0'
  document.cookie = 'accessToken=; Max-Age=0'
  router.replace('/login')
}
watch(errors, () => {
  import.meta.env.VITE_APP_ENV == 'dev' && console.log(errors)
  logout()
})
watch(timeRange, () => {
  fetchAPI('me/top/artists?limit=7', 'artist')
  fetchAPI('me/top/tracks?limit=4', 'song')
  import.meta.env.VITE_APP_ENV == 'dev' && console.log(`TimeRange Changed to: ${timeRange.value}`)
})

</script>

<template>
  <main class="min-h-screen flex flex-col justify-center items-center relative py-12">
    <div v-if="displays.nav" class="fixed h-screen w-full bg-neutral-900 opacity-70 z-30 cursor-pointer"
      @click="displays.nav = false"></div>
    <div class="fixed top-0 right-0 z-50">
      <input type="checkbox" v-model="displays.nav" id="nav-toggle" class="hidden">
      <label for="nav-toggle" class="text-neutral-200 cursor-pointer">
        <svg v-if="!displays.nav" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
          <path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z" />
        </svg>
      </label>
    </div>
    <div v-if="displays.nav"
      class="bg-gradient-to-t from-zinc-800 to-neutral-800 h-screen w-[300px] pt-12 px-10 fixed top-0 right-0 z-40 flex flex-col justify-between">
      <div>
        <div class="flex">
          <img v-if="user.url !== null" :src="user.url" alt="profile" class="h-6 w-6 rounded-xl">
          <span class="text-white px-3 text-lg truncate font-semibold italic">{{ user.name }}</span>
        </div>
        <div class="">
          <div class="text-xl text-white mt-5 mb-2">Top Items:</div>
          <ul>
            <li><input type="checkbox" v-model="displays.artist" id="artist-toggle"><label class="text-white"
                for="artist-toggle"> Artists</label></li>
            <li><input type="checkbox" v-model="displays.song" id="song-toggle"><label class="text-white"
                for="song-toggle"> Tracks</label></li>
          </ul>
        </div>
        <div>
          <div class="text-xl text-white mt-5 mb-2">Time Range:</div>
          <ul>
            <li><input type="radio" v-model="timeRange" value="long_term" id="time-long"><label class="text-white"
                for="time-long"> Several Years</label></li>
            <li><input type="radio" v-model="timeRange" value="medium_term" id="time-medium"><label class="text-white"
                for="time-medium"> 6 Months</label></li>
            <li><input type="radio" v-model="timeRange" value="short_term" id="time-short"><label class="text-white"
                for="time-short"> 4 Weeks</label></li>
          </ul>

        </div>
      </div>
      <div>
        <div class="flex justify-center">
          <div
            class="flex items-center bg-zinc-700 rounded-xl py-1 px-3 cursor-pointer hover:border-zinc-300 border border-transparent duration-100"
            @click="logout">
            <div class="text-white mr-3">Logout</div>
            <icon name="icon_logout" class="h-4 w-4 fill-red-500" />
          </div>
        </div>
        <div class="mt-10 mb-2 flex justify-center text-zinc-700 text-sm italic">
          Author:<a href="https://strbagus.com" class="text-zinc-400 font-semibold" target="blank">&nbsp;strbagus</a>
        </div>
      </div>
    </div>
    <div class="max-w-[200px] pb-5">
      <a href="https://open.spotify.com/">
        <img src="/SpotifyWText.svg" alt="Spotify Icon with Text">
      </a>
    </div>
    <div v-if="displays.artist === true" class="w-full md:max-w-[450px] mx-auto px-2">
      <h2 class="text-2xl text-semibold text-white">Artists</h2>
      <div v-if="artists.length > 0">
        <div class="flex w-full justify-evenly">
          <div v-if="artists[1]" class="flex flex-col items-center w-1/3 justify-end">
            <img :src="artists[1].images[2].url" :alt="artists[1].name"
              class="w-20 border-2 shadow-lg shadow-neutral-100 border-neutral-200">
            <div
              class="mt-2 text-base text-white w-full text-center hover:text-cyan-300 flex justify-center items-center group"
              :title="`Listen ${artists[1].name}'s songs on Spotify`">
              <div class="h-4 w-4 mr-1">
                <icon name="spotify" class="h-4 w-4 group-hover:fill-[#1DB954]" />
              </div>
              <a :href="artists[1].external_urls.spotify" target="blank" class="mr-4 truncate">{{ artists[1].name }}</a>
            </div>
          </div>
          <div v-if="artists[0]" class="flex flex-col items-center w-1/3 justify-end">
            <img :src="artists[0].images[2].url" :alt="artists[0].name"
              class="w-24 border-2 shadow-lg shadow-yellow-400 border-yellow-500">
            <div
              class="mt-2 text-lg text-white w-full text-center hover:text-cyan-300 flex justify-center items-center group"
              :title="`Listen ${artists[0].name}'s songs on Spotify`">
              <div class="h-4 w-4 mr-1">
                <icon name="spotify" class="h-4 w-4 group-hover:fill-[#1DB954]" />
              </div>
              <a :href="artists[0].external_urls.spotify" target="blank" class="mr-4 truncate">{{ artists[0].name }}</a>
            </div>
          </div>
          <div v-if="artists[2]" class="flex flex-col items-center w-1/3 justify-end">
            <img :src="artists[2].images[2].url" :alt="artists[2].name"
              class="w-16 border-2 shadow-lg shadow-amber-600 border-amber-700">
            <div
              class="mt-2 text-base text-white w-full text-center hover:text-cyan-300 flex justify-center items-center group"
              :title="`Listen ${artists[2].name}'s songs on Spotify`">
              <div class="h-4 w-4 mr-1">
                <icon name="spotify" class="h-4 w-4 group-hover:fill-[#1DB954]" />
              </div>
              <a :href="artists[2].external_urls.spotify" target="blank" class="mr-4 truncate">{{ artists[2].name }}</a>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div v-for="artist in artists.slice(3, 9)" class="px-2 py-1 w-1/2">
            <div class="bg-gradient-to-r to-neutral-700 from-zinc-800 rounded-r-lg flex overflow-hidden">
              <div class="w-1/4 relative">
                <img :src="artist.images[2].url" :alt="artist.name" class="h-full w-full">
              </div>
              <div class="text-white w-3/4 flex items-center pl-2 pr-1 group">
                <a :href="artist.external_urls.spotify" target="blank" class="truncate hover:text-cyan-300"
                  :title="`Listen ${artist.name}'s songs on Spotify`">{{ artist.name }}</a>
                <div class="absolute right-0 bottom-1">
                  <icon name="spotify" class="h-4 w-4 mr-1 group-hover:fill-[#1DB954]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="mt-1 text-center text-white">No Artists Data Found.</div>
      </div>
    </div>
    <div v-if="displays.song" class="mt-5 w-full md:max-w-[450px] mx-auto px-2">
      <h2 class="text-2xl text-semibold text-white">Tracks</h2>
      <div v-if="songs.length > 0" class="w-full">
        <div class="flex flex-wrap justify-evenly">
          <div v-for="song in songs" class="px-2 py-1 w-1/2">
            <div class="bg-gradient-to-r to-neutral-700 from-zinc-800 rounded-r-lg overflow-hidden flex">
              <div class="w-1/4 relative" style="aspect-ratio: 1/1">
                <img :src="song.album.images[2].url" :alt="`${song.name} - ${song.artists[0].name}`"
                  class="absolute top-0 left-0 w-full h-full object-cover">
              </div>
              <div class="py-1 text-white w-3/4 px-2 flex flex-col justify-between group">
                <div class="text-sm truncate hover:text-cyan-300">
                  <a :href="song.external_urls.spotify" class="text-sm truncate hover:text-cyan-300" target="blank"
                    :title="`Listen ${song.name} on Spotify`">{{ song.name }}</a>
                </div>
                <div class="text-xs text-neutral-300 flex justify-between items-center">
                  <div>
                    <a :href="song.artists[0].external_urls.spotify" target="blank" class="truncate hover:text-cyan-300"
                      :title="`Listen ${song.artists[0].name}'s songs on Spotify`">{{
                        song.artists[0].name }}</a>
                  </div>
                  <div class="h-4 w-4">
                    <icon name="spotify" class="h-4 w-4 group-hover:fill-[#1DB954]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="mt-1 text-white text-center">No Tracks Data Found.</div>
      </div>
    </div>
  </main>
</template>
