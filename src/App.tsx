import React from 'react';
import { scaleOrdinal, ScaleOrdinal } from 'd3-scale';
import { arc as d3Arc, pie as d3Pie, PieArcDatum, Arc, Pie } from 'd3-shape';

import logo from './logo.svg';
import './App.css';

interface Datum {
  value: number;
  name: string;
}

const dataCsv: Datum[] = [
  {value: 5, name: "FR"},
  {value: 2, name: "US"},
  {value: 2, name: "HK"},
  {value: 12, name: "GB"},
];

interface IDonutChartProps {
  width: number;
  height: number;
}

class DonutChart extends React.PureComponent<IDonutChartProps> {
  private color: ScaleOrdinal<string, string>;
  private arc: Arc<any, PieArcDatum<Datum>>;
  private pie: Pie<any, Datum>;

  constructor(props: IDonutChartProps) {
    super(props);
    this.color = scaleOrdinal<string>().range([
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ]);

    const { width, height } = this.props;
    const radius = Math.min(width, height) / 2;

    this.arc = d3Arc<PieArcDatum<Datum>>()
      .outerRadius(radius - 10)
      .innerRadius(radius - 40);

    this.pie = d3Pie<Datum>()
      //.sort(null)
      .value(d => +d.value);
  }

  render() {
    const { width, height } = this.props;
    const data = this.pie(dataCsv);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {data.map(this.renderArc)}
        </g>
      </svg>
    );
  }

  renderArc = (d: PieArcDatum<Datum>) => {
    return (
      <g className="arc" key={`a${d.data.name}`}>
        <path d={this.arc(d) || undefined} fill={this.color(d.data.name)} />
        <text transform={`translate(${this.arc.centroid(d)})`} dy=".35em">
          {d.data.name}
        </text>
      </g>
    );
  }
}

export default DonutChart;
