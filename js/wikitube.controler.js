'use strict'
const YT_API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=beatles&maxResults=5&key=AIzaSyBc-QFw-FOHqiesLtRz1hXTJ5MpOwdMya8'

function onInit() {
    getYouTubeData(YT_API_URL)
        .then(videos => renderYoutube(videos))
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })

}

function renderYoutube(res) {
    let strHTML = ''
    console.log(res)
    const elYoutubeContainer = document.querySelector('.top-five-yt-results-container')
    res.forEach(video => {
        strHTML += `
        <div class="video-thumbnail" data="${video.urlId}" onclick="onRenderYoutubePlayer('${video.urlId}')">
            <img class="video_image" src="${video.thumbnail}" alt="">
            <p class="video-title">${video.title}</p>
        </div>`
    })

    elYoutubeContainer.innerHTML = strHTML
}

function onRenderYoutubePlayer(urlId) {
    const elmediaPlayer = document.querySelector('iframe')
    elmediaPlayer.src = `https://www.youtube.com/embed/${urlId}`
}