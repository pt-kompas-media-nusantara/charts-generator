/*jslint vars: true, plusplus: true, devel: true, nomen: true, maxerr: 50, regexp: true, browser: true, white: true */
/*global $, google */

// preview bar chart
function initializeBarChart() {
	$('#btn-submit').on('click', function () {
		var data, options, barChart,
			// dataTableColumn = [],
			dataTableRows = [];

		barChart = new google.visualization.BarChart(document.getElementById('result'));
		options = { 
			'title' : $('#chart-title').val().trim(), 
			'width': $('#chart-width').val().trim(), 
			'height': $('#chart-height').val().trim(), 
			'legend': {
				position: $('#legend-position').val().trim()
			}
		};
		data = new google.visualization.DataTable();

		$('.table-column-names').each(function (index) {
			var stringOrNumber = (index === 0) ? 'string' : 'number';
			data.addColumn(stringOrNumber, $(this).val().trim());
		});

		$('.table-rows').each(function () {
			var arrRow = [];

			$(this).find('.table-rows-input').each(function (index) {
				var strData = (index === 0) ? $(this).val().trim() : parseFloat($(this).val().trim(), 10);
				arrRow.push(strData);
			});

			dataTableRows.push(arrRow);
		});

		data.addRows(dataTableRows);

		barChart.draw(data, options);

		$('#result').next('p').text('Sumber: ' + $('#chart-data-source').val().trim());

	});
}

$(document).ready(function () {
	'use strict';
	// bar chart
	if($('#bar-chart').length) {

		// add new table column
		$('#btn-add-table-column').on('click', function (e) {
			e.preventDefault();
			var currentNumOfCols = $('#table-column').children('.col-flexible').length,
				col = $('<div></div>'),
				input = $('<input>'),
				rowCol = $('<div></div>'),
				rowInput = $('<input>');

			if (currentNumOfCols < 4) {
				$('#table-column').children('.col-flexible')
								  .removeClass('col-md-' + 12 / currentNumOfCols + ' col-sm-' + 12 / currentNumOfCols + ' col-xs-' + 12 / currentNumOfCols)
								  .addClass('col-md-' + 12 / (currentNumOfCols + 1) + ' col-sm-' + 12 / (currentNumOfCols + 1) + ' col-xs-' + 12 / (currentNumOfCols + 1));
				col.addClass('col-flexible col-md-' + 12 / (currentNumOfCols + 1) + ' col-sm-' + 12 / (currentNumOfCols + 1) + ' col-xs-' + 12 / (currentNumOfCols + 1));
				input.addClass('form-control table-column-names');
				input.attr('type', 'text');
				input.attr('maxlength', 25);

				col.append(input);
				$('#table-column').append(col);

				// modified number of columns in each table row
				$('.table-rows').children('.col-flexible')
								.removeClass('col-md-' + 12 / currentNumOfCols + ' col-sm-' + 12 / currentNumOfCols + ' col-xs-' + 12 / currentNumOfCols)
								.addClass('col-md-' + 12 / (currentNumOfCols + 1) + ' col-sm-' + 12 / (currentNumOfCols + 1) + ' col-xs-' + 12 / (currentNumOfCols + 1));
				rowCol.addClass('col-flexible col-md-' + 12 / (currentNumOfCols + 1) + ' col-sm-' + 12 / (currentNumOfCols + 1) + ' col-xs-' + 12 / (currentNumOfCols + 1));
				rowInput.addClass('form-control table-rows-input');
				rowInput.attr('type', 'text');
				rowInput.attr('placeholder', 'Angka');
				rowInput.attr('maxlength', 255);

				rowCol.append(rowInput);
				$('.table-rows').append(rowCol);

			}
		});

		// reduce table column
		$('#btn-remove-table-column').on('click', function (e) {
			e.preventDefault();
			var currentNumOfCols = $('#table-column').children('.col-flexible').length;

			if (currentNumOfCols > 2) {
				$('#table-column').find('.col-flexible:last-child').remove();
				$('#table-column').children('.col-flexible')
								  .removeClass('col-md-' + 12 / currentNumOfCols + ' col-sm-' + 12 / currentNumOfCols + ' col-xs-' + 12 / currentNumOfCols)
								  .addClass('col-md-' + 12 / (currentNumOfCols - 1) + ' col-sm-' + 12 / (currentNumOfCols - 1) + ' col-xs-' + 12 / (currentNumOfCols - 1));

				$('.table-rows').each(function () {
					$(this).find('.col-flexible:last-child').remove();
					$(this).children('.col-flexible')
									.removeClass('col-md-' + 12 / currentNumOfCols + ' col-sm-' + 12 / currentNumOfCols + ' col-xs-' + 12 / currentNumOfCols)
									.addClass('col-md-' + 12 / (currentNumOfCols - 1) + ' col-sm-' + 12 / (currentNumOfCols - 1) + ' col-xs-' + 12 / (currentNumOfCols - 1));
				});

					

			}
		});

		// add new row button
		$('#btn-add-table-row').on('click', function (e) {
			e.preventDefault();
			var formGroup = $('<div></div>'),
				colsFrag = $(document.createDocumentFragment()),
				numColReference = $('#table-column').children('.col-flexible').length,
				btnDel = $('<a></a>'),
				cols,
				inputs,
				strInputsPlaceholder,
				i;

			formGroup.addClass('table-rows form-group pr');

			for (i = 0; i < numColReference; i++) {
				cols = $('<div></div>');
				inputs = $('<input>');
				strInputsPlaceholder = (i === 0) ? 'Nama data' : 'Angka'; 

				cols.addClass('col-flexible col-md-' + (12/numColReference) +' col-sm-' + (12/numColReference) +' col-xs-' + (12/numColReference));

				inputs.addClass('form-control table-rows-input');
				inputs.attr('type', 'text');
				inputs.attr('placeholder', strInputsPlaceholder);

				
				cols.append(inputs);
				colsFrag.append(cols);
			}

			btnDel.addClass('btn btn-danger btn-overflow');
			btnDel.attr('href', '#');
			btnDel.text('X');

			formGroup.append(btnDel, colsFrag);
			$('#new-table-row').append(formGroup);

			btnDel.one('click', function(e) {
				e.preventDefault();
				formGroup.remove();
			});
		});

		// submit button
		$('#btn-submit').on('click', function (e) {
			e.preventDefault();
			var allPassed = true,
				str,
				strAddColumn = '',
				strAddRows = '',
				strAddRowsData = '',
				strID;

			if ($('#chart-title').val().trim() !== '') {
				$('#chart-title').parent().parent().removeClass('has-error');
			} else {
				$('#chart-title').parent().parent().addClass('has-error');
				$('#chart-title').focus();
				allPassed = false;
				return false;
			}

			if ($('#chart-data-source').val().trim() !== '') {
				$('#chart-data-source').parent().parent().removeClass('has-error');
			} else {
				$('#chart-data-source').parent().parent().addClass('has-error');
				$('#chart-data-source').focus();
				allPassed = false;
				return false;
			}

			if (parseInt($('#chart-width').val().trim(), 10) > 0) {
				$('#chart-width').parent().parent().removeClass('has-error');
			} else {
				$('#chart-width').parent().parent().addClass('has-error');
				$('#chart-width').focus();
				allPassed = false;
				return false;
			}

			if (parseInt($('#chart-height').val().trim(), 10) > 0) {
				$('#chart-height').parent().parent().removeClass('has-error');
			} else {
				$('#chart-height').parent().parent().addClass('has-error');
				$('#chart-height').focus();
				allPassed = false;
				return false;
			}

			
			$('.table-column-names').each(function () {
				$(this).parent().removeClass('has-error');

				if ($(this).val().trim() === '') {
					$(this).parent().addClass('has-error');
					$(this).focus();
					allPassed = false;
					return false;
				}
			});

			if (allPassed) { // check only if previous loop returns true
				$('.table-rows-input').each(function () {
					$(this).parent().removeClass('has-error');

					if ($(this).val().trim() === '') {
						$(this).parent().addClass('has-error');
						$(this).focus();
						allPassed = false;
						return false;
					}
				});
			}
				


			if (allPassed) {
				// get inputs data
				$('.table-column-names').each(function(index) {
					var stringOrNumber = (index === 0) ? 'string' : 'number';
					strAddColumn += 'data.addColumn(\'' + stringOrNumber + '\', \'' + $(this).val().trim() + '\');\n';
				});

				$('.table-rows').each(function() {
					var strRowData = '';
					// data.addRows([ ['asfew11',435,42,231 ], ['asdf22',24,132,123 ] ]);

					$(this).find('.table-rows-input').each(function(index) {
						strRowData += (index === 0) ? '\'' + $(this).val().trim() + '\',' : $(this).val().trim() + ',';
						// strAddRowsData += (index === 0) ? '\'' + $(this).val().trim() + '\',' : $(this).val().trim() + ',';
					});

					strAddRowsData += '[ ' + strRowData.substring(0, strRowData.length - 1) + ' ],';
				});
				
				strAddRows = 'data.addRows([ ' + strAddRowsData.substring(0, strAddRowsData.length - 1) + ' ]);\n';


				// generate code
				strID = $('#chart-title').val().trim().toLowerCase().replace(/\s/g, '') + '-' + Date.now();
				str = '<div style="width:' + $('#chart-width').val().trim() + 'px; padding-bottom: 20px;">\n';
				str += '<div id="' + strID + '"></div>\n';
				str += '<p style="display: block; width:100%; font-size: 11px; color: #949494; padding:5px 0; margin:0;">Sumber: ' + $('#chart-data-source').val().trim() + '</p>\n';
				str += '<div>\n';
				str += '<script src="https://www.google.com/jsapi" type="text/javascript"></script>\n';
				str += '<script type="text/javascript">\n';

				str += '(function () {\n';
				
				str += 'google.load(\'visualization\', \'1\', { \'packages\' : [\'corechart\'] });\n';
				str += 'google.setOnLoadCallback(drawBarChart);\n';

				str += 'function drawBarChart() {\n';
				str += 'var data = new google.visualization.DataTable();\n';
				str += strAddColumn;
				str += strAddRows;
				str += 'var options = { \'title\' : \'' + $('#chart-title').val().trim() +'\', \'width\': ' + $('#chart-width').val().trim() + ', \'height\': ' + $('#chart-height').val().trim() + ', \'legend\': { position : \'' + $('#legend-position').val().trim() + '\'} };\n';
				str += 'var barChart = new google.visualization.BarChart(document.getElementById(\'' + strID + '\'));\n';
				str += 'barChart.draw(data, options);\n';
				str += '}\n';

				str += '}());\n';

				str += '</script>';

				$('#chart-code').text(str).css('overflow', 'hidden');

				window.setTimeout(function () {
					var contentHeight = $('#chart-code')[0].scrollHeight;
					$('#chart-code').height(contentHeight-15);
					$('#chart-code').select();
					
					
				}, 1);

			}
			
		});
		
		// preview
		google.setOnLoadCallback(initializeBarChart);
		
	}
});