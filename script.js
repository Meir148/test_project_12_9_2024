const addPersonForm = document.getElementById('addPersonForm');
const todoTableBody = document.querySelector('#todoTable tbody');


window.onload = function () {
    const soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
    soldiers.forEach((soldier) => {
        addSoldierToTable(soldier);
    });
};

addPersonForm.addEventListener('submit', function (e) {
    e.preventDefault();

// משתנים שיכילו את שדות הקלט
    const fullName = document.getElementById('fullName').value;
    const rank = addPersonForm.elements[1].value; 
    const position = addPersonForm.elements[2].value; 
    const platoon = addPersonForm.elements[3].value; 
    const missionTime = addPersonForm.elements[4].value; 
    const status = document.getElementById('status').value;

    //יצירת אובייקט
    const soldier = {
        fullName,
        rank,
        position,
        platoon,
        missionTime,
        status
    };

    //שמירה למאגר
    let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
    soldiers.push(soldier);
    localStorage.setItem('soldiers', JSON.stringify(soldiers));

    // הוספה
    addSoldierToTable(soldier);

    // ניקוי שדות
    addPersonForm.reset();
});

// הצגה
function addSoldierToTable(soldier) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${soldier.fullName}</td>
        <td>${soldier.rank}</td>
        <td>${soldier.position}</td>
        <td>${soldier.platoon}</td>
        <td>${soldier.status}</td>
        <td>
            <button class="remove">Remove</button>
            <button class="mission">Mission</button>
            <button class="edit">Edit</button>
        </td>
    `;


    todoTableBody.appendChild(row);

    // הסרה
    row.querySelector('.remove').addEventListener('click', () => {
        row.remove();
        deleteFromStorage(soldier.fullName);
    });
}

// מחיקה
function deleteFromStorage(fullName) {
    let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];

    soldiers = soldiers.filter(soldier => soldier.fullName !== fullName);

    localStorage.setItem('soldiers', JSON.stringify(soldiers));
}



row.querySelector('.edit').addEventListener('click', () => {
    row.remove();
    editsoldier(soldier.fullName);
});

editsoldier(){

}