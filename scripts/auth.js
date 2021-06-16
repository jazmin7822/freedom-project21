// listen for authentication status changes
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('guides').get().then(snapshot => {
      setupGuides(snapshot.docs);
      setupUI(user);
    });
  } else {
    setupUI();
    setupGuides([]);
  }
})

// this is how the user signs ups
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //users info is received
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // The user signs up with an email and password
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// The user logs out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// The user logs in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // We get the info of the user
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // Logs the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // closes the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});