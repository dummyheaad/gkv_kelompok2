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
            
            // Ambil sequence default warna dari Plotly.js
            // Disini pewarnaan akan berulang setiap 10 ulangan
            // Hal ini dilakukan untuk menjaga konsistensi warna agar memudahkan pencocokan data
            var colors = Plotly.d3.scale.category10();

            // mencetak kode hex untuk warna di urutan pertama
            // console.log(colors(0));

            var plot = [];

            var pie = {
                sort: false,
                labels: nama,
                values: kal,
                type: 'pie',
                hole: 0.8,
                marker: {
                    color: colors
                }
            }

            var bar = [];
            for (var i = 0;i < 10;i ++) {
                bar[i] = {
                    name: nama[i],
                    x: [nama[i]],
                    y: [pro[i]],
                    type: 'bar',
                    showlegend: false,
                    marker: {
                        color: [colors(i)]
                    }
                };
            }

            var plot = [];
            plot.push(pie);
            for (var i = 0;i < 10;i ++) {
                plot.push(bar[i]);
            }


            var layout = {
                width: 1920,
                height: 1080,
                font: {size: 13},
                title: 'Donut Chart + Bar Chart', 
                xaxis: {
                  title: ['Product Name'], 
                  domain: [0.33, 0.67]
                }, 
                yaxis: {
                  title: 'Protein', 
                  domain: [0.33, 0.67]
                },
                automargin: true,
                autosize: false,
                showlegend: true
            };

            var config = {responsive: true};


            Plotly.newPlot(PLOT,plot,layout,config);
        }
    });
});
