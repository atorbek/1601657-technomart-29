const cnCloseModal = 'modal__close';
const cnOpenModal = 'modal__show';
const cnErrorModal = 'modal__error';
const cnMapButton = 'company-contacts__map';
const cnFeedbackButton = 'company-contacts__button';
const cnFeedbackModal = 'modal-feedback';
const cnMapModal = 'modal-map';
const feedbackModal = document.querySelector(`.${cnFeedbackModal}`);
const mapModal = document.querySelector(`.${cnMapModal}`);
const feedbackForm = document.querySelector(".modal-feedback__form");
const feedbackInputName = document.querySelector(".modal-feedback__input_name");
const feedbackInputEmail = document.querySelector(".modal-feedback__input_email");

try {
  storage = localStorage.getItem("feedbackInputName");
} catch (err) {
  isStorageSupport = false;
  throw "Local Storage is not support!"
}

document.addEventListener("click", function (e) {

  if (e.target.closest(`.${cnMapButton}`)) {
    e.preventDefault();
    mapModal.classList.add(cnOpenModal);
  }

  if (e.target.classList.contains(cnCloseModal)
      && e.target.closest(`.${cnMapModal}`)) {
    e.preventDefault();
    mapModal.classList.remove(cnOpenModal);
  }

  if (e.target.classList.contains(cnFeedbackButton)) {
    e.preventDefault();
    feedbackModal.classList.add(cnOpenModal);

    if (storage) {
      feedbackInputName.value = storage;
      feedbackInputEmail.focus();
    } else {
      feedbackInputName.focus();
    }
  }

  if (e.target.classList.contains(cnCloseModal)
      && e.target.closest(`.${cnFeedbackModal}`)) {
    e.preventDefault();
    feedbackModal.classList.remove(cnOpenModal);
  }
});

document.addEventListener("keydown", function (e) {

  if (e.code === 'Escape'
      && mapModal.classList.contains(cnOpenModal)) {
    e.preventDefault();
    mapModal.classList.remove(cnOpenModal);
  }

  if (e.code === 'Escape'
      && feedbackModal.classList.contains(cnOpenModal)) {
    e.preventDefault();
    feedbackModal.classList.remove(cnOpenModal);
  }
});

/* Validation form */
feedbackForm.addEventListener("submit", function (e) {
  if (!feedbackInputName.value || !feedbackInputEmail.value) {
    e.preventDefault();
    feedbackModal.classList.remove(cnErrorModal);
    feedbackModal.offsetWidth = feedbackModal.offsetWidth;
    feedbackModal.classList.add(cnErrorModal);
  } else {
    if (isStorageSupport) {
      localStorage.setItem("feedbackInputName", feedbackInputName.value);
    }
  }
});
