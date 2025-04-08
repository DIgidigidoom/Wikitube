'use strict'
const YT_API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=beatles&maxResults=5&key=AIzaSyBc-QFw-FOHqiesLtRz1hXTJ5MpOwdMya8'

function onInit() {
    getYouTubeData(YT_API_URL)
        .then(videos=>renderYoutube(videos))
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })

}

function renderYoutube(res) {
    let strHTML = ''
    console.log(res)
    const elYoutubeContainer = document.querySelector('.top-five-yt-results-container') 

}