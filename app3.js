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


        const entries = List.getEntries();

        entries.forEach((entry) => UI.addToEntryList(entry));
    }

    static addToEntryList(entry) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
       <td>${entry.name}</td>
       <td>${entry.lastname}</td>
       <td>${entry.phone}</td>
       <td>${entry.address}</td>
       <td><a class="btn btn-danger btn-sm text-white delete">Delete</a></td>
       `;

        list.appendChild(row);
    }

    static showAlert(message, classname) {
        const div = document.createElement("div");
        div.className = `alert alert-${classname}`;
        div.appendChild(document.createTextNode(message));
        document.querySelector(".container").insertBefore(div, document.querySelector("#book-form"));

        setTimeout(() => {
            div.remove();
        }, 2000)
    }

    static removeEntry(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        };
    }

    static clearFields() {
        document.querySelector("#name").value = "";
        document.querySelector("#lastname").value = "";
        document.querySelector("#phone").value = "";
        document.querySelector("#address").value = "";
    }

    static searchFilter() {
        const filterValue = document.querySelector("#filterInput").value.toUpperCase();
        const name = document.querySelector("#book-list").firstChild.firstElementChild.textContent;
        const rowArr = Array.from(document.querySelector("#book-list").children);

        for (let i = 0; i < rowArr.length; i++) {
            let a = rowArr[i].firstElementChild.textContent.toUpperCase();

            if (a.indexOf(filterValue) > -1) {
                rowArr[i].style.display = "";
            } else {
                rowArr[i].style.display = "none";
            }
        }
    }
}



// Store Class: Handles Storage
class List {
    static getEntries() {
        let entries;
        if (localStorage.getItem("entries") === null) {
            entries = [];
        } else {
            entries = JSON.parse(localStorage.getItem("entries"));
        }

        return entries;
    }


    static addEntry(entry) {
        const entries = List.getEntries();
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
    }


    static removeEntry(phone) {
        const entries = List.getEntries();
        entries.forEach((entry, index) => {
            if (entry.phone === phone) {
                entries.splice(index, 1);
            }
        });
        localStorage.setItem("entries", JSON.stringify(entries));
    }
}


// Event : Filter Names
document.addEventListener("keyup", (e) => UI.searchFilter(e));


// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayEntries);


// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const lastname = document.querySelector("#lastname").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const address = document.querySelector("#address").value.trim();

    const entry = new Entry(name, lastname, phone, address);
    if (name === "" || lastname === "" || phone === "" || address === "") {
        UI.showAlert("Please fill in all empty cells", "danger");
    } else {
        UI.addToEntryList(entry);
        List.addEntry(entry);
        UI.clearFields();
        UI.showAlert("Contanct successfully added", "success");

    }
})



// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (el) => {
    UI.removeEntry(el.target);
    List.removeEntry(el.target.parentElement.previousElementSibling.previousElementSibling.textContent);
})