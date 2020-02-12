/* istanbul ignore file */
import React from 'react';
import Box from '../../../toolbox/box';
import BoxHeader from '../../../toolbox/box/header';
import BoxContent from '../../../toolbox/box/content';
import LoadLatestButton from '../../../shared/loadLatestButton';
import MonitorHeader from '../header';
import withResizeValues from '../../../../utils/withResizeValues';
import Table from '../../../toolbox/table';
import styles from './peersTable.css';
import header from './tableHeader';
import PeerRow from './peerRow';
import Statistics from './statistics';

const Network = ({
  peers,
  networkStatistics,
  t,
}) => {
  /* istanbul ignore next */
  const handleLoadMore = () => {
    peers.loadData({ offset: peers.data.length });
  };

  return (
    <div>
      <MonitorHeader />
      <Statistics networkStatistics={networkStatistics} t={t} />
      <Box main isLoading={peers.isLoading} className="peers-box">
        <BoxHeader>
          <h1>{t('Connected Peers')}</h1>
        </BoxHeader>
        <LoadLatestButton
          event="update.block"
          onClick={peers.loadData}
        >
          {t('Update peers')}
        </LoadLatestButton>
        <BoxContent className={styles.content}>
          <Table
            data={peers.data}
            isLoading={peers.isLoading}
            row={PeerRow}
            loadData={handleLoadMore}
            header={header(t)}
            additionalRowProps={{ }}
            error={peers.error}
            canLoadMore
          />
        </BoxContent>
      </Box>
    </div>
  );
};

export default withResizeValues(Network);
