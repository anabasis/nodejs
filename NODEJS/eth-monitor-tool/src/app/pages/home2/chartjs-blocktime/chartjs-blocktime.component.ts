import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ListService } from '../../../@core/data/list.service';
@Component({
  selector: 'app-chartjs-blocktime',
  styleUrls: ['./chartjs-blocktime.component.scss'],
  templateUrl: './chartjs-blocktime.component.html',
})
export class ChartjsBlockTimeComponent implements OnDestroy, OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  message: any;
  ChartData: any;
  ChartColor: any;
  xAxislabel: any;
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
            // backgroundColor: colors.danger,
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
          labels: blocknumber,
          datasets: [{
            data: array,
            backgroundColor: this.GetBlockColor(colors, array),
          }],
        };

      });
  }

  public GetBlockColor(colors, data) {
    this.ChartColor = [];
    for (let i = 0; i < data.length ; i++) {
      if ( data[i] <= 20 ) {
        this.ChartColor[i] = colors.success;
      } else if ( data[i] > 20 && data[i] <= 50 ) {
        this.ChartColor[i] = colors.warning;
      } else {
        this.ChartColor[i] = colors.danger;
      }
    }
    return this.ChartColor;
  }

  constructor(private theme: NbThemeService, private service: ListService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const chartjs: any = config.variables.chartjs;
      this.options = {

        // tooltips: {
        //   enable: true,
        //   mode: 'single',
        //         callbacks: {
        //             label: function(tooltipItems, data) {
        //                 return tooltipItems.index;
        //             },
        //         },
        // },
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
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
                reverse : true,
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
                autoSkip: false,
                fontColor: chartjs.textColor,
                min: 0,
                max: 60,
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
