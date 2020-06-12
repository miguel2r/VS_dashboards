// Sept one read the file from local folder using D3
//Use the D3 library to read in samples.json.


function init_graph(dvalue){

    console.log("importing data");
    d3.json("data/samples.json").then((importedData) => {
              console.log(importedData);
              // get the name to display those values into a table
              var names = importedData.names;
              console.log("Names:",names );
              
              for (i=0;i<importedData.metadata.length;i++){
                  var metad = importedData.metadata[i].id;
                
                  console.log("MetaData_all:",metad ); 
                  if (metad == dvalue)  {
                     console.log("Metda id founded:",metad );
                     var meta_id = "id: " + importedData.metadata[i].id
                     var meta_et = "Ethnicity: " + importedData.metadata[i].ethnicity
                     var meta_gen = "Gender: " + importedData.metadata[i].gender
                     var meta_age = "Age: " + importedData.metadata[i].age
                     var meta_loc = "Location: " + importedData.metadata[i].location
                     var meta_type = "bbtype: " + importedData.metadata[i].bbtype
                     var meta_wfreq = "wfreq: " + importedData.metadata[i].wfreq
                     var meta_wfreq_b =  importedData.metadata[i].wfreq
                     var info=[]
                     info.push(meta_id);
                     info.push(meta_et);
                     info.push(meta_gen);
                     info.push(meta_age);
                     info.push(meta_loc);
                     info.push(meta_type);
                     info.push(meta_wfreq);
                  
                     
                     d3.select("#sample-metadata")
                     .selectAll("li")
                     .remove("li")
                    
                    // get the name to display those values into a table
                    //var names = importedData.names;
                    d3.select("#sample-metadata")
                      .selectAll("li")
                      .data(info)
                      .enter()
                      .append("li")
                      .text(function(out_id) {
                      return out_id;
                      });

                     break;
                  }
              }

            
              for (i=0;i<importedData.samples.length;i++){
                    var sampid = importedData.samples[i].id;
                   
                    if (sampid == dvalue)  {
                        console.log("Samples id founded:",sampid );
                        var sampid = importedData.samples[i].id
                        var samp_otu = importedData.samples[i].otu_ids
                        var samp_val = importedData.samples[i].sample_values
                        var samp_otub = importedData.samples[i].otu_ids
                        var samp_valb = importedData.samples[i].sample_values
                        break;

                    }
                  }

              // bar graph================== 


              // Sort the data array 
              samp_val.sort(function(a, b) {
              return parseFloat(b.sample_values) - parseFloat(a.sample_values); 
              });


              // Slice the first 10 objects value for plotting
              samp_val = samp_val.slice(0, 10);
              console.log("Top 10 values",samp_val);
              // Slice the first 10 title value for plotting
              samp_otu = samp_otu.slice(0, 10);
              console.log("Top labels values",samp_otu);

              var samp_otu = samp_otu.map(myFunction)
              function myFunction(num) {
                return "OTU " + num ;
              }


              // Reverse the array due to Plotly's defaults
              samp_val = samp_val.reverse();

              // Create your trace.
              var trace = {
                x: samp_val,
                y: samp_otu,
                type: "bar"  ,
                orientation: "h"
               // mode: 'markers'
              };

              // Create the data array for our plot
              var data = [trace];

              // Define the plot layout
              var layout = {
                title: "Belly Button Biodiversity Top 10 OTUs ",
                xaxis: { title: "Operational Taxonomic Inits (OTUs)" },
                yaxis: { title: "Microbial Species"}
              };

              // Plot the chart to a div tag with id "bar-plot"
              Plotly.newPlot("bar", data, layout);




              // bubble graph================== 

      
              // Create your trace.
              var traceb = {
                x: samp_otub,
                y: samp_valb,
                mode: 'markers',
                marker: {
                  size: samp_valb,
                  color:  [35, 10, 50, 40, 18, 30],
                  colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']]
                } 
              };

              // Create the data array for our plot
              var datab = [traceb];

              // Define the plot layout
              var layout = {
                title: "Belly Button Biodiversity",
                xaxis: { title: "OTU ID" },
                yaxis: { title: "Operational Taxonomic Units"}
              };

              // Plot the chart to a div tag with id "bar-plot"
              Plotly.newPlot("bubble", datab, layout);


          


              ///gauge graph
            
              var data = [

                {
                  domain: { x: [0, 1], y: [0, 1] },
                  value: meta_wfreq_b,
                  title: { text: "Belly Buttom Washing Frequency (per Week)",  font: {size: 18 }  },     
                  type: "indicator",
                  mode: "gauge+number",
                  delta: { reference: 5 },
                  gauge: {

                
                    axis: { range: [null, 7],  tickwidth: 1, tickcolor: "darkblue"},
                    bar: { color: "#fb8d3d" },
                    steps: [
                      { range: [0, 1], color: "#b7e2b1"},
                      { range: [1, 2], color: "#97d494" },
                      { range: [2, 3], color: "#73c378" },
                      { range: [3, 4], color: "#4daf62" },
                      { range: [4, 5], color: "#2f984f" },
                      { range: [5, 6], color: "#157f3b" },
                      { range: [6, 7], color: "#036429" }
                    ]
                  



                  }
                }
              ];
              
              var layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
              Plotly.newPlot('gauge', data, layout);








        });  // main get the data

  }



function dropdown_elements() {
        // Call updatePlotly() when a change takes place to the DOM
        d3.selectAll("#selDataset").on("change", updatePlotly);
        d3.json("data/samples.json").then((importedData) => {
        console.log(importedData);
        // get the name to display those values into a table
        var names = importedData.names;
        d3.select("select")
          .selectAll("option")
          .data(names)
          .enter()
          .append("option")
          .text(function(out_id) {
          return out_id;
           });
        });
} // drop_elements


// This function is called when a dropdown menu item is selected
function updatePlotly() {
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      //var dataset = dropdownMenu.node().value;
      console.log("Click:",dataset);
      init_graph(dataset)
} // function  updatePlotly



//get the dropdown list elements
dropdown_elements()

