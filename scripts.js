const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard
let pairCount = 0

// Starmaker
let stars = '★★★'
document.querySelector('#score').innerHTML = stars
let scores = 8

function starMaker () {
  if (scores <= 16) {
    stars = '★★★'
  } else if (scores <= 20) {
    stars = '★★☆'
  } else if (scores <= 24) {
    stars = '★☆☆'
  } else if (scores <= 28) {
    stars = '☆☆☆'
  } else {
    stars = '☆☆☆'
  }
  document.querySelector('#score').innerHTML = stars
}

function flipCard () {
  if (lockBoard) return
  if (this === firstCard) {
    return
  }

  this.classList.add('flip')

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true
    firstCard = this

    return
  }

  // second click
  secondCard = this

  checkForMatch()
}

function checkForMatch () {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

  isMatch ? disableCards() : unflipCards()
}

function disableCards () {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetBoard()
  pairCount += 1
  if (pairCount === 8) {
    setTimeout(() => { alert('Well done! You must be really smart.') }, 200)
  }
}

function unflipCards () {
  lockBoard = true

  scores += 1
  starMaker()

  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard()
  }, 1500)
}

function resetBoard () {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null]
}

function shuffle () {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12)
    card.style.order = randomPos
  })
}

(function shuffle () {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12)
    card.style.order = randomPos
  })
})()

cards.forEach(card => card.addEventListener('click', flipCard))
