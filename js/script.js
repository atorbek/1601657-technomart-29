const classNamePopapOpen = 'modal__show';
const classNamePopapError = 'modal__error';

const mapPopapOpen = document.querySelector(".company-contacts__map");
const mapPopapClose = document.querySelector(".modal-map__close");
const mapPopap = document.querySelector(".modal-map");

const feedbackPopapOpen = document.querySelector(".company-contacts__button");
const feedbackPopapClose = document.querySelector(".modal-feedback__close");
const feedbackPopap = document.querySelector(".modal-feedback");

const feedbackForm = document.querySelector(".modal-feedback__form");
const feedbackPopapInputName = document.querySelector(".modal-feedback__input_name");
const feedbackPopapInputEmail = document.querySelector(".modal-feedback__input_email");

const buyPopapOpen = document.querySelector(".product-item__button-buy");
const buyPopapClose = document.querySelector(".modal-basket__close");
const basketPopap = document.querySelector(".modal-basket");

function keyDownPopapListener (elem) {
  return (e) =>
  {

    if (e.code === 'Escape') {
      if (elem.classList.contains(classNamePopapOpen)) {
        e.preventDefault();
        elem.classList.remove(classNamePopapOpen);
      }
    }
  }
}

const mapListener = keyDownPopapListener(mapPopap);
const feedbackListener = keyDownPopapListener(feedbackPopap);
const basketListener = keyDownPopapListener(basketPopap);

function tooglePopap(elem) {
  return (e) => {
    e.preventDefault();
    elem.classList.toggle(classNamePopapOpen);
  }
}

const toogleMapPopap = tooglePopap(mapPopap);
const toogleFeedbackPopap = tooglePopap(feedbackPopap);
const toogleBasketPopap = tooglePopap(basketPopap);


try {
  storage = localStorage.getItem("feedbackPopapInputName");
} catch (err) {
  isStorageSupport = false;
  throw "Local Storage is not support!"
}

buyPopapOpen.addEventListener("click", function (e) {
  toogleBasketPopap(e);
  window.addEventListener("keydown", basketListener);
});

buyPopapClose.addEventListener("click", function (e) {
  toogleBasketPopap(e);
  window.removeEventListener("keydown", basketListener);
});

mapPopapOpen.addEventListener("click", function (e) {
  toogleMapPopap(e);
  window.addEventListener("keydown", mapListener);
});

mapPopapClose.addEventListener("click", function (e) {
  toogleMapPopap(e);
  window.removeEventListener("keydown", mapListener);
});

feedbackPopapOpen.addEventListener("click", function (e) {
  toogleFeedbackPopap(e);

  if (storage) {
    feedbackPopapInputName.value = storage;
    feedbackPopapInputEmail.focus();
  } else {
    feedbackPopapInputName.focus();
  }

  window.addEventListener("keydown", feedbackListener);
});

feedbackPopapClose.addEventListener('click', function (e) {
  toogleFeedbackPopap(e);
  window.removeEventListener("keydown", feedbackListener);
});


/* Validation form */
feedbackForm.addEventListener("submit", function (e) {
  if (!feedbackPopapInputName.value || !feedbackPopapInputEmail.value) {
    e.preventDefault();
    feedbackPopap.classList.add(classNamePopapError);
  } else {
    if (isStorageSupport) {
      localStorage.setItem("feedbackInputName", feedbackPopapInputName.value);
    }
  }
});
