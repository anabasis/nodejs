import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  pendingCount: number;
  constructor() {
  }

  ngOnInit(): void {
    // this.service.request();
  }

  public RefreshData(data) {
    this.pendingCount = data;
  }
}

