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

            // Proses inisialisasi masing-masing array dengan nilai yang sesuai
            // Disini digunakan 10 buah data awal saja
            for (let i = 0;i < 10; i ++) {
                nama[i] = result.data[i].name;
                kal[i] = result.data[i].calories;
                pro[i] = result.data[i].protein;
                gula[i] = result.data[i].sugars;
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
                hole: 0.8,
                marker: {
                    color: colors
                }
            }

            // pie[1] berisi data sugars (komposisi gula)
            pie[1] = {
                sort: false,
                labels: nama,
                values: gula,
                type: 'pie',
                domain: {'x': [0.2, 0.8], 'y':[0.1,0.9]},
                hole: 0.7,
                marker: {
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


            // Variabel array untuk menyimpan semua plot yang akan ditampilkan
            var plot = [];

            // Masukkan semua plot yang ada ke array plot
            plot.push(pie[0]);
            plot.push(pie[1]);
            for (var i = 0;i < 10;i ++) {
                plot.push(bar[i]);
            }


            // Pengaturan layout
            var layout = {
                width: 1920,
                height: 1080,
                font: {size: 13},
                title: 'Donut Chart + Bar Chart', 
                annotations: [{
                    text: 'Calories',
                    font: {
                        size: 16,
                        color: 'black'
                    },
                    showarrow: false,
                    align: 'center',
                    x: 0.3,
                    y: 0.04,
                    xref: 'paper',
                    yref: 'paper'
                }],
                xaxis: {
                  title: 'Product Name', 
                  domain: [0.4,0.6]
                }, 
                yaxis: {
                  title: 'Protein', 
                  domain: [0.5,0.6]
                },
                automargin: true,
                autosize: false,
                showlegend: true
            };

            // Konfigurasi
            var config = {responsive: true};

            // Fungsi plotting
            Plotly.newPlot(PLOT,plot,layout,config);
        }
    });
});
