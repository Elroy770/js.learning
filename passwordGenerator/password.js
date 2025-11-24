function generatePassword(length, withSymbols, withNumbers, withLowercase, withUppercase) {
    const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    const numbers = '012345678901234567890123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const basePassword = document.getElementById('basePassword').value || '';

    let validChars = '';
    if (withSymbols) validChars += symbols;
    if (withNumbers) validChars += numbers;
    if (withLowercase) validChars += lowercase;
    if (withUppercase) validChars += uppercase;

    if (validChars.length === 0) {
        return 'Please select at least one character type';
    }

    if (length <= 3 || length > 20) {
        return 'Password length should be at least 4 and not more than 20 characters';
    }

    let password = basePassword;
    for (let i = 0; i < (length - basePassword.length); i++) {
        const index = Math.floor(Math.random() * validChars.length);
        password += validChars[index];
    }

    return password;
}

const generateButton = document.getElementById('Generate');
const passwordEl = document.getElementById('password');
const copyBtn = document.getElementById('copyBtn');
const returnBtn = document.getElementById('returnBtn');

// הצגת הכפתור רק כשיש סיסמה תקינה
function updateCopyButton() {
    const txt = passwordEl.textContent.trim();
    const hasPassword = txt !== '' && !txt.includes('Please') && !txt.includes('Password length');
    copyBtn.style.display = hasPassword ? 'flex' : 'none';
}
// לחזור לדף הראשי
returnBtn.onclick = function () {
    window.location.href = '../index.html'
}
// קריאה אחרי יצירת סיסמה (ודא שאתה קורא לזה אחרי שאתה קובע textContent)
generateButton.onclick = function () {
    const length = parseInt(document.getElementById('length').value);
    const symbols = document.getElementById('symbols').checked;
    const numbers = document.getElementById('numbers').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const uppercase = document.getElementById('uppercase').checked;

    const myPassword = generatePassword(length, symbols, numbers, lowercase, uppercase);
    passwordEl.textContent = myPassword;
    updateCopyButton();
};

// לחיצה על הכפתור — העתקה והחלפת אייקון זמנית ל✔️
copyBtn.addEventListener('click', async () => {
    const text = passwordEl.textContent.trim();
    if (!text) return;

    try {
        await navigator.clipboard.writeText(text);
        // אפקט חזותי — מחליף לתיק (✔️) ואז חוזר ל־SVG
        copyBtn.innerHTML = '<span style="font-size:18px;color:#0a6b3e;">✔️</span>';
        setTimeout(() => {
            // מחזיר את ה־SVG המקורי
            copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" style="color:#083827;">
          <rect x="9" y="3" width="11" height="14" rx="2" ry="2" fill="currentColor" opacity="0.9"/>
          <rect x="3" y="7" width="11" height="14" rx="2" ry="2" fill="currentColor" opacity="0.6"/>
        </svg>
      `;
        }, 1300);
    } catch (err) {
        alert('Failed to copy');
    }
});
