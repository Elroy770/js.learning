function generatePassword(length,withSymbols,withNumbers,withLowercase,withUppercase){
    const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    const numbers = '012345678901234567890123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let validChars = '';
    if(withSymbols) validChars += symbols;
    if(withNumbers) validChars += numbers;
    if (withLowercase) validChars += lowercase;
    if (withUppercase) validChars += uppercase;

    let password = '';
    if (password.length === 0) { 
        return 'Please select at least one character type';
    }
    for (let i = 0; i < length; i++){
        const index = Math.floor(Math.random()* validChars.length);
        password += validChars[index];
    }
    return password;
}
const generateButton = document.getElementById('Generate');
generateButton.onclick = function(){
const length = parseInt(document.getElementById('length').value);
const symbols = document.getElementById('symbols').checked;
const numbers = document.getElementById('numbers').checked;
const lowercase = document.getElementById('lowercase').checked;
const uppercase = document.getElementById('uppercase').checked;
let myPassword = generatePassword(length,symbols,numbers,lowercase,uppercase);
document.getElementById('password').textContent = myPassword;
}



;
