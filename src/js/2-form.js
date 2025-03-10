const refs = {
  form: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const loadPage = () => {
  const storageInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!storageInfo) {
    return;
  }

  formData = storageInfo;

  refs.form.elements.email.value = formData.email;
  refs.form.elements.message.value = formData.message;
};

loadPage();

refs.form.addEventListener('input', e => {
  const keys = Object.keys(formData);

  keys.forEach(key => {
    formData[key] = e.currentTarget.elements[key].value;
  });

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  } catch (err) {
    console.log(err.message);
  }
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const keys = Object.keys(formData);

  if (keys.some(key => !formData[key])) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  e.target.reset();
  formData = { email: '', message: '' };
  localStorage.removeItem(LOCAL_STORAGE_KEY);
});
