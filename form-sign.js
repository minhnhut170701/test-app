const form = document.querySelector(".signUp-form");
const input = document.querySelectorAll(".field-input");

const VALID_AGE_NUMBER = 18;

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await func.apply(this, args);
    }, delay);
  };
};

const validAge = async () => {
  try {
    const response = await fetch(
      "https://67c554e7c4649b9551b62e1a.mockapi.io/api/v1/ageValid"
    );

    const data = await response.json();
    console.log("Data: ", data);
  } catch (error) {
    console.log("Error: ", error);
  }
};

const debounceValidAge = debounce(validAge, 500);

form.addEventListener("input", function (event) {
  if (event.target.tagName === "INPUT") {
    console.log(
      `Changed Field: ${event.target.name}, Value: ${event.target.value}`
    );
  }

  if (["confirmPassword", "password"].includes(event.target.name)) {
    const confirmPasswordInput = document.querySelector(
      "input[name='confirmPassword']"
    );
    const passwordInput = document.querySelector("input[name='password']");

    const confirmPassword = confirmPasswordInput.value;
    const password = passwordInput.value;

    const label = confirmPasswordInput.parentElement;
    let errorTag = label.querySelector(".error-message");

    if (password !== confirmPassword) {
      if (!errorTag) {
        errorTag = document.createElement("span");
        errorTag.classList.add("error-message");
        label.appendChild(errorTag);
      }
      errorTag.innerText = "Passwords do not match!";
    } else {
      errorTag?.remove();
    }
  }

  if (event.target.name === "age") {
    const age = event.target.value;
    const validAge = !isNaN(age) && parseInt(age) > VALID_AGE_NUMBER;

    if (validAge) debounceValidAge();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  input.forEach((item) => {
    item.value = "";
  });
  alert("Submitted");
});
