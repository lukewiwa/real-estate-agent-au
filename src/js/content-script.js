import '../scss/content-script.scss'

const terms = ['communal']

const highlight = () => {
    console.log("hello!")
    let paragraphs = document.getElementsByClassName("body")[0]
    terms.forEach(term => {
        paragraphs.innerHTML = paragraphs.textContent.replace(term, '<span class="highlight">${term}</span>')
    })
}

window.onload = highlight()