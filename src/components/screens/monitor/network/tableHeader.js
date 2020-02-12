/* istanbul ignore file */
import grid from 'flexboxgrid/dist/flexboxgrid.css';

export default t => ([
  {
    title: t('IP Address'),
    classList: `${grid['col-xs-3']} ${grid['col-md-3']}`,
  },
  {
    title: t('WS'),
    classList: `${grid['col-xs-2']} ${grid['col-md-2']}`,
  },
  {
    title: t('Country'),
    classList: `${grid['col-xs-3']} ${grid['col-md-3']}`,
  },
  {
    title: t('Version'),
    classList: `${grid['col-xs-2']} ${grid['col-md-2']}`,
  },
  {
    title: t('Height'),
    classList: `${grid['col-xs-2']} ${grid['col-md-2']}`,
  },
]);
