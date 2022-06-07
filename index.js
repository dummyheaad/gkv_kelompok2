// Baca local file via Papa Parser

var csv = document.getElementById('csv-file');

let btn_baca = document.getElementById('btn').addEventListener('click', () => {
    Papa.parse(csv.files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(result) {
            // contoh akses elemen csv (array dengan header aktif)
            // console.log(result.data[0].name);

            // contoh akses elemen csv (array dengan header non-aktif)
            // console.log(result.data[0][1])

            var nama = [];
            var kal = [];
            var pro = [];
            for (let i = 0;i < 10; i ++) {
                nama[i] = result.data[i].name;
                kal[i] = result.data[i].calories;
                pro[i] = result.data[i].protein;
            }

            PLOT = document.getElementById('plot');

            var plot = [];

            var pie = {
                labels: nama,
                value: kal,
                type: 'pie',
                hole: 0.5
            }

            var bar = [];
            for (var i = 0;i < 10;i ++) {
                bar[i] = {
                    x: [nama[i]],
                    y: [pro[i]],
                    type: 'bar'
                };
            }

            var plot = [];
            plot.push(pie);
            for (var i = 0;i < 10;i ++) {
                plot.push(bar[i]);
            }

            console.log(plot);

            var layout = {font: {size: 18}};
            var config = {responsive: true};
            Plotly.newPlot(PLOT,plot,layout,config);
        }
    });
});
