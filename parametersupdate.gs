function onEdit(e) {
  // Перевірка, чи аркуш, який був змінений, є аркушем "outreach"
  var sheet = e.source.getActiveSheet();
  if (sheet.getName() !== "outreach") return;
  
  // Перевірка, чи колонка, яка була змінена, є колонкою B
  var range = e.range;
  if (range.getColumn() !== 2) return;
  
  // Якщо обидві умови вище виконані, запуск функції updateSheet
  updateSheet();
}
function updateSheet() {
  // Отримуємо доступ до активного файлу таблиці та аркушу "outreach"
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("outreach");
  
  // Отримуємо доступ до бази посилань
  var targetSS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/sample"); //треба вставити своє посилання на базу
  var targetSheet = targetSS.getSheetByName("Все ссылки"); //вставити свою назву листа
  
  // Отримуємо дані з обох аркушів
  var data = sheet.getDataRange().getValues();
  var targetData = targetSheet.getDataRange().getValues();
  
  // Цикл по рядках аркушу "outreach", починаючи з рядка 2 
  for (var i = 1; i < data.length; i++) {
    var domain = data[i][1];  // Значення домену з колонки B
    
    // Якщо комірка домену порожня, пропускаємо цей рядок
    if (domain == '') continue;
    
    // Шукаємо відповідний рядок в цільовому аркуші
    for (var j = 1; j < targetData.length; j++) {  // Починаємо з 1, оскільки рядок 0 - це заголовки
      var targetDomain = targetData[j][0];  // Значення домену в цільовому аркуші
      
      // Якщо знайдено відповідний домен
      if (targetDomain == domain) {
        var valuesToInsert = targetData[j].slice(1, 6);  // Отримуємо значення з колонок 2-6 (індексація 1-5)
        sheet.getRange(i + 1, 3, 1, valuesToInsert.length).setValues([valuesToInsert]);  // Вставляємо значення у колонку C (індекс 3) та наступні колонки
        break;  // Закінчити цикл, якщо знайдено відповідний домен
      }
    }
  }
