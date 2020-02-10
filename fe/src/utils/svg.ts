import * as d3 from 'd3';

export const SHADOW_ID = 'dropshadow';

export function addShadow(svgDomNode: any) {
  const defs = d3
    .select(svgDomNode)
    .append('defs');

  const filter = defs
    .append('filter')
    .attr('id', SHADOW_ID);

  filter.append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 4)
    .attr('result', 'blur');

  filter.append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 2)
    .attr('dy', 2)
    .attr('result', 'offsetBlur');

  filter.append('feFlood')
    .attr('in', 'offsetBlur')
    .attr('flood-color', '#3d3d3d')
    .attr('flood-opacity', '0.5')
    .attr('result', 'offsetColor');

  filter.append('feComposite')
    .attr('in', 'offsetColor')
    .attr('in2', 'offsetBlur')
    .attr('operator', 'in')
    .attr('result', 'offsetBlur');

  const feMerge = filter
    .append('feMerge');

  feMerge.append('feMergeNode')
    .attr('in', 'offsetBlur');

  feMerge.append('feMergeNode')
    .attr('in', 'SourceGraphic');
}