'use strict'

function getYouTubeData(url) {
    return axios.get(url)
        .then(res => res.data)


}

