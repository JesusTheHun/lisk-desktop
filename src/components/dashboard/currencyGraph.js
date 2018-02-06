import { Line as LineChart, Chart } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import moment from 'moment';
import React from 'react';
import explorerApi from '../../utils/api/explorer';

import styles from './currencyGraph.css';

const bottomPadding = 15;

const chartOptions = {
  maintainAspectRatio: false,
  gridLines: {
    display: false,
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        displayFormats: {
          minute: 'H:mm',
        },
      },
      distribution: 'linear',
      ticks: {
        fontColor: '#204F9F',
        fontSize: 14,
        fontFamily: '\'Open Sans\', sans-serif',
      },
      gridLines: {
        display: false,
      },
    }],
    yAxes: [{
      display: false,
      gridLines: {
        display: false,
      },
    }],
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 80,
      bottom: bottomPadding,
    },
  },
  elements: {
    point: {
      backgroundColor: '#C80039',
      radius: 0,
      hoverRadius: 8,
      hitRadius: 40,
    },
  },
  tooltips: {
    callbacks: {
      title(tooltipItem) {
        return `BTC ${tooltipItem[0].yLabel}`;
      },
      label(tooltipItem) {
        return moment(tooltipItem.xLabel).format('DD MMM             HH:mm:ss').replace(' 0', '  ');
      },
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    titleFontSize: 18,
    titleFontColor: '#0000',
    bodyFontColor: '#74869B',
    bodyFontSize: 12,
    displayColors: false,
    xPadding: 16,
    yPadding: 18,
    titleFontFamily: 'gilroy',
    titleSpacing: 12,
    titleMarginBottom: 12,
    cornerRadius: 0,
    caretSize: 15,
  },
};

const getGradient = (ctx) => {
  const gradient = ctx.createLinearGradient(0, 0, 800, 0);
  gradient.addColorStop(0, '#004AFF');
  gradient.addColorStop(0.5, '#57AFFF');
  gradient.addColorStop(1, '#93F4FE');
  return gradient;
};

const chartData = (data, canvas) => {
  const ctx = canvas.getContext('2d');
  const gradient = getGradient(ctx);

  return {
    datasets: [{
      data,
      backgroundColor: gradient,
      borderColor: gradient,
      borderWidth: 0,
    }],
  };
};

const drawGradientRectangle = (chartInstance, { bottomPosition, height }) => {
  const { ctx } = chartInstance.chart;
  const gradient = getGradient(ctx);

  ctx.fillStyle = gradient;
  ctx.fillRect(
    0, chartInstance.chart.height - bottomPosition,
    chartInstance.chart.width, height,
  );
};

class CurrencyGraph extends React.Component {
  constructor() {
    super();
    this.state = {};
    explorerApi.getCurrencyGrapData('hour').then((data) => {
      this.setState({ data });
    }).catch((error) => {
      this.setState({ error });
    });
  }

  render() {
    Chart.pluginService.register({
      beforeDraw(chartInstance) {
        drawGradientRectangle(chartInstance, {
          bottomPosition: bottomPadding + 35,
          height: 50,
        });
      },
      afterDraw(chartInstance) {
        drawGradientRectangle(chartInstance, {
          bottomPosition: bottomPadding + 32,
          height: 5,
        });
      },
    });

    return (
      <div className={`${styles.wrapper}`} >
        <h2>{this.props.t('LSK/BTC')}</h2>
        <div className={`${styles.chartWrapper}`} >
          {this.state.data ?
            <LineChart data={chartData.bind(null, this.state.data)} options={chartOptions}/> :
            null}
          {this.state.error ?
            <div className={`${styles.errorMessage}`} >{this.props.t('Loading price data failed.')}</div> :
            null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: [...state.transactions.pending, ...state.transactions.confirmed].slice(0, 3),
});

export default connect(mapStateToProps)(translate()(CurrencyGraph));
