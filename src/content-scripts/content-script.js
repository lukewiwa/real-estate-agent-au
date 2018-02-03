import './content-script.scss'

const storageArea = chrome.storage.sync
const paragraphs = document.getElementsByClassName('body')[0]

const getBody = () => {
  let extra = paragraphs.getElementsByTagName('span')[0]
  let body
  if (extra) {
    let link = paragraphs.getElementsByClassName('more interesting')[0]
    link.remove()
    extra.remove()
    body = paragraphs.innerHTML + extra.getAttribute('data-description')
  } else {
    body = paragraphs.innerHTML
  }
  return body
}

const highlight = (terms, body) => {
  terms.forEach(term => {
    let searchTerm = new RegExp('(' + term.word + ')', 'gi')
    body = body.replace(searchTerm, '<span class="highlight">$1</span>')
  })
  return body
}

const replaceBody = (terms, body) => {
  paragraphs.innerHTML = highlight(terms, body)
}

window.onload = storageArea.get(
  'terms',
  storage => {
    let body = getBody()
    replaceBody(storage.terms, body)
  }
)
