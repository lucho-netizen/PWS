// En popup.js

function generatePassword(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
  
    while (password.length < length) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const char = characters.charAt(randomIndex);
      if (password.indexOf(char) === -1) {
        password += char;
      }
    }
  
    return password;
  }
  
  function showMiniPopup(password) {
    const miniPopupCopyButton = document.getElementById("mini-popup-copy-button");
  
    miniPopupCopyButton.addEventListener("click", function () {
      if (password) {
        navigator.clipboard.writeText(password).then(function () {
          miniPopupCopyButton.textContent = "Copiado";
          miniPopupCopyButton.disabled = true;
          setTimeout(function () {
            miniPopupCopyButton.textContent = "Copiar";
            miniPopupCopyButton.disabled = false;
          }, 2000);
        });
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate-button");
    const passwordInput = document.getElementById("password-input");
    const passwordLengthRange = document.getElementById("password-length-range");
    const passwordLengthLabel = document.getElementById("password-length-label");
    const miniPopupCopyButton = document.getElementById("mini-popup-copy-button");
  
    generateButton.addEventListener("click", function () {
      const passwordLength = passwordLengthRange.value;
      const password = generatePassword(passwordLength);
      passwordInput.value = password;
      showMiniPopup(password);
    });
  
    miniPopupCopyButton.addEventListener("click", function () {
      const password = passwordInput.value;
      if (password) {
        passwordInput.select();
        document.execCommand("copy");
        miniPopupCopyButton.textContent = "Copiado!";
        miniPopupCopyButton.disabled = true;
        setTimeout(function () {
          miniPopupCopyButton.textContent = "Copiar";
          miniPopupCopyButton.disabled = false;
        }, 2000);
      }
    });
  
    passwordLengthRange.addEventListener("input", function () {
      const length = passwordLengthRange.value;
      passwordLengthLabel.textContent = length;
    });
  });
  