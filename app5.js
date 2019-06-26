// Book Class: Represents a Book
class Entry {
    constructor(name, lastname, phone, address) {
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.address = address;
    }
}




// UI Class: Handle UI Tasks
class UI {
    static displayEntries() {
        const storedEntries = [{
                name: "Alican",
                lastname: "Torun",
                phone: "666",
                address: "Hell"
            },
            {
                name: "Zafer",
                lastname: "Torun",
                phone: "999",
                address: "Heaven"
            }
        ];

        const entries = storedEntries;
        entries.forEach((entry) => UI.addEntryToList(entry));
    }

    static addEntryToList(entry) {
        const list = document.querySelector("#book-list")
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.lastname}</td>
        <td>${entry.phone}</td>
        <td>${entry.address}</td>
        <td><a class="delete btn btn-danger btn-sm text-white">Delete</a></td>
        `;

        list.appendChild(row);
    }

    static deleteEntry(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 1000)

    }

    static clearFields() {
        document.querySelector("#name").value = "";
        document.querySelector("#lastname").value = "";
        document.querySelector("#phone").value = "";
        document.querySelector("#address").value = "";
    }

}




// Vanish in 3 seconds


// Store Class: Handles Storage


// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayEntries);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const lastname = document.querySelector("#lastname").value;
    const phone = document.querySelector("#phone").value;
    const address = document.querySelector("#address").value;

    if (name === "" || lastname === "" || phone === "" || address === "") {
        UI.showAlert("Please fill in all fields", "danger");
    } else {
        const entry = new Entry(name, lastname, phone, address);
        UI.addEntryToList(entry);
        UI.showAlert("Contact successfully added", "success");

        UI.clearFields();
    }
});


// Prevent actual submit


// Get form values


// Validate

// Instatiate book

// Add Book to UI

// Add book to store

// Show success message

// Clear fields


// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteEntry(e.target);
})

// Remove book from UI

// Remove book from store

// Show success message