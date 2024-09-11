/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"3zS05Y3WBGYmp4yl","label":"Anime","bookmarks":[{"id":"DafMn5kXuh3F3TmX","label":"9anime","url":"https://9animetv.to/"},{"id":"etWWZbH7W9x0q8hP","label":"MangaDex","url":"https://mangadex.org/"},{"id":"3eZmJKwXIbe1wMQl","label":"Anilist","url":"anilist.co/user/NoFloli/"},{"id":"dfuHLF1owHKwPcXv","label":"‎ ","url":""}]},{"id":"xZLIcKfjVMg31Qyq","label":"Tools","bookmarks":[{"id":"zLAkgSosAVJ9DtHE","label":"","url":"https://www.happyhues.co/"},{"id":"YxijCFx94zaJss08","label":"GlaDOS","url":"https://www.nerdaxic.com/glados-voice-generator/"},{"id":"YORUjddhec6Un72W","label":"Happy Hues","url":"https://www.happyhues.co/"},{"id":"j2dvPLbuD6ZsVEnc","label":"‎ ","url":""}]},{"id":"UL3OpHpMiZGiyWJH","label":"Photos","bookmarks":[{"id":"cbIYMTt70dWK0duI","label":"Inspiration","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"NJWHz4Qz0wVUofiH","label":"‎ ","url":""}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
