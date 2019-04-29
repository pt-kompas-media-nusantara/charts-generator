'use strict';

/*global Vue, $, Highcharts*/

Vue.component('navi', {
  template: '<nav class="navbar navbar-inverse navbar-fixed-top col-2">\n <div class="container-fluid"> \n<div id="navbar" class="navbar-collapse collapse"> \n<ul class="nav navbar-nav navbar-right">\n<li><a href="https://github.com/harian-kompas/chart-generator" target="_blank">Github</a></li> \n</ul> \n</div> \n</div> \n</nav>'
});


var app = new Vue({
	el: '#app',
	data: {
        datalabels: [
            {dta: 'ataskiri', txt: 'Atas Tengah'},
            {dta: 'atastengah', txt: 'Atas Kiri'},
            {dta: 'ataskanan', txt: 'Atas Kanan'},
            {dta: 'bawahkiri', txt: 'Bawah Kiri'},
            {dta: 'bawahkanan', txt: 'Bawah Kanan'},
            {dta: 'bawahtengah', txt: 'Bawah Tengah'}
        ],
        jenisHighcharts: [
            {val: 'line', txt: 'Line'},
            {val: 'bar', txt: 'Balok'},
            {val: 'column', txt: 'Kolom'}
        ],
        pilihJenis: '',
        chartsnames: '',
        charttitle: '',
        column: 2,
        judulkolom: '',
        judulbaris: '',
        row: 1,
        pierow: 2,
        chartstatus: true,
        piechartstatus: false,
	},
	mounted: function(){
	    this.chartstatus = true;
	    this.chartsnames = 'Bar dan Line Chart';
	},
	methods: {
	    charts(){
	        this.chartstatus = true;
	        this.piechartstatus = false;
	        this.chartsnames = 'Bar dan Line Chart';
	    },
	    checkLgdAlign(lgd){
	        var alg;
	        if(lgd == 'atastengah'){
                alg = 'center';
            }else if(lgd == 'ataskiri'){
                alg = 'left';
            }else if(lgd == 'ataskanan'){
                alg = 'right';
            }else if(lgd == 'bawahtengah'){
                alg = 'center';
            }else if(lgd == 'bawahkiri'){
                alg = 'left';
            }else if(lgd == 'bawahkanan'){
                alg = 'right';
            }
            return alg;
	    },
	    checkLgdValign(lgd){
	        var vralg;
	        if(lgd == 'atastengah'){
                vralg = 'top';
            }else if(lgd == 'ataskiri'){
                vralg = 'top';
            }else if(lgd == 'ataskanan'){
                vralg = 'top';
            }else if(lgd == 'bawahtengah'){
                vralg = 'bottom';
            }else if(lgd == 'bawahkiri'){
                vralg = 'bottom';
            }else if(lgd == 'bawahkanan'){
                vralg = 'bottom';
            }
            return vralg;
	    },
	    addTable(){
	        this.row+=1;
	    },
	    removeTable(){
	        if(this.row>1){
    	        this.row-=1;
	        }
	    },
	    addColumn(){
	        this.column+=1;
	    },
	    removeColumn(){
	        if(this.column>2){
    	        this.column-=1;
	        }
	    },
	    createChart(a, b, c, d, e, f){
                Highcharts.chart('result', {
                    colors: b,
                    chart: {
                        type: this.pilihJenis,
                        backgroundColor: null
                    },
                    title: {
                        text: this.charttitle
                    },
                    subtitle: {
                        text: a,
                        align: 'right',
                        verticalAlign: 'bottom',
                        floating: false,
                    },
                    xAxis: {
                        categories: c,
                        title: {
                            text: this.judulkolom
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: this.judulbaris
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        shared: true
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        align: d,
                        verticalAlign: e,
                        floating: false,
                        backgroundColor: null
                    },
                    credits: {
                        enabled: false
                    },
                    series: f
                });
	    },
	    createBody(g, h, i, j, k, l, m, n){
                g ='<div style="padding-bottom: 20px;">\n';
                g+='    <div id=\"'+h+'\" style="width: 100%;"></div>\n';
                g+='</div>\n';
                g+='<script src="https://code.highcharts.com/highcharts.js"></script>\n';
                g+='<script type="text/javascript">\n';
                g+='    Highcharts.chart(\''+h+'\', {\n';
                g+='        colors: ['+i+'],\n';
                g+='        chart: {\n';
                g+='            type:\''+ this.pilihJenis +'\',\n';
                g+='            backgroundColor: null';
                g+='        },\n';
                g+='        title: {\n';
                g+='            text:\''+ this.charttitle+'\'\n';
                g+='        },\n';
                g+='        subtitle: {\n';
                g+='            text: \''+j+'\',\n';
                g+='            align: \'right\',\n';
                g+='            verticalAlign: \'bottom\',\n';
                g+='            floating: false,\n';
                g+='        },\n';
                g+='        xAxis: {\n';
                g+='            categories: ['+k+'],\n';
                g+='            title: {\n';
                g+='                text:\''+ this.judulkolom+'\'\n';
                g+='            }\n';
                g+='        },\n';
                g+='        yAxis: {\n';
                g+='            min: 0,\n';
                g+='            title: {\n';
                g+='                text:\''+ this.judulbaris+'\'\n';
                g+='            },\n';
                g+='            labels: {\n';
                g+='                overflow: \'justify\'\n';
                g+='            }\n';
                g+='        },\n';
                g+='        tooltip: {\n';
                g+='            shared: true \n';
                g+='        },\n';
                g+='        plotOptions: {\n';
                g+='            bar: {\n';
                g+='                dataLabels: {\n';
                g+='                    enabled: true\n';
                g+='                }\n';
                g+='            }\n';
                g+='        },\n';
                g+='        legend: {\n';
                g+='            align:\'' +l+'\',\n';
                g+='            verticalAlign:\''+ m+'\',\n';
                g+='            floating: false,\n';
                g+='            backgroundColor: null,\n';
                g+='        },\n';
                g+='        credits: {enabled: false},\n';
                g+='        series: [\n'+           n+'        ]\n';
                g+='    });\n';
            	g+='</script>';
                
                return $('#chart-code').text(g).css({'height': '1200px', 'font-size': '14px', 'background': 'transparent'});  
	    },
	    onChange(){
    	    var nama_kolom = [];
            var all_warna = [];
            var all_warnaa = [];
            var nama_kolomm = [];
            var baris_data = [];
            var nama_legend = [];
            var alg;
            var vralg;
            var txt_sumber;
            
            
            var lgd = $('input[name=posisilegend]:checked').val();
                alg = this.checkLgdAlign(lgd);
                vralg = this.checkLgdValign(lgd);
            
            if($("#chart-data-source").val() != ''){
                txt_sumber = 'sumber: '+$("#chart-data-source").val().trim();
            }
            
            $('.table-column-names').each(function() {
                nama_kolom.push(this.value);
                nama_kolomm.push('\''+this.value+'\'');
            });
            $('.table-rows-input').each(function() {
                baris_data.push(this.value);
            });
            $('.jscolor').each(function() {
                all_warna.push(this.value);
                all_warnaa.push('\''+this.value+'\'');
            });
            baris_data.map(function (x) { 
                return parseInt(x, 10); 
            });
            $("input.legend-name").each(function() {
                nama_legend.push(this.value);
            });
            
              
            var i,j,k=0, a=0, b=[], d=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];//max 30 baris data
            for(i=0;i<$('.series-content .table-rows').length;i++){
                b[i] = nama_legend[i];
            }
            
            var jml = $('.table-column-names').length;
            for(j=0;j<baris_data.length;j++){
                if(j==jml){
                    k=k+1;
                    jml=jml+$('.table-column-names').length;
                    a=0;
                }
                d[k][a] = baris_data[j];
                a=a+1;
            }
            
            var jk, all_data=[], data_oke=[];
            for(jk=0;jk<$('.legend-name').length;jk++){
                b[jk];
                parseInt(d[jk], 10);
                all_data.push('{name: \''+b[jk]+'\', data: ['+d[jk]+']}\n');
                data_oke.push(JSON.parse('{"name": "'+b[jk]+'", "data": ['+d[jk]+']}'));
            }
            
            $('#chart-code').text('').css({'height': 'auto', 'background': 'transparent'});
            this.createChart(txt_sumber, all_warna, nama_kolom, alg, vralg, data_oke);
            
	    },
	    submitForm(){
	        var theId = this.charttitle.replace(/ /g,'').toLowerCase();
            var nama_kolom = [];
            var all_warna = [];
            var all_warnaa = [];
            var nama_kolomm = [];
            var baris_data = [];
            var nama_legend = [];
            var code;
            var alg;
            var vralg;
            var txt_sumber;
            
            
            var lgd = $('input[name=posisilegend]:checked').val();
            alg = this.checkLgdAlign(lgd);
            vralg =  this.checkLgdValign(lgd);
            
            if($("#chart-data-source").val() != ''){
                txt_sumber = 'sumber: '+$("#chart-data-source").val().trim();
            }
            
            $('.table-column-names').each(function() {
                nama_kolom.push(this.value);
                nama_kolomm.push('\''+this.value+'\'');
            });
            $('.table-rows-input').each(function() {
                baris_data.push(this.value);
            });
            $('.jscolor').each(function() {
                all_warna.push(this.value);
                all_warnaa.push('\''+this.value+'\'');
            });
            baris_data.map(function (x) { 
                return parseInt(x, 10); 
            });
            $("input.legend-name").each(function() {
                nama_legend.push(this.value);
            });
            
              
            var i,j,k=0, a=0, b=[], d=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];//max 30 baris data
            for(i=0;i<$('.series-content .table-rows').length;i++){
                b[i] = nama_legend[i];
            }
            
            var jml = $('.table-column-names').length;
            console.log(jml);
            for(j=0;j<baris_data.length;j++){
                if(j==jml){
                    k=k+1;
                    jml=jml+$('.table-column-names').length;
                    a=0;
                }
                d[k][a] = baris_data[j];
                a=a+1;
            }
            
            var jk, all_data=[], data_oke=[];
            for(jk=0;jk<$('.legend-name').length;jk++){
                b[jk];
                parseInt(d[jk], 10);
                all_data.push('{name: \''+b[jk]+'\', data: ['+d[jk]+']}\n');
                data_oke.push(JSON.parse('{"name": "'+b[jk]+'", "data": ['+d[jk]+']}'));
            }
            
            var createBody = this.createBody(code, theId, all_warnaa, txt_sumber, nama_kolomm, alg, vralg, all_data);
            var createChrt = this.createChart(txt_sumber, all_warna, nama_kolom, alg, vralg, data_oke);
            
            $('#proses-form input').each(function() {
                if($(this).val()==''){
                    $(this).css('background','#ffe9e9');
                    $('#chart-code').text('Semua Kolom Harus Diisi').css({'height': 'auto', 'font-size': '30px'});
                }
                else{
                    $(this).css({'background': 'transparent'});
                    createBody;
                    createChrt;
                }
            });
            
              
	    },
	    pieChart(){
	        this.chartstatus = false;
	        this.piechartstatus = true;
	        this.chartsnames = 'Pie Chart';
	    },
	    addTablePie(){
	        this.pierow+=1;
	    },
	    removeTablePie(){
	        if(this.pierow>2){
    	        this.pierow-=1;
	        }
	    },
	    createPieChart(a, f){
                Highcharts.chart('pieresult', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: $('#pie-chart-title').val().trim()
                    },
                    subtitle: {
                        text: a,
                        align: 'right',
                        verticalAlign: 'bottom',
                        floating: false,
                    },
                    tooltip: {
                        valuePrefix: $("#value-prefix").val()+' ',
                        valueSuffix: ' '+$("#value-suffix").val()
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: $('#data-value-name').val(),
                        colorByPoint: true,
                        sliced: true,
                        selected: true,
                        data: f
                    }],
                });
	    },
	    createPieBody(g, h, i, j, n){
                g ='<div style="padding-bottom: 20px;">\n';
                g+='    <div id=\"'+h+'\" style="width: 100%;"></div>\n';
                g+='</div>\n';
                g+='<script src="https://code.highcharts.com/highcharts.js"></script>\n';
                g+='<script type="text/javascript">\n';
                g+='    Highcharts.chart(\''+h+'\', {\n';
                g+='        colors: ['+i+'],\n';
                g+='        chart: {\n';
                g+='        plotBackgroundColor: null,\n';
                g+='            plotBorderWidth: null,\n';
                g+='            plotShadow: false,\n';
                g+='            type: \'pie\'\n';
                g+='        },\n';
                g+='        title: {\n';
                g+='            text:\''+ $('#pie-chart-title').val().trim()+'\'\n';
                g+='        },\n';
                g+='        subtitle: {\n';
                g+='            text: \''+j+'\',\n';
                g+='            align: \'right\',\n';
                g+='            verticalAlign: \'bottom\',\n';
                g+='            floating: false,\n';
                g+='        },\n';
                g+='        tooltip: {\n';
                g+='            valuePrefix: \''+$('#value-prefix').val()+'\',\n';
                g+='            valueSuffix: \''+$('#value-suffix').val()+'\',\n';
                g+='        },\n';
                g+='        plotOptions: {\n';
                g+='            pie: {\n';
                g+='                allowPointSelect: true,\n';
                g+='                cursor: \'pointer\',\n';
                g+='                dataLabels: {\n';
                g+='                    enabled: true,\n';
                g+='                }\n';
                g+='            }\n';
                g+='        },\n';
                g+='        credits: {enabled: false},\n';
                g+='        series: [{\n';
                g+='            name: \''+$('#data-value-name').val()+'\',\n';
                g+='            colorByPoint: true,\n';
                g+='            sliced: true,\n';
                g+='            selected: true,\n';
                g+='            data:[\n';
                g+=''+n+'\n';
                g+='                ]\n';
                g+='        }],\n';
                g+='    });\n';
            	g+='</script>';
                
                return $('#chart-code-pie').text(g).css({'height': '1200px', 'font-size': '14px', 'background': 'transparent'});  
	    },
	    onChangePie(){
	        var nama_kolom = [];
            var all_warna = [];
            var all_warnaa = [];
            var nama_kolomm = [];
            var baris_data = [];
            var txt_sumber;
            
            
            if($("#pie-chart-data-source").val() != ''){
                txt_sumber = 'sumber: '+$("#pie-chart-data-source").val().trim();
            }
            
            $('.pie-data-title').each(function() {
                nama_kolom.push(this.value);
                nama_kolomm.push('\''+this.value+'\'');
            });
            
            $('.pie-data').each(function() {
                baris_data.push(this.value);
            });
            $('.jscolorpie').each(function() {
                all_warna.push(this.value);
                all_warnaa.push('\''+this.value+'\'');
            });
            baris_data.map(function (x) { 
                return parseInt(x, 10); 
            });
            
            var jk, all_data=[], data_oke=[];
            for(jk=0;jk<$('.pie-data-content').length;jk++){
                all_data.push('{name: \''+nama_kolom[jk]+'\', y: '+baris_data[jk]+', color: \''+all_warna[jk]+'\'}\n');
                data_oke.push(JSON.parse('{"name": "'+nama_kolom[jk]+'", "y": '+parseInt(baris_data[jk],10)+', "color": "'+ all_warna[jk] +'"}'));
            }
            
            $('#chart-code-pie').text('').css({'height': 'auto', 'background': 'transparent'});
            this.createPieChart(txt_sumber, data_oke);
	    },
	    submitPieForm(){
	        var theId = $('#pie-chart-title').val().replace(/ /g,'').toLowerCase();
	        var nama_kolom = [];
            var all_warna = [];
            var all_warnaa = [];
            var nama_kolomm = [];
            var baris_data = [];
            var txt_sumber;
            var code;
            
            
            if($("#pie-chart-data-source").val() != ''){
                txt_sumber = 'sumber: '+$("#pie-chart-data-source").val().trim();
            }
            
            $('.pie-data-title').each(function() {
                nama_kolom.push(this.value);
                nama_kolomm.push('\''+this.value+'\'');
            });
            
            $('.pie-data').each(function() {
                baris_data.push(this.value);
            });
            $('.jscolorpie').each(function() {
                all_warna.push(this.value);
                all_warnaa.push('\''+this.value+'\'');
            });
            baris_data.map(function (x) { 
                return parseInt(x, 10); 
            });
            
            var jk, all_data=[], data_oke=[];
            for(jk=0;jk<$('.pie-data-content').length;jk++){
                all_data.push('                    {name: \''+nama_kolom[jk]+'\', y: '+baris_data[jk]+', color: \''+all_warna[jk]+'\'}\n');
                data_oke.push(JSON.parse('{"name": "'+nama_kolom[jk]+'", "y": '+parseInt(baris_data[jk],10)+', "color": "'+ all_warna[jk] +'"}'));
            }
            
            this.createPieChart(txt_sumber, data_oke);
	        this.createPieBody(code, theId, all_warnaa, txt_sumber, all_data);
	        
	    },
	}
});
