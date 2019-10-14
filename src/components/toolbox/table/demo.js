import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import CheckBox from '../checkBox';
import DemoRenderer from '../demoRenderer';
import Table from '.';

/* eslint-disable-next-line no-console */
const onSortChange = console.log;

const TableDemo = () => (
  <div>
    <h2>Table</h2>
    <DemoRenderer>
      <Table
        sort="id:asc"
        onSortChange={onSortChange}
        data={[
          { id: 1, name: 'Row 1' },
          { id: 2, name: 'Row 2' },
          { id: 3, name: 'Row 3' },
        ]}
        columns={[{
          /* eslint-disable react/display-name */
          className: grid['col-xs-1'], header: '', id: 'checkbox', getValue: () => <CheckBox />,
        }, {
          className: grid['col-xs-2'], header: 'ID', id: 'id', isSortable: true,
        }, {
          className: grid['col-xs-6'], header: 'Name', id: 'name', getValue: row => <i>{row.name}</i>, isSortable: true,
        }, {
          className: grid['col-xs-3'], header: 'Other', id: 'other', getValue: () => 'Something static',
          /* eslint-enable react/display-name */
        }]}
      />
    </DemoRenderer>
  </div>
);

export default TableDemo;