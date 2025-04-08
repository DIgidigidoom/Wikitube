'use strict'

function getYouTubeData(url) {
    return axios.get(url)
        .then(res => prepareData({ results: res.data }))
    // .then(res => res.data)

}
function getWikiData(url) {
    return axios.get(url)
        .then(res => res.data)
}


function prepareData({ results }) {
    return results.items.map(({ snippet, id }) =>
    ({
        title: snippet.title,
        thumbnail: snippet.thumbnails.default.url,
        urlId: id.videoId
    }))
}

