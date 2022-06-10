// Menambahkan (append) beberapa elemen HTML
const input = document.createElement('input');
input.type = 'file';
input.id = 'csv-file';
input.accept = '.csv';
document.body.appendChild(input);

const button = document.createElement('button');
button.id = 'btn';
button.textContent = 'Baca CSV';
document.body.appendChild(button);

const div = document.createElement('div');
div.id = 'myLegend';
document.body.appendChild(div);
//////////////////////////////////////////////////////////////

const canvasSketch = require('canvas-sketch');
const Papa = require('papaparse');

function gambarGaris(ctx, x0, y0, x1, y1, warna = "black") {
  ctx.save();
  ctx.strokeStyle = warna;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.stroke();
}

function gambarFrame(ctx,x,y,width,height,color="#454343") {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(x,y,width,height);
  ctx.restore();
}

function gambarTeks(ctx, teks, x, y, font = "30px Arial", fill = "black") {
  ctx.font = font;
  ctx.fillStyle = fill;
  ctx.TextAllign = "center";
  ctx.fillText(teks,x,y);
}

function gambarLingkaran(ctx, cx, cy, rad, sdtAwal, sdtAkhir,arah,fill) {
  ctx.beginPath();
  ctx.arc(cx,cy,rad,sdtAwal,sdtAkhir);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#454343";
  ctx.stroke();
}

function gambarPieSlice(ctx, cx, cy, rad, sdtAwal, sdtAkhir, warna) {
  ctx.fillStyle = warna;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, rad, sdtAwal, sdtAkhir);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
}

var DoughnutChart = function(options) {
  this.options = options;
  this.width = options.width;
  this.height = options.height;
  this.posX = options.posX;
  this.posY = options.posY;
  this.ctx = options.ctx;
  this.colors = options.colors;

  this.gambarkan = function() {
    var total_value = 0;
    var color_index = 0;
    for (var categ in this.options.data) {
      var val = this.options.data[categ];
      total_value += val;
    }

    // console.log("key data" + Object.keys(this.options.data)[0]);

    var start_angle = 0;
    for (categ in this.options.data) {
      val = this.options.data[categ];
      var slice_angle = 2 * Math.PI * val / total_value;

      gambarPieSlice(
        this.ctx,
        this.posX,
        this.posY,
        Math.min(this.width,this.height),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );

      start_angle += slice_angle;
      color_index ++;
    }

    // Menggambarkan lingkaran putih pada chart
    // Lingkaran ini merepresentasikan chart donut
    if (this.options.doughnutHoleSize) {
      gambarPieSlice(
        this.ctx,
        this.posX,
        this.posY,
        this.options.doughnutHoleSize * Math.min(this.width,this.height),
        0,
        2 * Math.PI,
        "white"
      )
    }

    // Keterangan persentase
    start_angle = 0;
    for (categ in this.options.data){
        val = this.options.data[categ];
        slice_angle = 2 * Math.PI * val / total_value;
        var pieRadius = Math.min(this.width,this.height);
        var labelX = this.options.posX + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
        var labelY = this.options.posY + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
     
        if (this.options.doughnutHoleSize){
            var offset = pieRadius * this.options.doughnutHoleSize * 0.5;
            labelX = this.options.posX + (offset + pieRadius/2) * Math.cos(start_angle + slice_angle/2);
            labelY = this.options.posY + (offset + pieRadius/2) * Math.sin(start_angle + slice_angle/2);               
        }
     
        var labelText = Math.round(100 * val / total_value);
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 20px Arial";
        this.ctx.fillText(labelText+"%", labelX,labelY);
        start_angle += slice_angle;

      }

    // Menampilkan Legenda
    if (this.options.legends) {
      for (var i = 0;i < 10;i ++) {
        gambarLingkaran(this.ctx,2.5 * this.options.posX,0.48 * this.options.posY + 35*i,10,0,2  *Math.PI,false,this.options.colors[i]);
        gambarTeks(this.ctx,Object.keys(this.options.data)[i],2.55 * this.options.posX,0.48 * this.options.posY + 35*i,"bold 20px Times New Roman","#454343");
      }
    }
    }
}

const settings = {
  dimensions: [ 1920, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    var background = new Image();
    background.src = "https://img.freepik.com/free-vector/digital-technology-background-with-hexagon-pattern-white-tone_53876-117566.jpg?t=st=1654780002~exp=1654780602~hmac=a9165bfdb7a24f07267d02ef2c2ed9fe213240ac333daab147e9bc2f8ef718da&w=1380"
    context.drawImage(background,0,0,width,height);

    // Frame
    gambarGaris(context,25,25,width - 25,25,"grey");
    gambarGaris(context,25,25,25,height - 25,"grey");
    gambarGaris(context,25,height - 25,width - 25,height - 25,"grey");
    gambarGaris(context,width - 25,25,width - 25,height - 25,"grey");

    // Title
    gambarTeks(context,"CEREAL",width/2 - 100,80,"bold 60px Times New Roman","#454343");
    

    var csv = document.getElementById('csv-file');
    let btn_baca = document.getElementById('btn').addEventListener('click', () => {
      Papa.parse(csv.files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(result) {
            console.log(result.data);

            var nama = [];
            var kal = [];
            var pro = [];
            var rat = [];
            for (var i = 0;i < 10;i ++) {
              nama.push(result.data[i].name);
              kal.push(parseInt(result.data[i].calories));
              pro.push(parseInt(result.data[i].protein));
              rat.push(parseFloat(result.data[i].rating));
            }


            let data_1 = [];
            for (var i = 0;i < 10;i ++) {
              data_1[nama[i]] = kal[i];
            }

            var color = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]
            var myLegend = document.getElementById("myLegend");
            var dc_1 = new DoughnutChart(
              {
                ctx: context,
                data: data_1,
                width: 250,
                height: 250,
                posX: 350,
                posY: 350,
                colors: color,
                doughnutHoleSize: 0.5,
                legends: true
              }
            );

            let data_2 = [];
            for (var i = 0;i < 10;i ++) {
              data_2[nama[i]] = pro[i];
            }

            var dc_2 = new DoughnutChart(
              {
                ctx: context,
                data: data_2,
                width: 250,
                height: 250,
                posX: width - 350,
                posY: 350,
                colors: color,
                doughnutHoleSize: 0.5,
              }
            )

            let data_3 = [];
            for (var i = 0;i < 10;i ++) {
              data_3[nama[i]] = rat[i];
            }

            var dc_3 = new DoughnutChart(
              {
                ctx: context,
                data: data_3,
                width: 250,
                height: 250,
                posX: width / 2,
                posY: height * 0.72,
                colors: color,
                doughnutHoleSize: 0.5,
              }
            )

            // Gambarkan masing-masing chart
            dc_1.gambarkan();
            dc_2.gambarkan();
            dc_3.gambarkan();

            // Legend Frame
            gambarFrame(context,width * 0.4,height * 0.12,390,390);

            // Annotasi Doughnut Chart 1
            gambarTeks(context,"Calories",280,360,"bold 40px Times New Roman","#536ba3");
            // Annotasi Doughnut Chart 2
            gambarTeks(context,"Protein",1510,360,"bold 40px Times New Roman","#536ba3");
            // Annotasi Doughbut Chart 3
            gambarTeks(context,"Rating",width * 0.47,height * 0.73,"bold 40px Times New Roman","#536ba3");
        }
      });
    });
  };
};

canvasSketch(sketch, settings);