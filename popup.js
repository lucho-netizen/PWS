// let generatedPasswords = new Set();

// function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecial) {
//     const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const lowercase = "abcdefghijklmnopqrstuvwxyz";
//     const numbers = "0123456789";
//     const special = "!@#$%^&*()";
  
//     let characters = "";
//     if (includeUppercase) characters += uppercase;
//     if (includeLowercase) characters += lowercase;
//     if (includeNumbers) characters += numbers;
//     if (includeSpecial) characters += special;
  
//     if (characters.length === 0) return ""; // Si no se selecciona ningún tipo de carácter, devolver cadena vacía
  
//     let password;
//     do {
//         password = "";
//         const usedCharacters = new Set();
//         while (password.length < length) {
//             const randomIndex = Math.floor(Math.random() * characters.length);
//             const char = characters.charAt(randomIndex);
//             if (!usedCharacters.has(char)) {
//                 password += char;
//                 usedCharacters.add(char);
//             }
//         }
//     } while (generatedPasswords.has(password));
    
//     generatedPasswords.add(password);
//     return password;
// }

// function showMiniPopup(password) {
//     const miniPopupCopyButton = document.getElementById("mini-popup-copy-button");

//     miniPopupCopyButton.addEventListener("click", function () {
//         if (password) {
//             navigator.clipboard.writeText(password).then(function () {
//                 miniPopupCopyButton.textContent = "Copiado";
//                 miniPopupCopyButton.disabled = true;
//                 setTimeout(function () {
//                     miniPopupCopyButton.textContent = "Copiar";
//                     miniPopupCopyButton.disabled = false;
//                 }, 2000);
//             });
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const generateButton = document.getElementById("generate-button");
//     const passwordInput = document.getElementById("password-input");
//     const passwordLengthRange = document.getElementById("password-length-range");
//     const passwordLengthLabel = document.getElementById("password-length-label");
//     const miniPopupCopyButton = document.getElementById("mini-popup-copy-button");

//     const includeUppercase = document.getElementById("include-uppercase");
//     const includeLowercase = document.getElementById("include-lowercase");
//     const includeNumbers = document.getElementById("include-numbers");
//     const includeSpecial = document.getElementById("include-special");

//     generateButton.addEventListener("click", function () {
//         const passwordLength = passwordLengthRange.value;
//         const password = generatePassword(
//             passwordLength,
//             includeUppercase.checked,
//             includeLowercase.checked,
//             includeNumbers.checked,
//             includeSpecial.checked
//         );
//         passwordInput.value = password;
//         showMiniPopup(password);
//     });

//     miniPopupCopyButton.addEventListener("click", function () {
//         const password = passwordInput.value;
//         if (password) {
//             passwordInput.select();
//             document.execCommand("copy");
//             miniPopupCopyButton.textContent = "Copiado!";
//             miniPopupCopyButton.disabled = true;
//             setTimeout(function () {
//                 miniPopupCopyButton.textContent = "Copiar";
//                 miniPopupCopyButton.disabled = false;
//             }, 2000);
//         }
//     });
//     passwordLengthRange.addEventListener("input", function () {
//         const length = passwordLengthRange.value;
//         passwordLengthLabel.textContent = length;
//     });
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
    } while (generatedPasswords.has(password)); // Verificar si la contraseña ya ha sido generada
    
    generatedPasswords.add(password); // Añadir la nueva contraseña al conjunto de contraseñas generadas
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

function updateStrengthIndicator(password) {
    const strengthText = document.getElementById("strength-text");
    if (password.length < 8) {
        strengthText.textContent = "Muy débil";
        strengthText.style.color = "red";
    } else if (password.length < 12) {
        strengthText.textContent = "Débil";
        strengthText.style.color = "orange";
    } else if (password.length < 16) {
        strengthText.textContent = "Fuerte";
        strengthText.style.color = "yellow";
    } else {
        strengthText.textContent = "Muy fuerte";
        strengthText.style.color = "green";
    }
}

function savePassword(password) {
    let savedPasswords = JSON.parse(localStorage.getItem("savedPasswords")) || [];
    savedPasswords.push(password);
    localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords));
}

function loadPasswords() {
    return JSON.parse(localStorage.getItem("savedPasswords")) || [];
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
    const toggleDarkModeButton = document.getElementById("toggle-dark-mode");

    const generatePasswordAutomatically = () => {
        const passwordLength = passwordLengthRange.value;
        const password = generatePassword(
            passwordLength,
            includeUppercase.checked,
            includeLowercase.checked,
            includeNumbers.checked,
            includeSpecial.checked
        );
        passwordInput.value = password;
        updateStrengthIndicator(password);
        showMiniPopup(password);
    };

    generatePasswordAutomatically();

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
        savePassword(password);
        updateStrengthIndicator(password);
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

    toggleDarkModeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        document.getElementById("password-container").classList.toggle("dark-mode");
        document.getElementById("password-input").classList.toggle("dark-mode");
        document.getElementById("generate-button").classList.toggle("dark-mode");
        document.getElementById("mini-popup-copy-button").classList.toggle("dark-mode");
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(checkbox => checkbox.classList.toggle("dark-mode"));
    });
});
