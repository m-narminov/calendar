    //Напомнить про 3 способ

    var doc = document;
    var d = new Date();
	var today = d.getTime();
	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();
	var months = ['Январь','Февраль','Март',
				'Апрель','Май','Июнь',
				'Июль','Август','Сентябрь',
                'Октябрь','Ноябрь','Декабрь'];
    var calendar = doc.getElementById("calendar");

    function fillCalendar(calendar){
        var calendar_title = doc.getElementById("monthAndYear");
        var s = months[month] + " " + year;
        d.setDate(1);
        var day = d.getDay();
		day = (6 + day) % 7 + 1;
        d.setDate(d.getDate() - day + 1 );
        calendar_title.innerHTML = s.toString();

        clearStyles();

        for(var i = 3; i < 9; i++){
            for (var j = 0; j < 7; j++){
                calendar.tBodies[0].rows[i].cells[j].innerHTML = d.getDate();
                if (d.getMonth() != month)
                    calendar.tBodies[0].rows[i].cells[j].classList.add("hidden-days");
                if (d.getTime() == today)
                    calendar.tBodies[0].rows[i].cells[j].classList.add("today");
                if(j > 4)
                    calendar.tBodies[0].rows[i].cells[j].classList.add("holydays");
                d.setDate(d.getDate() + 1);
            }
        }
        d.setFullYear(year, month);
    }

    function showTime(){
        var timeCell = doc.getElementById("td-time");
        var t = new Date();
		var minutes = t.getMinutes();
		var hours = t.getHours();
		var seconds = t.getSeconds();
		if (hours < 10){
			hours = "0" + hours;
		}
		if (minutes < 10){
			minutes = "0" + minutes;
		}
		if (seconds < 10){
			seconds = "0" + seconds;
		}
		timeCell.innerHTML = hours + " : " + minutes + " : " + seconds;
		setTimeout(showTime, 1000);
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
        fillCalendar(calendar);
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
        fillCalendar(calendar);
    }

    function clearStyles(){
        for(var i = 3; i < 9; i++){
            for (var j = 0; j < 7; j++){
                calendar.tBodies[0].rows[i].cells[j].classList.remove("hidden-days", "today");
                if (j > 4)
                    calendar.tBodies[0].rows[i].cells[j].classList.remove("hidden-days", "holydays");
            }
        }
    }

    function showCalendar(){
        fillCalendar(calendar);
        showTime();
    }

    var prevM = doc.getElementById('prevMonthBtn');
	var nextM = doc.getElementById('nextMonthBtn');
	if (prevM)
		prevM.addEventListener("click", setPrevMonth, true);
	if (nextM)
		nextM.addEventListener("click", setNextMonth, true);


    showCalendar();