const issuesContainer = document.getElementById("issues-container");
document.getElementById("all-btn").classList.add("btn-primary");

let allIssuesData = [];


const getPriorityClass = (priority) => {
    if (priority.toLowerCase() === "high") {
        return "bg-red-200 text-red-600";
    } else if (priority.toLowerCase() === "medium") {
        return "bg-yellow-200 text-yellow-600";
    } else if (priority.toLowerCase() === "low") {
        return "bg-gray-200 text-gray-600";
    } else {
        return "bg-gray-200 text-gray-600";
    }
};
const getStatusIcon = (status) => {
    if (status.toLowerCase() === "open") {
        return `
        <div class="flex items-center gap-1 text-green-600">
            <img src="assets/Open-Status.png" alt="Open">
        </div>`;
    } else {
        return `
        <div class="flex items-center gap-1 text-purple-600">
            <img src="assets/Closed- Status .png" alt="Closed">
        </div>`;
    }
};
const getBorderClass = (status) => {
    if (status.toLowerCase() === "open") {
        return "border-t-4 border-green-500";
    } else {
        return "border-t-4 border-purple-500";
    }
};

async function allissues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();

    allIssuesData = data.data;

    renderIssues(allIssuesData);
}

function renderIssues(issues) {
    issuesContainer.innerHTML = "";

    document.getElementById("issue-count").textContent = `${issues.length}`;

    issues.forEach(issue => {
        const issueElement = document.createElement("div");
        issueElement.className = "h-full";
        issueElement.innerHTML = `
        <div class="bg-base-100 p-4 rounded-lg shadow-sm ${getBorderClass(issue.status)} space-y-2 h-full flex flex-col">

            <div class="flex justify-between items-center">
                ${getStatusIcon(issue.status)}
                <p class="${getPriorityClass(issue.priority)} px-4 py-1 rounded-xl text-sm">
                    ${issue.priority}
                </p>
            </div>

            <h2 class="text-lg font-semibold mt-2 break-words line-clamp-2">
                ${issue.title}
            </h2>

            <p class="text-gray-500 text-sm break-words line-clamp-2 flex-grow">
                ${issue.description}
            </p>

            <div class="border-b py-3 flex items-center gap-2 flex-wrap">

                ${issue.labels[0] ? `
                <span class="badge bg-red-200 text-red-600 px-3 py-1 rounded-xl flex items-center gap-1">
                    <i class="fa-solid fa-bug"></i>
                    ${issue.labels[0]}
                </span>` : ""}

                ${issue.labels[1] ? `
                <span class="badge bg-yellow-200 text-yellow-600 px-3 py-1 rounded-xl flex items-center gap-1 whitespace-nowrap">
                    <i class="fa-solid fa-life-ring"></i>
                    ${issue.labels[1]}
                </span>` : ""}

            </div>

            <div class="flex justify-between items-center text-sm text-gray-500">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>

            <div class="flex justify-between items-center text-sm text-gray-500">
                <p>Assigned ${issue.assignee || "Unassigned"}</p>
                <p>${new Date(issue.updatedAt).toLocaleDateString()}</p>
            </div>

        </div>
        `;

        issuesContainer.appendChild(issueElement);
    });
}
document.getElementById("all-btn").addEventListener("click", () => {
    renderIssues(allIssuesData);
});

document.getElementById("open-btn").addEventListener("click", () => {
    const openIssues = allIssuesData.filter(i => i.status === "open");
    renderIssues(openIssues);
});

document.getElementById("closed-btn").addEventListener("click", () => {
    const closedIssues = allIssuesData.filter(i => i.status === "closed");
    renderIssues(closedIssues);
});
const buttons = document.querySelectorAll("#all-btn, #open-btn, #closed-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("btn-primary"));
        buttons.forEach(b => b.classList.add("btn-outline"));

        btn.classList.remove("btn-outline");
        btn.classList.add("btn-primary");
    });
});
allissues();