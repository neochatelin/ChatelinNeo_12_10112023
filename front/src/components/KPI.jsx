import React from "react";
import * as d3 from "d3"
import d3F from "./d3Function.js"

const KPI = (props)=>{
    let done = false;

    React.useEffect(() => {
        if (done) {
            return
        }
        
        let svg = d3.select(".KPI")
        
        svg.empty();
        
        svg.attr("width",  258)
            .attr("height", 263)
        
        //background
        svg.append("circle")
            .attr("cx", 258/2)
            .attr("cy", 263/2)
            .attr("r",  159.38/2)
            .attr("fill", "white")
        //text
        d3F.drawText(svg, [30, 24],  "black", '"Roboto Flex", sans-serif', "15px", "bold", "Score",  "start");
        d3F.drawText(svg, [258/2, 263/2],  "black", '"Roboto Flex", sans-serif', "26px", "bold", props.data+"%",  "middle");
        d3F.drawText(svg, [258/2, (263/2)+26],  "#74798C", '"Roboto Flex", sans-serif', "16px", "bold", "de votre",  "middle");
        d3F.drawText(svg, [258/2, (263/2)+(26+16)],  "#74798C", '"Roboto Flex", sans-serif', "16px", "bold", "objectif",  "middle");
        //data
        svg.append('g')
            .attr('id', 'kpi-data');
        var data = d3.select("#kpi-data");

        var startPoint = d3.path();
            startPoint.arc(129, 44.3+5/2, 5, 0, Math.PI * 2);
            startPoint.closePath();
        var curve= d3.path();
            curve.arc(258/2, 263/2, 159.38/2+5, 0, Math.PI * (props.data * -2 / 100), true)
        
        var endPoint = d3.path();
            endPoint.arc(129, 44.3+5/2, 5, 0, Math.PI * 2);
            endPoint.closePath();
        
        data.append("path")
            .attr('d', startPoint)
            .attr('fill', 'red')
            .attr('stroke', 'transparent')
        
        data.append("path")
            .attr('d', curve)
            .attr('fill', 'transparent')
            .attr('stroke', 'red')
            .attr('stroke-width', 10)
            .attr('transform-origin', 258/2+" "+263/2)
            .attr('transform', "rotate(-90)");
            
        data.append("path")
            .attr('d', endPoint)
            .attr('fill', 'red')
            .attr('stroke', 'transparent')
            .attr('transform-origin', 258/2+" "+263/2)
            .attr('transform', "rotate("+(props.data*360/-100)+")");
    }, [done]);


    const style = {
        backgroundColor: "#FBFBFB",
        borderRadius: "5px"
    }
    return (
        <svg style={style} className="KPI"></svg>
    )
}
export default KPI;