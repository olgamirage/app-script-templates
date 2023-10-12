function updateColumn() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Sheet1");  //треба вставити назву листа де знаходиться база
  // Получаем заголовки с листа
  var headers = sheet.getSheetValues(1, 1, 1, sheet.getLastColumn())[0];
  
  // Ищем индексы колонок по заголовкам
  var domainColumnIndex = headers.indexOf('Domain');
  var drColumnIndex = headers.indexOf('DR');
  var trafficColumnIndex = headers.indexOf('Traffic');

  // Проверяем, найдены ли все нужные колонки
  if (domainColumnIndex === -1 || drColumnIndex === -1 || trafficColumnIndex === -1) {
    throw new Error('Не удалось найти все требуемые колонки');
  }

  var ahrefsSheet = spreadsheet.getSheetByName("Ahrefs"); //назва листа, де вигрузки с Ахрефс, можна замінити
  var ahrefsValues = ahrefsSheet.getDataRange().getValues();
  var values = sheet.getDataRange().getValues();

  // Індекси колонок на листі "Ahrefs", замінить якщо у вас не такі
  var ahrefsColumnBIndex = 1;  // индекс Domain на листе "Ahrefs"
  var ahrefsColumnFIndex = 5;  // индекс DR на листе "Ahrefs"
  var ahrefsColumnYIndex = 24;  // индекс Traffic на листе "Ahrefs"
  
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var ahrefsIndex = -1;
    // Получаем соответствующее значение из колонки B листа "Ahrefs"
    for (var j = 0; j < ahrefsValues.length; j++) {
      if (ahrefsValues[j][ahrefsColumnBIndex] == row[domainColumnIndex]) {
        ahrefsIndex = j;
        break;
      }
    }
    // Если индекс строки на листе "Ahrefs" найден, обновляем значения в колонках DR и Traffic
    if (ahrefsIndex != -1) {
      var drValue = ahrefsValues[ahrefsIndex][ahrefsColumnFIndex];  // значение DR листа "Ahrefs"
      var trafficValue = ahrefsValues[ahrefsIndex][ahrefsColumnYIndex];  // значение Traffic листа "Ahrefs"
      
      sheet.getRange(i + 1, drColumnIndex + 1).setValue(drValue);
      sheet.getRange(i + 1, trafficColumnIndex + 1).setValue(trafficValue);
    }
  }
}
