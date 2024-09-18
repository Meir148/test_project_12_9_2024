const addPersonForm = document.getElementById('addPersonForm');
const todoTableBody = document.querySelector('#todoTable tbody');
const modal = document.querySelector('.modal');
const editForm = document.getElementById('editForm');
const editFullName = document.getElementById('editFullName');
const editRank = document.getElementById('editRank');
const editPosition = document.getElementById('editPosition');
const editPlatoon = document.getElementById('editPlatoon');
const editMissionTime = document.getElementById('editMissionTime');
const editStatus = document.getElementById('editStatus');
const container = document.getElementById('container');

// Store the current soldier being edited
let currentSoldierIndex = null;

// Load soldiers from localStorage
window.onload = function () {
    const soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
    soldiers.forEach((soldier, index) => {
        addSoldierToTable(soldier, index);
    });
};

// Add soldier form submission
addPersonForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const rank = addPersonForm.elements[1].value;
    const position = addPersonForm.elements[2].value;
    const platoon = addPersonForm.elements[3].value;
    const missionTime = addPersonForm.elements[4].value;
    const status = document.getElementById('status').value;

    const soldier = {
        fullName,
        rank,
        position,
        platoon,
        missionTime,
        status
    };

    // Save soldier to localStorage
    let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
    soldiers.push(soldier);
    localStorage.setItem('soldiers', JSON.stringify(soldiers));

    // Add soldier to table
    addSoldierToTable(soldier, soldiers.length - 1);

    // Reset form
    addPersonForm.reset();
});

// Add soldier to table
function addSoldierToTable(soldier, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${soldier.fullName}</td>
        <td>${soldier.rank}</td>
        <td>${soldier.position}</td>
        <td>${soldier.platoon}</td>
        <td>${soldier.status}</td>
        <td>
            <button class="remove">Remove</button>
            <button class="mission">Start Mission</button>
            <button class="edit">Edit</button>
        </td>
    `;
    todoTableBody.appendChild(row);

    // Remove soldier
    row.querySelector('.remove').addEventListener('click', () => {
        row.remove();
        deleteFromStorage(soldier.fullName);
    });

    // Handle mission countdown
    row.querySelector('.mission').addEventListener('click', function () {
        const missionButton = this;
        let timeRemaining = parseInt(soldier.missionTime);

        // Disable the button and start countdown
        missionButton.disabled = true;
        const countdownInterval = setInterval(() => {
            if (timeRemaining > 0) {
                missionButton.textContent = `Time remaining: ${timeRemaining--}s`;
            } else {
                clearInterval(countdownInterval);
                missionButton.remove();
            }
        }, 1000);
    });

    // Edit soldier details
    row.querySelector('.edit').addEventListener('click', () => {
        // Store the index of the soldier being edited
        currentSoldierIndex = index;

        // Hide the container using visibility instead of display
        container.style.visibility = 'hidden';
        modal.style.display = 'block';

        // Pre-fill the modal form with soldier details
        editFullName.value = soldier.fullName;
        editRank.value = soldier.rank;
        editPosition.value = soldier.position;
        editPlatoon.value = soldier.platoon;
        editMissionTime.value = soldier.missionTime;
        editStatus.value = soldier.status;
    });
}

// Edit form submission to save changes
editForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get updated values from the modal form
    const updatedSoldier = {
        fullName: editFullName.value,
        rank: editRank.value,
        position: editPosition.value,
        platoon: editPlatoon.value,
        missionTime: editMissionTime.value,
        status: editStatus.value
    };

    // Get soldiers from localStorage
    let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];

    // Update the soldier at the current index
    soldiers[currentSoldierIndex] = updatedSoldier;

    // Save updated soldiers to localStorage
    localStorage.setItem('soldiers', JSON.stringify(soldiers));

    // Hide modal and restore visibility of the container
    modal.style.display = 'none';
    container.style.visibility = 'visible';

    // Clear table and reload soldiers
    todoTableBody.innerHTML = '';
    soldiers.forEach(addSoldierToTable);
});

// Cancel edit
document.getElementById('cancel').addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = 'none';
    container.style.visibility = 'visible'; // Restore the visibility of the container
});

// Delete from storage
function deleteFromStorage(fullName) {
    let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
    soldiers = soldiers.filter(soldier => soldier.fullName !== fullName);
    localStorage.setItem('soldiers', JSON.stringify(soldiers));
}