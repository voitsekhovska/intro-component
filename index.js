"use strict";

const formValidation = document.querySelector(".form");
const allInputs = document.querySelectorAll(".form input");

const createErrorMessage = (input) => {
  let errorElement = input.nextElementSibling;

  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("p");
    errorElement.classList.add("error-message");
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }
  return errorElement;
}

const validationCheck = (e) => {
  e.preventDefault();

  const fields = ["firstName", "lastName", "email", "password"];
  let isFormValid = true;

  fields.forEach((fieldName) => {
    const inputData = document.querySelector(`input[name="${fieldName}"]`);
    const errorMessage = createErrorMessage(inputData);

    inputData.classList.remove("error-general");
    errorMessage.textContent = " ";

    if (!inputData.value.trim()) {
      inputData.classList.add("error-general");
      errorMessage.textContent = `${getFieldName(fieldName)} cannot be empty`;
      isFormValid = false;
    } else if (fieldName === "email" && !isValidEmail(inputData.value)) {
      inputData.classList.add("error-general");
      errorMessage.textContent = "Looks like this is not an email";
      isFormValid = false;
    }
  });

  if (isFormValid) {
    alert("Form submitted successfully!");
    formValidation.reset();
  }
};

const getFieldName = (name) => {
  switch (name) {
    case "firstName":
      return "First Name";
    case "lastName":
      return "Last Name";
    case "email":
      return "Email Address";
    case "password":
      return "Password";
    default:
      return name;
  }
};

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error-general");

    const errorMessage = createErrorMessage(input);
    errorMessage.textContent = " ";
  });
});

formValidation.addEventListener("submit", validationCheck);
