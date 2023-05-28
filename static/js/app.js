
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){console.log(data);
    
});
function init()  {

let dropDownMenu = d3.select("#selDataSet");

d3.json(url).then((data)=> {
    let names = data.names;
    names.forEach((sean) => {console.log(sean);
    dropDownMenu.append("option").text("sean").property("value", sean);
        

});

let sample_one = names[0];
console.log(sample_one);


buildMetadata(sample_one);
buildBarChart(sample_one);
buildBubbleChart(sample_one);
buildGaugeChart(sample_one);


});
}
function buildMetadata(sample) {

    d3.json(url).then((data) => {

        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == sample);

        console.log(value)

        let valueData = value[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valueData).forEach(([key,value]) => {

            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
});

};


function buildBarChart(sample) {

    d3.json(url).then((data) => {

        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample);

        let valueData = value[0];

        let otu_ids = valueData.otu_ids.slice(0, 10).map(bar =>`otu ${bar}`).reverse();
        console.log(otu_ids);
        let otu_labels = valueData.otu_labels.slice(0, 10).reverse();;
        let sample_values = valueData.sample_values.slice(0, 10).reverse();;

        let trace = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 OTUs Present"
        };

        Plotly.newPlot("bar", [trace], layout)
    });
};

function buildBubbleChart(sample) {

    d3.json(url).then((data) => {

        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample)
    
        let valueData = value[0];

        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids,otu_labels,sample_values)
    

         let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
    }
};
 let layout = {
    title: "Bacteria Per Sample",
    hovermode: "closest",
    xaxis: {title: "OTU ID"},
};

Plotly.newPlot("bubble", [trace1], layout)
});}

function optionChanged(value) { 

    console.log(value); 

    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);

};


function buildGaugeChart(sample) {

    
    d3.json(url).then((data) => {
 
        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == sample);

        console.log(value);

        let valueData = value[0];
        
        let washFrequency = Object.values(valueData)[6]; 
        
        let trace2 = {
            value: washFrequency,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 10}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10]},
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, .5"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                    {range: [9, 10], color: "rgba(0, 127, 0, .5)"},
                ]
            } 
        };

       
        let layout = {
            width: 400, 
            height: 300,
            margin: {t: 0, b:0}
        };

        
        Plotly.newPlot("gauge", [trace2], layout)
    });
};


init();