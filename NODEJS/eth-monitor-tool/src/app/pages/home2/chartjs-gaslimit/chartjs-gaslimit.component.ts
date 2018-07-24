import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
@Component({
  selector: 'app-chartjs-gaslimit',
  styleUrls: ['./chartjs-gaslimit.component.scss'],
  templateUrl: './chartjs-gaslimit.component.html',
})
export class ChartjsGaslimitComponent implements OnDestroy, OnInit {
  data: any;
  options: any;
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
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
          }],
        };
      });
    // this.service.request();
  }

  public RefreshChart(blocknumber, array) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
        this.data = {
          labels: ['', '', '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '', '', ''],
          datasets: [{
            data: array,
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
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
        },
        animation: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                callback: function(value, index, values) {
                  return null;
              },
                fontColor: chartjs.textColor,
                reverse: false,
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
                  return Math.floor(value / 1000);
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
