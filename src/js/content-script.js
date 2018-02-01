import '../scss/content-script.scss'

const searchTerms = ['communal']

const highlight = (terms) => {
  let paragraphs = document.getElementsByClassName('body')[0]
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
  terms.forEach(term => {
    let searchTerm = new RegExp('(' + term + ')', 'gi')
    console.log(searchTerm)
    body = body.replace(searchTerm, '<span class="highlight">$1</span>')
  })
  paragraphs.innerHTML = body
}

window.onload = highlight(searchTerms)
