
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){console.log(data);
    
});
function init()  {

    let selector = d3.select("#selDataset");

    d3.json(url).then((data)=> {

    let sampleNames = data.names;
    for (let i = 0; i < sampleNames.length; i++){
        selector
          .append("option")
          .text(sampleNames[i])
          .property("value", sampleNames[i]);
      };
    

      let sample_one = sampleNames[0];
      console.log("betty", sample_one);
   

   
    buildBarChart(sample_one);
    buildBubbleChart(sample_one);
    buildGaugeChart(sample_one);
    buildMetadata(sample_one);   

});

};

function optionChanged(newSample) {
    
    buildBarChart(newSample);
    buildBubbleChart(newSample);
    buildGaugeChart(newSample);
    buildMetadata(newSample);
  }

function buildMetadata(sample) {

    d3.json(url).then((data) => {

        let metadata = data.metadata;

        let myvalues = metadata.filter(result => result.id == sample);
    
        console.log("fred", myvalues[0].id);

        let valueData = myvalues[0];

        let PANEL = d3.select("#sample-metadata")
        PANEL.html("");

       
        for (key in valueData){
            console.log("bob", key, valueData[key]);
            PANEL.append("h6").text(`${key}: ${valueData[key]}`);
          };
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
                    {range: [0, 1], color: "rgba(275, 275, 275, .5"},
                    {range: [1, 2], color: "rgba(230, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(200, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 150, 22, .5)"},
                    {range: [8, 9], color: "rgba(30, 140, 10, 0.5)"},
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