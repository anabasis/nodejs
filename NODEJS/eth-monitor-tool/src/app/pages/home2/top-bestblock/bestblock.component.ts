import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../@core/data/list.service';
@Component({
  selector: 'app-bestblock',
  templateUrl: './bestblock.component.html',
  styleUrls: ['./bestblock.component.scss'],
})
export class BestblockComponent implements OnInit {
  bestblock: any;
  constructor(private service: ListService) {
  }

  ngOnInit(): void {
    // this.service.request();
    this.bestblock = this.service.getBest();
  }

}
