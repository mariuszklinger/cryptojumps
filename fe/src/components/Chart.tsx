
// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

import { SHADOW_ID, addShadow } from '../utils/svg';
import './Chart.scss';

// const width = 500;
// const height = 900;

const arc_colors = ['#F3A54A', '#AA7CAA', '#CCDE66', '#4B90A6'];
const INNER_RADIUS = 260;
export const RADIUS_WIDTH = 100;

const SCALE_PADDING = 15;

const greyScale = {
  startAngle: 0,
  endAngle: 1 * Math.PI,
  innerRadius: INNER_RADIUS - SCALE_PADDING,
  outerRadius: INNER_RADIUS + RADIUS_WIDTH + SCALE_PADDING,
  score: 1,
};

export interface Props {
  filled: number;
  currency: string;
  value: string;
}

export default function Chart() {
  const svgRef = useRef(null);

  const [data] = useState([
    {
      fill: arc_colors[3],
      score: 0.85,
      id: 'blue1',
      label: 'Label 1 - blue',
    },
    {
      fill: arc_colors[2],
      score: 0.65,
      id: 'blue2',
      label: 'Label 2 - green',
    },
    {
      fill: arc_colors[0],
      score: 0.75,
      id: 'blue3',
      label: 'Label 3 - Orange',
    },
    {
      fill: arc_colors[1],
      score: 0.95,
      id: 'blue4',
      label: 'Label 4 - violet',
    }
  ].sort((e1, e2) => e2.score - e1.score));

  function init() {

    const svg = d3
      .select(svgRef.current)
      // .attr("viewBox", "0 0 300 300")
      .attr('width', 200)
      // .attr('height', height);

    const g1 = svg
      .append('g')
      .attr('transform', 'translate(0, 400)');

    g1.append('path')
      .attr('id', 'scale')
      .attr('fill', '#ccc')
      // @ts-ignore
      .attr('d', d3.arc()(greyScale));

    const arc = d3.arc()
      .startAngle(0)
      .innerRadius(INNER_RADIUS)
      .outerRadius(INNER_RADIUS + RADIUS_WIDTH);

    const countryGs = g1
      .selectAll('g')
      .data(data)
        .enter()
          .append('g')
          .attr('class', 'country');

    countryGs
      .append('path')
        .attr('id', g => g.id)
        .style('fill', g => g.fill)
        .attr('outerRadius', (d, i) => INNER_RADIUS + RADIUS_WIDTH + i * 10)
        // .attr('filter', (d, i) => `url(#${SHADOW_ID})`)
        .transition()
        .delay((d, i) => i * 1000)
        .duration(1500)
        // @ts-ignore
        .attrTween('d', arcTween);

    const textGs = countryGs
      .append('text');

    textGs
      .append('textPath')
        .attr('stroke', '#eee')
        .attr('fill', 'white')
        .attr('xlink:href', r => `#${r.id}`)
        .text(r => `${r.score * 100}%`);

    textGs
      .attr('dx', 30)
      .attr('dy', 73)
      .attr('font-size', 50)
      .attr('opacity', 0)
      .transition()
      .delay((d, i) => i * 1000 + 300)
      .duration(1000)
      .attr('opacity', 1);

    function arcTween(d: any) {
      const new_endAngle = d.score * Math.PI;
      const interpolate_end = d3.interpolate(0, new_endAngle);

      return (t: number) => {
        d.endAngle = interpolate_end(t);
        return arc(d);
      }
    }
  }

  useEffect(init, [data]);
  useEffect(() => addShadow(svgRef.current), []);

  return <svg className="chart" ref={svgRef}></svg>;
}