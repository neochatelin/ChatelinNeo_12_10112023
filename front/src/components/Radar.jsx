import React from "react";
import * as d3 from "d3"
import d3F from "./d3Function.js"

const Radar = (props)=>{
    let done = false;
    let tempTab = [], tempTabMin = 99999, tempTabMax = 0;
    props.data.stats.map((e)=>{
        if (tempTabMin > e.value) {
            tempTabMin = e.value
        }if (tempTabMax < e.value) {
            tempTabMax = e.value
        }
        tempTab.push(e.value)
    })
    tempTab.push(tempTabMax+20)
    tempTab.push(tempTabMin-20)
    let dataTab = d3F.dataRatio0To100(tempTab);
    let data = {
        Intensité:dataTab[5],
        Vitesse:  dataTab[4],
        Force:    dataTab[3],
        Endurance:dataTab[2],
        Energie:  dataTab[1],
        Cardio:   dataTab[0]
    };
    React.useEffect(() => {
        if (done) {
            return
        }
        let svg = d3.select(".Radar")
            .attr("width", 258)
            .attr("height", 263);

        //draw background
        d3F.drawHexagon(svg, [258/2, 263/2], 22.5   , "white");
        d3F.drawHexagon(svg, [258/2, 263/2], 45     , "white");
        d3F.drawHexagon(svg, [258/2, 263/2], 90     , "white");
        d3F.drawHexagon(svg, [258/2, 263/2], 135    , "white");
        d3F.drawHexagon(svg, [258/2, 263/2], 180    , "white");

        //text
        d3F.drawText(svg, [258/2, 30],      "white", '"Roboto Flex", sans-serif', "12px", "bold", "Intensité",  "middle");
        d3F.drawText(svg, [212, 90],        "white", '"Roboto Flex", sans-serif', "12px", "bold", "Vitesse",    "start");
        d3F.drawText(svg, [211, 180],       "white", '"Roboto Flex", sans-serif', "12px", "bold", "Force",      "start");
        d3F.drawText(svg, [258/2, 263-30],  "white", '"Roboto Flex", sans-serif', "12px", "bold", "Endurance",  "middle");
        d3F.drawText(svg, [6, 180],         "white", '"Roboto Flex", sans-serif', "12px", "bold", "Energie",    "start");
        d3F.drawText(svg, [5, 90],          "white", '"Roboto Flex", sans-serif', "12px", "bold", "Cardio",     "start");

        //stat
        let data_0_100 = {
            Intensité:{
                x:{
                    min: 258/2,
                    max: 129
                },
                y:{
                    min: 263/2,
                    max: 40.9
                }
            },
            Cardio:{
                x:{
                    min: 258/2,
                    max: 50.5
                },
                y:{
                    min: 263/2,
                    max: 86
                }
            },
            Energie:{
                x:{
                    min: 258/2,
                    max: 50.5
                },
                y:{
                    min: 263/2,
                    max: 176.8
                }
            },
            Endurance:{
                x:{
                    min: 258/2,
                    max: 129
                },
                y:{
                    min: 263/2,
                    max: 263-40.9
                }
            },
            Force:{
                x:{
                    min: 258/2,
                    max: 258-50.5
                },
                y:{
                    min: 263/2,
                    max: 176.8
                }
            },
            Vitesse:{
                x:{
                    min: 258/2,
                    max: 258-50.5
                },
                y:{
                    min: 263/2,
                    max: 86
                }
            }
        }

        var path = d3.path();
        path.moveTo(d3F.ratio(data_0_100.Intensité.x.min, data_0_100.Intensité.x.max, data.Intensité), d3F.ratio(data_0_100.Intensité.y.min, data_0_100.Intensité.y.max, data.Intensité));
        path.lineTo(d3F.ratio(data_0_100.Vitesse.x.min, data_0_100.Vitesse.x.max, data.Vitesse), d3F.ratio(data_0_100.Vitesse.y.min, data_0_100.Vitesse.y.max, data.Vitesse));
        path.lineTo(d3F.ratio(data_0_100.Force.x.min, data_0_100.Force.x.max, data.Force), d3F.ratio(data_0_100.Force.y.min, data_0_100.Force.y.max, data.Force));
        path.lineTo(d3F.ratio(data_0_100.Endurance.x.min, data_0_100.Endurance.x.max, data.Endurance), d3F.ratio(data_0_100.Endurance.y.min, data_0_100.Endurance.y.max, data.Endurance));
        path.lineTo(d3F.ratio(data_0_100.Energie.x.min, data_0_100.Energie.x.max, data.Energie), d3F.ratio(data_0_100.Energie.y.min, data_0_100.Energie.y.max, data.Energie));
        path.lineTo(d3F.ratio(data_0_100.Cardio.x.min, data_0_100.Cardio.x.max, data.Cardio), d3F.ratio(data_0_100.Cardio.y.min, data_0_100.Cardio.y.max, data.Cardio));
        path.closePath();

        svg.append("path")
            .attr("d",      path)
            .attr("opacity","0.7")
            .attr("fill",   "red");
        
        done = true;
    }, [done]);


    const style = {
        backgroundColor: "#282D30",
        borderRadius: "5px"
    }
    return (
        <svg style={style} className="Radar"></svg>
    )
}
export default Radar;