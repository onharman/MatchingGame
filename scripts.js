const cards = document.querySelectorAll('.memory-card')
const restarter = document.querySelector('#restart')
restarter.addEventListener('click', flipCard)

// Starmaker
let stars = '★★★★'
document.querySelector('#score').innerHTML = stars
let scores = 100

// lockBoard
let lockBoard = false

// cardflipper
let hasFlippedCard = false
let firstCard, secondCard

function flipCard () {
  console.log(this)
  if (this.dataset.framework === 'restart') {
    cards.forEach(card => card.classList.remove('flip'))
    const cards = document.querySelectorAll('.memory-card')
  }
  if (lockBoard) return
  if (this === firstCard) return

  this.classList.toggle('flip')

  if (!hasFlippedCard) {
    hasFlippedCard = true
    firstCard = this
  } else {
    hasFlippedCard = false
    secondCard = this

    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      firstCard.removeEventListener('click', flipCard)
      secondCard.removeEventListener('click', flipCard)
    } else {
      lockBoard = true
      scores -= 1
      starMaker()
      setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        lockBoard = false
      }, 1500)
    }
  }
}

function restBoard () {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null]
}

function starMaker () {
  if (scores > 99) {
    stars = '★★★★'
  } else if (scores > 98) {
    stars = '★★★☆'
  } else if (scores > 97) {
    stars = '★★☆☆'
  } else {
    stars = '☆☆☆☆'
  }
  document.querySelector('#score').innerHTML = stars
}

cards.forEach(card => card.addEventListener('click', flipCard))
