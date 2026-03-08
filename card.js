
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


    // btn filter
function setFilter(type) {
    currentFilter = type;
    setActiveButton(type);
    updateTotalCount();
    renderIssues();
}

allBtn.addEventListener("click", () => setFilter("all"));
openBtn.addEventListener("click", () => setFilter("open"));
closedBtn.addEventListener("click", () => setFilter("closed"));


// Fetch the data
async function loadIssues() {
        const response = await fetch(API_URLAll);
        const data = await response.json();

        issues = Array.isArray(data) ? data : (data.data || data.issues || []);
        updateTotalCount();
        renderIssues();
}
setActiveButton("all");
loadIssues();
