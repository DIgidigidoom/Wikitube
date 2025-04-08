'use strict'
let YT_API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=beatles&maxResults=5&key=AIzaSyBc-QFw-FOHqiesLtRz1hXTJ5MpOwdMya8'
let WIKI_API_URL = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=beatles&format=json'

function onInit() {
    getYouTubeData(YT_API_URL)
        .then(videos => renderYoutube(videos))
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })

    getWikiData(WIKI_API_URL)
        .then(results => renderWikiResults(results))
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

function renderWikiResults(res) {
    let strHTML = ''
    const results = res.query.search
    console.log(results)
    const elWikiContainer = document.querySelector('.wiki-container')
    results.forEach(result => {
        strHTML += `
        <div class="wiki-result">
            <p class="result-title">${result.title}</p>
            <p class="result-summary">${result.snippet}</p>
        </div>`
    })
    elWikiContainer.innerHTML = strHTML
}

function onRenderYoutubePlayer(urlId) {
    const elmediaPlayer = document.querySelector('iframe')
    elmediaPlayer.src = `https://www.youtube.com/embed/${urlId}`
}

function onSearch(ev) {
    const srchTxt = ev.target.value
    YT_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${srchTxt}&maxResults=5&key=AIzaSyBc-QFw-FOHqiesLtRz1hXTJ5MpOwdMya8`
    WIKI_API_URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${srchTxt}&format=json`
    getYouTubeData(YT_API_URL)
        .then(videos => renderYoutube(videos))
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })
    getWikiData(WIKI_API_URL)
        .then(results => renderWikiResults(results))
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })

}