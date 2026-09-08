document.querySelectorAll('.copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = document.getElementById(button.dataset.copy).textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
      window.setTimeout(() => { button.textContent = 'Copy'; }, 1600);
    } catch {
      button.textContent = 'Select text';
    }
  });
});

const gallery = document.getElementById('gallery');
const addSlide = (number) => {
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  image.loading = 'lazy';
  image.src = `assets/slides/${String(number).padStart(2, '0')}.png`;
  image.alt = `Lab walkthrough screenshot ${number}`;
  figure.append(image);
  figure.insertAdjacentHTML('beforeend', `<figcaption>Screenshot ${number}</figcaption>`);
  gallery.append(figure);
};

for (let slide = 1; slide <= 36; slide += 1) addSlide(slide);

const composite = document.createElement('figure');
composite.innerHTML = `<div class="slide-37"><img src="assets/slides/36.png" alt="Lab walkthrough screenshot 37"><img class="overlay" src="assets/slides/37.png" alt=""></div><figcaption>Screenshot 37</figcaption>`;
gallery.append(composite);

for (let slide = 38; slide <= 46; slide += 1) addSlide(slide);
