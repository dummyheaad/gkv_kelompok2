DONUT1 = document.getElementById('pie_1');
DONUT2 = document.getElementById('pie_2');

var data = [{
    labels: ['High Distinction','Distinction','Credit','Pass','Fail'],
    values: [10,40,25,25,0],
    domain: {column: 0},
    name: 'Donut Chart',
    hover: 'label+percent+name',
    hole: .4,
    type: 'pie'
},{
    labels: ['A','B','C','D','E'],
    values: [10,20,10,40,30],
    domain: {column: 1},
    name: ['Title 2'],
    hover: 'label+percent+name',
    hole: .4,
    type: 'pie'
}];

var layout = {
    title: "Donut Chart",
    annotations: [{
        font: {size: 20},
        showarrow: false,
        text: 'TEST_1',
        x: 0.17,
        y: 0,5
    },{
        font: {size: 20},
        showarrow: false,
        text: "TEST_2",
        x: 0.82,
        y: 0.5
    }],
    height: 400,
    width: 600,
    showlegend: false,
    grid: {rows: 1,columns: 2}
};
var config = {responsive: true};
Plotly.newPlot(DONUT1, data, layout, config);