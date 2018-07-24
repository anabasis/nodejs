import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ListService } from '../../../@core/data/list.service';
@Component({
  selector: 'app-chartjs-blockpropagation',
  styleUrls: ['./chartjs-blockpropagation.component.scss'],
  templateUrl: './chartjs-blockpropagation.component.html',
})
export class ChartjsBlockPropagationComponent implements OnDestroy, OnInit {
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
           data: this.service.getblockpropagation(),
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

  constructor(private theme: NbThemeService, private service: ListService) {
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
