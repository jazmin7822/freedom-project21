// listen for authentication status changes
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('guides').onSnapshot(snapshot => {
      //everytime there is a change in the date base the code below runs and we receive an updated snapshot
      setupGuides(snapshot.docs);
      setupUI(user);
    });
  } else {
    setupUI();
    setupGuides([]);
  }
})

// Grabs a reference to the create form id <form id="create-form">
//creates new log
const createForm = document.querySelector('#create-form');
//when the submit the form execute this
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //how does the database record what the user inputs?
  // We have to interact with the Data Base
  db.collection('guides').add({
    //pass in a object, the title of the guide, and the content
    //get a handle in the individual input field.
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(() => {
    //clear the form and close the modal after the user has typed in
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  })
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