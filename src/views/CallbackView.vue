<script lang="js">
    import { RouterLink } from 'vue-router'
    export default {
        mounted() {
            this.getTokenURL()
        },
        component: {
            RouterLink,
        },
        data() {
            return {
                authorize: {
                    accessToken: null,
                    tokenType: null,
                    expiredIn: null,
                    state: null,
                },
            }
        },
        methods: {
            getTokenURL: function(){
                const fullUrl = window.location.href
                const queryString = fullUrl.replace(import.meta.env.VITE_REDIRECT_URI+'#', '?')
                const urlParams = new URLSearchParams(queryString)
                this.authorize.accessToken = urlParams.get('access_token')
                this.authorize.tokenType = urlParams.get('token_type')
                this.authorize.expiredIn = urlParams.get('expires_in')
                this.authorize.state = urlParams.get('state')
                if(urlParams.get('access_token')!=null){
                  this.setTokenLocal()
                } else {
                  this.$router.replace('/login')
                }
            },
            setTokenLocal: function(){
                localStorage.setItem("authCode", JSON.stringify(this.authorize))
                this.$router.replace('/')
            }
        }
    }
</script>
<template>
</template>
