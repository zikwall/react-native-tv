<div align="center">
  <img width="100" height="100" src="https://github.com/zikwall/react-native-tv/blob/master/screenshots/PlayHub512.png">
  <h1>PlayHub</h1>
  <h4>Share your playlist here and now!</h4>
  <h5>An application in which users can create and share with their personal or public playlists with other users of the application with the possibility of monetization.</h5>
</div>

## Base Features & Roadmap - dirty

- [ ] Available Platforms
    - [x] Android (minimal support version??)
    - [ ] iOS
    - [ ] Android TV
    - [ ] tvOS
- [x] WebView
    - [x] JW Player _[SSR]_
    - [ ] Plyr _[SSR]_
    - [ ] Video.js _[SSR]_
    - [x] [OpenPlayer.js](https://github.com/openplayerjs/openplayerjs) (SSR)
    - [X] Native player _[CS]_
- [x] Switch between Players
    - [x] JW Player _[SS]_
    - [x] Openplayer.js _[SS]_
    - [x] Native player (origin stream) _[CS]_ - temporary or premium
- [X] Ads
    - [x] Preroll on Video Player (IMA, VAST, etc.)
    - [ ] ADMob
    - [ ] Interstitial 
    - [ ] Other native ad
- [x] Screens
    - [x] Home (TODO caching playlists)
    - [x] Watch
    - [x] Login
    - [x] Register (TODO apply Privacy Policy)
    - [x] Forgot password (left server revision)
    - [ ] Favorites
    - [ ] Own profile
        - [ ] Settings
        - [ ] Repositories
        - [ ] Friends
        - [ ] Messages
        - [ ] Communities
        - [ ] Bookmarks
        - [ ] Liked
        - [ ] Purchases _(maybe)_
    - [ ] User profile
        - [ ] Activity
            - [ ] Hot maps like a github
            - [ ] Feed/Stream
        - [ ] Playlists
            - [ ] User Selected Top Playlists
            - [ ] All User Playlists
        - [ ] Followers
        - [ ] Following
    - [ ] Apps Library _(it might be better to specify related services such as [Vk TV Mini Apps](https://github.com/zikwall/vk-tv-desktop), [enjoy.tv](https://github.com/zikwall/tv-next))_
    - [x] About
    - [x] Terms
    - [x] Copyright
    - [x] Privacy policy
    - [X] FAQ
    - [x] Contacts
    - [ ] Help
    - [ ] Repositories _(deprecated)_
    - [ ] Top (Tabs) _(maybe make deprecated)_
        - [ ] Top 10
        - [ ] Hot
        - [ ] Recommended
        - [ ] Most Popular
- [x] Components
    - [x] Search
    - [x] App preloader
    - [ ] TV program list _(have layout)_
    - [ ] Current TV program _(left server revision, [m3uparse](https://github.com/zikwall/m3uparse))_
- [ ] Native Players
    - [ ] ExoPlayer
    - [ ] JWPlayer SDK
- [ ] Services
    - [x] Auth Primary Client (Login/Pass)
    - [ ] OAuth (VK, FB, TW, Inst.)
- [ ] Premium _(hmm...)_
    - [x] Native Web Player supported by ad-free provider
- [ ] Functions
    - [ ] Save to watch latter
    - [ ] Block Playlist
    - [ ] Save to Playlist
    - [ ] Share outside
    - [ ] Report Playlist/User
      
## Social Roadmap & Features

- [ ] Users
    - [ ] Following
    - [ ] Followers
    - [ ] Ratings
- [ ] Playlist Sharing Repositories
    - [ ] Options
        - [ ] Playlist Name
        - [ ] Category
        - [ ] Private/Public
        - [ ] Native or with AD
        - [ ] User AD link for embedding video players
        - [ ] Autostop sharing by view limits
    - [ ] Functions
        - [ ] Make Private/Public
        - [ ] Rename Playlist
        - [ ] Fork Playlist
        - [ ] Change all available options,
        - [ ] Reset Rating/Top
        - [ ] To Favorite
        - [ ] Add Star
        - [ ] I'm Watch
        - [ ] Merge Request
    - [ ] Sharing Features
        - [ ] Top 10 Playlists
        - [ ] Hot Playlists
        - [ ] Most Viewed
        - [ ] Recommended for you
        - [ ] Likes/Comments/Forks (for own playlist)
        - [ ] Favorites
        - [ ] Playlist History
        - [ ] Question & Answers
        - [ ] Merge Requests, request maybe includes: name, category, playlist link, comment/s
        
## App preview

^_^ | ^_^
--- | --- |
![Load screen](screenshots/load_v5.jpg "Load screen") | ![Home rooms screen](screenshots/home_v6.jpg "Home rooms screen")
![Watch screen](screenshots/watch_v3.jpg "Watch screen") | ![Home rooms screen](screenshots/profile_v5.jpg "Home rooms screen")
![PlayHub screen](screenshots/playhub_v2.jpg "PlayHub screen") | ![Login screen](screenshots/login.jpg "Login screen")
![Register screen](screenshots/register.jpg "Register screen") | ![Menu screen](screenshots/menu_v3.jpg "Register screen")
![Static screen](screenshots/static_example.jpg "Static screen") | ![User Channels screen](screenshots/user_channels_v2.jpg "User channels screen")
![User followers screen](screenshots/user_followers.jpg "User Followers screen") | ![FAQ screen](screenshots/faq_v2.jpg "FAQ screen")
![Forgot screen](screenshots/forgot.jpg "Forgot screen") |

### Related Projects

1. [VK TV Mini App (desktop)](https://github.com/zikwall/vk-tv-desctop)
2. [VK TV Mini App (mobile)](https://github.com/zikwall/vk-tv)
3. [SEO Friendly App by Next,js](https://github.com/zikwall/tv-next)
4. [Backend based on PHP7 via Yii2 (custom module)](https://github.com/zikwall/vk-tv-backend)
5. [Playlist parser (PHP)](https://github.com/zikwall/m3uparse)
6. [Playlist parser (Go)](https://github.com/zikwall/go3uparse)
