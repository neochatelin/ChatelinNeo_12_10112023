/* eslint-disable array-callback-return */
import * as d3 from "d3";

class d3Function{
    id = 0;
    ratio(_0, _100, pourcent){
        return (((_100 - (_0))/100)*(pourcent)) + _0;
    }
    dataRatio0To100(data){
        let tab = [];
        let max = data[0];
        let min = data[0];
        data.map((e)=>{
            if (max < e) {
                max = e;
            }else if(min > e) {
                min = e;
            }
        });
        let gap = max - min;
        data.map((e)=>{
            tab.push((e-min) * 100 / gap);
        })
        return tab;
    }
    drawLine = (svg, [x1, y1], [x2, y2], color, origin, style = undefined)=>{
        svg.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .attr("stroke", color)
            .style(style);
        if (origin) {
            origin.x = x2;
            origin.y = y2;
        }
    }

    drawHexagon = (svg, [x, y], size, color)=>{
        let origin = {x: x-size/2, y: y-size/2}
        let deformation = size/100*93.33333333333333;
        this.id ++;
        let hexagon = svg.append('svg')
            .attr('class', 'hexagon_'+this.id)
        
        let path = d3.path();
            path.moveTo(origin.x+deformation, origin.y+size/4);

            path.lineTo(origin.x+size/2, origin.y);
            origin.x = origin.x+size/2
            path.lineTo(origin.x+size/2-deformation, origin.y+size/4);
            origin.x = origin.x+size/2-deformation
            origin.y =  origin.y+size/4
            path.lineTo(origin.x, origin.y+size/2);
            origin.y =  origin.y+size/2

            path.lineTo(origin.x-size/2+deformation, origin.y+size/4);
            origin.x = origin.x-size/2+deformation
            origin.y = origin.y+size/4
            path.lineTo(origin.x-size/2+deformation, origin.y-size/4);
            origin.x = origin.x-size/2+deformation
            origin.y = origin.y-size/4
            path.lineTo(origin.x, origin.y-size/2);
            
        hexagon.append("path")
            .attr("d", path)
            .attr("stroke", "white")
            .attr("fill", "transparent")
    }
    drawText = (svg, [x, y], color, font, fontSize, fontWeight, text, text_anchor)=>{
        return svg.append("text")
            .text(text)
            .attr("fill", color)
            .attr('text-anchor', text_anchor)
            .style('font-size', fontSize)
            .style('font-family', font)
            .style('font-weight', fontWeight)
            .attr("x", x)
            .attr("y", y);
    }
    interpolateBSpline(coordinates, xValue) {
        // Vérifier que les coordonnées sont fournies et qu'il y a au moins deux points
        if (!coordinates || coordinates.length < 2) {
          throw new Error('Au moins deux points de coordonnées sont nécessaires.');
        }
      
        const order = 2; // Ordre de la B-spline (2 signifie B-spline quadratique)
      
        function basis(i, k, t, knots) {
          if (k === 0) {
            return (t >= knots[i] && t < knots[i + 1]) ? 1 : 0;
          }
      
          const a = (t - knots[i]) / (knots[i + k] - knots[i]);
          const b = (knots[i + k + 1] - t) / (knots[i + k + 1] - knots[i + 1]);
      
          return a * basis(i, k - 1, t, knots) + b * basis(i + 1, k - 1, t, knots);
        }
      
        // Générer les nœuds uniformes avec mise à l'échelle
        const numPoints = coordinates.length;
        const numNodes = numPoints + order + 1; // Correction pour le nombre de nœuds
        const knots = [];
      
        // Génération des nœuds uniformes avec mise à l'échelle
        for (let i = 0; i <= numNodes; i++) {
          knots.push(i / numNodes);
        }
      
        const n = numPoints - 1; // Degré du polynôme
        let result = 0;
      
        for (let i = 0; i <= n; i++) {
          result += coordinates[i][1] * basis(i, order, xValue / 100, knots); // Mise à l'échelle de xValue
        }
      
        return result;
    }
}

const d3F = new d3Function();
export default d3F;
