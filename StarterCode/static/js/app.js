let selectedId = null;
let globalData = null;

d3.json("samples.json").then(function(data){
  const dropDownMenu = d3.select("#selDataset")
  globalData = data;
  console.log(data);

  var options = dropDownMenu.selectAll('option')
    .data(data.metadata)
    .enter()
    .append('option');

  options.text(function(d) {
    return d.id;
  })
  .attr("value", function(d){
    return d.id;
  });

});

function optionChanged() {
  selectedId = d3.select('#selDataset').property('value');

  const selectedObject = globalData.samples.find(element => element.id == selectedId);

  const selectedMetaObject = globalData.metadata.find(element => element.id == selectedId);
 
  const selectedOtuIDString = selectedObject.otu_ids.slice(0, 10).map(x => "OTU "+x);
  
  const selectedOtuID = selectedObject.otu_ids.slice(0, 10);

  const selectedSampleValue = selectedObject.sample_values.slice(0, 10);
 
  const selectedOtuLabel = selectedObject.otu_labels.slice(0, 10);

  const selectedMeta = d3.select('#sample-metadata')

  var data = [{
    type: 'bar',
    x: selectedSampleValue.reverse(),
    y: selectedOtuIDString.reverse(),
    orientation: 'h'
  }];
  
  Plotly.newPlot('bar', data);

  var trace1 = {
    x: selectedOtuID,
    y: selectedSampleValue,
    text: selectedOtuLabel,
    mode: 'markers',
    colorscale: "Earth",
    marker: {
      color: selectedOtuID,
      size: selectedSampleValue
    }
  };
  
  var bubbleData = [trace1];
  
  var layout = {
    showlegend: false,
    height: 600,
    width: 1100
  };
  
  Plotly.newPlot('bubble', bubbleData, layout);

  d3.select('#meta_id').append('text').text("id: " + selectedMetaObject.id)
  d3.select('#ethnicity').append('text').text("ethnicity: " + selectedMetaObject.ethnicity)
  
};







