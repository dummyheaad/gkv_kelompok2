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

            var name = [];
            var cal = [];
            for (let i = 0;i < 10; i ++) {
                name[i] = result.data[i].name;
                cal[i] = result.data[i].calories;
            }

            PIE = document.getElementById('pie');
            var data = [{
                labels : name,
                values : cal,
                type : 'pie'
            }];

            var layout = {font: {size: 18}};
            var config = {responsive: true};
            Plotly.newPlot(PIE,data,layout,config);
        }
    });
});
