const loginPanel = document.querySelector('.login-panel');
const loginForm = document.querySelector('.login-form');
const loginMessage = loginForm.querySelector('.message');
const leadsPanel = document.querySelector('.leads-panel');
const leadsMessage = document.querySelector('.leads-message');
const count = document.querySelector('#leads-count');
const tableBody = document.querySelector('tbody');
const refreshButton = document.querySelector('.refresh');
const exportButton = document.querySelector('.export');
let currentLeads = [];

function formattedDate(value) {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
}

function renderLeads(leads) {
  currentLeads = leads;
  count.textContent = `Total Leads: ${leads.length}`;
  tableBody.replaceChildren(...leads.map(lead => {
    const row = document.createElement('tr');
    [lead.name, lead.phone, formattedDate(`${lead.birth_date}T00:00:00Z`), formattedDate(lead.created_at)].forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });
    return row;
  }));
}

async function loadLeads() {
  refreshButton.disabled = true;
  leadsMessage.textContent = '';
  try {
    const response = await fetch('/api/join-with-us-leads');
    if (response.status === 401) {
      leadsPanel.hidden = true;
      loginPanel.hidden = false;
      loginMessage.textContent = 'Your session has expired. Please log in again.';
      return;
    }
    if (!response.ok) throw new Error('Request failed');
    const data = await response.json();
    renderLeads(data.leads);
  } catch {
    leadsMessage.textContent = 'Could not load leads. Please try again.';
  } finally {
    refreshButton.disabled = false;
  }
}

loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  const button = loginForm.querySelector('button');
  button.disabled = true;
  loginMessage.textContent = '';
  try {
    const response = await fetch('/api/join-admin-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: loginForm.elements.password.value }) });
    if (response.status === 401) {
      loginMessage.textContent = 'Incorrect password.';
      return;
    }
    if (!response.ok) throw new Error('Login failed');
    loginForm.reset();
    loginPanel.hidden = true;
    leadsPanel.hidden = false;
    await loadLeads();
  } catch {
    loginMessage.textContent = 'Something went wrong. Please try again.';
  } finally {
    button.disabled = false;
  }
});

refreshButton.addEventListener('click', loadLeads);
exportButton.addEventListener('click', () => {
  const escapeCsv = value => `"${String(value).replaceAll('"', '""')}"`;
  const rows = [['name', 'phone', 'birth_date', 'created_at'], ...currentLeads.map(lead => [lead.name, lead.phone, lead.birth_date, lead.created_at])];
  const csv = rows.map(row => row.map(escapeCsv).join(',')).join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = `join-with-us-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
});
