class User {
  constructor() {
    this.users = [];
  }

  addUser(username, lastLogin) {
    this.users = [...this.users, { username, lastLogin }];
    localStorage.setItem("User", JSON.stringify(this.users));
  }

  getUsers() {
    const storedUsers = localStorage.getItem("User");
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
}
const userInstance = new User();

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "logout-button") {
    logout();
  } else if (event.target && event.target.id === "login-button") {
    login();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logout-button").addEventListener("click", logout);
});

function login() {
  let div1 = document.getElementById("loginSection");
  const container = document.getElementById("container");
  const inputUsername = document.getElementById("username");
  const enteredUsername = inputUsername.value.trim();
  if (enteredUsername) {
    // Verifica se l'username è già presente nel localStorage
    const storedUsernames = userInstance.getUsers();
    if (!storedUsernames.some((user) => user.username === enteredUsername)) {
      const currentTime = new Date().toLocaleString();
      userInstance.addUser(enteredUsername, currentTime);
      // Salva l'username nel localStorage solo se non è già presente
    } else {
      alert("Questo username è già in uso. Scegline un altro.");
    }
  } else {
    alert("Inserisci un username valido.");
  }
  container.removeChild(div1);

  const div2 = document.createElement("div");
  div2.id = "div2";
  const storedUsers = userInstance.getUsers();
  let usersHTML =
    '<div id="logged"><button id="logout-button">ESCI</button></div><br><div>Utenti registrati:<ul>';
  storedUsers.forEach((user) => {
    usersHTML += `<li>${user.username} - Ultimo accesso: ${user.lastLogin}</li>`;
  });
  usersHTML += "</ul></div>";

  div2.innerHTML = usersHTML;
  container.appendChild(div2);
}

function logout() {
  const container = document.getElementById("container");
  const div2 = document.getElementById("div2");

  // Rimuove div2
  container.removeChild(div2);

  // Ripristina div1
  const div1 = document.createElement("div");
  div1.id = "loginSection";
  div1.innerHTML =
    '<input type="text" id="username" placeholder="Username" />' +
    '<button id="login-button">Accedi</button>';

  container.appendChild(div1);
}

// Carica gli username salvati al momento del caricamento della pagina
const storedUsers = userInstance.getUsers();
const usernameInput = document.getElementById("username");
if (storedUsers.length > 0) {
  usernameInput.value = storedUsers[storedUsers.length - 1].username; //Assegna il valore dell'ultimo elemento nell'array.
}
