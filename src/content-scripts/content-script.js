import './content-script.css'

const browser = chrome
const storageArea = browser.storage.sync
const paragraphs = document.getElementsByClassName('body')[0]

// Get body of main text block
const getBody = () => {
  let body
  if (location.href.includes('realestate')) {
    let extra = paragraphs.getElementsByTagName('span')[0]
    if (extra) {
      let link = paragraphs.getElementsByClassName('more interesting')[0]
      link.remove()
      extra.remove()
      body = paragraphs.innerHTML + extra.getAttribute('data-description')
    } else {
      body = paragraphs.innerHTML
    }
  } else if (location.href.includes('domain')) {
    let readMore = document.getElementsByClassName("button is-outline listing-details__description-button")[0]
    readMore.click()
    body = document.getElementsByClassName('listing-details__description')[0].innerHTML
    console.log(body)
  }
  return body
}

// highlight the given terms in the body of the text
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

storageArea.get(
  'terms',
  storage => {
    getBody().then(
      body => replaceBody(storage.terms, body)
    )
  }
)


browser.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.from === 'popup') {
      sendResponse({hello: 'world!'})
    } else {
      sendResponse({fail: 'whale'})
    }
  }
)
