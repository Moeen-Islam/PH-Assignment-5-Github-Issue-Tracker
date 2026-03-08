
let currentFilter = "all";
const API_URLAll= "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const API_SEARCH = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";
let issues = [];

// variable declear
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const totalIssues = document.getElementById("totalIssues");
const issuesContainer = document.getElementById("issuesContainer");
const searchInput = document.getElementById("search-Input");


// active btn Function
const setActiveButton = (type) => {
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
    
// Fetch the data
async function loadIssues() {
        loadingSpinner(true);
        const response = await fetch(API_URLAll);
        const data = await response.json();

        issues = Array.isArray(data) ? data : (data.data || data.issues || []);
        updateTotalCount();
        renderIssues();
}

// loading spinner
const loadingSpinner = (status) => {
    if(status==true){
      document.getElementById("loadingSpinner").classList.remove("hidden")
      document.getElementById("issuesContainer").classList.add("hidden")
    }else{
      document.getElementById("issuesContainer").classList.remove("hidden")
      document.getElementById("loadingSpinner").classList.add("hidden")
    }
}

 const normalizeStatus= (status) => {
      if (!status) return "open";
      const value = status.toString().toLowerCase();
      return value === "closed" ? "closed" : "open";
    }

const formatLabels = (labels) => {
      if (!Array.isArray(labels)) return [];
      return labels.map(label => {
        if (typeof label === "string") return label;
        if (label?.name) return label.name;
        return "";
      }).filter(Boolean);
    }


const getPriorityBadge= (priority) => {
  const value = (priority || "").toString().toLowerCase();
        if (value === "high") {
            return `<span class="text-[10px] leading-none px-3 py-1 rounded-full bg-red-50 text-red-500 border border-red-200 uppercase">HIGH</span>`;
        }
        if (value === "medium") {
            return `<span class="text-[10px] leading-none px-3 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-200 uppercase">MEDIUM</span>`;
        }
        return `<span class="text-[10px] leading-none px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-300 uppercase">LOW</span>`;
}

const getPriorityBadgeModal = (priority) => {
      const value = (priority || "").toString().toLowerCase();
        if (value === "high") {
            return `<span class="text-[12px] leading-none px-4 py-1 rounded-full bg-red-400 text-white border border-red-200 uppercase">HIGH</span>`;
        }
        if (value === "medium") {
            return `<span class="text-[12px] leading-none px-4 py-1 rounded-full bg-orange-400 text-white border border-orange-200 uppercase">MEDIUM</span>`;
        }
        return `<span class="text-[12px] leading-none px-4 py-1 rounded-full bg-slate-400 text-white border border-slate-300 uppercase">LOW</span>`;
}

const getLabelBadge= (label) => {
  const value = label.toLowerCase();

    if (value === "bug") {
        return `<span class="text-[10px] leading-none px-2.5 py-1 rounded-full bg-red-100 text-red-500 border border-red-200 uppercase whitespace-nowrap">BUG</span>`;
    }

    if (value === "help wanted") {
        return `<span class="text-[10px] leading-none px-2.5 py-1 rounded-full bg-amber-100 text-amber-600 border border-amber-300 uppercase whitespace-nowrap">HELP WANTED</span>`;
    }

    if (value === "enhancement") {
        return `<span class="text-[10px] leading-none px-2.5 py-1 rounded-full bg-green-100 text-green-600 border border-green-300 uppercase whitespace-nowrap">ENHANCEMENT</span>`;
    }

    if (value === "documentation") {
        return `<span class="text-[10px] leading-none px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-300 uppercase whitespace-nowrap">DOCUMENTATION</span>`;
    }

    if (value === "good first issue") {
        return `<span class="text-[10px] leading-none px-2.5 py-1 rounded-full bg-blue-100 text-blue-600 border border-blue-300 uppercase whitespace-nowrap">GOOD FIRST ISSUE</span>`;
    }

    return `<span class="text-[10px] leading-none px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-300 uppercase whitespace-nowrap">${label}</span>`;
    }


const getTopBorder= (status) => {
      return normalizeStatus(status) === "closed"
        ? "border-t-[3px] border-t-purple-500"
        : "border-t-[3px] border-t-green-500";
    }

// Status icon
const getStatusIcon= (status) => {
      if (normalizeStatus(status) === "closed") {
        return `
          <span class="w-5 h-5 rounded-full border-s border-purple-300 flex items-center justify-center text-[12px] text-purple-500">
            <img src="./assets/Closed- Status .png" alt="">
          </span>
        `;
      }

      return `
        <span class="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center text-[10px] text-green-500">
            <img src="./assets/Open-Status.png" alt="">
        </span>
      `;
    }

const getStatusForModal = (status) => {
      const value = (status || "").toLowerCase();

      if (value === "closed") {
        return `
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600 text-white border border-purple-200 text-[12px] font-medium">
            Closed
          </span>
        `;
      }

      return `
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-600 text-white border border-green-200 text-[12px] font-medium">
          Opened
        </span>
      `;
}

// filter the card
const getFilteredIssues =() => {
      let filtered = issues;

      if (currentFilter !== "all") {
        filtered = filtered.filter(issue => normalizeStatus(issue.status) === currentFilter);
      }

      const searchValue = searchInput.value.trim().toLowerCase();

      if (searchValue) {
        filtered = filtered.filter(issue => {
          const title = (issue.title || "").toLowerCase();
          const description = (issue.description || "").toLowerCase();
          const author = (issue.author || issue.user?.login || "").toLowerCase();

          return title.includes(searchValue) || description.includes(searchValue) || author.includes(searchValue);
        });
      }

      return filtered;
    }

// Update count 
const updateTotalCount= () => {
      const filteredIssues = getFilteredIssues();
      totalIssues.textContent = filteredIssues.length;
    }

const loadModalDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const res = await fetch(url);
  const data = await res.json()
  displayIssueDetails(data.data)
}

const displayIssueDetails = (issue) => {
  const modalBox = document.getElementById("modal-container");

  document.getElementById("my_modal").showModal();

  modalBox.innerHTML = `
    <div class="p-8">
      <h2 class="text-[32px] font-bold text-[#0F172A] leading-tight mb-3">
        ${issue.title || "Untitled Issue"}
      </h2>

      <div class="flex flex-wrap items-center gap-3 text-sm text-[#64748B] mb-6">
        <span>${getStatusForModal(issue.status)}</span>
        <span>• Opened by ${issue.author || "unknown"}</span>
        <span>• ${issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : "No date"}</span>
      </div>

      <div class="flex flex-wrap gap-2 mb-6">
        ${issue.labels.map(label => getLabelBadge(label)).join("")}
      </div>

      <p class="text-[18px] leading-8 text-[#64748B] mb-6">
        ${issue.description || "No description available."}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8FAFC] rounded-lg p-5 mb-3">
        <div>
          <p class="text-sm text-[#64748B] mb-2">Assignee:</p>
          <p class="text-[18px] font-semibold text-[#0F172A]">
            ${issue.assignee || issue.author || "Unknown"}
          </p>
        </div>

        <div>
          <p class="text-sm text-[#64748B] mb-2">Priority:</p>
          ${getPriorityBadgeModal(issue.priority)}
        </div>
      </div>

      <div class="flex justify-end">
        <form method="dialog">
          <button class="btn btn-primary px-6">Close</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById("my_modal").showModal();
}


// search Section

async function searchIssuesByTitle(searchText) {
    const response = await fetch(`${API_SEARCH}${encodeURIComponent(searchText)}`);
    const data = await response.json();

    issues = Array.isArray(data) ? data : (data.data || data.issues || []);
    updateTotalCount();
    renderIssues();
   
}
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.trim();

  if (searchText === "") {
    loadIssues();
  } else {
    searchIssuesByTitle(searchText);
  }
});


// Cart Render
const renderIssues=() => {
      const filteredIssues = getFilteredIssues();
      issuesContainer.innerHTML = "";

      if (filteredIssues.length === 0) {
        issuesContainer.innerHTML = `
          <div class="col-span-full bg-white border border-gray-200 rounded-lg p-8 text-center text-[#64748B]">
            No issues found.
          </div>
        `;
        loadingSpinner(false);
        return;
      }

      filteredIssues.forEach(issue => {
        const labels = formatLabels(issue.labels);

        const card = document.createElement("div");
        card.className = `bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm h-full flex flex-col ${getTopBorder(issue.status)}`;

        card.innerHTML = `
            <div class="flex flex-col h-full min-h-80" onclick="loadModalDetails(${issue.id})">
                
                <div class="p-4 flex-1">
                <div class="flex items-center justify-between mb-4">
                    ${getStatusIcon(issue.status)}
                    ${getPriorityBadge(issue.priority)}
                </div>

                <h3 class="font-semibold text-[14px] leading-7 text-[#0F172A] mb-2 min-h-14">
                    ${issue.title || "Untitled Issue"}
                </h3>

                <p class="text-[12px] leading-7 text-[#64748B] mb-4 min-h-[72px]">
                    ${issue.description || "No description available."}
                </p>

                <div class="flex flex-wrap gap-2 min-h-8 items-start content-start">
                    ${labels.map(label => getLabelBadge(label)).join("")}
                </div>
                </div>

                <div class="border-t border-gray-200 px-4 py-3 text-[11px] leading-6 text-[#64748B]">
                <p>#${issue.id ?? ""} by ${issue.author || "unknown"}</p>
                <p class="mt-1">
                    ${issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : "No date"}
                </p>
                </div>
            </div>
            `;
        issuesContainer.appendChild(card);
        
      });
      loadingSpinner(false);
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



setActiveButton("all");
loadIssues();
