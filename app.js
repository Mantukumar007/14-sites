const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1gPj0r4AZmNwBAhLrOOoy-bvT2hb8bwvDKvBx4bnE9Xk/export?format=csv&gid=0";
const DEFAULT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby7tpRVaE1nhcezxtskP0R_6GUzx3NQi6V_ILqopCj3CsPw8qbAiSiyng9qbUb3YiKp/exec";
const AUTO_REFRESH_MS = 60000;
const DRAFT_KEY = "solar-dashboard-drafts";
const REPORT_MONTH_KEY = "solar-dashboard-report-month";

const fallbackRows = [
  ["1", "Saran", "Energy Department", "BSPTCL", "Control Room Building", "132/33 KV GSS Sheetalpur", "Control Room Building, Saran", "SOLEX", "50", "Not Working", "50kw", "KY0920HTR0223", "KSY,Ksolar", "Working", "2.05.2026", "156.0 kWh", "", "69843.0 kWh", ""],
  ["2", "Saran", "Energy Department", "NBPDCL", "SDCR cum Consumer Facilitation Centre", "Sadar Chapra (East Telpa)", "SDCR cum Consumer Facilitation Centre, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "RFB0834074", "Growatt 1000 -S", "Plant not Working", "29.04.2026", "", "", "", "Inverter shown No AC Connection. Plant not working"],
  ["3", "Saran", "Energy Department", "NBPDCL", "SDCR cum Consumer Facilitation Centre", "Baniyapur", "SDCR cum Consumer Facilitation Centre, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811284327", "KSY ,K solar", "Working", "2.05.2026", "4300Wh", "", "10MWWh", ""],
  ["4", "Saran", "Energy Department", "NBPDCL", "SDCR cum Consumer Facilitation Centre", "Sonpur", "SDCR cum Consumer Facilitation Centre, Saran", "SOLEX", "1", "Not Mandatory", "1kw", "1811284430", "KSY ,K solar", "Working", "30.05.2026", "2600 Wh", "", "6079 kWh", ""],
  ["5", "Saran", "Energy Department", "NBPDCL", "PSS at Dariyapur", "Dariyapur", "PSS at Dariyapur, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811234305", "KSY,Ksolar", "Working", "30.04.2026", "5000 Wh", "", "11 MWh", "1. Earthing wire damaged. 2. One solar panel is damaged"],
  ["6", "Saran", "Energy Department", "NBPDCL", "PSS at Masrakh", "Masrakh", "PSS at Masrakh, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811294573", "KSY,Ksolar", "Plant not Working", "29.04.2026", "", "", "", "Not Working (Inverter OFF Condition.)"],
  ["7", "Saran", "Energy Department", "NBPDCL", "PSS at Taraiya", "Taraiya", "PSS at Taraiya, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811234291", "KSY,Ksolar", "Working", "29.04.2026", "1000 Wh", "", "11 MWh", ""],
  ["8", "Saran", "Energy Department", "NBPDCL", "PSS at Panapur", "Panapur", "PSS at Panapur, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811234111", "KSY,Ksolar", "Working", "30.04.2026", "4.8 kWh", "", "11154.4 kWh", ""],
  ["9", "Saran", "Energy Department", "NBPDCL", "PSS at Amnaur", "Amnaur", "PSS at Amnaur, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811284449", "KSY,Ksolar", "Working", "29.04.2026", "5.5 kWh", "", "13625.4 kWh", "One panel damaged."],
  ["10", "Saran", "Energy Department", "NBPDCL", "PSS at Baniyapur", "Baniyapur", "PSS at Baniyapur, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1903084387", "KSY,Ksolar", "Working", "2.05.2026", "6100 Wh", "", "15 MWh", "Earthing wire damaged."],
  ["11", "Saran", "Energy Department", "NBPDCL", "PSS at Lahaladpur", "Lahaladpur", "PSS at Lahaladpur, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811234396", "KSY,Ksolar", "Working", "2.05.2026", "4700 Wh", "", "8919 kWh", ""],
  ["12", "Saran", "Energy Department", "NBPDCL", "PSS at Garkha", "Garkha", "PSS at Garkha, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811234103", "KSY,Ksolar", "Working", "4.05.2026", "4300Wh", "", "15MWh", ""],
  ["13", "Saran", "Energy Department", "NBPDCL", "PSS at Ekma", "Ekma", "PSS at Ekma, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811234467", "KSY,Ksolar", "Working", "4.05.2026", "3500 Wh", "", "12 MWh", ""],
  ["14", "Saran", "Energy Department", "NBPDCL", "PSS at Manjhi", "Manjhi", "PSS at Manjhi, Saran", "SOLEX", "2", "Not Mandatory", "2.2kw", "1811234511", "KSY,Ksolar", "Working", "4.05.2026", "2700 Wh", "", "10 MWh", ""]
];

const headers = ["sn", "district", "finalDepartment", "department", "building", "location", "siteName", "firm", "plantCapacity", "rmsStatus", "inverterCapacity", "inverterSerial", "inverterModel", "plantStatus", "visitDate", "eToday", "ePreviousMonth", "eTotal", "remark"];
const editableKeys = ["plantStatus", "visitDate", "eToday", "eTotal", "remark"];
let records = [];
let drafts = readJson(DRAFT_KEY, {});
let saveTimers = {};
let monthTimer;

const elements = {
  syncStatus: document.querySelector("#syncStatus"),
  saveStatus: document.querySelector("#saveStatus"),
  refreshBtn: document.querySelector("#refreshBtn"),
  totalSites: document.querySelector("#totalSites"),
  workingPlants: document.querySelector("#workingPlants"),
  notWorkingPlants: document.querySelector("#notWorkingPlants"),
  totalCapacity: document.querySelector("#totalCapacity"),
  reportMonthInput: document.querySelector("#reportMonthInput"),
  resultCount: document.querySelector("#resultCount"),
  exportBtn: document.querySelector("#exportBtn"),
  recordsBody: document.querySelector("#recordsBody")
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
}

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const next = csvText[index + 1];
    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function mapRows(rows) {
  return rows
    .filter((row) => /^\d+$/.test(normalize(row[0])))
    .map((row) => {
      const record = headers.reduce((acc, key, index) => {
        acc[key] = normalize(row[index]);
        return acc;
      }, {});
      return { ...record, ...(drafts[record.sn] || {}) };
    });
}

function isWorking(record) {
  return normalize(record.plantStatus).toLowerCase() === "working";
}

function toDateInputValue(value) {
  const match = normalize(value).match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
  if (!match) {
    return "";
  }
  const [, day, month, year] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function fromDateInputValue(value) {
  const match = normalize(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return normalize(value);
  }
  const [, year, month, day] = match;
  return `${Number(day)}.${month}.${year}`;
}

function updateMetrics() {
  const workingCount = records.filter(isWorking).length;
  const notWorkingCount = records.length - workingCount;
  const capacity = records.reduce((sum, record) => sum + Number.parseFloat(record.plantCapacity || 0), 0);
  elements.totalSites.textContent = records.length;
  elements.workingPlants.textContent = workingCount;
  elements.notWorkingPlants.textContent = notWorkingCount;
  elements.totalCapacity.textContent = `${capacity.toFixed(capacity % 1 ? 1 : 0)} kW`;
}

function renderTable() {
  elements.resultCount.textContent = `Showing ${records.length} records`;
  if (!records.length) {
    elements.recordsBody.innerHTML = `<tr><td class="empty-state" colspan="10">No records found.</td></tr>`;
    return;
  }
  elements.recordsBody.innerHTML = records.map(renderRow).join("");
}

function renderRow(record) {
  return `
    <tr data-sn="${escapeHtml(record.sn)}">
      <td data-label="S.N.">${escapeHtml(record.sn)}</td>
      <td data-label="Site">
        <span class="site-name">${escapeHtml(record.building)}</span>
        <span class="subtext">${escapeHtml(record.siteName)}</span>
      </td>
      <td data-label="Location">${escapeHtml(record.location)}</td>
      <td data-label="Capacity">${escapeHtml(record.plantCapacity)} kW</td>
      <td data-label="RMS">${rmsBadge(record)}</td>
      <td data-label="Plant Status">
        <select class="editable-field status-select" data-sn="${escapeHtml(record.sn)}" data-key="plantStatus">
          ${["Working", "Plant not Working"].map((status) => `<option value="${status}" ${record.plantStatus === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </td>
      <td data-label="Date of Visit">
        <input class="editable-field date-field" type="date" data-sn="${escapeHtml(record.sn)}" data-key="visitDate" value="${escapeHtml(toDateInputValue(record.visitDate))}" title="Select visit date" />
      </td>
      <td data-label="E-Today"><input class="editable-field" data-sn="${escapeHtml(record.sn)}" data-key="eToday" value="${escapeHtml(record.eToday)}" placeholder="0 kWh" /></td>
      <td data-label="E-Total"><input class="editable-field" data-sn="${escapeHtml(record.sn)}" data-key="eTotal" value="${escapeHtml(record.eTotal)}" placeholder="0 kWh" /></td>
      <td data-label="Remarks"><textarea class="editable-field remarks-field" data-sn="${escapeHtml(record.sn)}" data-key="remark" placeholder="Remarks">${escapeHtml(record.remark)}</textarea></td>
    </tr>
  `;
}

function rmsBadge(record) {
  const isIssue = record.rmsStatus.toLowerCase().includes("not working");
  const className = isIssue ? "bad" : "neutral";
  return `<span class="badge ${className}">${escapeHtml(record.rmsStatus || "N/A")}</span>`;
}

function updateRecord(sn, key, value) {
  const record = records.find((item) => item.sn === sn);
  if (!record || !editableKeys.includes(key)) {
    return;
  }
  if (key === "visitDate") {
    value = fromDateInputValue(value);
  }
  record[key] = value;
  drafts[sn] = { ...(drafts[sn] || {}), [key]: value };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  setSaveStatus("saving", "Syncing changes...");
  updateMetrics();
  scheduleSave(sn);
}

function scheduleSave(sn) {
  window.clearTimeout(saveTimers[sn]);
  saveTimers[sn] = window.setTimeout(() => saveRow(sn), 180);
}

function saveRow(sn) {
  const values = drafts[sn];
  if (!values) {
    return;
  }
  postPayload({ sn, values });
  delete drafts[sn];
  localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  setSaveStatus("", "Changes sent");
}

function saveReportMonth() {
  const reportMonth = normalize(elements.reportMonthInput.value);
  localStorage.setItem(REPORT_MONTH_KEY, reportMonth);
  postPayload({ type: "reportMonth", reportMonth });
  setSaveStatus("", "Month sent");
}

function postPayload(payload) {
  const body = JSON.stringify(payload);
  try {
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    if (navigator.sendBeacon && navigator.sendBeacon(DEFAULT_SCRIPT_URL, blob)) {
      return;
    }
  } catch (error) {
    // Fall through to fetch.
  }

  fetch(DEFAULT_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body
  }).catch(() => {
    setSaveStatus("error", "Sync failed");
  });
}

function setSaveStatus(className, text) {
  elements.saveStatus.className = `save-pill ${className}`.trim();
  elements.saveStatus.textContent = text;
}

function retryPendingSaves() {
  Object.keys(drafts).forEach((sn) => saveRow(sn));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function downloadCsv() {
  const keys = ["sn", "district", "department", "building", "location", "plantCapacity", "rmsStatus", "plantStatus", "visitDate", "eToday", "eTotal", "remark"];
  const csvRows = [
    keys.join(","),
    ...records.map((record) => keys.map((key) => `"${String(record[key] ?? "").replace(/"/g, '""')}"`).join(","))
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "solar-plant-records.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

async function loadData({ refresh = false, silent = false } = {}) {
  if (!silent) {
    elements.syncStatus.textContent = refresh ? "Refreshing..." : "Loading sheet data...";
  }
  elements.refreshBtn.disabled = true;

  try {
    const response = await fetch(`${SHEET_CSV_URL}&cacheBust=${Date.now()}`);
    if (!response.ok) {
      throw new Error("Sheet request failed");
    }
    const csvText = await response.text();
    records = mapRows(parseCsv(csvText));
    elements.syncStatus.textContent = `Auto refresh on. ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  } catch (error) {
    records = mapRows(fallbackRows);
    elements.syncStatus.textContent = "Offline copy. Auto refresh on.";
  } finally {
    elements.refreshBtn.disabled = false;
    updateMetrics();
    renderTable();
    retryPendingSaves();
  }
}

function setup() {
  elements.reportMonthInput.value = localStorage.getItem(REPORT_MONTH_KEY) || "April 2026";
  setSaveStatus("", "Sync ready");
  elements.refreshBtn.addEventListener("click", () => loadData({ refresh: true }));
  elements.exportBtn.addEventListener("click", downloadCsv);
  elements.reportMonthInput.addEventListener("input", () => {
    localStorage.setItem(REPORT_MONTH_KEY, elements.reportMonthInput.value);
    setSaveStatus("saving", "Syncing month...");
    window.clearTimeout(monthTimer);
    monthTimer = window.setTimeout(saveReportMonth, 220);
  });
  elements.recordsBody.addEventListener("input", (event) => {
    if (event.target.matches(".editable-field")) {
      updateRecord(event.target.dataset.sn, event.target.dataset.key, event.target.value);
    }
  });
  elements.recordsBody.addEventListener("change", (event) => {
    if (event.target.matches(".editable-field")) {
      updateRecord(event.target.dataset.sn, event.target.dataset.key, event.target.value);
    }
  });
  loadData();
  window.setInterval(() => {
    const activeElement = document.activeElement;
    const userIsEditing = activeElement?.matches?.(".editable-field, #reportMonthInput");
    if (!userIsEditing) {
      loadData({ refresh: true, silent: true });
    }
  }, AUTO_REFRESH_MS);
}

setup();
