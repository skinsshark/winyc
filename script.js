const body = document.getElementsByTagName('body')[0];
let _limit = 10;
let _zIndex = 0;

function genRGBA() {
  return `
    rgba(
      ${Math.round(Math.random()*255)},
      ${Math.round(Math.random()*255)},
      ${Math.round(Math.random()*255)}, 0.8
    )
  `;
}

function createImages(item, i) {
  const rowIndex = Math.ceil((i + 1) / 18);
  const colIndex = i % 18;

  const positionX = ((colIndex + 1) * 15) + 50 + (10 * rowIndex);
  const positionY = ((i + 1) * 5) + 30;

  const newImage = document.createElement('img');
  newImage.id = `img-${item.id}`;
  newImage.style.width = '200px';
  newImage.style.right = `${positionX}px`;
  newImage.style.top = `${positionY}px`;
  newImage.style.borderColor = genRGBA();

  if (![
    'xian',
    'cooperhewitt',
    'totokaelo',
    'kinokuniya',
    'carousel',
    'sunrisemart',
    'dsm',
    'royce',
    'linefriends',
    'aire'
  ].includes(item.id)) {
    newImage.src = `./images/${item.id}.jpeg`;
    body.appendChild(newImage);
  }
}

function notHovering(image) {
  if (image) {
    image.style.opacity = 0.5;
    body.classList.add('notHoveringImage');
    // image.style.width = '150px';
  }
}

function seeImage(id) {
  [...document.getElementsByTagName('img')].map(image => {
    image.style.opacity = 0.4;
    body.classList.add('notHoveringImage');
  });

  const itemImage = document.getElementById(id);
  if (itemImage) {
    const newZIndex = _zIndex + 1;
    itemImage.style.zIndex = newZIndex;
    _zIndex = newZIndex;

    itemImage.style.opacity = 1;
    body.classList.remove('notHoveringImage');
    // itemImage.style.width = '300px';
  }
}

function setBackgroundColor() {
  body.style.backgroundColor = `
    rgba(
      ${Math.round(Math.random()*255)},
      ${Math.round(Math.random()*255)},
      ${Math.round(Math.random()*255)}, 0.2
    )
  `;
}

function setSectionHeights() {
  [...document.getElementsByTagName('aside')].map((section, i) => {
    const sectionContent = document.getElementById(`${section.id}${section.id}`);
    section.style.height = `${sectionContent.offsetHeight}px`
  });
}

function onLoad() {
  setSectionHeights();
  setBackgroundColor();

  [...document.getElementsByTagName('li')]
  .filter(item => ![...item.classList].includes('photoless'))
  .map((item, i) => {
    createImages(item, i);
    item.addEventListener("mouseleave", function() {
      const imageId = `img-${item.id}`
      notHovering(document.getElementById(imageId));
    });
    item.addEventListener("mouseover", function() {
      if (_limit === 0) {
        setBackgroundColor();
        _limit = 10;
      } else {
        _limit--;
      }

      seeImage(`img-${item.id}`);
    });
  })
}