/* istanbul ignore file */
import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';

const PeerRow = ({ data, className }) => (
  <div
    className={`${grid.row} ${className} accounts-row`}
  >
    <span className={`${grid['col-xs-3']} ${grid['col-md-3']}`}>
      {data.ip}
    </span>
    <span className={`${grid['col-xs-2']} ${grid['col-md-2']}`}>
      {data.wsPort}
    </span>
    <span className={`${grid['col-xs-3']} ${grid['col-md-3']}`}>
      {data.location.countryCode}
    </span>
    <span className={`${grid['col-xs-2']} ${grid['col-md-2']}`}>
      {data.version}
    </span>
    <span className={`${grid['col-xs-2']} ${grid['col-md-2']}`}>
      {data.height}
    </span>
  </div>
);

/* istanbul ignore next */
const areEqual = (prevProps, nextProps) => (prevProps.data.id === nextProps.data.id);

export default React.memo(PeerRow, areEqual);
