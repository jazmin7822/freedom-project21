//creating a sign up form

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get users information

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    console.log(email, password)



})
