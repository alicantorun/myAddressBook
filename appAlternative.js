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
    const entries = Entries.getEntries();
    entries.forEach(entry => {
      UI.addEntryToList(entry);
    });
  }

  static addEntryToList(entry) {
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
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);
    setTimeout(() => {
      div.remove();
    }, 2000);
  }

  static deleteEntry(e) {
    if (e.target.classList.contains("delete")) {
      e.target.parentElement.parentElement.remove();
    }
  }

  static clearField() {
    document.querySelector("#name").value = "";
    document.querySelector("#lastname").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#address").value = "";
  }

  static filterSearch(e) {
    const keyValue = e.target.value.toUpperCase();
    const dispArr = Array.from(document.querySelector("#book-list").children);

    for (let i = 0; i < dispArr.length; i++) {
      let a = dispArr[i].firstElementChild.textContent.toUpperCase();
      if (a.indexOf(keyValue) > -1) {
        dispArr[i].style.display = "";
      } else {
        dispArr[i].style.display = "none";
      }
    }
  }
}

// Store Class: Handles Storage
class Entries {
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
    const entries = Entries.getEntries();
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
  }

  static removeEntry(phone) {
    const entries = Entries.getEntries();
    entries.forEach((entry, index) => {
      if (entry.phone === phone) {
        entries.splice(index, 1);
      }
    });

    localStorage.setItem("entries", JSON.stringify(entries));
  }
}

// Event : Filter Names
document
  .querySelector("#filterInput")
  .addEventListener("keyup", e => UI.filterSearch(e));

// Event: Display Entry
document.addEventListener("DOMContentLoaded", UI.displayEntries);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const lastname = document.querySelector("#lastname").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const address = document.querySelector("#address").value.trim();

  const entry = new Entry(name, lastname, phone, address);
  if (name === "" || lastname === "" || phone === "" || address === "") {
    UI.showAlert("Please fill all the empty cells", "danger");
  } else {
    UI.addEntryToList(entry);
    Entries.addEntry(entry);
    UI.showAlert("Contact successfully added", "success");
    UI.clearField();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteEntry(e);
  Entries.removeEntry(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );
});
