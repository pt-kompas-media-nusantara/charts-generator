//proses add kolom dan baris
$("#bar-chart").length && ($("#btn-add-table-column").on("click", function(t) {
    t.preventDefault();
    var a = $("#table-column").children(".col-flexible").length,
        e = $("<div></div>"),
        l = $("<input>"),
        r = $("<div></div>"),
        o = $("<input>");
    var cl = 12/a;
    var clp = 12/(a+1);
    // if(clp == 2.4){
    //     clp = 40;
    // }
    // else{
    //     clp;
    // }
    ($("#table-column").children(".col-flexible").removeClass("col-md-" + cl + " col-sm-" + cl + " col-xs-" + cl).addClass("col-md-" + clp + " col-sm-" + clp + " col-xs-" + clp), e.addClass("col-flexible col-md-" + clp + " col-sm-" + clp + " col-xs-" + clp), l.addClass("form-control table-column-names"), l.attr("type", "text"), l.attr("maxlength", 25), e.append(l), $("#table-column").append(e), $(".table-rows").children(".col-flexible").removeClass("col-md-" + cl + " col-sm-" + cl + " col-xs-" + cl).addClass("col-md-" + clp + " col-sm-" + clp + " col-xs-" + clp), r.addClass("col-flexible col-md-" + clp + " col-sm-" + clp + " col-xs-" + clp), o.addClass("form-control table-rows-input"), o.attr("type", "text"), o.attr("value", "0"), o.attr("maxlength", 255), r.append(o), $(".table-rows").append(r))
}), 
$("#btn-remove-table-column").on("click", function(t) {
    t.preventDefault();
    var a = $("#table-column").children(".col-flexible").length;
    var cl = 12/a;
    var clp = 12/(a-1);
    // if(clp == 2.4){
    //     clp = 40;
    // }
    // else{
    //     clp;
    // }
    a > 2 && ($("#table-column").find(".col-flexible:last-child").remove(), $("#table-column").children(".col-flexible").removeClass("col-md-" + cl + " col-sm-" + cl + " col-xs-" + cl).addClass("col-md-" + clp + " col-sm-" + clp + " col-xs-" + clp), $(".table-rows").each(function() {
        $(this).find(".col-flexible:last-child").remove(), $(this).children(".col-flexible").removeClass("col-md-" + cl + " col-sm-" + cl + " col-xs-" + cl).addClass("col-md-" + clp + " col-sm-" + clp + " col-xs-" + clp)
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
        e.attr("type", "text"), e.attr("value", "0"),
        a.append(e), n.append(a);
     
        var aa, ee, ll, rr, pp, uu, gg, cc,
            oo = $("<div></div>"),
            nn = $(document.createDocumentFragment()),
            ii = $("#legend-row").children(".col-flexible").length;
        for (oo.addClass("form-group legend-content"),rr = 0; ii > rr; rr++)
        aa = $("<div></div>"), 
        ee = $("<input>"),
        ll = 0 === rr ? "Label Data" : "Warna",
        pp = 0 === rr ? "col-flexible col-md-" + 10 + " col-sm-" + 10 + " col-xs-" + 10 : "col-flexible col-md-" + 2 + " col-sm-" + 2 + " col-xs-" + 2,
        uu = 0 === rr ? "form-control legend-name" : "form-control jscolor",
        gg = 0 === rr ? "text" : "color",
        cc = 0 === rr ? "" : "#434348",
        aa.addClass(pp), 
        ee.addClass(uu),
        ee.attr("placeholder", ll), ee.attr("type", gg), ee.attr("value", cc),
        aa.append(ee), nn.append(aa);
     
        s.addClass("btn btn-danger btn-overflow"), 
        s.attr("href", "#"), 
        s.text("X"), 
        o.append(n, s), oo.append(nn), $("#new-table-row").append(o),  $("#new-new").append(oo),
        s.one("click", function(t) {
            t.preventDefault(), o.remove(), oo.remove()
        })
    }
    else if(ax > 3){
        alert('Batas maksimal baris adalah 4');
    }
    
    
}))

//proses pembuatan highcharts - live output
$("input").bind("keyup change", function(e){
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
    function check_lgd(){
        
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
    }
    
    check_lgd();
    
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
    $(".legend-content input.legend-name").each(function() {
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
        e.preventDefault();
    }
    
    var jk, all_data=[], data_oke=[];
    for(jk=0;jk<$('.legend-name').length;jk++){
        b[jk];
        parseInt(d[jk], 10);
        all_data.push('{name: \''+b[jk]+'\', data: ['+d[jk]+']}\n');
        data_oke.push(JSON.parse('{"name": "'+b[jk]+'", "data": ['+d[jk]+']}'));
    }
    
    
    function createChart(){
        Highcharts.chart('result', {
            colors: all_warna,
            chart: {
                type: $('input[name=jenis]:checked').val(),
                backgroundColor: null
            },
            title: {
                text: $('#chart-title').val().trim()
            },
            subtitle: {
                text: txt_sumber,
                align: 'right',
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
                align: alg,
                verticalAlign: vralg,
                floating: false,
                backgroundColor: null
            },
            credits: {
                enabled: false
            },
            series: data_oke
        });
    }
    // $('input').each(function() {
    //     if($(this).val()==''){
    //         $(this).css('background','#ffe9e9');
    //     }
    //     else{
    //         $(this).css('background','transparent');
    //     }
    // });
    createChart();
});

//proses pembuatan highcharts - submit
$("#proses-form").submit(function(e){
    var theId = $('#chart-title').val().replace(/ /g,'').toLowerCase();
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
    function check_lgd(){
        
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
    }
    
    check_lgd();
    
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
    $(".legend-content input.legend-name").each(function() {
        nama_legend.push(this.value);
    });
    
      
    var i,j,k=0, a=0, b=[], d=[[],[],[],[]];
    for(i=0;i<$('.series-content').length;i++){
        b[i] = nama_legend[i];
    }
    
    var jml = baris_data.length/$('.series-content').length;
            console.log(jml);
    for(j=0;j<baris_data.length;j++){
        if(j==jml){
            k=k+1;
            jml=jml+$('.table-column-names').length;
            a=0;
        }
        d[k][a] = baris_data[j];
        a=a+1;
        e.preventDefault();
    }
    
    var jk, all_data=[], data_oke=[];
    for(jk=0;jk<$('.legend-name').length;jk++){
        b[jk];
        parseInt(d[jk], 10);
        all_data.push('{name: \''+b[jk]+'\', data: ['+d[jk]+']}\n');
        data_oke.push(JSON.parse('{"name": "'+b[jk]+'", "data": ['+d[jk]+']}'));
    }
    
    
    function createChart(){
        Highcharts.chart('result', {
            colors: all_warna,
            chart: {
                type: $('input[name=jenis]:checked').val(),
                backgroundColor: null
            },
            title: {
                text: $('#chart-title').val().trim()
            },
            subtitle: {
                text: txt_sumber,
                align: 'right',
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
                align: alg,
                verticalAlign: vralg,
                floating: false,
                backgroundColor: null,
            },
            credits: {
                enabled: false
            },
            series: data_oke
        });
    }
    
    
    function createBody(){
        code ='<div style="padding-bottom: 20px;">\n';
        code+=' <div id=\"'+theId+'\" style="width: 100%;"></div>\n';
        code+='</div>\n';
        code+='<script src="https://code.highcharts.com/highcharts.js"></script>\n';
        code+='<script type="text/javascript">\n';
        code+='   Highcharts.chart(\''+theId+'\', {\n';
        code+='       colors: ['+all_warnaa+'],\n';
        code+='       chart: {\n';
        code+='            type:\''+ $('input[name=jenis]:checked').val() +'\',\n';
        code+='            backgroundColor: null'
        code+='     },\n';
        code+='     title: {\n';
        code+='         text:\''+ $('#chart-title').val().trim()+'\'\n';
        code+='     },\n';
        code+='     subtitle: {\n';
        code+='         text: \''+txt_sumber+'\',\n';
        code+='         align: \'right\',\n';
        code+='         verticalAlign: \'bottom\',\n';
        code+='         floating: false,\n';
        code+='     },\n';
        code+='     xAxis: {\n';
        code+='         categories: ['+nama_kolomm+'],\n';
        code+='         title: {\n';
        code+='             text:\''+ $('#judul_kolom').val().trim()+'\'\n';
        code+='         }\n';
        code+='     },\n';
        code+='     yAxis: {\n';
        code+='         min: 0,\n';
        code+='         title: {\n';
        code+='             text:\''+ $('#judul_baris').val().trim()+'\'\n';
        code+='         },\n';
        code+='         labels: {\n';
        code+='             overflow: \'justify\'\n';
        code+='         }\n';
        code+='     },\n';
        code+='     tooltip: {\n';
        code+='         shared: true \n';
        code+='     },\n';
        code+='     plotOptions: {\n';
        code+='         bar: {\n';
        code+='             dataLabels: {\n';
        code+='                 enabled: true\n';
        code+='             }\n';
        code+='         }\n';
        code+='     },\n';
        code+='     legend: {\n';
        code+='         align:\'' +alg+'\',\n';
        code+='         verticalAlign:\''+ vralg+'\',\n';
        code+='         floating: false,\n';
        code+='         backgroundColor: null,\n';
        code+='     },\n';
        code+='     credits: {enabled: false},\n';
        code+='     series: [\n'+           all_data+'        ]\n';
        code+=' });\n';
    	code+='</script>';
        
        $('#chart-code').text(code).css('height','1200px');  
    }
    
    
    
    $('input').each(function() {
        if($(this).val()==''){
            $(this).css('background','#ffe9e9');
        }
        else{
            $(this).css('background','transparent');
            createBody();
        }
    });
    
    
    createChart();
    e.preventDefault();
});