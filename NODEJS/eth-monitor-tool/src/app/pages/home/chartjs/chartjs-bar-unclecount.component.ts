import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { Socket } from 'ng-socket-io';
import * as _ from 'lodash';

@Component({
  selector: 'app-chartjs-unclecount',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarUncleCountComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  avgBlockTime = 0;
  message: any;

  constructor(private theme: NbThemeService, private socket: Socket) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        datasets: [{
          data: this.avgBlockTime,
          label: 'UncleCount',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }, {
          data: [28, 48, 40, 19, 86, 27, 50],
          label: 'Series B',
          backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });

    socket.on('open', function open() {
      socket.emit('ready');
      this.message = 'ready';
    });
    socket.on('end', function end() {
      this.message = 'end';
    });
    socket.on('error', function error(err) {
      this.message = 'error';
    });
    socket.on('reconnecting', function reconnecting(opts) {
      this.message = 'reconnecting';
    });
    socket.on('data', function incoming(data) {
      this.message = 'data';
    });
    socket.on('data', function incoming(data) {
      socketAction(data.action, data.data);
    });
    socket.on('init', function(data) {
      socketAction('init', data.nodes);
    });
    function socketAction(action, data) {
       data = xssFilter(data);
       switch (action) {
        case 'charts':
        if (!_.isEqual(this.avgBlockTime, data.avgBlocktime) ) {
          this.avgBlockTime = data.avgBlocktime;
        } break;
       }
    }
    function xssFilter(obj) {
      if (_.isArray(obj)) {
        return _.map(obj, xssFilter);

      } else if (_.isObject(obj)) {
        return _.mapValues(obj, xssFilter);

      } else if (_.isString(obj)) {
        return obj.replace(/\< *\/* *script *>*/gi, '').replace(/javascript/gi, '');
      } else
        return obj;
    }
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
