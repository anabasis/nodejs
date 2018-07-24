import { ChartjsBlockPropagationComponent } from './chartjs-blockpropagation/chartjs-blockpropagation.component';
import { ChartjsBlockTimeComponent } from './chartjs-blocktime/chartjs-blocktime.component';
import { ChartjsGaslimitComponent } from './chartjs-gaslimit/chartjs-gaslimit.component';
import { ChartjsGasspendingComponent } from './chartjs-gasspending/chartjs-gasspending.component';
import { ChartjsTransactionComponent } from './chartjs-transactions/chartjs-transaction.component';
import { ChartjsUnclecountComponent } from './chartjs-unclecount/chartjs-unclecount.component';
import { ChartjsDifficultyComponent } from './chartjs-difficulty/chartjs-difficulty.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../../@core/data/list.service';
import { AvgBlockTimeComponent } from './top-avgblocktime/avgblocktime.component';
import { LastblockComponent } from './top-lastblock/lastblock.component';
import { LatestComponent } from './top-latest/latest.component';
import { UnclesComponent } from './top-uncles/uncles.component';
import { StatelistComponent } from './statelist/statelist.component';
import { PendingComponent } from './top-pending/pending.component';

@Component({
  selector: 'app-home2',
  styleUrls: ['./home2.component.scss'],
  templateUrl: './home2.component.html',
})
export class Home2Component implements OnInit {

  @ViewChild(LatestComponent) _panelLatestBlock: LatestComponent;


  @ViewChild(ChartjsGaslimitComponent) _chartGasLimit: ChartjsGaslimitComponent;
  @ViewChild(ChartjsGasspendingComponent) _chartGasSpending: ChartjsGasspendingComponent;
  @ViewChild(ChartjsBlockTimeComponent) _chartBlockTime: ChartjsBlockTimeComponent;
  @ViewChild(ChartjsTransactionComponent) _chartTransaction: ChartjsTransactionComponent;
  @ViewChild(ChartjsUnclecountComponent) _chartUncleCount: ChartjsUnclecountComponent;
  @ViewChild(ChartjsBlockTimeComponent) _chartBlocktTime: ChartjsBlockTimeComponent;
  @ViewChild(ChartjsDifficultyComponent) _chartDifficulty: ChartjsDifficultyComponent;
  @ViewChild(AvgBlockTimeComponent) _panelAvgBlockTime: AvgBlockTimeComponent;
  @ViewChild(LastblockComponent) _panelLastBlockTime: LastblockComponent;
  @ViewChild(StatelistComponent) _tablePending: StatelistComponent;
  @ViewChild(PendingComponent) _panelPending: PendingComponent;
  constructor(private service: ListService) {
  }
  ngOnInit() {
    this.service.setCallBack((data) => {
      // this._chartBlocktTime.RefreshChart(data.blockTime);
      this._chartGasLimit.RefreshChart(data.height, data.gasLimit);
      this._chartGasSpending.RefreshChart(data.height, data.gasSpending);
      this._chartTransaction.RefreshChart(data.height, data.transactions);
      this._chartUncleCount.RefreshChart(data.uncles);
      this._chartDifficulty.RefreshChart(data.height, data.difficulty);
      this._chartBlockTime.RefreshChart(data.height, data.blocktime);
      this._panelAvgBlockTime.RefreshData(data.avgBlocktime);
      this._panelLastBlockTime.RefreshData();

    });
    // this.service.setCallBack_latest((data) => {
    //   this._panelLatestBlock.RefreshData(data);
    // });
  this.service.setCallBack_block((data) => {
      this._panelLatestBlock.RefreshData(data.block['number']);
    });
  this.service.setCallBack_PendingTx((data) => {
    this._tablePending.RefreshTable(data.Pending);
    this._panelPending.RefreshData(data.count);
  });
    this.service.request();
  }
}
