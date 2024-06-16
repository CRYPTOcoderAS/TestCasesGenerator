async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

      const data = await response.json();
      const token = data.token;

    
      localStorage.setItem('token', token);

      window.location.href = 'tests.html';
  } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
  }
}


async function signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    const response = await fetch(`${apiUrl}/auth/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
          throw new Error('Signup failed');
      }

   
      window.location.href = '/';
  } catch (error) {
      console.error('Error:', error);
      alert('Signup failed. Please try again.');
  }
}

function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleLink = document.querySelector("#toggleText a");

  if (loginForm.style.display === "block") {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      toggleLink.textContent = "Back to Login";
  } else {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      toggleLink.textContent = "Sign Up";
  }
}


function toggleTheme() {
  const body = document.body;
  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");
}

document.getElementById("toggleThemeButton").addEventListener("click", toggleTheme);


async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
      const response = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
          throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token;

     
      localStorage.setItem('token', token);

  
      window.location.href = 'tests.html';
  } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
  }
}


async function signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
          throw new Error('Signup failed');
      }

    
      window.location.href = '/';
  } catch (error) {
      console.error('Error:', error);
      alert('Signup failed. Please try again.');
  }
}


function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleLink = document.querySelector("#toggleText a");

  if (loginForm.style.display === "block") {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      toggleLink.textContent = "Back to Login";
  } else {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      toggleLink.textContent = "Sign Up";
  }
}


function toggleTheme() {
  const body = document.body;
  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");
}

document.getElementById("toggleThemeButton").addEventListener("click", toggleTheme);


function checkLoggedIn() {
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  if (token) {
     
      fetch( `${apiUrl}/auth/validate`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => {
          if (response.ok) {
     
              window.location.href = 'tests.html';
          } else {
          
              localStorage.removeItem('token');
              window.location.href = 'index.html';
          }
      })
      .catch(error => {
          console.error('Error validating token:', error);
     
          alert('Error validating token. Please login again.');
          window.location.href = 'index.html'; 
      });
  } else {
    
      window.location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', checkLoggedIn);


