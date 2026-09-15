const API_URL = "http://127.0.0.1:8000/api/issues/";

let allIssues = [];
let editingIssueId = null;


// ========================================
// LOAD ISSUES
// ========================================

async function loadIssues() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load issues");
        }

        allIssues = await response.json();

        displayIssues();
        updateStatistics();

    } catch (error) {

        console.error(error);

        document.getElementById("issuesContainer").innerHTML = `
            <div class="empty-state">
                ❌ Unable to connect to BusBuddy server.<br><br>
                Make sure Django server is running.
            </div>
        `;
    }
}


// ========================================
// DISPLAY ISSUES
// ========================================

function displayIssues() {

    const container = document.getElementById("issuesContainer");

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const statusFilter =
        document.getElementById("statusFilter").value;


    const filteredIssues = allIssues.filter(issue => {

        const matchesSearch =
            issue.bus_number.toLowerCase().includes(searchText) ||
            issue.route.toLowerCase().includes(searchText) ||
            issue.issue_type.toLowerCase().includes(searchText) ||
            issue.description.toLowerCase().includes(searchText);

        const matchesStatus =
            statusFilter === "All" ||
            issue.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    if (filteredIssues.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                📋 No transport issues found.
            </div>
        `;

        return;
    }


    container.innerHTML = filteredIssues.map(issue => {

        const statusClass =
            issue.status === "Resolved"
                ? "status-resolved"
                : issue.status === "In Progress"
                    ? "status-progress"
                    : "status-reported";


        const priorityClass =
            issue.priority === "High"
                ? "priority-high"
                : issue.priority === "Low"
                    ? "priority-low"
                    : "priority-medium";


        return `
            <div class="issue-card">

                <div class="issue-top">

                    <div>

                        <div class="issue-title">
                            🚌 Bus ${escapeHTML(issue.bus_number)}
                            — ${escapeHTML(issue.issue_type)}
                        </div>

                        <div class="issue-meta">
                            📍 ${escapeHTML(issue.route)}
                            &nbsp; • &nbsp;
                            👤 ${escapeHTML(issue.reported_by)}
                        </div>

                    </div>

                    <div class="tags">

                        <span class="tag ${statusClass}">
                            ${escapeHTML(issue.status)}
                        </span>

                        <span class="tag ${priorityClass}">
                            ${escapeHTML(issue.priority)}
                        </span>

                    </div>

                </div>


                <p class="issue-description">
                    ${escapeHTML(issue.description)}
                </p>


                <div class="issue-bottom">

                    <div class="issue-meta">
                        Issue #${issue.id}
                    </div>

                    <div class="issue-actions">

                        <button
                            class="edit-btn"
                            onclick="editIssue(${issue.id})"
                        >
                            ✏️ Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteIssue(${issue.id})"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


// ========================================
// STATISTICS
// ========================================

function updateStatistics() {

    const total = allIssues.length;

    const resolved =
        allIssues.filter(
            issue => issue.status === "Resolved"
        ).length;

    const open = total - resolved;


    document.getElementById("totalIssues").textContent = total;

    document.getElementById("openIssues").textContent = open;

    document.getElementById("resolvedIssues").textContent = resolved;
}


// ========================================
// OPEN FORM
// ========================================

function openIssueForm() {

    editingIssueId = null;

    document.getElementById("issueForm").reset();

    document.getElementById("status").value = "Reported";

    document.querySelector(".modal-header h2").textContent =
        "Report an Issue";

    document.querySelector(
        "#issueForm .primary-btn"
    ).textContent = "Submit Issue";


    document.getElementById("issueModal").classList.add("show");
}


// ========================================
// CLOSE FORM
// ========================================

function closeIssueForm() {

    document
        .getElementById("issueModal")
        .classList.remove("show");

    editingIssueId = null;
}


// ========================================
// SUBMIT FORM
// ========================================

document.getElementById("issueForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const issueData = {

            bus_number:
                document.getElementById("busNumber").value.trim(),

            route:
                document.getElementById("route").value.trim(),

            issue_type:
                document.getElementById("issueType").value,

            description:
                document.getElementById("description").value.trim(),

            reported_by:
                document.getElementById("reportedBy").value.trim(),

            status:
                document.getElementById("status").value,

            priority:
                document.getElementById("priority").value
        };


        if (
            !issueData.bus_number ||
            !issueData.route ||
            !issueData.issue_type ||
            !issueData.description ||
            !issueData.reported_by
        ) {

            alert("Please fill all required fields.");

            return;
        }


        try {

            let response;


            // ========================================
            // UPDATE
            // ========================================

            if (editingIssueId !== null) {

                response = await fetch(
                    `${API_URL}${editingIssueId}/`,
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(issueData)
                    }
                );

            }


            // ========================================
            // CREATE
            // ========================================

            else {

                response = await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(issueData)
                    }
                );
            }


            if (!response.ok) {

                const errorData = await response.json();

                console.error(errorData);

                alert(
                    "Something went wrong. Please check the form."
                );

                return;
            }


            alert(
                editingIssueId !== null
                    ? "Issue updated successfully! ✅"
                    : "Issue reported successfully! ✅"
            );


            closeIssueForm();

            await loadIssues();

        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to the server. " +
                "Make sure Django is running."
            );
        }

    }
);


// ========================================
// EDIT ISSUE
// ========================================

function editIssue(id) {

    const issue = allIssues.find(
        item => item.id === id
    );


    if (!issue) {
        return;
    }


    editingIssueId = id;


    document.getElementById("busNumber").value =
        issue.bus_number;

    document.getElementById("route").value =
        issue.route;

    document.getElementById("issueType").value =
        issue.issue_type;

    document.getElementById("description").value =
        issue.description;

    document.getElementById("reportedBy").value =
        issue.reported_by;

    document.getElementById("status").value =
        issue.status;

    document.getElementById("priority").value =
        issue.priority;


    document.querySelector(".modal-header h2").textContent =
        "Edit Transport Issue";


    document.querySelector(
        "#issueForm .primary-btn"
    ).textContent = "Update Issue";


    document
        .getElementById("issueModal")
        .classList.add("show");
}


// ========================================
// DELETE ISSUE
// ========================================

async function deleteIssue(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this issue?"
    );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}${id}/`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            alert("Unable to delete the issue.");

            return;
        }


        alert("Issue deleted successfully! 🗑️");

        await loadIssues();

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the server. " +
            "Make sure Django is running."
        );
    }
}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// ========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ========================================

document.getElementById("issueModal").addEventListener(
    "click",
    function(event) {

        if (event.target === this) {
            closeIssueForm();
        }

    }
);


// ========================================
// START APPLICATION
// ========================================

loadIssues();