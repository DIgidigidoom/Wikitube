'use strict'


function onInit() {
    saveToStorage('testKey', { hello: 'world' });
    console.log(localStorage.getItem('testKey'));
    getYouTubeData('Beatles')
        .then(videos => renderYoutube(videos))
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })

    getWikiData('Beatles')
        .then(results => {
            renderWikiResults(results)
        })
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })

}

function renderYoutube(res) {
    let strHTML = ''
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
    const elWikiContainer = document.querySelector('.wiki-container')
    res.forEach(result => {
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

    if (srchTxt === '' || srchTxt === undefined) return

    getYouTubeData(srchTxt)
        .then(videos => renderYoutube(videos))
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })
    getWikiData(srchTxt)
        .then(results => renderWikiResults(results))
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })

}