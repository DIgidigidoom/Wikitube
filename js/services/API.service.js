'use strict'

function getYouTubeData(url) {
    return axios.get(url)
        .then(res => prepareData({ results: res.data }))
    // .then(res => res.data)

}


function prepareData({ results }) {
    debugger
    return results.items.map(({ snippet, id }) =>
    ({
        title: snippet.title,
        thumbnail: snippet.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${id.videoId}`
    }))
}

