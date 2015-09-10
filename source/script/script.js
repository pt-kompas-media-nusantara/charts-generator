/*jslint vars: true, plusplus: true, devel: true, nomen: true, maxerr: 50, regexp: true, browser: true, white: true */
/*global $, google */

$(document).ready(function () {
	'use strict';
	// bar chart
	if($('#bar-chart').length) {
		// add new row button
		$('#btn-add-table-row').on('click', function (e) {
			e.preventDefault();
			var formGroup = $('<div></div>'),
				colDataName = $('<div></div>'),
				colDataNum = $('<div></div>'),
				colBtnDel = $('<div></div>'),
				inputDataName = $('<input>'),
				inputDataNum = $('<input>'),
				btnDel = $('<a></a>');

			formGroup.addClass('form-group');

			colDataName.addClass('col-md-6 col-sm-6 col-xs-6');
			colDataNum.addClass('col-md-5 col-sm-5 col-xs-5');
			colBtnDel.addClass('col-md-1 col-sm-1 col-xs-1');
			
			inputDataName.addClass('form-control inputDataName');
			inputDataName.attr('type', 'text');
			inputDataName.attr('placeholder', 'Nama data');
			inputDataName.attr('maxlength', 25);

			inputDataNum.addClass('form-control inputDataNum');
			inputDataNum.attr('type', 'text');
			inputDataNum.attr('placeholder', 'Angka');
			inputDataNum.attr('maxlength', 255);

			btnDel.addClass('btn btn-danger');
			btnDel.attr('href', '#');
			btnDel.text('X');

			colDataName.append(inputDataName);
			colDataNum.append(inputDataNum);
			colBtnDel.append(btnDel);
			formGroup.append(colDataName, colDataNum, colBtnDel);
			$('#new-table-row').append(formGroup);

			btnDel.one('click', function(e) {
				e.preventDefault();
				formGroup.remove();
			});
		});

		// submit button
		$('#btn-submit').on('click', function (e) {
			e.preventDefault();
			var str,
				id,
				arrDataName = [],
				arrDataNum = [],
				dataLen,
				i,
				strData = '';

			if ($('#chart-title').val().trim() !== '') {
				$('#chart-title').parent().parent().removeClass('has-error');
			} else {
				$('#chart-title').parent().parent().addClass('has-error');
				$('#chart-title').focus();
				return false;
			}

			if (parseInt($('#chart-width').val().trim(), 10) > 0) {
				$('#chart-width').parent().parent().removeClass('has-error');
			} else {
				$('#chart-width').parent().parent().addClass('has-error');
				$('#chart-width').focus();
				return false;
			}

			if (parseInt($('#chart-height').val().trim(), 10) > 0) {
				$('#chart-height').parent().parent().removeClass('has-error');
			} else {
				$('#chart-height').parent().parent().addClass('has-error');
				$('#chart-height').focus();
				return false;
			}

			if ($('#chart-column-name-1').val().trim() !== '') {
				$('#chart-column-name-1').parent().parent().removeClass('has-error');
			} else {
				$('#chart-column-name-1').parent().parent().addClass('has-error');
				$('#chart-column-name-1').focus();
				return false;
			}

			if ($('#chart-column-name-2').val().trim() !== '') {
				$('#chart-column-name-2').parent().parent().removeClass('has-error');
			} else {
				$('#chart-column-name-2').parent().parent().addClass('has-error');
				$('#chart-column-name-2').focus();
				return false;
			}


			// get data from input
			$('.inputDataName').each(function () {
				if ($(this).val().trim() !== '') {
					arrDataName.push($(this).val().trim());
				}
			});

			$('.inputDataNum').each(function () {
				if ($(this).val().trim() !== '') {
					arrDataNum.push($(this).val().trim());
				}
			});

			dataLen = Math.min(arrDataName.length, arrDataNum.length);

			for (i = 0; i < dataLen; i++) {
				strData += '[\'' + arrDataName[i] + '\', ' + arrDataNum[i] + '],';
			}

			console.log(strData.substring(0, strData.length-1));
			// console.log(arrDataNum);


			// generate code
			id = $('#chart-title').val().trim().toLowerCase().replace(/\s/g, '') + '-' + Date.now();
			str = '<div id="' + id + '"></div>\n';
			str += '<script src="https://www.google.com/jsapi" type="text/javascript"></script>\n';
			str += '<script type="text/javascript">\n';

			str += '(function () {\n';
			
			str += 'google.load(\'visualization\', \'1\', { \'packages\' : [\'corechart\'] });\n';
			str += 'google.setOnLoadCallback(drawBarChart);\n';

			str += 'function drawBarChart() {\n';
			str += 'var data = new google.visualization.DataTable();\n';
			str += 'data.addColumn(\'string\', \'' + $('#chart-column-name-1').val().trim() + '\');\n';
			str += 'data.addColumn(\'number\', \'' + $('#chart-column-name-2').val().trim() + '\');\n';
			str += 'data.addRows([ ' + strData.substring(0, strData.length-1) +' ]);\n';
			str += 'var options = { \'title\' : \'' + $('#chart-title').val().trim() +'\', \'width\': ' + $('#chart-width').val().trim() + ', \'height\': ' + $('#chart-height').val().trim() + ' };\n';
			str += 'var barChart = new google.visualization.BarChart(document.getElementById(\'' + id + '\'));\n';
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
		});

		
	}
});