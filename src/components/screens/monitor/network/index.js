/* istanbul ignore file */
import React from 'react';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import withData from '../../../../utils/withData';
import Network from './network';
import liskServiceApi from '../../../../utils/api/lsk/liskService';
import NotAvailable from '../notAvailable';

const ComposedNetwork = compose(
  withData(
    {
      peers: {
        apiUtil: liskServiceApi.getConnectedPeers,
        defaultData: [],
        autoload: true,
        transformResponse: (response, peers, urlSearchParams) => (
          urlSearchParams.offset
            ? [...peers, ...response.data]
            : response.data
        ),
      },
      networkStatistics: {
        apiUtil: liskServiceApi.getNetworkStatistics,
        defaultData: {
          coreVer: {},
          height: {},
          os: {},
          basic: {},
        },
        autoload: true,
        transformResponse: response => response,
      },
    },
  ),
  withTranslation(),
)(Network);

const NetworkMonitor = () => {
  const network = useSelector(state => state.network);

  return (
    liskServiceApi.getLiskServiceUrl(network) === null
      ? <NotAvailable />
      : <ComposedNetwork />
  );
};

export default NetworkMonitor;
