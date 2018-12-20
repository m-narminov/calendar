//Calendar drawing script 2018 Fiit-4
	var d = new Date();
	var today = d.getTime();
	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();
	var months = ['Январь','Февраль','Март',
									'Апрель','Май','Июнь',
									'Июль','Август','Сентябрь',
									'Октябрь','Ноябрь','Декабрь'];
	var days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
	var doc = document;
	var headerRows = 3;
	var calendar = doc.createElement("table");
	calendar.setAttribute("id", "calendar");
	var insPlace = doc.getElementById("parent-cal");
	insPlace.appendChild(calendar);
	function showTime(){
		var cell = doc.getElementById("td-time");
		var currDate = new Date();
		var minutes = currDate.getMinutes();
		var hours = currDate.getHours();
		var seconds = currDate.getSeconds();
		if (hours < 10){
			hours = "0" + hours;
		}
		if (minutes < 10){
			minutes = "0" + minutes;
		}
		if (seconds < 10){
			seconds = "0" + seconds;
		}
		cell.innerHTML = hours + " : " + minutes + " : " + seconds;
		setTimeout(showTime, 1000);
	}
	function createCalendar(){
		for (var i = 0; i < headerRows; i++) {
			var trow = doc.createElement("tr");
			switch (i) {
			case 0:
				var tcell = doc.createElement("td");
				var monthCaption = doc.createElement("span");
				var leftBtn = doc.createElement("button");
				var rightBtn = doc.createElement("button");

				leftBtn.id = "prevMonthBtn";
				rightBtn.id = "nextMonthBtn";

				tcell.appendChild(leftBtn);
				monthCaption.innerHTML += months[month] + ", " + year;
				tcell.appendChild(monthCaption);
				tcell.appendChild(rightBtn);

				tcell.setAttribute("colspan", "7");
				tcell.setAttribute("id", "monthContainer");
				monthCaption.setAttribute("id", "monthAndYear");
				break;
			case 1:
				var tcell = doc.createElement("td");
				tcell.setAttribute("colspan", "7");
				tcell.setAttribute("id", "td-time");
				break;
			case 2:
					for (var j = 0; j < 7; j++) {
						var tcell = doc.createElement("td");
						tcell.innerHTML = days[j];
						trow.appendChild(tcell);
					}
					break;
				}
				trow.appendChild(tcell);
				calendar.appendChild(trow);
			}
			showTime();

		}
		function fillMonth(tbl) {
			d.setDate(1); 							//Считаем с 1 числа текущего месяца
			var day = d.getDay();				//
			day = (6 + day) % 7 + 1;
			d.setDate(d.getDate() - day + 1 );
			for (var i = 2; i < 8; i++) { //заполнение календаря числами
				var trow = doc.createElement("tr");
				for (var j = 0; j < 7; j++) {
					var tcell = doc.createElement("td");
					if (d.getTime() == today) {
						tcell.className = "cal-cell today";
						tcell.innerHTML = d.getDate();
					}
					else if (d.getMonth() != month & j > 4) {
						tcell.className = "cal-cell holydays hidden-days";
						tcell.innerHTML = d.getDate();
					}
					else if (d.getMonth() != month) {
						tcell.className = "cal-cell hidden-days";
						tcell.innerHTML = d.getDate();
					}
					else if (j > 4) {
						tcell.className = "cal-cell holydays";
						tcell.innerHTML = d.getDate();
					}
					else {
						tcell.className = "cal-cell";
						tcell.innerHTML = d.getDate();
					}
					trow.appendChild(tcell);
					d.setDate(d.getDate() + 1);
				}
				tbl.appendChild(trow);
			}
			d.setFullYear(year, month);
		}
		function clearMonth(){
			for(var i = 0; i < 6; i++)
				calendar.removeChild(calendar.lastChild);
		}
		function setPrevMonth(){
			if (month < 1){ //Если это январь, то уменьшить год на 1
				d.setFullYear(--year);
				month = 11;
			}
			else{
				month--;
			}
			d.setMonth(month);					//сменить текущий месяц на предыдущий
			clearMonth();
			fillMonth(calendar);
			var s = months[month] + ' ' + year;
			doc.getElementById('monthAndYear').innerHTML = s.toString();
		}
		function setNextMonth(){
			if(month > 10){ //Если это декабрь, то увеличить год на 1
				d.setFullYear(++year);
				month = 0;
			}
			else{
				month++;
			}
			d.setMonth(month);
			clearMonth();
			fillMonth(calendar);
			var s = months[month] + ' ' + year;
			doc.getElementById('monthAndYear').innerHTML = s.toString();
		}