

const YT_SRCH_STORAGE = 'youtubeDB'
const WIKI_SRCH_STORAGE = 'wikiDB'




var gYoutubeChache = loadFromStorage(YT_SRCH_STORAGE) || []
var gWikiCache = loadFromStorage(WIKI_SRCH_STORAGE) || {}


function getYouTubeData(srchTxt) {
    const YT_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${srchTxt}&maxResults=5&key=AIzaSyAKEcEf8b5PWl0u9i74mrnbqqrL4HhgOXw`
    if (gYoutubeChache[srchTxt]) return Promise.resolve(gYoutubeChache[srchTxt])
    return axios.get(YT_API_URL).then(({ data }) => {
        
        gYoutubeChache[srchTxt] = prepareData(data)
        console.log('storage: ',gYoutubeChache)
        saveToStorage(YT_SRCH_STORAGE, gYoutubeChache)
        
        return gYoutubeChache[srchTxt]
    })
   

}
function getWikiData(srchTxt) {

    const WIKI_API_URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${srchTxt}&format=json`

    if (gWikiCache[srchTxt]) return Promise.resolve(gWikiCache[srchTxt])

    return axios.get(WIKI_API_URL).then(({ data }) => {
        gWikiCache[srchTxt] = data.query.search.slice(0, 3)
        saveToStorage(WIKI_SRCH_STORAGE, gWikiCache)

        return gWikiCache[srchTxt]
    })


}


function prepareData(results) {
    return results.items.map(({ snippet, id }) =>
    ({
        title: snippet.title,
        thumbnail: snippet.thumbnails.default.url,
        urlId: id.videoId
    }))
}

