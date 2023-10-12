function add_date() {
  
  let ss1 = SpreadsheetApp.getActiveSpreadsheet();  
  let list1 = ss1.getSheetByName("Shhet1"); //додайте назву листа
  let dataRange1 = list1.getDataRange();
  
  // Получаем значения из диапазона данных
  let data1 = dataRange1.getValues();
  
  // Выводим в лог количество строк данных
  Logger.log(data1.length);
  
  // Цикл по строкам данных начиная со второй строки (индекс 1)
  for (let i = 1; i < data1.length; i++) {    
    let row1 = data1[i];    
    // Получаем значение ячейки с данными
    let ouremail = row1[11]; //треба підствити номер стовпця своєї таблиці
    
    // Если ячейка с пуста, переходим к следующей строке
    if (ouremail == '') continue;
    
    // Получаем значение ячейки с датой
    let date = row1[12]; //треба підствити номер стовпця з датою своєї таблиці
    
    // Если ячейка с датой не пуста, переходим к следующей строке
    if (date != '') continue;
    
    // Если ячейка с датой пуста, вставляем текущую дату
    list1.getRange(i + 1, 13).setValue(new Date()); //треба підствити номер стовпця з датою своєї таблиці
  }
  
}
