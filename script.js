document.addEventListener("DOMContentLoaded", loadEntries);

function saveEntry() {
    let entryTitle = document.getElementById("entryTitle").value;
    let journalEntry = document.getElementById("journalEntry").value;

    if (entryTitle.trim() === "" || journalEntry.trim() === "") {
        alert("Please provide both title and content before saving.");
        return;
    }

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let entry = {
        id: Date.now(), 
        title: entryTitle,
        text: journalEntry,
        date: new Date().toLocaleString()
    };

    entries.unshift(entry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    document.getElementById("entryTitle").value = "";
    document.getElementById("journalEntry").value = "";
    loadEntries();
}

function loadEntries() {
    let entriesContainer = document.getElementById("entriesContainer");
    entriesContainer.innerHTML = "";

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    entries.forEach(entry => {
        let div = document.createElement("div");
        div.classList.add("entry");
        div.innerHTML = `
            <div class="entry-title">${entry.title}</div>
            <small>${entry.date}</small>
            <p>${entry.text}</p>
            <div class="entry-buttons">
                <button class="edit-btn" onclick="editEntry(${entry.id})">Edit</button>
                <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
            </div>
        `;
        entriesContainer.appendChild(div);
    });
}

function deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    loadEntries();
}

function editEntry(id) {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let entry = entries.find(entry => entry.id === id);

    if (entry) {
        document.getElementById("entryTitle").value = entry.title;
        document.getElementById("journalEntry").value = entry.text;
        deleteEntry(id);
    }
}
