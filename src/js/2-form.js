const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailField = form.elements.email;
const messageField = form.elements.message;

const formData = { email: '', message: '' };

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';

    emailField.value = formData.email;
    messageField.value = formData.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!(name in formData)) return;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
});
