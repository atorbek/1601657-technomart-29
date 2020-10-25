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

function keyDownMapPopapListener (e) {
  if (e.code === 'Escape') {
    if (mapPopap.classList.contains(classNamePopapOpen)) {
      e.preventDefault();
      mapPopap.classList.remove(classNamePopapOpen);
    }
  }
}

function keyDownFeedbackPopapListener (e) {
  if (e.code === 'Escape') {
    if (feedbackPopap.classList.contains(classNamePopapOpen)) {
      e.preventDefault();
      feedbackPopap.classList.remove(classNamePopapOpen);
    }
  }
}

try {
  storage = localStorage.getItem("feedbackPopapInputName");
} catch (err) {
  isStorageSupport = false;
  throw "Local Storage is not support!"
}

mapPopapOpen.addEventListener("click", function (e) {
  e.preventDefault();
  mapPopap.classList.add(classNamePopapOpen);

  window.addEventListener("keydown", keyDownMapPopapListener);
});

mapPopapClose.addEventListener("click", function (e) {
  e.preventDefault();
  mapPopap.classList.remove(classNamePopapOpen);

  window.removeEventListener("keydown", keyDownMapPopapListener);
});

feedbackPopapOpen.addEventListener("click", function (e) {
  e.preventDefault();
  feedbackPopap.classList.add(classNamePopapOpen);

  if (storage) {
    feedbackPopapInputName.value = storage;
    feedbackPopapInputEmail.focus();
  } else {
    feedbackPopapInputName.focus();
  }

  window.addEventListener("keydown", keyDownFeedbackPopapListener);
});

feedbackPopapClose.addEventListener('click', function (e) {
  e.preventDefault();
  feedbackPopap.classList.remove(classNamePopapOpen);

  window.removeEventListener("keydown", keyDownFeedbackPopapListener);
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
