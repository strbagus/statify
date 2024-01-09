<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  document.cookie.match(/^(.*;)?\s*access_token\s*=\s*[^;]+(.*)?$/) || !route.hash
  ? router.replace('/login') : setTokenLocal(authorize)
})

const extractHashURL = () => {
  const rawHash = route.hash
  const hash = rawHash.slice(1)
  const hashParamsArray = hash.split('&');
  const hashParams = {};
  hashParamsArray.forEach(param => {
    const [key, value] = param.split('=');
    hashParams[key] = value;
  })
  return hashParams;
}
const authorize: Object = extractHashURL()

const setCookie = (name: string, value: string, expires: any) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`
}
const setTokenLocal = (data: any) => {
  const expires = new Date(Date.now() + data.expires_in * 1000)
  setCookie('accessToken', data.access_token, expires)
  setCookie('tokenType', data.token_type, expires)
  setCookie('state', data.state, expires)

  router.replace('/')
}
</script>
<template></template>
