
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){console.log(data);
    
});
function init()  {

let dropDownMenu = d3.select("#selDataSet");

d3.json(url).then((data)=> {
    let names = data.names;
    names.forEach((sean)=>{console.log(sean);
    dropDownMenu.append("option").text("sean").property("value", sean);
        

});

let sample_one = names[0];
console.log(sample_one);


buildMetadata(sample_one);
buildBarChart(sample_one);
buildBubbleChart(sample_one);
// buildGaugeChart(sample_one);


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
}

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
    buildGaugeChart(sample_one);

};


init();
