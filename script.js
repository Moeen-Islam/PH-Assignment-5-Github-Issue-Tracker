let currentFilter = "all";
const API_URLAll= "https://phi-lab-server.vercel.app/api/v1/lab/issues";
let issues = [];

// variable declear
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const totalIssues = document.getElementById("totalIssues");
const issuesContainer = document.getElementById("issuesContainer");
const searchInput = document.getElementById("searchInput");




// Login Page 
document.getElementById("signinBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const userName = document.getElementById("username")
    const userNameValue = userName.value

    const password = document.getElementById("password")
    const passwordValue = password.value

    if(userNameValue == "admin" && passwordValue == "admin123"){
        window.location.assign("./home.html")
    }
    else if(userNameValue == "" && passwordValue == ""){
        alert("Enter Username and Password")
    }
    else{
        alert("Invalid Username or Password")
    }
})
// Login Page End

// active btn Function
function setActiveButton(type) {
      allBtn.className = "w-[90px] sm:w-[120px] shrink-0 btn bg-white text-[#64748B]";
      openBtn.className = "w-[90px] sm:w-[120px] shrink-0 btn bg-white text-[#64748B]";
      closedBtn.className = "w-[90px] sm:w-[120px] shrink-0 btn bg-white text-[#64748B]";

      if (type === "all") {
        allBtn.className = "w-[90px] sm:w-[120px] shrink-0 btn btn-primary text-white";
      } else if (type === "open") {
        openBtn.className = "w-[90px] sm:w-[120px] shrink-0 btn btn-primary text-white";
      } else if (type === "closed") {
        closedBtn.className = "w-[90px] sm:w-[120px] shrink-0 btn btn-primary text-white";
      }
    }

    



