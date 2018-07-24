import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-lastblock',
  styleUrls: ['./lastblock.component.scss'],
  templateUrl: './lastblock.component.html',
})
export class LastblockComponent implements OnInit {
  Timegap: number;
  constructor() {
  }

  ngOnInit(): void {
    const timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      this.tickTime(t);
    });
  }
  public tickTime(t) {
    this.Timegap++;
  }

  public RefreshData() {
    this.Timegap = 0;
  }
}
