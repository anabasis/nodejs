import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  latestblocknumber: number;
  constructor() {
  }

  ngOnInit(): void {
    // this.service.request();
  }

  public RefreshData(data) {
    this.latestblocknumber = data;
  }
}
