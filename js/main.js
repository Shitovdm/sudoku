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
	var CellsData = new Array();
	for ( var i = 1; i <= 81; i++) {
		$("#cell-" + (i+1) + " input").removeClass("incorrect-cell");
		CellsData.push($("#cell-" + i + " input").val());
	}
	CellsDataCheck(CellsData);
}

// Функция вывода ошибки
function InputError(NumberOfIncorrectCell) {
	$("#cell-" + NumberOfIncorrectCell + " input").addClass("incorrect-cell");
	if ( $('#OutputField').val() ) {

	} else {
		$('#OutputField').val("Ошибка ввода данных!");
	}
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
		//console.log(CellsData);
		CellsDataCoincidence(CellsData);
	}
	//console.log("Flag = ", Flag);
	return Flag;
}

// Проверка введенных данных на совпадение в строке, столбце или квадрате(3х3)
function CellsDataCoincidence(CellsData) {
	var Flag_1 = true;
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
							var Flag_1 = false;
							break;
						}

						if ( +$('input[name = '+ num +']').val() !== +$('input[name = '+ y +']').val() ) { // Совпадение в столбце
							
						} else {
							InputError(num);
							InputError(y);
							var Flag_1 = false;
							break;
						}
					}
				}
			}
		}
	}

	// Квадрат (3х3)
	for ( var i = 1; i <= 9; i++) {
		var TempArray = $('td[square = '+ i +']').children('input');
		for ( var j = 0; j < TempArray.length; j++ ) {
			for ( k = 1; k <= 9; k++ ) {
				if ( $(TempArray[j]).val() != "" && j != k) {
					if ( +$(TempArray[j]).val() != +$(TempArray[k]).val() ) {
						
					} else {
						InputError(($(TempArray[j]).attr('name')));
						InputError(($(TempArray[k]).attr('name')));
						var Flag_1 = false;
						break;
					}
				} 
			}
		}		
	}
	//console.log("Flag_1 = ", Flag_1);
	if ( Flag_1 ) {
		TemporarySolutions(CellsData);
	}
	return Flag_1;
}


// Находим промежуточные решения ( возможные значения для каждой клетки )
function TemporarySolutions(CellsData) {
	//Создание массива
	var TempSols = new Array();
	for ( var i = 1; i <= 9; i++ ) {
		TempSols[i] = [];
		for ( var j = 1; j <= 9; j++ ) {
			if ( $('[row = '+ i +'][col = '+ j +']').children('input').val() == "" ) {
				TempSols[i][j] = [1,2,3,4,5,6,7,8,9];
                                for ( x = 1; x <= 9; x++ ) {
                                        //  Временные решения по строкам.
                                        if ( $('[row='+i+' ][col='+x+']').children('input').val() != "" ) {
                                                for ( var k = 0; k < 9; k++ ) {
                                                        if ( TempSols[i][j][k] == +$('[row='+i+' ][col='+x+']').children('input').val() ) {
                                                                TempSols[i][j].splice(k, 1);
                                                                break;
                                                        }	
                                                }	
                                        }
                                        //  Временные решения по столбцам.
                                        if( $('[row='+x+' ][col='+j+']').children('input').val() != "" ){
                                            for ( var k = 0; k < 9; k++ ) {
                                                        if ( TempSols[i][j][k] == +$('[row='+x+' ][col='+j+']').children('input').val() ) {
                                                                TempSols[i][j].splice(k, 1);
                                                                break;
                                                        }	
                                                }	
                                        }      
                                }	
			}
		}
	}
        
        // Приводим массив TempSols[i][j] к массиву GlobalTempSols[i].
        var GlobalTempSols = new Array();
        var counter = 0;
        for(var i = 1; i <= 9; i++){
            for(var j = 1; j <= 9; j++){
                GlobalTempSols[counter] = TempSols[i][j];
                counter++;
            }
        }
        
        //  Добавляем временные решения по квадратам.
        for(var i = 1; i <= 9; i++){  //  Перебираем все квадраты.
            var square = $('[square = 1]').children('input');   //  Получаем в массив все элементы с атрибутом square = i.
            for(var n = 0; n < square.length; n++){ //  Обходим все элементы с атрибутом square = i.
                if( +$(square[n]).val() == "" ){  //  Если пользователь не ввел в эту ячейку значение.
                    for(k = 0; k < 9; k++){ //  Обходим еще раз все элементы с атрибутом square = i, теперь только те, которые требуют временного решения.
                        if( +$(square[k]).val() != "" ){  //  Ищем все заполненные ячейки в квадрате, чтобы достать из них значение которое необходимо удалить из всех незаполненных ячеек.
                            // Удаляем из локального массива временных решений значения $(square[k]).val() у ячеек $(square[n]).attr('name').
                            for(var l = 0; l < 9; l++){ //  Ищем ключ элемента, который необходимо удалить.
                                if( GlobalTempSols[(+$(square[n]).attr('name') - 1)][l] == +$(square[k]).val() ){ //  Если значение которое нужно удалить имеется в массиве временных решений для ячейки.
                                    GlobalTempSols[(+$(square[n]).attr('name') - 1)].splice(l, 1);
                                    break;  // Сокращаем время выполнения.
                                }
                            }
                        }
                    }
                }
            } 
        }
        
        // Аларм!!! Нумерация в массиве сдвинута на -1, так как массив нумеруется с 0. Значения атрибута name у тега input не совпадает с индексом временного решения для соответствующей ячейки.
	console.log(GlobalTempSols);
	
}

