//the purpose of this is to create a sign up form


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

    console.log(email, password);


  // purpose: sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {

    // this is used to close the signup modal & reset the form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});


// This is the log out method
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      auth.signOut().then(() => {
        console.log('User has signed out');
      })
    });
