let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
let currentUser = null;

// Login
function login() {
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  if (!username) {
    alert("Enter username!");
    return;
  }

  currentUser = { username, role };

  document.getElementById("login-section").classList.add("hidden");
  if (role === "student") {
    document.getElementById("student-dashboard").classList.remove("hidden");
    showStudentLeaves();
  } else {
    document.getElementById("faculty-dashboard").classList.remove("hidden");
    showFacultyLeaves();
  }
}

// Logout
function logout() {
  currentUser = null;
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("student-dashboard").classList.add("hidden");
  document.getElementById("faculty-dashboard").classList.add("hidden");
}

// Student: Apply Leave
function applyLeave() {
  const reason = document.getElementById("leaveReason").value;
  if (!reason) {
    alert("Enter a reason!");
    return;
  }

  const leave = {
    id: Date.now(),
    student: currentUser.username,
    reason: reason,
    status: "Pending"
  };

  leaves.push(leave);
  localStorage.setItem("leaves", JSON.stringify(leaves));
  document.getElementById("leaveReason").value = "";
  showStudentLeaves();
}

// Show student’s leaves
function showStudentLeaves() {
  const list = document.getElementById("studentLeaves");
  list.innerHTML = "";
  leaves
    .filter(l => l.student === currentUser.username)
    .forEach(l => {
      const li = document.createElement("li");
      li.textContent = `${l.reason} - ${l.status}`;
      list.appendChild(li);
    });
}

// Show all leaves for faculty
function showFacultyLeaves() {
  const list = document.getElementById("facultyLeaves");
  list.innerHTML = "";
  leaves.forEach(l => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${l.student}</b>: ${l.reason} - <i>${l.status}</i>
      <button onclick="updateLeave(${l.id}, 'Approved')">Approve</button>
      <button onclick="updateLeave(${l.id}, 'Rejected')">Reject</button>
    `;
    list.appendChild(li);
  });
}

// Faculty: Update leave status
function updateLeave(id, status) {
  leaves = leaves.map(l => (l.id === id ? { ...l, status } : l));
  localStorage.setItem("leaves", JSON.stringify(leaves));
  showFacultyLeaves();
}
