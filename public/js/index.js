


// how to toggle the password visibility 

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', (e) => {
    // console.log('clicked on the icon!');

    // toggle the type attribute 
    const type = password.getAttribute('type') ===  'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // toggle the eye/ eye slash icon 
    togglePassword.classList.toggle('slash');
});




