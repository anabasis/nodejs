import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-avgblocktime',
  templateUrl: './avgblocktime.component.html',
  styleUrls: ['./avgblocktime.component.scss'],
})
export class AvgBlockTimeComponent implements OnInit {
  avgTime: number;
  constructor() {
  }

  ngOnInit(): void {
    // this.service.request();
  }

  public RefreshData(data) {
    this.avgTime = data;
  }

}
