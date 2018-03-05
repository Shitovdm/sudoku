// Создание поля
$( document ).ready(function() {
	$('body').append('<div id="space">');
	$('<table>').appendTo('#space');
	$('#space').append('<button id="CalcButton" onclick="GetValues()">Get Solution!</button></br>');
	$('#space').append('<textarea id="OutputField">');
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
	/**************Временные значения для проверки работы*************/
	$("#cell-3" + " input").val('7');
	$("#cell-4" + " input").val('2');
	$("#cell-9" + " input").val('6');
	$("#cell-10" + " input").val('3');
	$("#cell-17" + " input").val('1');
	$("#cell-21" + " input").val('4');
	$("#cell-26" + " input").val('5');
	$("#cell-28" + " input").val('4');
	$("#cell-29" + " input").val('1');
	$("#cell-30" + " input").val('5');
	$("#cell-32" + " input").val('7');
	$("#cell-33" + " input").val('3');
	$("#cell-34" + " input").val('9');
	$("#cell-37" + " input").val('9');
	$("#cell-38" + " input").val('2');
	$("#cell-39" + " input").val('8');
	$("#cell-43" + " input").val('3');
	$("#cell-44" + " input").val('7');
	$("#cell-45" + " input").val('4');
	$("#cell-46" + " input").val('7');
	$("#cell-50" + " input").val('2');
	$("#cell-51" + " input").val('4');
	$("#cell-52" + " input").val('1');
	$("#cell-54" + " input").val('5');
	$("#cell-58" + " input").val('7');
	$("#cell-61" + " input").val('6');
	$("#cell-64" + " input").val('6');
	$("#cell-66" + " input").val('2');
	$("#cell-70" + " input").val('5');
	$("#cell-74" + " input").val('4');
	$("#cell-76" + " input").val('3');
	$("#cell-77" + " input").val('1');
	$("#cell-79" + " input").val('8');
	/*****************************************************************/
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
	$('#OutputField').val("Ошибка ввода данных!");
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
<<<<<<< Updated upstream
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
=======
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
    var GlobalParameters = new Array();
    var GlobalTempSols = new Array();
    var counter = 0;
    for(var i = 1; i <= 9; i++){
        for(var j = 1; j <= 9; j++){
        	GlobalParameters[counter] = [i,j];
            GlobalTempSols[counter] = TempSols[i][j]; // Массив, содержащий номер строки и столбца каждой ячейки
            counter++;
        }
    }
    
    //  Добавляем временные решения по квадратам.
    for(var i = 1; i <= 9; i++){  //  Перебираем все квадраты.
        var square = $('[square = '+i+']').children('input');   //  Получаем в массив все элементы с атрибутом square = i.
        for(var n = 0; n < square.length; n++){ //  Обходим все элементы с атрибутом square = i.
        	if ( !GlobalParameters[(+$(square[n]).attr('name') - 1)][2] ) {
                GlobalParameters[(+$(square[n]).attr('name') - 1)].push(i);	// Добавляем в GlobalParameters также номер квадрата
            }
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
	//FinalCountDown(GlobalTempSols, GlobalParameters);
	UniqueValueByAttr(GlobalTempSols, GlobalParameters);
}

function FinalCountDown(GlobalTempSols, GlobalParameters) {
	var i = 0;
	var Resolved = false;
	while ( (i != 81) && ( !Resolved ) ) {
		TemporarySolutionsChoise(GlobalTempSols, GlobalParameters);
		i++;
		for ( var j = 0; j < 81; j++ ) {
			//console.log(GlobalTempSols[j]);
			if ( GlobalTempSols[j] == undefined ) {
				if ( j == 80 ) {
					Resolved = true;
				}
			} else {
				j = 81;
			}
		}
	}
}

// Функция выбора единственного решения (если в любой из 81 клетки может быть только 1 решение)
function TemporarySolutionsChoise(GlobalTempSols, GlobalParameters) {
	for ( var i = 0; i < 81; i++ ) { // Перебираем все клетки
		if ( $(GlobalTempSols[i]).length == 1 ) { // Если возможное решение для клетки только одно
			$("#cell-" + (i+1) + " input").val(GlobalTempSols[i][0]); // Значение в этой клетке становится равным единственному возможному решению для неё
			var cells_in_row = $('td[row = '+GlobalParameters[i][0]+']').children('input'); // Все клетки в строке, в которой находится клетка с единственным решением
			var cells_in_col = $('td[col = '+GlobalParameters[i][1]+']').children('input'); // Все клетки в столбце
			var cells_in_square = $('td[square = '+GlobalParameters[i][2]+']').children('input'); // Все клетки в квадрате
			for ( var j = 0; j < 9; j++ ) { // Перебираем все выбранные клетки

				if ( +$(cells_in_row[j]).val() == "" ) { // Если в клетке из выбранных нет значения
					for ( var key = 0; key < 9; key++ ) { // Поиск элемента, который будем удалять из временных решений
						if ( GlobalTempSols[(+$(cells_in_row[j]).attr('name') - 1)][key] == +GlobalTempSols[i][0]) {
							GlobalTempSols[(+$(cells_in_row[j]).attr('name') - 1)].splice(key,1); // Удаляем значение
						}
					}
				}
				if ( +$(cells_in_col[j]).val() == "" ) { // Если в клетке из выбранных нет значения
					for ( var key_1 = 0; key_1 < 9; key_1++ ) { // Поиск элемента, который будем удалять из временных решений
						if ( GlobalTempSols[(+$(cells_in_col[j]).attr('name') - 1)][key_1] == +GlobalTempSols[i][0]) {
							GlobalTempSols[(+$(cells_in_col[j]).attr('name') - 1)].splice(key_1,1); // Удаляем значение
						}
					}
				}
				if ( +$(cells_in_square[j]).val() == "" ) { // Если в клетке из выбранных нет значения
					for ( var key_2 = 0; key_2 < 9; key_2++ ) { // Поиск элемента, который будем удалять из временных решений
						if ( GlobalTempSols[(+$(cells_in_square[j]).attr('name') - 1)][key_2] == +GlobalTempSols[i][0]) {
							GlobalTempSols[(+$(cells_in_square[j]).attr('name') - 1)].splice(key_2,1); // Удаляем значение
						}
					}
				}		
>>>>>>> Stashed changes
			}
		}		
	}
<<<<<<< Updated upstream
        
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
            var square = $('[square = '+i+']').children('input');   //  Получаем в массив все элементы с атрибутом square = i.
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
	
=======

	console.log("GlobalTempSols: ", GlobalTempSols);
>>>>>>> Stashed changes
}

// Функция выбора уникального значения временного решения (если в строке, столбце или квадрате только у одной клетки может быть то или иное значение)
function UniqueValueByAttr(GlobalTempSols, GlobalParameters) {

    // Создание массивов
    // Инициализация
	var attr_row_cells = new Array();
	var attr_col_cells = new Array();
	var attr_square_cells = new Array();
	var tempSolsOf_attr_row_cells = [];
	var tempSolsOf_attr_col_cells = [];
	var tempSolsOf_attr_square_cells = [];

	for ( var i = 0; i < 9; i++ ) {
		// Получаем в массивы ячейки с соответствующими атрибутами
		attr_row_cells[i] = $('td[row = '+ (i+1) +']').children('input'); // Строка
		attr_col_cells[i] = $('td[col = '+ (i+1) +']').children('input'); // Столбец
		attr_square_cells[i] = $('td[square = '+ (i+1) +']').children('input'); // Квадрат
		// Структура массивов, которые будут содержать временные решения ячеек 
		tempSolsOf_attr_row_cells[i] = []; 
		tempSolsOf_attr_col_cells[i] = [];
		tempSolsOf_attr_square_cells[i] = [];

		for ( var j = 0; j < 9; j++ ) {
			// Заполнение временными решениями ранее созданных массивов
			tempSolsOf_attr_row_cells[i][j] = GlobalTempSols[(+$(attr_row_cells[i][j]).attr('name') - 1)];
			tempSolsOf_attr_col_cells[i][j] = GlobalTempSols[(+$(attr_col_cells[i][j]).attr('name') - 1)];
			tempSolsOf_attr_square_cells[i][j] = GlobalTempSols[(+$(attr_square_cells[i][j]).attr('name') - 1)];
			/* На выходе - 3 массива: 1-й, 2-й и 3-й содержат по 9 массивов (строки, столбцы и квадраты), 
			в каждом из которых по 9 массивов (по 9 ячеек в строке, столбце и квадрате), 
			в каждом из которых - временные решения для отдельно взятой клетки */
		}
	}

	console.log(tempSolsOf_attr_row_cells);
	console.log(tempSolsOf_attr_col_cells);
	console.log(tempSolsOf_attr_square_cells);
	//console.log("GlobalTempSols: ", GlobalTempSols);

	var unique_values = [];
	for ( var i = 0; i < 9; i++ ) { // Перебор строк
		unique_values[i] = 0;
		for ( var j = 0; j < 9; j++ ) { // Ячейки, которые сравниваем
			if ( tempSolsOf_attr_row_cells[i][j] != undefined ) { // Ячейки, которые сравниваем, не должна быть заранее заполненной
				for ( var k = 0; k < tempSolsOf_attr_row_cells[i][j].length; k++ ) { // Возможные решения в ячейках, которые сравниваем

					for ( var m = 0; m < 9; m++ ) { // Ячейки, с которыми сравниваем
						if ( tempSolsOf_attr_row_cells[i][m] != undefined ) { // Ячейки, с которыми сравниваем, не должны быть заранее заполненной
							if ( m != j ) { // Не сравниваем значения в одной и той же клетке
								for ( var l = 0; l < tempSolsOf_attr_row_cells[i][m].length; l++ ) { // Возможные решения в ячейках, с которыми сравниваем

									if ( tempSolsOf_attr_row_cells[i][j][k] == tempSolsOf_attr_row_cells[i][m][l] ) { // Если нашлось значение временного решения, равное тому, которое сравниваем
										k++; // Переход к следующему значению временного решения
									} else {
										unique_values[i] = tempSolsOf_attr_row_cells[i][j][k]; // Записываем уникальное значение в массив
										console.log("unique_values = ", unique_values[i]);
										i++; // Если из всех значений временных решений в строке не нашлось ни одного равного тому, которое сравниваем, переходим к следующей строке
									}

								}
							} else {
								m++;
							}
						}
					}
				}
			} else {
				j++;
			}
		}
	}

}