// Создание поля
$( document ).ready(function() {
	$('<table>').appendTo('body');
	$('body').append('<textarea id="OutputField">');
	$('table').attr('id', 'workspace');
	$('#workspace').append('<tr>');

	for ( var i = 1; i <= 81; i++ ) {
		if ( i % 9 == 1 ) {
			$('<tr id = "row-'+(Math.ceil(i/9) )+'">').appendTo('#workspace');
		}
		$('#row-' + (Math.ceil(i/9))).append('<td id="cell-' + i + '"><input type="text" name=' + i + '><\/td>')
	}

	// Присваивание каждой клетке параметров (принадлежность к строке, столбцу и квадрату(3х3)).
	// Строка и колонка.
	for ( var i = 0; i < 9; i++ ) {
		for ( var j = 0; j < 9; j++ ) {
			$('#cell-' + ( ((i*9)+1)+j )).attr('row',i+1);
			$('#cell-' + ( ((j*9)+1)+i )).attr('col',i+1);
		}
	}
	// Номер квадрата.
	for ( var x = r = square = 1; x <= 55; x+=27,r = x ) {
		for( var k = r; k < 8+r; k+=3, square++ ) {
			for ( var i = 1; i <= 3; i++ ) {
				for ( var j = -1; j <= 17; j+=9 ) {
					$('#cell-' + ( i+k+j )).attr('square',square);
				}
			}
		}
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

// Функция вывода ошибки
function InputError(NumberOfIncorrectCell) {
	$("#cell-" + NumberOfIncorrectCell + " input").addClass("incorrect-cell");
	if ( $('#OutputField').val() ) {

	} else {
		$('#OutputField').val("Ошибка ввода данных!");
	}

	console.log("Error!");
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
						InputError(i+1);
						break;
					}
				} else {
					InputError(i+1);
					break;
				}	
			} else {
				InputError(i+1);
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

// Проверка введенных данных на совпадение в строке, столбце или квадрате(3х3)
function CellsDataCoincidence(CellsData) {
	var num = 0;
	for ( var i = 0; i < 9; i++ ) { 
		for ( var j = 1; j < 10; j++ ) { 
			num++;
			if ( +$('input[name = '+num+']').val() ) {	
				for ( var k = 1; k < 10; k++ ) {
					var x = i*9 + k;
					var y = num + 9*k;
					if ( num !== x ) {
						if ( +$('input[name = '+ num +']').val() !== +$('input[name = '+ x +']').val() ) { // Совпадение в троке

						} else {
							InputError(num);
							break;
						}

						if ( +$('input[name = '+ num +']').val() !== +$('input[name = '+ y +']').val() ) { // Совпадение в столбце

						} else {
							InputError(num);
							InputError(y);
							break;
						}
					}
				}
			}
		}
	}

	// for ( var x = r = square = 1; x <= 55; x+=27,r = x ) {
	// 	for( var k = r; k < 8+r; k+=3, square++ ) {
	// 		for ( var i = 1; i <= 3; i++ ) {
	// 			for ( var j = -1; j <= 17; j+=9 ) {
	// 				$('#cell-' + ( i+k+j )).attr('square',square);
	// 			}
	// 		}
	// 	}
	// }

}


