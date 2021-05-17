function displayIds() {
  d3.json('samples.json').then(i => {
    i.names.forEach(name => d3.select('#selDataset').append('option').text(name).property('value',name))
    let personId = d3.select('#selDataset').property('value');
    displayInfo(personId);
  })
}

function displayInfo(personId) {
  displayMetadata(personId);
}

function displayMetadata(personId) {
  d3.select('#sample-metadata').html('');
  d3.json('samples.json').then(
    i => i.metadata.filter(j => {
      if(j.id==personId) {
        Object.entries(j).forEach(k => 
          d3.select('#sample-metadata').append('h6').text(k[0].toUpperCase()+': '+k[1])
        )
    }}
  ))
}

displayIds();

// d3
// .json('samples.json')
// .then(i => 
//     console.log(i)
//     );

// d3
// .json('samples.json')
// .then(i => 
//     console.log(i.metadata
//         .map(i => i.wfreq)
//         .sort((a,b) => b-a)
//         .filter(i => i!=null)
//         ));

// d3.json('samples.json').then(
//     i => i.metadata.filter(i => {
//       if(i.id==940) {console.log(i)}
//     })
// )

// d3.json('samples.json').then(
//   i => i.metadata.filter(i => i.id==940).forEach(j => {console.log(Object.entries(j))})
// )

// d3.select('body').on('change',updatePage);

// function updatePage() {
//     console.log(d3.select('#selectOption').node().value);
// }

// function init() {
//   var data = [{
//     x: [1, 2, 3, 4, 5],
//     y: [1, 2, 4, 8, 16] 
//   }];
//   Plotly.newPlot("plot", data);
// };

// function updatePlotly() {
//   var dataset = d3.select("#dropdownMenu").property("value");
//   var xData = [1, 2, 3, 4, 5];
//   var yData = [];

//   if (dataset === 'dataset1') {
//       yData = [1, 2, 4, 8, 16];
//   };

//   if (dataset === 'dataset2') {
//       yData = [1, 10, 100, 1000, 10000];
//   };

//   var trace = {
//       x: [xData],
//       y: [yData]
//   };
//   Plotly.restyle("plot", trace);
// };

// init();
// d3.selectAll("#dropdownMenu").on("change",updatePlotly);