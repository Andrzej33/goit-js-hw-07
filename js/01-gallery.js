import { galleryItems } from "./gallery-items.js";
// Change code below this line

// створюємо посилання на контенер в який помістимо нашу галерею зображень

const galeryContainer = document.querySelector(".gallery");

// створюємо галерею зображень через присвоєння змінній результату роботи функції

const fillcreateGalery = createGalery(galleryItems);

// додаємо галерею зображень в HTML

galeryContainer.insertAdjacentHTML("beforeend", fillcreateGalery);

// прописуємо функцію для створення галереї

function createGalery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
     <img
      class="gallery__image"
      src="${preview}"
       data-source= "${original}"
       alt="${description}"
     />
   </a>
 </div>`;
    })
    .join("");
}

// Додаємо слухача подій на клік по контейнеру

galeryContainer.addEventListener("click", onGaleryItemClick);

// створюємо функцію для обробки кліку по зображенню

function onGaleryItemClick(event) {
  event.preventDefault();

  // перевіряємо чи клік відбувся на зображенні

  if (!event.target.classList.contains(`gallery__image`)) {
    return;
  }
  // створюємо велике зображення за допомогою бібліотеки

  const instance = basicLightbox.create(
    `
    <img src= ${event.target.dataset.source}>`,
    {
      onShow: () => {
        document.addEventListener("keydown", onCloseModal);
      },
      onClose: () => {
        document.removeEventListener("keydown", onCloseModal);
      },
    }
  );
  instance.show();

  // додаємо закривання модалки по кліку на Esc

  function onCloseModal(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
