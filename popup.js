// function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecial) {
//   const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   const lowercase = "abcdefghijklmnopqrstuvwxyz";
//   const numbers = "0123456789";
//   const special = "!@#$%^&*()";

//   let characters = "";
//   if (includeUppercase) characters += uppercase;
//   if (includeLowercase) characters += lowercase;
//   if (includeNumbers) characters += numbers;
//   if (includeSpecial) characters += special;

//   if (characters.length === 0) return ""; // Si no se selecciona ningún tipo de carácter, devolver cadena vacía

//   let password = "";
//   while (password.length < length) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       const char = characters.charAt(randomIndex);
//       password += char;
//   }

//   return password;
// }

// function showMiniPopup(password) {
//   const miniPopupCopyButton = document.getElementById("mini-popup-copy-button");

//   miniPopupCopyButton.addEventListener("click", function () {
//       if (password) {
//           navigator.clipboard.writeText(password).then(function () {
//               miniPopupCopyButton.textContent = "Copiado";
//               miniPopupCopyButton.disabled = true;
//               setTimeout(function () {
//                   miniPopupCopyButton.textContent = "Copiar";
//                   miniPopupCopyButton.disabled = false;
//               }, 2000);
//           });
//       }
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const generateButton = document.getElementById("generate-button");
//   const passwordInput = document.getElementById("password-input");
//   const passwordLengthRange = document.getElementById("password-length-range");
//   const passwordLengthLabel = document.getElementById("password-length-label");
//   const miniPopupCopyButton = document.getElementById("mini-popup-copy-button");

//   const includeUppercase = document.getElementById("include-uppercase");
//   const includeLowercase = document.getElementById("include-lowercase");
//   const includeNumbers = document.getElementById("include-numbers");
//   const includeSpecial = document.getElementById("include-special");

//   generateButton.addEventListener("click", function () {
//       const passwordLength = passwordLengthRange.value;
//       const password = generatePassword(
//           passwordLength,
//           includeUppercase.checked,
//           includeLowercase.checked,
//           includeNumbers.checked,
//           includeSpecial.checked
//       );
//       passwordInput.value = password;
//       showMiniPopup(password);
//   });

//   miniPopupCopyButton.addEventListener("click", function () {
//       const password = passwordInput.value;
//       if (password) {
//           passwordInput.select();
//           document.execCommand("copy");
//           miniPopupCopyButton.textContent = "Copiado!";
//           miniPopupCopyButton.disabled = true;
//           setTimeout(function () {
//               miniPopupCopyButton.textContent = "Copiar";
//               miniPopupCopyButton.disabled = false;
//           }, 2000);
//       }
//   });

//   passwordLengthRange.addEventListener("input", function () {
//       const length = passwordLengthRange.value;
//       passwordLengthLabel.textContent = length;
//   });
// });




let generatedPasswords = new Set();

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecial) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()";
  
    let characters = "";
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSpecial) characters += special;
  
    if (characters.length === 0) return ""; // Si no se selecciona ningún tipo de carácter, devolver cadena vacía
  
    let password;
    do {
        password = "";
        const usedCharacters = new Set();
        while (password.length < length) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            const char = characters.charAt(randomIndex);
            if (!usedCharacters.has(char)) {
                password += char;
                usedCharacters.add(char);
            }
        }
    } while (generatedPasswords.has(password));
    
    generatedPasswords.add(password);
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

    const includeUppercase = document.getElementById("include-uppercase");
    const includeLowercase = document.getElementById("include-lowercase");
    const includeNumbers = document.getElementById("include-numbers");
    const includeSpecial = document.getElementById("include-special");

    generateButton.addEventListener("click", function () {
        const passwordLength = passwordLengthRange.value;
        const password = generatePassword(
            passwordLength,
            includeUppercase.checked,
            includeLowercase.checked,
            includeNumbers.checked,
            includeSpecial.checked
        );
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


