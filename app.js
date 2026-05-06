const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1gPj0r4AZmNwBAhLrOOoy-bvT2hb8bwvDKvBx4bnE9Xk/export?format=csv&gid=0";
const DEFAULT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby7tpRVaE1nhcezxtskP0R_6GUzx3NQi6V_ILqopCj3CsPw8qbAiSiyng9qbUb3YiKp/exec";
const SUPABASE_URL = "https://wkijgpnzttchqtwyynyx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_9dAAsM-reAhPdD1mlSUccg_rjFatfXK";
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
let refreshTimer;
let currentUser = null;
let dashboardLoaded = false;
const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const elements = {
  loginView: document.querySelector("#loginView"),
  dashboardView: document.querySelector("#dashboardView"),
  loginForm: document.querySelector("#loginForm"),
  loginEmail: document.querySelector("#loginEmail"),
  loginPassword: document.querySelector("#loginPassword"),
  loginBtn: document.querySelector("#loginBtn"),
  rememberMe: document.querySelector("#rememberMe"),
  loginError: document.querySelector("#loginError"),
  syncStatus: document.querySelector("#syncStatus"),
  saveStatus: document.querySelector("#saveStatus"),
  userEmail: document.querySelector("#userEmail"),
  logoutBtn: document.querySelector("#logoutBtn"),
  refreshBtn: document.querySelector("#refreshBtn"),
  totalSites: document.querySelector("#totalSites"),
  workingPlants: document.querySelector("#workingPlants"),
  notWorkingPlants: document.querySelector("#notWorkingPlants"),
  totalCapacity: document.querySelector("#totalCapacity"),
  reportMonthInput: document.querySelector("#reportMonthInput"),
  resultCount: document.querySelector("#resultCount"),
  exportExcelBtn: document.querySelector("#exportExcelBtn"),
  exportPdfBtn: document.querySelector("#exportPdfBtn"),
  recordsBody: document.querySelector("#recordsBody")
};

const exportColumns = [
  { header: "S.N.", key: "sn", width: 7, pdfWidth: 30 },
  { header: "DISTRICT", key: "district", width: 13, pdfWidth: 62 },
  { header: "Final Department", key: "finalDepartment", width: 18, pdfWidth: 78 },
  { header: "DEPT.", key: "department", width: 12, pdfWidth: 54 },
  { header: "NAME OF BUILDING", key: "building", width: 26, pdfWidth: 108 },
  { header: "LOCATION", key: "location", width: 22, pdfWidth: 92 },
  { header: "Site Name", key: "siteName", width: 28, pdfWidth: 112 },
  { header: "Name of Firm", key: "firm", width: 13, pdfWidth: 58 },
  { header: "PLANT CAPACITY", key: "plantCapacity", width: 12, pdfWidth: 54 },
  { header: "RMS Status", key: "rmsStatus", width: 17, pdfWidth: 70 },
  { header: "Inverter Capacity", key: "inverterCapacity", width: 16, pdfWidth: 70 },
  { header: "Serial No. of Inverter", key: "inverterSerial", width: 22, pdfWidth: 88 },
  { header: "Model and Make of inverter", key: "inverterModel", width: 24, pdfWidth: 96 },
  { header: "Plant status", key: "plantStatus", width: 16, pdfWidth: 68 },
  { header: "Date of Visit", key: "visitDate", width: 14, pdfWidth: 62 },
  { header: "E-Today", key: "eToday", width: 14, pdfWidth: 62 },
  { header: "E-Previous Month", key: "ePreviousMonth", width: 18, pdfWidth: 72 },
  { header: "E-Total", key: "eTotal", width: 16, pdfWidth: 70 },
  { header: "REMARK", key: "remark", width: 34, pdfWidth: 154 }
];

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

function showLogin(message = "") {
  currentUser = null;
  elements.loginView.classList.remove("hidden");
  elements.dashboardView.classList.add("hidden");
  window.clearInterval(refreshTimer);
  refreshTimer = undefined;
  if (message) {
    showLoginMessage(message);
  }
}

function showDashboard(user) {
  currentUser = user;
  elements.userEmail.textContent = user.email || "Signed in";
  elements.loginView.classList.add("hidden");
  elements.dashboardView.classList.remove("hidden");
  clearLoginMessage();

  if (!dashboardLoaded) {
    dashboardLoaded = true;
    loadData();
  }

  if (!refreshTimer) {
    refreshTimer = window.setInterval(() => {
      const activeElement = document.activeElement;
      const userIsEditing = activeElement?.matches?.(".editable-field, #reportMonthInput");
      if (!userIsEditing) {
        loadData({ refresh: true, silent: true });
      }
    }, AUTO_REFRESH_MS);
  }
}

function showLoginMessage(message) {
  elements.loginError.textContent = message;
  elements.loginError.classList.remove("hidden");
}

function clearLoginMessage() {
  elements.loginError.textContent = "";
  elements.loginError.classList.add("hidden");
}

function setAuthLoading(isLoading) {
  elements.loginBtn.disabled = isLoading;
  elements.loginBtn.textContent = isLoading ? "PLEASE WAIT..." : "LOGIN";
}

async function initAuth() {
  if (!supabaseClient) {
    showLogin("Supabase client load nahi hua. Internet connection check karein.");
    return;
  }

  const { data } = await supabaseClient.auth.getSession();
  if (data.session?.user) {
    showDashboard(data.session.user);
  } else {
    showLogin();
  }

  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      showDashboard(session.user);
    } else {
      showLogin();
    }
  });
}

async function handleLogin(event) {
  event.preventDefault();
  if (!supabaseClient) {
    showLoginMessage("Supabase client load nahi hua.");
    return;
  }
  clearLoginMessage();
  setAuthLoading(true);

  const email = normalize(elements.loginEmail.value);
  const password = elements.loginPassword.value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

  setAuthLoading(false);
  if (error) {
    showLoginMessage(error.message);
    return;
  }

  if (data.user) {
    await logLogin(data.user);
    showDashboard(data.user);
  }
}

async function handleLogout() {
  if (!supabaseClient) {
    showLogin();
    return;
  }
  await supabaseClient.auth.signOut();
  dashboardLoaded = false;
  records = [];
  elements.recordsBody.innerHTML = "";
  showLogin();
}

async function logLogin(user) {
  try {
    const { error } = await supabaseClient.from("login_logs").insert({
      user_id: user.id,
      email: user.email,
      user_agent: navigator.userAgent
    });
    if (error) {
      console.warn("Login log insert failed", error.message);
    }
  } catch (error) {
    console.warn("Login log insert failed", error);
  }
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
  if (!currentUser) {
    setSaveStatus("error", "Login required");
    return;
  }
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
  if (!currentUser) {
    setSaveStatus("error", "Login required");
    return;
  }
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

function exportRows() {
  return records.map((record) => exportColumns.map((column) => record[column.key] || ""));
}

function exportTitle() {
  const month = normalize(elements.reportMonthInput.value || "April 2026").replace(/\s+/g, "-");
  return `MONTHLY GENERATION OF 40 MW WORKING PLANT _${month}`;
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function exportExcel() {
  if (!window.ExcelJS) {
    setSaveStatus("error", "Excel library not loaded");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Solar Plant Dashboard";
  workbook.created = new Date();
  const worksheet = workbook.addWorksheet("Plant Records", {
    pageSetup: {
      orientation: "landscape",
      paperSize: 8,
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: { left: 0.25, right: 0.25, top: 0.45, bottom: 0.45, header: 0.2, footer: 0.2 }
    }
  });

  worksheet.columns = exportColumns.map((column) => ({ key: column.key, width: column.width }));
  worksheet.mergeCells(1, 1, 1, exportColumns.length);
  const titleCell = worksheet.getCell(1, 1);
  titleCell.value = exportTitle();
  titleCell.font = { bold: true, size: 14, color: { argb: "FF000000" } };
  titleCell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  titleCell.border = {
    top: { style: "thin", color: { argb: "FF000000" } },
    left: { style: "thin", color: { argb: "FF000000" } },
    bottom: { style: "thin", color: { argb: "FF000000" } },
    right: { style: "thin", color: { argb: "FF000000" } }
  };
  worksheet.getRow(1).height = 28;
  worksheet.addRow([]);
  worksheet.addRow([]);

  const headerRow = worksheet.addRow(exportColumns.map((column) => column.header));
  headerRow.height = 36;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FF000000" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F3F3" } };
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });

  exportRows().forEach((row) => {
    const excelRow = worksheet.addRow(row);
    excelRow.height = 46;
  });

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.font = { ...(cell.font || {}), color: { argb: "FF000000" } };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      cell.border = {
        top: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } }
      };
    });
  });

  ["C", "E", "F", "G", "L", "M", "S"].forEach((letter) => {
    worksheet.getColumn(letter).alignment = { horizontal: "left", vertical: "middle", wrapText: true };
  });
  worksheet.views = [{ state: "frozen", ySplit: 4 }];

  const buffer = await workbook.xlsx.writeBuffer();
  downloadBlob(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "solar-plant-records.xlsx");
  setSaveStatus("", "Excel exported");
}

function exportPdf() {
  const jsPdf = window.jspdf?.jsPDF;
  if (!jsPdf || !window.jspdf) {
    setSaveStatus("error", "PDF library not loaded");
    return;
  }

  const doc = new jsPdf({ orientation: "landscape", unit: "pt", format: "a2" });
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(exportTitle(), pageWidth / 2, 32, { align: "center", maxWidth: pageWidth - 60 });

  const columnStyles = exportColumns.reduce((styles, column, index) => {
    styles[index] = {
      cellWidth: column.pdfWidth,
      halign: ["building", "location", "siteName", "inverterSerial", "inverterModel", "remark"].includes(column.key) ? "left" : "center"
    };
    return styles;
  }, {});

  doc.autoTable({
    startY: 70,
    head: [exportColumns.map((column) => column.header)],
    body: exportRows(),
    theme: "grid",
    margin: { left: 24, right: 24 },
    styles: {
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
      font: "helvetica",
      fontSize: 7.2,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "middle",
      halign: "center"
    },
    headStyles: {
      textColor: [0, 0, 0],
      fillColor: [243, 243, 243],
      lineColor: [0, 0, 0],
      lineWidth: 0.35,
      fontStyle: "bold",
      halign: "center"
    },
    columnStyles,
    didParseCell(data) {
      data.cell.styles.textColor = [0, 0, 0];
      data.cell.styles.lineColor = [0, 0, 0];
    }
  });

  doc.save("solar-plant-records.pdf");
  setSaveStatus("", "PDF exported");
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
  elements.loginForm.addEventListener("submit", handleLogin);
  elements.logoutBtn.addEventListener("click", handleLogout);
  elements.refreshBtn.addEventListener("click", () => loadData({ refresh: true }));
  elements.exportExcelBtn.addEventListener("click", exportExcel);
  elements.exportPdfBtn.addEventListener("click", exportPdf);
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
  initAuth();
}

setup();
