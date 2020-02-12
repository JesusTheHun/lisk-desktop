/* istanbul ignore file */
import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import Box from '../../../toolbox/box';
import BoxHeader from '../../../toolbox/box/header';
import Chart from '../../../toolbox/charts';
import { chartStyles, typeBar, typeDoughnut } from '../../../../constants/chartConstants';
import styles from './peersTable.css';

const Statistics = ({ networkStatistics, t }) => {
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      networkStatistics.loadData();
    }, 5000);
    return function cleanUp() {
      clearInterval(intervalId);
    };
  }, []);

  const versions = Object.entries(networkStatistics.data.coreVer)
    .sort((a, b) => (a[0] > b[0] ? -1 : 1));
  const versionLabels = versions.map(([key]) => key);
  const versionData = versions.map(([, value]) => value);

  const heights = Object.entries(networkStatistics.data.height)
    .sort((a, b) => (a[0] - b[0]));
  const heightsLabels = heights.map(([key]) => key);
  const heightsData = heights.map(([, value]) => value);

  return (
    <Box isLoading={heightsData.length === 0 && !networkStatistics.error} className="peers-box">
      <BoxHeader>
        <h1>{t('Statistics')}</h1>
      </BoxHeader>
      <div className={[grid.row, styles.container].join(' ')}>
        <div className={grid['col-xs-3']}>
          <div className={styles.chartBox}>
            <h2 className={styles.chartTitle}>{t('Peers')}</h2>
            <Chart
              type={typeDoughnut}
              data={{
                labels: [t('Connected'), t('Disconnected')],
                datasets: [
                  {
                    label: 'delegates',
                    data: [
                      networkStatistics.data.basic.connectedPeers,
                      networkStatistics.data.basic.disconnectedPeers,
                    ],
                  },
                ],
              }}
              options={{
                tooltips: {
                  callbacks: {
                    title(tooltipItem, data) { return data.labels[tooltipItem[0].index]; },
                    label(tooltipItem, data) {
                      return data.datasets[0].data[tooltipItem.index];
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className={grid['col-xs-4']}>
          <div className={styles.chartBox}>
            <h2 className={styles.chartTitle}>{t('Height distribution')}</h2>
            <Chart
              type={typeBar}
              data={{
                labels: heightsLabels,
                datasets: [{
                  data: heightsData,
                  backgroundColor: chartStyles.ultramarineBlue,
                }],
              }}
              options={{
                legend: {
                  display: false,
                },
                layout: {
                  padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      display: true,
                      offsetGridLines: true,
                      lineWidth: 0,
                    },
                    ticks: {
                      display: true,
                      gridLines: {
                        drawTicks: false,
                      },
                      maxRotation: 90,
                    },
                  }],
                  yAxes: [{
                    gridLines: {
                      display: true,
                      offsetGridLines: false,
                      lineWidth: 0,
                      zeroLineWidth: 1,
                      drawTicks: false,
                    },
                    ticks: {
                      padding: 15,
                      fontSize: chartStyles.fontSize,
                    },
                  }],
                },
                tooltips: {
                  callbacks: {
                    // istanbul ignore next
                    label(tooltipItem, data) {
                      return t('{{peers}} peers', { peers: data.datasets[0].data[tooltipItem.index] });
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className={grid['col-xs-5']}>
          <div className={styles.chartBox}>
            <h2 className={styles.chartTitle}>{t('Version distribution')}</h2>
            <Chart
              type={typeBar}
              data={{
                labels: versionLabels,
                datasets: [{
                  data: versionData,
                  backgroundColor: chartStyles.ultramarineBlue,
                }],
              }}
              options={{
                legend: {
                  display: false,
                },
                layout: {
                  padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      display: true,
                      offsetGridLines: true,
                      lineWidth: 0,
                    },
                    ticks: {
                      display: true,
                      gridLines: {
                        drawTicks: false,
                      },
                      maxRotation: 90,
                    },
                    scaleLabel: {
                      display: true,
                      lineHeight: 2,
                      fontSize: chartStyles.fontSize,
                    },
                  }],
                  yAxes: [{
                    gridLines: {
                      display: true,
                      offsetGridLines: false,
                      lineWidth: 0,
                      zeroLineWidth: 1,
                      drawTicks: false,
                    },
                    ticks: {
                      padding: 15,
                      fontSize: chartStyles.fontSize,
                    },
                  }],
                },
                tooltips: {
                  callbacks: {
                    // istanbul ignore next
                    label(tooltipItem, data) {
                      return t('{{peers}} peers', { peers: data.datasets[0].data[tooltipItem.index] });
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};
export default Statistics;
