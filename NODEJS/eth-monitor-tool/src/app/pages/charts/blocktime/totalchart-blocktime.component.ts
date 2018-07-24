import { PagesComponent } from './../../pages.component';
import { Component, OnDestroy, OnInit, enableProdMode } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
// import 'chartjs-plugin-zoom';
@Component({
  selector: 'app-totalchart-blocktime',
  styleUrls: ['./totalchart-blocktime.component.scss'],
  templateUrl: './totalchart-blocktime.component.html',
})
export class TotalChartBlockTimeComponent implements OnDestroy, OnInit {
  data: any;
  options: any;
  blocknumber: any[];
  themeSubscription: any;
  message: any;
  ChartData: any;
  public ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
        this.data = {
          labels: ['', '', '', '', '', '', '', '', '', '',
                   '', '', '', '', '', '', '', '', '', '',
                   '', '', '', '', '', '', '', '', '', '',
                   '', '', '', '', '', '', '', '', '', ''],
          datasets: [{
            data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
              backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
              borderColor: colors.danger,
          }],
        };
      });
    // this.service.request();
  }

  public RefreshChart(blocknumber, array) {
     this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
        this.data = {
          labels: blocknumber,
          datasets: [{
            data: array,
            backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
            borderColor: colors.danger,
          }],
        };
      });
  }

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const chartjs: any = config.variables.chartjs;
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: false,
          fontColor: chartjs.textColor,
          reverse: true,
        },
        animation: false,
        pen: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          drag: true,
          enabled: true,
          mode: 'xy',
        },
        scales: {
          xAxes: [
            {
              stacted: true,
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                callback: function(value, index, values) {
                  return null;
              },
                fontColor: chartjs.textColor,
                fontsize: 1,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                callback: function(value, index, values) {
                  return value / 1000;
              },
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
