const $generator = document.querySelector('#passwordGenerateSlides');
const $lowercase = document.querySelector('#lowercase');
const $uppercase = document.querySelector('#uppercase');
const $numbers = document.querySelector('#numbers');
const $symbols = document.querySelector('#symbols');
const $passwordShow = document.querySelector('#showPassword');
const $sliderLenght = document.querySelector('.range-slider__value');
const $checkboxlabel = document.querySelectorAll('.checkbox__label');
const $copyBtn = document.querySelector('#copyBtn');
const $passwordStrength = document.querySelector('#passwordStrength');
const $passwordStrengthRequired = document.querySelector('#passwordStrengthRequired');
const $modeBtn = document.querySelector('#modeBtn');

const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allNumbers = "0123456789";
const allSymbols = "~!@#$%^&*"; 

let generatedPassword = ""; // Declare generatedPassword outside the event listener callback

$generator.addEventListener('input', () => {
    let allChar = "";
    allChar += $uppercase.checked ? upperChars : "";
    allChar += $lowercase.checked ? lowerChars : "";
    allChar += $numbers.checked ? allNumbers : "";
    allChar += $symbols.checked ? allSymbols : "";

    if (allChar === "") {
        popModel('Please select at least one option');
        return false;
    }

    const sliderLength = $generator.value;
    $sliderLenght.textContent = sliderLength;

    if (sliderLength <= 2) {
        popModel('Please Add more Characters');
        $passwordShow.value = '';
        return false;
    }

    generatedPassword = ""; 

    let i = 1;
    while (i <= sliderLength) {
        const generatedValue = allChar.charAt(Math.floor(Math.random() * allChar.length));
        generatedPassword += generatedValue;
        i++;
    }

    $passwordShow.value = generatedPassword;

    // Check password requirements
    if (generatedPassword.length > 4) {
        $passwordStrength.textContent = 'too short';
        $passwordStrength.style.visibility = 'visible';
        $passwordStrengthRequired.style.visibility = 'visible';
        $passwordStrength.style.color = 'red';
        checkRequirement();

    } if (generatedPassword.length > 6) {
        $passwordStrength.textContent = 'long enough';
        $passwordStrength.style.color = 'yellow';
    } if (generatedPassword.length > 8) {
        $passwordStrength.textContent = 'Strong';
        $passwordStrength.style.color = 'green';
    } if (generatedPassword.length > 16) {
        $passwordStrength.textContent = 'Very Strong';
        $passwordStrength.style.color = 'green';
    }
});

$copyBtn.addEventListener('click', () => {
    const $copyPassWord = $passwordShow.value;

    if($copyPassWord == ''){
        popModel('Unable to copy password Input is blank');
        return false
    }

    $passwordShow.select();
    navigator.clipboard.writeText($copyPassWord)
        .then(() => {
            popModel('Password Copied');
        })
        .catch(error => {
            console.error(error);
            popModel('Unable to copy password');
        });
});

function checkRequirement() {
    if (generatedPassword.search(/[a-z]/) === -1) {
        $passwordStrengthRequired.textContent = `Password is missing lowercase letter`;
    }
    else if (generatedPassword.search(/[A-Z]/) === -1) {
        $passwordStrengthRequired.textContent = `Password is missing uppercase letter`;
    }
    else if (generatedPassword.search(/[0-9]/) === -1) {
        $passwordStrengthRequired.textContent = `Password is missing number letter`;
    }
    else if (generatedPassword.search(/[!@#$%^&*]/) === -1) {
        $passwordStrengthRequired.textContent = `Password is missing special characters letter`;
    }else{
        $passwordStrengthRequired.style.visibility = 'hidden';
    }
}


function popModel(massage){
   let modal = document.createElement('div');
   modal.classList.add('notification');
   modal.textContent = massage;

   let place =  document.querySelector('#container')
   place.appendChild(modal);
   
   setTimeout(() => { modal.remove() }, 3000); 
}


// light and Dark
$modeBtn.addEventListener('click', ()=>{
    let modelIcon = document.querySelector('.fa-moon');

    let currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute('data-theme', newTheme);

    
    localStorage.setItem('PasswordTheme', newTheme)
})
