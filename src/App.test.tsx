import React from 'react';
import ReactDOM from 'react-dom';
import DonutChart from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DonutChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});
