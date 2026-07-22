let students = JSON.parse(localStorage.getItem("students")) || [];

function calculateGPA(marks) {
    marks = Number(marks);

    if (marks >= 85) return 4.0;
    if (marks >= 80) return 3.7;
    if (marks >= 75) return 3.3;
    if (marks >= 70) return 3.0;
    if (marks >= 65) return 2.7;
    if (marks >= 60) return 2.3;
    if (marks >= 55) return 2.0;
    if (marks >= 50) return 1.7;
    return 0.0;
}

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const marks = document.getElementById("marks").value;
    const attendance = document.getElementById("attendance").value;

    if (!name || !roll || !marks || !attendance) {
        alert("Please fill all fields.");
        return;
    }

    students.push({
        name,
        roll,
        marks,
        attendance,
        gpa: calculateGPA(marks)
    });

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("attendance").value = "";

    displayStudents();
}

function deleteStudent(index) {
    if (confirm("Delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

function displayStudents() {
    const tbody = document.getElementById("studentTable");
    const search = document.getElementById("search").value.toLowerCase();

    tbody.innerHTML = "";

    students.forEach((student, index) => {
        if (
            student.name.toLowerCase().includes(search) ||
            student.roll.toLowerCase().includes(search)
        ) {
            tbody.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.roll}</td>
                    <td>${student.marks}</td>
                    <td>${student.attendance}%</td>
                    <td>${student.gpa}</td>
                    <td>
                        <button class="btn btn-danger btn-sm"
                        onclick="deleteStudent(${index})">
                        Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });
}

displayStudents();
