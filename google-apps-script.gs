const SHEET_NAME = "Sheet1";
const HEADER_ROW = 4;

const EDITABLE_COLUMNS = {
  plantStatus: 14,
  visitDate: 15,
  eToday: 16,
  eTotal: 18,
  remark: 19
};

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (payload.type === "reportMonth") {
    const month = String(payload.reportMonth || "").trim();
    if (!month) {
      return json_({ ok: false, error: "Report month is blank" });
    }
    sheet.getRange(1, 1).setValue("MONTHLY GENERATION OF 40 MW WORKING PLANT _" + month);
    sheet.getRange(1, 1).setNote("Last webapp month update: " + new Date().toLocaleString());
    return json_({ ok: true, reportMonth: month });
  }

  const row = findRowBySerial_(sheet, String(payload.sn || ""));

  if (!row) {
    return json_({ ok: false, error: "Serial number not found" });
  }

  Object.keys(EDITABLE_COLUMNS).forEach(function (key) {
    if (Object.prototype.hasOwnProperty.call(payload.values || {}, key)) {
      sheet.getRange(row, EDITABLE_COLUMNS[key]).setValue(payload.values[key]);
    }
  });

  sheet.getRange(row, 1).setNote("Last webapp update: " + new Date().toLocaleString());
  return json_({ ok: true, row: row });
}

function doGet() {
  return json_({ ok: true, message: "Solar dashboard sync endpoint is live." });
}

function findRowBySerial_(sheet, serial) {
  const lastRow = sheet.getLastRow();
  const values = sheet.getRange(HEADER_ROW + 1, 1, Math.max(lastRow - HEADER_ROW, 1), 1).getValues();

  for (let index = 0; index < values.length; index += 1) {
    if (String(values[index][0]).trim() === serial) {
      return HEADER_ROW + 1 + index;
    }
  }

  return null;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
