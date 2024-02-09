/* eslint-disable no-loop-func */
import React from "react";
import * as d3 from "d3"
import d3F from "./d3Function.js"

const Poids = (props)=>{
    let done = false;
    React.useEffect(() => {
        if (done) {
            return
        }
        let svg = d3.select(".Poids")
            .attr("width", 835)
            .attr("height", 320)
            
        //text
        svg.append('g')
            .attr("id", "legend")
        d3F.drawText(d3.select("#legend"), [32, 24+13], "black", '"Roboto Flex", sans-serif', "15px"    , "medium", "Activité quotidienne",  "start");
        d3F.drawText(d3.select("#legend"), [551, 24+13], "#74798C", '"Roboto Flex", sans-serif', "14px" , "medium", "Poids (kg)",  "start");
        d3F.drawText(d3.select("#legend"), [666, 24+13], "#74798C", '"Roboto Flex", sans-serif', "14px" , "medium", "Calories brûlées (kCal)",  "start");

        var pointPoids = d3.path();
            pointPoids.arc(532, 32, 4, 0, Math.PI * 2);
            pointPoids.closePath();
        var pointCalories = d3.path();
            pointCalories.arc(646, 32, 4, 0, Math.PI * 2);
            pointCalories.closePath();
        
        d3.select("#legend").append("path")
            .attr('d', pointPoids)
            .attr('fill', '#282D30')
            .attr('stroke', 'transparent')
        d3.select("#legend").append("path")
            .attr('d', pointCalories)
            .attr('fill', '#E60000')
            .attr('stroke', 'transparent')
        
        //graph background
        
        svg.append('g')
            .attr("id", "graph_background")
        let graph_background = d3.select("#graph_background")
        d3F.drawLine(graph_background, [43,256.5], [43+702+10, 256.5], '#DEDEDE')
        
        //get data
        let maxKg = props.data[0].kilogram;
        let minKg = props.data[0].kilogram;
        let maxCal = props.data[0].calories;
        let minCal = props.data[0].calories;
        props.data.map((e)=>{
            if(e.kilogram < minKg){
                minKg = e.kilogram
            }
            if(e.kilogram > maxKg){
                maxKg = e.kilogram
            }
            if(e.calories < minCal){
                minCal = e.calories
            }
            if(e.calories > maxCal){
                maxCal = e.calories
            }
        })
        let gapX = 49.5+(9.95/2);
        let gapY = 118.5;
        
        svg.append('g')
            .attr("id", "graph")
        let graph = d3.select("#graph")
        for (let index = 1; index < props.data.length+1; index++) {
            d3F.drawText(d3.select("#legend"), [gapX, 273], "#9B9EAC", '"Roboto Flex", sans-serif', "14px" , "medium", index,  "middle");

            let formulKg = (value)=>{
                return 145-(145/(maxKg-minKg+1))*(maxKg-value)
            }
            graph.append('rect')
                .attr("id", "graph"+index)
                .attr("class", "graphBackground")
                .attr("x", gapX-(56/2))
                .attr("y", 112)
                .attr("width", 56)
                .attr("height", 145)
                .attr("fill", "transparent")
            graph.append('rect')
                .attr("x", gapX-11.5)
                .attr("y", (257-formulKg(props.data[index-1].kilogram))+(7/2))
                .attr("width", 7)
                .attr("height", formulKg(props.data[index-1].kilogram)-(7/2))
                .attr("fill", "#282D30")
            graph.append('circle')
                .attr("r", 7/2)
                .attr("cx", gapX-11.5+7/2)
                .attr("cy", (257-formulKg(props.data[index-1].kilogram))+(7/2))
                .attr("fill", "#282D30");

            let formulCal = (value)=>{
                return 125*(value-minCal)/(maxCal-minCal)+20
            }
            graph.append('rect')
                .attr("x", gapX-11.5+8+7)
                .attr("y", 257-formulCal(props.data[index-1].calories)+(7/2))
                .attr("width", 7)
                .attr("height", formulCal(props.data[index-1].calories)-(7/2))
                .attr("fill", "red")
            graph.append('circle')
                .attr("r", 7/2)
                .attr("cx", gapX-11.5+8+7+7/2)
                .attr("cy", 257-formulCal(props.data[index-1].calories)+(7/2))
                .attr("fill", "red");
            graph.append('rect')
                .attr("id", "graphT"+index)
                .attr("poids", props.data[index-1].kilogram)
                .attr("calorie", props.data[index-1].calories)
                .attr("class", "graphTBackground")
                .attr("x", gapX-(56/2))
                .attr("y", 112)
                .attr("width", 56)
                .attr("height", 145)
                .attr("fill", "transparent")
            gapX += (712-22)/(props.data.length-1);
        }
        for (let index = 0; index < props.data.length; index++) {
            d3F.drawText(d3.select("#legend"), [788, gapY-1.5], "#9B9EAC", '"Roboto Flex", sans-serif', "14px" , "medium", maxKg-index,  "start");
            if(index !== props.data.length-1){
                graph_background.append("line")
                    .attr("x1", 43)
                    .attr("y1", gapY-6)
                    .attr("x2", 43+702+10)
                    .attr("y2", gapY-6)
                    .attr("stroke", '#DEDEDE')
                    .style("stroke-dasharray", ("2, 2"));
            }
                    
            gapY += (145/((maxKg-minKg)+1));
        }
        
            //tooltip
            graph.append('rect')
                .attr("id", "tooltip_poid")
                .attr("x", -40)
                .attr("y", 82)
                .attr("width", 39)
                .attr("height", 63)
                .attr("fill", "#E60000")
            let tooltip_poid_text = [d3F.drawText(graph, [-500, 32/2+82], "white", '"Roboto Flex", sans-serif', "10px" , "medium", "50kg",  "middle"),
                                    d3F.drawText(graph, [-500, 64-32/2+82], "white", '"Roboto Flex", sans-serif', "10px" , "medium", "400j",  "middle")]
            //#######
        let eventTarget = graph.selectAll('.graphTBackground')
        eventTarget._groups[0].forEach(e => {
            e.addEventListener("mouseenter", (ev)=>{
                graph.select("#"+e.id.split('T')[0]+e.id.split('T')[1])
                    .attr('fill', '#C4C4C4')
                    .attr('style', "opacity: 50%");
                graph.select("#tooltip_poid")
                    .attr("x", parseInt(graph.select("#"+e.id)._groups[0][0].attributes.x.value)+60)
                    .attr("y", 82)
                    .text(e.id.split('T')[1]);
                tooltip_poid_text[0].attr("x", parseInt(graph.select("#"+e.id)._groups[0][0].attributes.x.value)+60+(32/2))
                tooltip_poid_text[0].text(e.attributes.poids.value+"kg")
                tooltip_poid_text[1].attr("x", parseInt(graph.select("#"+e.id)._groups[0][0].attributes.x.value)+60+(32/2))
                tooltip_poid_text[1].text(e.attributes.calorie.value+"j")
            })
            e.addEventListener("mouseleave", (ev)=>{
                graph.select("#"+e.id.split('T')[0]+e.id.split('T')[1]).attr('fill', 'transparent')
                graph.select("#tooltip_poid")
                    .attr("x", -50)
                    .attr("y", -40);
            })
        });
        
        done = true;
    }, [done]);


    const style = {
        backgroundColor: "#FBFBFB",
        borderRadius: "5px"
    }
    return (
        <svg style={style} className="Poids"></svg>
    )
}
export default Poids;