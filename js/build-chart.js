$("#bar-chart").length && ($("#btn-add-table-column").on("click", function(t) {
    t.preventDefault();
    var a = $("#table-column").children(".col-flexible").length,
        e = $("<div></div>"),
        l = $("<input>"),
        r = $("<div></div>"),
        o = $("<input>");
    ($("#table-column").children(".col-flexible").removeClass("col-md-" + 12 / a + " col-sm-" + 12 / a + " col-xs-" + 12 / a).addClass("col-md-" + 12 / (a + 1) + " col-sm-" + 12 / (a + 1) + " col-xs-" + 12 / (a + 1)), e.addClass("col-flexible col-md-" + 12 / (a + 1) + " col-sm-" + 12 / (a + 1) + " col-xs-" + 12 / (a + 1)), l.addClass("form-control table-column-names"), l.attr("type", "text"), l.attr("maxlength", 25), e.append(l), $("#table-column").append(e), $(".table-rows").children(".col-flexible").removeClass("col-md-" + 12 / a + " col-sm-" + 12 / a + " col-xs-" + 12 / a).addClass("col-md-" + 12 / (a + 1) + " col-sm-" + 12 / (a + 1) + " col-xs-" + 12 / (a + 1)), r.addClass("col-flexible col-md-" + 12 / (a + 1) + " col-sm-" + 12 / (a + 1) + " col-xs-" + 12 / (a + 1)), o.addClass("form-control table-rows-input"), o.attr("type", "text"), o.attr("placeholder", "Data"), o.attr("maxlength", 255), r.append(o), $(".table-rows").append(r))
}), 
$("#btn-remove-table-column").on("click", function(t) {
    t.preventDefault();
    var a = $("#table-column").children(".col-flexible").length;
    a > 2 && ($("#table-column").find(".col-flexible:last-child").remove(), $("#table-column").children(".col-flexible").removeClass("col-md-" + 12 / a + " col-sm-" + 12 / a + " col-xs-" + 12 / a).addClass("col-md-" + 12 / (a - 1) + " col-sm-" + 12 / (a - 1) + " col-xs-" + 12 / (a - 1)), $(".table-rows").each(function() {
        $(this).find(".col-flexible:last-child").remove(), $(this).children(".col-flexible").removeClass("col-md-" + 12 / a + " col-sm-" + 12 / a + " col-xs-" + 12 / a).addClass("col-md-" + 12 / (a - 1) + " col-sm-" + 12 / (a - 1) + " col-xs-" + 12 / (a - 1))
    }))
}), 
$("#btn-add-table-row").on("click", function(t) {
    t.preventDefault();
    var a, e, l, r,
        o = $("<div></div>"),
        n = $(document.createDocumentFragment()),
        i = $("#table-row-length").children(".col-flexible").length,
        s = $("<a></a>");
    var ax = $(".series-content").length;
    
    if(ax <= 3){
        for (o.addClass("table-rows form-group pr series-content"),r = 0; i > r; r++)
        a = $("<div></div>"), 
        e = $("<input>"), 
        a.addClass("col-flexible col-md-" + 12 / i + " col-sm-" + 12 / i + " col-xs-" + 12 / i), 
        e.addClass("form-control table-rows-input"),
        e.attr("type", "text"), e.attr("placeholder", "Data"),
        a.append(e), n.append(a);
     
        var aa, ee, ll, rr, 
            oo = $("<div></div>"),
            nn = $(document.createDocumentFragment()),
            ii = $("#legend-row").children(".col-flexible").length;
        for (oo.addClass("form-group legend-content"),rr = 0; ii > rr; rr++)
        aa = $("<div></div>"), 
        ee = $("<input>"), 
        aa.addClass("col-flexible col-md-" + 12 / ii + " col-sm-" + 12 / ii + " col-xs-" + 12 / ii), 
        ee.addClass("form-control legend-name"),
        ee.attr("type", "text"), ee.attr("placeholder", "Label Data"),
        aa.append(ee), nn.append(aa);
     
        s.addClass("btn btn-danger btn-overflow"), 
        s.attr("href", "#"), 
        s.text("X"), 
        o.append(n, s), oo.append(nn), $("#new-table-row").append(o),  $("#new-new").append(oo),
        s.one("click", function(t) {
            t.preventDefault(), o.remove(), oo.remove()
        })
    }
    
    
}))

$("#proses-form").submit(function(e){
    var nama_kolom = [];
    var nama_kolomm = [];
    var baris_data = [];
    var nama_legend = [];
    var series_data = [];
    var all_series = [];
    var code;
    var bar=[];
    var alg;
    var vralg;
    var txt_sumber;
    
    
    var lgd = $('input[name=posisilegend]:checked').val();
    if(lgd == 'atastengah'){
        alg = 'center',vralg = 'top';
    }else if(lgd == 'ataskiri'){
        alg = 'left',vralg = 'top';
    }else if(lgd == 'ataskanan'){
        alg = 'right',vralg = 'top';
    }else if(lgd == 'bawahtengah'){
        alg = 'center',vralg = 'bottom';
    }else if(lgd == 'bawahkiri'){
        alg = 'left',vralg = 'bottom';
    }else if(lgd == 'bawahkanan'){
        alg = 'right',vralg = 'bottom';
    }
    
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
    var result_int = baris_data.map(function (x) { 
        return parseInt(x, 10); 
    });
    $(".legend-content input").each(function() {
        nama_legend.push(this.value);
    });
    
      
    var i,j,k=0, a=0, b=[], d=[[],[],[],[]];
    for(i=0;i<$('.series-content').length;i++){
        b[i] = nama_legend[i];
    }
    
    var jml = baris_data.length/$('.series-content').length;
    for(j=0;j<baris_data.length;j++){
        if(j==jml){
            k=k+1;
            jml=jml+$('.table-column-names').length;
            a=0;
        }
        d[k][a] = baris_data[j];
        a=a+1;
        e.preventDefault()
    }
    
    var jk,kl,ok, all_data=[], data_oke=[];
    for(jk=0;jk<$('.legend-name').length;jk++){
        b[jk];
        parseInt(d[jk], 10);
        all_data.push('{name: \''+b[jk]+'\', data: ['+d[jk]+']}\n');
        data_oke.push(JSON.parse('{"name": "'+b[jk]+'", "data": ['+d[jk]+']}'));
    }
    
    
    function createChart(){
        Highcharts.chart('result', {
            chart: {
                type: $('input[name=jenis]:checked').val()
            },
            title: {
                text: $('#chart-title').val().trim()
            },
            subtitle: {
                text: txt_sumber,
                align: 'left',
                verticalAlign: 'bottom',
                floating: false,
            },
            xAxis: {
                categories: nama_kolom,
                title: {
                    text: $('#judul_kolom').val().trim()
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: $('#judul_baris').val().trim()
                },
                labels: {
                    overflow: 'justify'
                }
            },
            // tooltip: {
            //     valueSuffix: ' millions'
            // },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                align: alg,
                verticalAlign: vralg,
                floating: false,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: data_oke
        });
    }
    
    code = '<div style="padding-bottom: 20px;">\n';
	code += '<div id="result"></div>\n';
	code += '<div>\n';
	code += '<script src="https://code.highcharts.com/highcharts.js"></script>\n';
	code += '<script type="text/javascript">\n';

	code += 'Highcharts.chart(\'result\', {\n';
	
	code += 'chart: {\n'
                code+= 'type:\''+ $('input[name=jenis]:checked').val() +'\'\n'
            code+='},\n'
            code+='title: {\n'
                code+='text:\''+ $('#chart-title').val().trim()+'\'\n'
            code+='},\n'
            code+='subtitle: {\n'
                code+='text: \''+txt_sumber+'\',\n'
                code+='align: \'left\',\n'
                code+='verticalAlign: \'bottom\',\n'
                code+='floating: false,\n'
            code+='},\n'
            code+='xAxis: {\n'
                code+='categories: ['+nama_kolomm+'],\n'
                code+='title: {\n'
                    code+='text:\''+ $('#judul_kolom').val().trim()+'\'\n'
                code+='}\n'
            code+='},\n'
            code+='yAxis: {\n'
                code+='min: 0,\n'
                code+='title: {\n'
                    code+='text:\''+ $('#judul_baris').val().trim()+'\'\n'
                code+='},\n'
                code+='labels: {\n'
                    code+='overflow: \'justify\'\n'
                code+='}\n'
            code+='},\n'
            code+='plotOptions: {\n'
                code+='bar: {\n'
                    code+='dataLabels: {\n'
                        code+='enabled: true\n'
                    code+='}\n'
                code+='}\n'
            code+='},\n'
            code+='legend: {\n'
                code+='align:\'' +alg+'\',\n'
                code+='verticalAlign:\''+ vralg+'\',\n'
                code+='floating: false,\n'
                code+='borderWidth: 1,'
                code+='backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || \'#FFFFFF\'),\n'
                code+='shadow: true\n'
            code+='},\n'
            code+='credits: {enabled: false},\n'
            code+='series: [\n'+all_data+'\n]\n'
        code+='});\n'
		

	code += '</script>';
    createChart();
    $('#chart-code').text(code).css('height','1200px');
    e.preventDefault();
});