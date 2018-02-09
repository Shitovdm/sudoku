// Создание игрового поля
$( document ).ready(function() {
	$('<table>').appendTo('body');
	$('table').attr('id', 'workspace');
	$('#workspace').append('<tr>');
	for ( var i = 1; i <= 81; i++ ) {
		if ( i % 9 == 1 ) {
			$('<tr id = "row-'+(Math.ceil( i / 9 ) )+'">').appendTo('#workspace');
		}
		$('#row-' + (Math.ceil( i / 9 ))).append('<td id = "cell-'+i+'"><input type="text" name='+i+'></td>')
	}

	// Присваивание каждой клетке параметров (принадлежность к строке, столбцу и квадрату(3х3))
	for ( var i = 0; i < 9; i++ ) {
		for ( var j = 0; j < 9; j++ ) {
			$('#cell-' + ( (i*9+1)+j ) + ' input').attr('row', i+1);
			$('#cell-' + ( (j*9+1)+i ) + ' input').attr('col', i+1);
		}
	}
	var n = l = 1;
	var o = v = 0;
	for ( var x = 1; x <= 55; x+=27 ) {
		var r = x;
		for( var k = r; k < 8+r; k+=3 ) {
			for ( var i = 1; i <= 3; i++ ) {
				for ( var j = -1; j <= 17; j+=9 ) {
					$("#cell-" + ( i+k+j ) + " input").val( (n+o) );
				}
				// console.log(i+k-1,i+k+9-1,i+k+18-1);
			}
			
			//if()
			//v=Math.floor(o / 3)+1;
			if ( o % 3 != 0 ) {
				console.log(o % 3);
				o++;
			}else{
				if((o==0)||(o==3)||(o==6)){
					o++;
				}
			}
		}
		n+=1;
	}
});


// Получение введенных данных
function GetValues() {
	var Values = new Array();
	for ( var i = 1; i <= 81; i++) {
		$("#cell-" + (i+1) + " input").removeClass("incorrect-cell");
		Values.push($("#cell-" + i + " input").val());
	}
	
	console.log("Flag = " + CellsDataCheck(Values));

}

// Проверка введенных данных ( целые числа от 0 до 9 )
function CellsDataCheck(CellsData) {
	var Flag = false;
	for ( var i = 0; i < CellsData.length; i++ ) {
		if ( CellsData[i] != "" ) {
			if ( Number.isInteger(Number(CellsData[i]))) {
				if ( CellsData[i] % 1 == 0 ) {
					if ( (CellsData[i] > 0) && (CellsData[i] < 10) ) {
						
					} else {
						$("#cell-" + (i+1) + " input").addClass("incorrect-cell");
						break;
					}
				} else {
					$("#cell-" + (i+1) + " input").addClass("incorrect-cell");
					break;
				}	
			} else {
				$("#cell-" + (i+1) + " input").addClass("incorrect-cell");
				break;
			}
		}
		if ( i == CellsData.length-1 ) {
			Flag = true;
		}
	}
	if ( Flag ) {
		console.log(CellsData);
		CellsDataCoincidence(CellsData);
	}
	return Flag;
}

// Проверка введенных данных на совпадение по строке, столбцу или в квадрате(3х3)
function CellsDataCoincidence(CellsData) {
	console.log("It still works");

}