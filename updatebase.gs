function upstat() {
  var ss1 = SpreadsheetApp.getActiveSpreadsheet()
  var list1 = ss1.getSheetByName("outreach"); //назва листа лінкбілдера, можна замінити
  var dataRange1 = list1.getDataRange();

  // Відкриваємо файл таблиці за посиланням
  var ss2 = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/xxxx");// посилання на базу, вставте своє
  var list2 = ss2.getSheetByName("Посилання"); //назва листа в вашій таблиці бази
  var dataRange2 = list2.getDataRange();

  // Отримуємо значення з обох діапазонів даних
  var data1 = dataRange1.getValues();
  var data2 = dataRange2.getValues();

  for (var i = 1; i < data1.length; i++) {
    var row1 = data1[i]; // Отримуємо поточний рядок
    var domain1 = row1[1]; // Отримуємо значення домену з поточного рядка, тут домен у 2 стовпці
    if (domain1 == '') // Якщо комірка домену порожня, переходимо до наступного рядка
      continue;//
    var status1 = row1[11]; // Отримуємо значення статусу з поточного рядка, тут статус у 12 ствопці
    if (status1 == '') // Якщо комірка статусу порожня, переходимо до наступного рядка

      continue;//

    for (var x = 1; x < data2.length; x++) {
      var row2 = data2[x]; // Отримуємо поточний рядок
      var status2 = row2[10]; // Отримуємо значення статусу з поточного рядка, тут статус в 11 стовпці
      var domain2 = row2[0]; // Отримуємо значення домену з поточного рядка, тут домен в 1 стовпці

      // Перевіряємо, чи відповідає домен і статус умовам для оновлення
      if (domain2 != domain1 || (status1 != "Ответили" && status1 != "Черный список" && status1 !== "Размещено" && status1 !== "Не принимают" && status1 !== "Не подходит"))
        continue; // Якщо умови не виконані, переходимо до наступного рядка

      // Оновлюємо значення статусу в базі
      list2.getRange(x + 1, 11).setValue(status1) //тут статус в 11 стовпці

      Logger.log(domain1)
      Logger.log(status1)

    };
  }
}
