// Represents an Entry
const Entry = function(name, lastname, phone, address) {
  this.name = name;
  this.lastname = lastname;
  this.phone = phone;
  this.address = address;
};

// Handle UI Tasks
const displayEntries = () => {
  const entries = getEntries();
  entries.forEach(entry => {
    addEntryToList(entry);
  });
};

const addEntryToList = entry => {
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
};

const showAlert = (message, classname) => {
  const div = document.createElement("div");
  div.className = `alert alert-${classname}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);
  setTimeout(() => {
    div.remove();
  }, 2000);
};

const deleteEntry = e => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
};

const clearField = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#lastname").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#address").value = "";
};

const filterSearch = e => {
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
};

// Handles Storage
const getEntries = () => {
  let entries;
  if (localStorage.getItem("entries") === null) {
    entries = [];
  } else {
    entries = JSON.parse(localStorage.getItem("entries"));
  }

  return entries;
};

const addEntry = entry => {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
};

const removeEntry = phone => {
  const entries = getEntries();
  entries.forEach((entry, index) => {
    if (entry.phone === phone) {
      entries.splice(index, 1);
    }
  });

  localStorage.setItem("entries", JSON.stringify(entries));
};

//Filter Names
document
  .querySelector("#filterInput")
  .addEventListener("keyup", e => filterSearch(e));

//Display Entry
document.addEventListener("DOMContentLoaded", displayEntries);

//Add a Entry
document.querySelector("#book-form").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const lastname = document.querySelector("#lastname").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const address = document.querySelector("#address").value.trim();

  const entry = new Entry(name, lastname, phone, address);
  if (name === "" || lastname === "" || phone === "" || address === "") {
    showAlert("Please fill all the empty cells", "danger");
  } else {
    addEntryToList(entry);
    addEntry(entry);
    showAlert("Contact successfully added", "success");
    clearField();
  }
});

//Remove an Entry
document.querySelector("#book-list").addEventListener("click", e => {
  deleteEntry(e);
  showAlert("Contact successfully removed", "success");
  removeEntry(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );
});
