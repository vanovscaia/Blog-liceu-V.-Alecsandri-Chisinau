const firebaseConfig = {
    apiKey: "AIzaSyDGK08XIMinPyrhLcibggqpzDW24tEeMOU",
    authDomain: "blog-school-79f0b.firebaseapp.com",
    projectId: "blog-school-79f0b",
    storageBucket: "blog-school-79f0b.appspot.com",
    messagingSenderId: "132460693482",
    appId: "1:132460693482:web:66bb1e42231d406e811493",
    measurementId: "G-5E6ESBY9ZN"
  };


function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}


const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');
let user = null;
let admins = ["jC001UsWfSTRIZajbaPMo0ihERx2"];

// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig)
// referinta la serv de autentif
const auth = firebase.auth();

//  referinta la bd
const db = firebase.firestore();

//  referinta la colectia de postari din bd
const postariDb = db.collection('postari');


const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() { window.location.reload(); });
    

}
logoutBtn.onclick = function() {
    auth.signOut();
    window.location.reload();
} 

function isAdmin() {
    let admin;
    if (user == null)
        return false;

    admin = admins.includes(user.uid); // true or false
    return admin; 

}

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let result = day + "-" + month +"-" + year;

    return result;
}



auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);
    if (user != null) {
        // logat in sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
        salutare.innerHTML = "Salutare, " + user.displayName;


        if (isAdmin() == true) {
            postareBtn.style.display = "block";
        }
        else {
            postareBtn.style.display = "none";
        }
    }
    else {
        // nu e logat in sistem
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
        postareBtn.style.display = "none";
    }

    document.querySelector('body').style.display = "block";
})




if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

