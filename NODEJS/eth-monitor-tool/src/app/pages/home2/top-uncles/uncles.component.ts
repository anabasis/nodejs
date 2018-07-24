import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-uncles',
  templateUrl: './uncles.component.html',
  styleUrls: ['./uncles.component.scss'],
})
export class UnclesComponent implements OnInit {
  uncles: number;
  constructor() {
  }

  ngOnInit(): void {
    // this.service.request();
  }

  public RefreshData(data) {
    this.uncles = data;
  }
}
