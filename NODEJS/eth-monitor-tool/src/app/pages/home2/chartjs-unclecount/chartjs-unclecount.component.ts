import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
@Component({
  selector: 'app-chartjs-unclecount',
  styleUrls: ['./chartjs-unclecount.component.scss'],
  templateUrl: './chartjs-unclecount.component.html',
})
export class ChartjsUnclecountComponent implements OnDestroy, OnInit {
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
            backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
          }],
        };
      });
    // this.service.request();
  }

  public RefreshChart(array) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
        this.data = {
          labels: ['', '', '', '', '', '', '', '', '', '',
                   '', '', '', '', '', '', '', '', '', '',
                   '', '', '', '', '', '', '', '', '', '',
                   '', '', '', '', '', '', '', '', '', ''],
          datasets: [{
            data: array,
            backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
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
                fontColor: chartjs.textColor,
              },
              min: 0,
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
