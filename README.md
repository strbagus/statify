# Statify - Look Your Spotify Top Item
Display user top artist, playlist, tracks and shows with data from Spotify API.

---

## Preview
![Statify Screenshot Picture](https://s6.imgcdn.dev/Zgwy2.png)

## Setup Your Own
#### Setup Spotify for Developer
- Login into [Spotify for Developer](https://developer.spotify.com/dashboard)
- Create an App
- In App click Edit Settings
- In Redirect URI add `your.url/callback`, example: `http://127.0.0.1:8000/callback`

#### Setup Website
- Git clone this repo
- run `npm install`
- copy `.env.example` to  `.env`
- In `.env` set  `VITE_CLIENT_ID`, `VITE_REDIRECT_URI` & `VITE_CLIENT_SECRET` with client_id, client_secret & redirect URI from [Spotify for Developer](https://developer.spotify.com/dashboard)
- run `npm run dev` or `npm run build`
- that's it


## Tech
- Frontend: [Vue3](https://vuejs.org/)
- CSS Styling: [Tailwindcss](https://tailwindcss.com/)
