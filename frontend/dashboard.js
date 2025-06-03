const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

const chargersTableBody = document.querySelector('#chargers-table tbody');
const chargerForm = document.getElementById('charger-form');
const logoutBtn = document.getElementById('logout-btn');
const cancelEditBtn = document.getElementById('cancel-edit');

const filterStatus = document.getElementById('filter-status');
const filterPower = document.getElementById('filter-power');
const filterConnector = document.getElementById('filter-connector');
const applyFiltersBtn = document.getElementById('apply-filters');

let chargers = [];

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

cancelEditBtn.addEventListener('click', () => {
  chargerForm.reset();
  document.getElementById('charger-id').value = '';
});

applyFiltersBtn.addEventListener('click', () => {
  renderChargers(applyFilters(chargers));
});

chargerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('charger-id').value;
  const chargerData = {
    name: document.getElementById('name').value,
    location: {
      latitude: parseFloat(document.getElementById('latitude').value),
      longitude: parseFloat(document.getElementById('longitude').value),
    },
    status: document.getElementById('status').value,
    powerOutput: parseFloat(document.getElementById('powerOutput').value),
    connectorType: document.getElementById('connectorType').value,
  };

  try {
    let res;
    if (id) {
      res = await fetch(`http://localhost:5000/api/chargers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(chargerData),
      });
    } else {
      res = await fetch('http://localhost:5000/api/chargers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(chargerData),
      });
    }

    if (!res.ok) {
      alert('Failed to save charger');
      return;
    }

    chargerForm.reset();
    document.getElementById('charger-id').value = '';
    fetchChargers();
  } catch (err) {
    alert('Error saving charger');
  }
});

async function fetchChargers() {
  try {
    const res = await fetch('http://localhost:5000/api/chargers', {
      headers: { Authorization: `Bearer ${token}` },
    });
    chargers = await res.json();
    renderChargers(chargers);
  } catch (err) {
    alert('Failed to fetch chargers');
  }
}

function renderChargers(list) {
  chargersTableBody.innerHTML = '';
  list.forEach(charger => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${charger.name}</td>
      <td>${charger.location.latitude.toFixed(4)}</td>
      <td>${charger.location.longitude.toFixed(4)}</td>
      <td>${charger.status}</td>
      <td>${charger.powerOutput}</td>
      <td>${charger.connectorType}</td>
      <td>
        <button onclick="editCharger('${charger._id}')">Edit</button>
        <button onclick="deleteCharger('${charger._id}')">Delete</button>
      </td>
    `;
    chargersTableBody.appendChild(tr);
  });
}

window.editCharger = function(id) {
  const charger = chargers.find(c => c._id === id);
  if (!charger) return alert('Charger not found');
  document.getElementById('charger-id').value = charger._id;
  document.getElementById('name').value = charger.name;
  document.getElementById('latitude').value = charger.location.latitude;
  document.getElementById('longitude').value = charger.location.longitude;
  document.getElementById('status').value = charger.status;
  document.getElementById('powerOutput').value = charger.powerOutput;
  document.getElementById('connectorType').value = charger.connectorType;
};

window.deleteCharger = async function(id) {
  if (!confirm('Are you sure you want to delete this charger?')) return;
  try {
    const res = await fetch(`http://localhost:5000/api/chargers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) alert('Failed to delete charger');
    else fetchChargers();
  } catch (err) {
    alert('Error deleting charger');
  }
};

function applyFilters(list) {
  return list.filter(charger => {
    if (filterStatus.value && charger.status !== filterStatus.value) return false;
    if (filterPower.value && charger.powerOutput < Number(filterPower.value)) return false;
    if (filterConnector.value && !charger.connectorType.toLowerCase().includes(filterConnector.value.toLowerCase())) return false;
    return true;
  });
}

fetchChargers();
