import React from "react";
import * as d3 from "d3"
import d3F from "../d3Function.js"

const Objectifs = (props)=>{
    let done = false;
    let data = [];
    props.data.map((e)=>{
        data.push(e.sessionLength)
    })
    React.useEffect(() => {
        if (done) {
            return
        }
        let svg = d3.select(".Objectifs")
            .attr("width", 258)
            .attr("height", 263)
        //hover
        let background_hover = svg.append("rect")
            .attr("width", 258)
            .attr("height", 263)
            .attr("x", 258)
            .attr("y", 0)
            .attr('style', "opacity: 9.75%");
        let duree = 0
        let tooltip = svg.append("rect")
            .attr("width", 39)
            .attr("height", 25)
            .attr("x", 258)
            .attr("y", 0)
            .attr("fill", "white");
        let tooltipText = d3F.drawText(d3.select(".Objectifs"), [258+20, 15], "black", '"Roboto Flex", sans-serif', "8px", "medium", duree+" min",  "middle");
        
        //text
        svg.append("g")
            .attr("width", 147)
            .attr("height", 48)
            .attr("x", 34)
            .attr("y", 29)
            .attr('style', "opacity: 50%");
        d3F.drawText(d3.select(".Objectifs").selectChild('g'), [34, 29], "white", '"Roboto Flex", sans-serif', "15px", "bold", "Durée moyenne des",  "start");
        d3F.drawText(d3.select(".Objectifs").selectChild('g'), [34, 29+20], "white", '"Roboto Flex", sans-serif', "15px", "bold", "sessions",  "start");
        //data display
        let gapLetters = 14;
        let dayArray = ["L", "M", "M", "J", "V", "S", "D"]
        let dataArrayRatio = d3F.dataRatio0To100(data);
        let dataArray = [[0, 263], [-20, 190.02]];
        const lineCurve = d3.line().curve(d3.curveCardinalOpen);

        for (let index = 0; index < dayArray.length; index++) {
            d3F.drawText(svg, [gapLetters, 223], "rgba(240, 248, 255, 0.5)", '"Roboto Flex", sans-serif', "12px", "bold", dayArray[index],  "start");
            let elem = [gapLetters, 190.02-(65*dataArrayRatio[index]/100)];
            dataArray.push(elem);
            gapLetters += 27+9.44;
        }
        dataArray.push([280, 190.02-(65*dataArrayRatio[dataArrayRatio.length-1]/100)]);
        dataArray.push([258, 263]);
        
        svg.append("path")
            .attr("d", lineCurve(dataArray))
            .attr("stroke", "white")
            .attr("stroke-width", "2px")
            .attr("fill", "transparent")
        //event
        svg.append('rect')
            .attr("width", 258)
            .attr("height", 263)
            .attr("fill", "none")
            .attr("id", "eventZoneObjectifs")
        let pointEvent = svg.append('circle')
            .attr("r", 4)
            .attr("cx", 0)
            .attr("cy", -20)
            .attr("fill", "white");
        let pointEvent2 = svg.append('circle')
            .attr("r", 18/2)
            .attr("cx", 0)
            .attr("cy", -20)
            .attr('style', "opacity: 30%")
            .attr("fill", "white");
        svg.on("mousemove", function(event, d) {
            background_hover.attr("x", event.offsetX)
            tooltip.attr("x", event.offsetX+5)
            tooltip.attr("y", event.offsetY -15)
            tooltipText.attr("x", event.offsetX+25)
            tooltipText.attr("y", event.offsetY)
            pointEvent.attr("cx", event.offsetX)
            pointEvent.attr("cy", event.offsetY)
            pointEvent2.attr("cx", event.offsetX)
            pointEvent2.attr("cy", event.offsetY)
        })
        document.querySelector(".Objectifs").addEventListener("mouseleave", (ev)=>{
            background_hover.attr("x", 258)
            tooltip.attr("x", 258)
            tooltipText.attr("x", 258+20)
            pointEvent.attr("cy", -20);
            pointEvent2.attr("cy", -20);
        })
        
        done = true;
    }, [done]);

    const style = {
        backgroundColor: "#FF0000",
        borderRadius: "5px"
    }
    return (
        <svg style={style} className="Objectifs">

        </svg>
    )
}
export default Objectifs;