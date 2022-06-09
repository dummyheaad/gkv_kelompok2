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

            // Mencetak data .csv yang telah diinputkan
            // Data ini berupa array yang terletak di result.data
            console.log(result.data);

            // Persiapan variabel-variabel untuk menyimpan data pada masing-masing attribute
            var nama = [];
            var kal = [];
            var pro = [];
            var gula = [];
            var rat = [];
            var cups = [];

            // Proses inisialisasi masing-masing array dengan nilai yang sesuai
            for (let i = 0;i < 10; i ++) {
                nama[i] = result.data[i].name;
                kal[i] = result.data[i].calories;
                pro[i] = result.data[i].protein;
                gula[i] = result.data[i].sugars;
                rat[i] = result.data[i].rating;
                cups[i] = result.data[i].cups;
            }

            // Mengambil element HTML untuk menggambarkan plot (plotting)
            PLOT = document.getElementById('plot');
            
            // Ambil sequence default warna dari Plotly.js
            // Disini pewarnaan akan berulang setiap 10 ulangan
            // Hal ini dilakukan untuk menjaga konsistensi warna agar memudahkan pencocokan data
            var colors = Plotly.d3.scale.category10();

            // mencetak kode hex untuk warna di urutan pertama
            // console.log(colors(0));



            // Variabel array untuk menyimpan plot bertipe pie
            var pie = [];

            // pie[0] berisi data calories (kalori)
            pie[0] = {
                sort: false,
                labels: nama,
                values: kal,
                type: 'pie',
                domain: {'x': [0, 0.5], 'y':[0.2, 1]},
                hole: 0.8,
                marker: {
                    // menambahkan garis border pada chart
                    line: {
                        width: 3,
                        color: '#ba7334'
                    },
                    color: colors
                }
            }

            // pie[1] berisi data sugars (komposisi gula)
            pie[1] = {
                sort: false,
                labels: nama,
                values: gula,
                type: 'pie',
                domain: {'x': [0.048, 0.452], 'y':[0.282, 0.918]},
                hole: 0.7,
                marker: {
                    // menambahkan garis border pada chart
                    line: {
                        width: 3,
                        color: '#495ac9'
                    },
                    color: colors
                }
            }

            // Variabel array untuk menyimpan plot bertipe bar
            // Untuk menghasilkan plot dengan warna beragam maka 1 buah bar merepresentasikan 1 buah bar chart
            var bar = [];

            // Disini bar chart dipakai untuk menyimpan data protein
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

            // Variabel untuk menambahkan plot bertipe scatter line
            var line = {
                x: nama,
                y: pro,
                mode: 'line',
                type: 'scatter',
                showlegend: false,
                marker: {
                    color: 'black'
                }
            }

            // Variabel untuk menyimpan label pada sunburst chart pertama
            var nmR = [];
            nmR.push('Rating');
            for (var i = 0;i < 10;i ++) {
                nmR.push(nama[i]);
            }
            rat.unshift("0");

            // Variabel untuk menambahkan plot bertipe sunburst
            var sunburst = [];
            sunburst[0] = {
                sort: false,
                type: "sunburst",
                labels: nmR,
                parents: ["", nmR[0], nmR[1], nmR[1], nmR[3], nmR[0], nmR[0], nmR[6], nmR[0], nmR[0], nmR[9]],
                values:  rat,
                outsidetextfont: {size: 20, color: "#377eb8"},
                leaf: {opacity: 0.6},
                domain: {'x': [0.5, 1], 'y':[0.5, 1]},
                marker: {line: {width: 3}}
            }

            var nmC = [];
            nmC.push('Cups');
            for (var i = 0;i < 10;i ++) {
                nmC.push(nama[i]);
            }
            cups.unshift("0");
            sunburst[1] = {
                sort: true,
                type: "sunburst",
                labels: nmC,
                parents: ["", nmC[0], nmC[1], nmC[1], nmC[3], nmC[0], nmC[0], nmC[6], nmC[0], nmC[0], nmC[9]],  
                values: cups,
                outsidetextfont: {size: 20, color: "#377eb8"},
                leaf: {opacity: 0.6},
                domain: {'x': [0.5, 1], 'y':[0, 0.5]},
                marker: {line: {width: 3}}
            }


            // Variabel array untuk menyimpan semua plot yang akan ditampilkan
            var plot = [];

            // Masukkan semua plot yang ada ke array plot
            plot.push(pie[0]);
            plot.push(pie[1]);
            for (var i = 0;i < 10;i ++) {
                plot.push(bar[i]);
            }
            plot.push(line);
            plot.push(sunburst[0]);
            plot.push(sunburst[1]);


            // Pengaturan layout
            var layout = {
                width: 1920,
                height: 1080,
                font: {size: 13},
                title: 'CEREAL', 
                annotations: [{
                    // Anotasi calories
                    text: 'Calories',
                    font: {
                        size: 16,
                        color: '#ba7334'
                    },
                    arrowhead: 5,
                    arrowcolor: "#ba7334",
                    arrowwidth: 4,
                    showarrow: true,
                    align: 'center',
                    x: 0.11,
                    y: 0.31,
                    xref: 'paper',
                    yref: 'paper',
                    ax: -100,
                    ay: 100
                },{
                    // Anotasi sugars
                    text: 'Sugars',
                    font: {
                        size: 16,
                        color: '#495ac9'
                    },
                    arrowhead: 5,
                    arrowcolor: "#495ac9",
                    arrowwidth: 4,
                    showarrow: true,
                    align: 'center',
                    x: 0.345,
                    y: 0.865,
                    xref: 'paper',
                    yref: 'paper',
                    ax: 200,
                    ay: -100
                },{
                    // Anotasi Nutrition (tanpa arrow)
                    text: 'Nutrition',
                    font: {
                        size: 20,
                        color: '#1f77b4'
                    },
                    showarrow: false,
                    x: 0.23,
                    y: 0.8,
                    xref: 'paper',
                    yref: 'paper'
                }],
                xaxis: {
                  title: 'Product Name', 
                  domain: [0.2, 0.32]
                }, 
                yaxis: {
                  title: 'Protein', 
                  domain: [0.63, 0.73]
                },
                automargin: false,
                autosize: false,
                showlegend: true,
                legend: {
                    x: 0.48,
                    xanchor: 'right',
                    y: 0
                }
            };

            // Konfigurasi
            var config = {responsive: true};

            // Fungsi plotting
            Plotly.newPlot(PLOT,plot,layout,config);
        }
    });
});
