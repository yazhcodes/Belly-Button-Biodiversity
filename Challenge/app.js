function displayIds() {
  d3.json('samples.json').then(i => {
    i.names.forEach(name => d3.select('#selDataset').append('option').text(name).property('value',name))
    let personId = d3.select('#selDataset').property('value');
    displayInfo(personId);
  })
}

function displayInfo(personId) {
  displayMetadata(personId);
  buildCharts(personId);
}

function displayMetadata(personId) {
  d3.select('#metadata').html('');
  d3.json('samples.json').then(
    i => i.metadata.filter(j => {
      if(j.id==personId) {
        Object.values(j).forEach(value => {
          d3.select('#metadata').append('td').text(value);
        })
      }
    })
  )
}

function buildCharts(personId) {
  d3.json('samples.json').then(i => {
    let personSample = i.samples.filter(i => i.id === personId)[0];
    otuIds = personSample.otu_ids;
    otuLabels = personSample.otu_labels;
    sampleValues = personSample.sample_values;
    let personMetadata = i.metadata.filter(j => j.id === parseInt(personId))[0];
    let wfreq = personMetadata.wfreq;

    // Bar Chart
    let yticks = otuIds.map(i => `OTU ${i} `);
    let barTrace = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks.slice(0,10).reverse(),
      text: otuLabels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h',
      marker: {
        color: '#6e1b44'
      }
    }]
    let barLayout = {
      title: '<b>Top 10 Bacteria Culture Found</b>',
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {
        family: 'Arima Madurai, cursive',
        color: '#3b3136',
        size: 14
      },
      xaxis: {gridcolor: 'dimgray'}
    }
    Plotly.newPlot('bar',barTrace,barLayout,{responsive:true});

    // Guage Chart
    let guageTrace = [{
      title: {text: '<b>Belly Button Washing Frequency</b><br>Scrubs per week'},
      type: "indicator",
      mode: "gauge+number",
      domain: { x: [0, 10], y: [0, 10] },
      value: wfreq,
      gauge: {
        axis: { range: [0, 10] },
        steps: [
          { range: [0, 2], color: "mistyrose"},
          { range: [2, 4], color: "pink"},
          { range: [4, 6], color: "lightpink"},
          { range: [6, 8], color: "palevioletred"},
          { range: [8, 10], color: "indianred"}
        ],
        bar: { color: "#6e1b44" },
        borderwidth: 0
      }
    }]
    let guageLayout = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {
        family: 'Arima Madurai, cursive',
        color: '#3b3136',
        size: 14
      }
    }
    Plotly.newPlot('gauge',guageTrace,guageLayout,{responsive:true});
  
    // Bubble Chart
    let bubbleTrace = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuIds,
        size: sampleValues,
        colorscale: 'Electric',
        line: {width: 0}
      }
    }]
    let bubbleLayout = {
      title: '<b>Bacteria Cultures per Sample</b>',
      xaxis: {title: 'OTU ID'},
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {
        family: 'Arima Madurai, cursive',
        color: '#3b3136',
        size: 14
      },
      xaxis: {gridcolor: 'dimgray'},
      yaxis: {gridcolor: 'dimgray'}
    }
    Plotly.newPlot('bubble',bubbleTrace,bubbleLayout,{responsive:true})
  })    
}

displayIds();