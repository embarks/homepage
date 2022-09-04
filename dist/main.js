fetch('https://develop.emwaves.org/.netlify/functions/cowsay')
  .then((response) => {
    if (response.ok) {
      response.json().then(({ message }) => {
        document.getElementById('pre').textContent = message
      })
    }
  })
  .catch((e) => (document.getElementById('pre').innerText = 'error: ' + e))
