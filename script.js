
// Assignment 3: Interactive Blacksmith — The Tiny Forge

// PLAN:
// 1. Select the forge display and control elements.
// 2. Read and validate the heat input when Add heat is clicked.
// 3. If valid, call heatForge() to add heat, capped at 100.
// 4. When Make sword is clicked, call makeSword().
// 5. When Reset forge is clicked, call resetForge().
// 6. Update the numbers, status, image, and feedback.
// 7. Start with 20 heat, zero swords, and empty feedback.

// Select the page elements
const forge = document.getElementById('forge')
const heatValue = document.getElementById('heat-value')
const swordCount = document.getElementById('sword-count')
const forgeStatus = document.getElementById('forge-status')
const forgeImage = document.getElementById('forge-image')
const actionMessage = document.getElementById('action-message')

// Select the controls
const heatInput = document.getElementById('heat-input')
const addHeatButton = document.getElementById('add-heat')
const makeSwordButton = document.getElementById('make-sword')
const resetForgeButton = document.getElementById('reset-forge')

// Game state
let heat = 20
let swordsMade = 0

// Get forge status
function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return 'Too cold'
  } else if (heatValue < 70) {
    return 'Ready to forge'
  } else {
    return 'Roaring fire'
  }
}

// Update the forge display
function updateForge() {
  heatValue.textContent = heat
  swordCount.textContent = swordsMade

  const status = getForgeStatus(heat)
  forgeStatus.textContent = status

  // Keep exactly one status class active
  forge.classList.remove(
    'is-cold',
    'is-ready',
    'is-roaring'
  )

  if (status === 'Too cold') {
    forge.classList.add('is-cold')
    forgeImage.src = 'assets/forge-cold.svg'
    forgeImage.alt =
      'A stone forge with dark coals and no flames'
  } else if (status === 'Ready to forge') {
    forge.classList.add('is-ready')
    forgeImage.src = 'assets/forge-ready.svg'
    forgeImage.alt =
      'A stone forge with a small orange fire'
  } else {
    forge.classList.add('is-roaring')
    forgeImage.src = 'assets/forge-roaring.svg'
    forgeImage.alt =
      'A stone forge with tall bright flames and sparks'
  }
}

// Reset the forge
function resetForge() {
  heat = 20
  swordsMade = 0

  heatInput.value = ''
  actionMessage.textContent = ''

  updateForge()
}

// Add heat to the forge
function heatForge(amount) {
  heat = Math.min(heat + amount, 100)

  actionMessage.textContent =
    `The forge was heated by ${amount}.`

  updateForge()
}

// Make one sword
function makeSword() {
  if (heat >= 30) {
    heat = heat - 30
    swordsMade = swordsMade + 1

    actionMessage.textContent =
      'Sword crafted successfully!'
  } else {
    actionMessage.textContent =
      'The forge needs more heat to make a sword.'
  }

  updateForge()
}

// Add heat button event
addHeatButton.addEventListener('click', function () {
  const input = heatInput.value.trim()
  const amount = Number(input)

  // Reject empty, invalid, decimal, or non-positive input
  if (
    input === '' ||
    !Number.isFinite(amount) ||
    !Number.isInteger(amount) ||
    amount <= 0
  ) {
    actionMessage.textContent =
      'Please enter a positive whole number.'
    return
  }

  heatForge(amount)
})

// Make sword button event
makeSwordButton.addEventListener('click', function () {
  makeSword()
})

// Reset forge button event
resetForgeButton.addEventListener('click', function () {
  resetForge()
})

// Initialize the forge
resetForge()
