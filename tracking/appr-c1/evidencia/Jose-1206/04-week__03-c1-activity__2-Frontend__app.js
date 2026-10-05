const API_URL = 'https://jsonplaceholder.typicode.com/users';

// State Store
let state = {
    loading: true,
    error: null,
    students: [],
    simulateError: false
};

const stateLoading = document.getElementById('state-loading');
const stateError = document.getElementById('state-error');
const stateData = document.getElementById('state-data');
const metricsSummary = document.getElementById('metrics-summary');
const studentList = document.getElementById('student-list');
const errorMessage = document.getElementById('error-message');
const btnReload = document.getElementById('btn-reload');
const btnRetry = document.getElementById('btn-retry');
const btnToggleError = document.getElementById('btn-toggle-error');
const currentDateEl = document.getElementById('current-date');

document.addEventListener('DOMContentLoaded', () => {
    currentDateEl.textContent = new Date().toLocaleDateString('es-CO', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    initEventListeners();
    fetchStudents();
});

function initEventListeners() {
    btnReload.addEventListener('click', () => fetchStudents());
    btnRetry.addEventListener('click', () => {
        state.simulateError = false;
        fetchStudents();
    });
    
    btnToggleError.addEventListener('click', () => {
        state.simulateError = !state.simulateError;
        if(state.simulateError) {
            btnToggleError.textContent = '✅ Modo Normal';
            btnToggleError.classList.replace('btn-outline-danger', 'btn-primary');
        } else {
            btnToggleError.textContent = '⚠️ Simular Error';
            btnToggleError.classList.replace('btn-primary', 'btn-outline-danger');
        }
        fetchStudents();
    });
}

// Consumo de API (fetch) y cambio de estados
async function fetchStudents() {
    state.loading = true;
    state.error = null;
    renderUI();

    try {
        if (state.simulateError) {
            throw new Error('Error simulado: No se logró conectar con el servidor de matrículas de la Universidad.');
        }

        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);
        }

        const rawUsers = await response.json();

        state.students = rawUsers.map(user => ({
            id: user.id,
            name: user.name,
            code: `EST-${202600 + user.id}`,
            email: user.email.toLowerCase(),
            phone: user.phone.split(' ')[0],
            status: 'presente' 
        }));

        state.loading = false;
    } catch (err) {
        state.loading = false;
        state.error = err.message || 'Ocurrió un error inesperado al consultar la API.';
    }

    renderUI();
}

// Controlador de Vista (Manejo de Estados)
function renderUI() {
    // 1. Ocultar todos los contenedores
    stateLoading.classList.add('hidden');
    stateError.classList.add('hidden');
    stateData.classList.add('hidden');
    metricsSummary.classList.add('hidden');

    // 2. Mostrar la vista correspondiente según el estado actual
    if (state.loading) {
        stateLoading.classList.remove('hidden');
    } else if (state.error) {
        errorMessage.textContent = state.error;
        stateError.classList.remove('hidden');
    } else {
        renderStudentTable();
        updateMetrics();
        stateData.classList.remove('hidden');
        metricsSummary.classList.remove('hidden');
    }
}

function renderStudentTable() {
    studentList.innerHTML = '';
    state.students.forEach(student => {
        const tr = document.createElement('tr');
        const initials = student.name.split(' ').map(n => n[0]).slice(0, 2).join('');
        
        tr.innerHTML = `
            <td>
                <div class="student-info">
                    <div class="avatar">${initials}</div>
                    <strong>${student.name}</strong>
                </div>
            </td>
            <td>
                <div><code>${student.code}</code></div>
                <small style="color: var(--text-secondary);">${student.email}</small>
            </td>
            <td>${student.phone}</td>
            <td>
                <span class="status-badge ${student.status}">${student.status.toUpperCase()}</span>
            </td>
            <td>
                <div class="status-actions">
                    <button class="btn-status ${student.status === 'presente' ? 'active-pres' : ''}" onclick="changeStatus(${student.id}, 'presente')">P</button>
                    <button class="btn-status ${student.status === 'tardanza' ? 'active-tard' : ''}" onclick="changeStatus(${student.id}, 'tardanza')">T</button>
                    <button class="btn-status ${student.status === 'ausente' ? 'active-aus' : ''}" onclick="changeStatus(${student.id}, 'ausente')">A</button>
                </div>
            </td>
        `;
        studentList.appendChild(tr);
    });
}

function updateMetrics() {
    document.getElementById('metric-total').textContent = state.students.length;
    document.getElementById('metric-present').textContent = state.students.filter(s => s.status === 'presente').length;
    document.getElementById('metric-late').textContent = state.students.filter(s => s.status === 'tardanza').length;
    document.getElementById('metric-absent').textContent = state.students.filter(s => s.status === 'ausente').length;
}

window.changeStatus = function(studentId, newStatus) {
    state.students = state.students.map(s => s.id === studentId ? { ...s, status: newStatus } : s);
    renderUI();
};