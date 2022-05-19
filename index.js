const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const csv = require('jquery-csv');

DONUT1 = document.getElementById('pie_1');

var data;
    $.get({
        type: "GET",
        url: "cereal.csv",
        dataType: "text",
        success: function(response) {
            console.log("done");
            data = csv.toArrays(response);
        }
    });

    

var data = [{
    labels: ['High Distinction','Distinction','Credit','Pass','Fail'],
    values: [10,40,25,25,0],
    domain: {column: 0},
    name: 'Donut Chart',
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
        y: 0.5
    }]
};
var config = {responsive: true};
Plotly.newPlot(DONUT1, data, layout, config);


