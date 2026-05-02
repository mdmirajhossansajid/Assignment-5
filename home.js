const issuesContainer = document.getElementById("issues-container");

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

async function allissues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();

    issuesContainer.innerHTML = "";

    data.data.forEach(issue => {
        const issueElement = document.createElement("div");

        issueElement.className = "h-full";

        issueElement.innerHTML = `
        <div class="bg-base-100 p-4 rounded-lg shadow-sm space-y-2 h-full flex flex-col">

            <div class="flex justify-between items-center">
                ${getStatusIcon(issue.status)}
                <p class="${getPriorityClass(issue.priority)} px-4 py-1 rounded-xl text-sm">
                    ${issue.priority}
                </p>
            </div>

            <!-- Title -->
            <h2 class="text-lg font-semibold mt-2 break-words line-clamp-2">
                ${issue.title}
            </h2>

            <!-- Description (flex-grow for equal height) -->
            <p class="text-gray-500 text-sm break-words line-clamp-2 flex-grow">
                ${issue.description}
            </p>

            <!-- Labels (your original icons kept) -->
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

            <!-- Footer -->
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

allissues();