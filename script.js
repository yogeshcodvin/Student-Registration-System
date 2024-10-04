// JavaScript for Student Registration System

// Initialize variables
let editIndex = null; // To track which row is being edited
let currentRow = null; // To track the currently editing row
const studentTableBody = document.getElementById('studentTableBody'); // Get the table body
const studentForm = document.getElementById('studentForm'); // Get the form

// Function to add a new student
function addStudent(name, studentId, email, contact) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${studentId}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td>
            <button onclick="editStudent(this.parentElement.parentElement)">Edit</button>
            <button onclick="deleteStudent(this.parentElement.parentElement)">Delete</button>
        </td>
    `;
    studentTableBody.appendChild(row);
}

// Function to edit a student row
function editStudent(row) {
    // Checking if a row is already being edited
    if (currentRow) {
        alert("Please finish editing the current entry before editing another.");
        return; // Preventing editing another row
    }

    currentRow = row; // Store the current row being edited
    const cells = row.getElementsByTagName('td');
    document.getElementById('name').value = cells[0].textContent;
    document.getElementById('studentId').value = cells[1].textContent;
    document.getElementById('email').value = cells[2].textContent;
    document.getElementById('contact').value = cells[3].textContent;

    editIndex = row.rowIndex - 1; // Store the row index for updating later
}

// Function to delete a student row
function deleteStudent(row) {
    studentTableBody.removeChild(row);
}



// Function to save student data to local storage
function saveToLocalStorage() {
    const students = [];
    const rows = studentTableBody.getElementsByTagName('tr');
    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        const studentData = {
            name: cells[0].textContent,
            studentId: cells[1].textContent,
            email: cells[2].textContent,
            contact: cells[3].textContent,
        };
        students.push(studentData);
    }
    localStorage.setItem('students', JSON.stringify(students)); // Save students array to local storage
}


// Load student records from local storage
function loadFromLocalStorage() {
    const students = JSON.parse(localStorage.getItem('students'));
    if (students) {
        for (let student of students) {
            addStudent(student.name, student.studentId, student.email, student.contact);
        }
    }
}



// Handle form submission
studentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    // Check if we're editing an existing row
    if (editIndex !== null) {
        const row = studentTableBody.rows[editIndex];
        row.cells[0].textContent = name;
        row.cells[1].textContent = studentId;
        row.cells[2].textContent = email;
        row.cells[3].textContent = contact;
        editIndex = null; // Reset after editing
        currentRow = null; // Clear current row
    } else {
        addStudent(name, studentId, email, contact); // Add new student
    }


    //  Save updated student records to local storage
        saveToLocalStorage();

    studentForm.reset(); // Clear the form
});


// Call loadFromLocalStorage when the page loads
window.onload = function() {
    loadFromLocalStorage();
};