import {Component, Host, OnInit, Optional, Self} from '@angular/core';
import {ConfirmationDialogService} from '../../../core/services/confirmation-dialog.service';
import {NotifierService} from 'angular-notifier';
import {CopierService} from '../../../core/services/copier.service';
import {PrimeNGConfig} from 'primeng/api';
import {CustomerService} from '../../../core/services/customer.service';
import {Filter, Sort, TestDataRequestInterface} from '../../../core/interfaces/test.dataRequest.interface';
import {DeepCopy} from '../../../core/helpers/utils';
import {TestService123} from '../../../services/bases/test.service';
import {TestModel, TestSearchModel} from '../../../core/models/test-model';
import {ExportService} from '../../../core/services/export.service';
import {fakeData} from '../../../core/helpers/fakeData';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss'],
  providers: [CopierService]
})
export class Test2Component implements OnInit {
  breadCrumbItems: any = [];
  listOfData = [];

  totalRecords: number;
  loading: boolean;

  first = 0;

  rows = 10;

  selectedElement: TestModel[];

  listColumnNames = [];
  defaultDisplayColumn: any = [];
  isLoading = true;
  isFirstToCome = true;
  isEdit = false;

  isShowAddNewModal: boolean;
  valueFilter: TestSearchModel = new TestSearchModel({});
  testDataElement: TestModel = null;
  sort: Sort = {
    field: null,
    asc: null
  };
  pageOption = [20, 50, 100];
  filter: Filter[] = [];
  pageIndex = 1;
  pageSize = this.pageOption[1];
  overallSearch = '';

  // @ts-ignore
  constructor(private confirmationDialogService: ConfirmationDialogService, @Self() private copierService: CopierService, private notifier: NotifierService, private customerService: CustomerService, private primengConfig: PrimeNGConfig, private testService123: TestService123, private exportService: ExportService) {
  }

  ngOnInit(): void {
    // this.breadCrumbItems = [{ label: 'Test' }, { label: 'Test2', active: false }];
  }

  getData(request: TestDataRequestInterface) {
    this.isLoading = true;
    this.listOfData = [];
    this.testService123.getFakedata(request).subscribe(response => {
      // @ts-ignore
      this.listOfData = response.data;
      if (this.isFirstToCome){
        this.getColumnNames(this.listOfData);
      }
      this.totalRecords = response.total;
      this.isLoading = false;
      this.isFirstToCome = false;
      this.copierService.copyText('done !');
      this.showNotification('success', 'get data done !');
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  // async openConfirmationDialog() {
  //   try {
  //     const k = await this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?');
  //     if (k) {
  //         this.copierService.copyText('done !');
  //         this.showNotification('copy', 'success');
  //     }
  //   }catch (e) {
  //     console.log(e);
  //   }
  // }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  getColumnNames(data: any) {
    this.listColumnNames = JSON.parse(DeepCopy(Object.keys(data[0])));
    this.listColumnNames = this.listColumnNames.filter(el => el !== 'id');
    this.getDefaultDisplayColumn(this.listColumnNames);
  }

  getDefaultDisplayColumn(data: string[]) {
    this.defaultDisplayColumn = data.filter(el => !el.includes('extra'));
  }

  editRecord(data: any) {
    this.testDataElement = JSON.parse(DeepCopy(data));
    this.isShowAddNewModal = false;
    this.isEdit = true;
  }

  deleteSingleRecord(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        if (confirmed){
          this.testService123.deleteSingleRecord(id).subscribe(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    console.log(id);
  }

  sortFunction(event) {
    this.sort.field = event.sortField;
    event.sortOrder ? this.sort.asc = true : this.sort.asc = false;
    this.pageIndex = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.setParams();
}

  setParams() {
    let dataRequest: TestDataRequestInterface;
    const pageIndex = this.pageIndex;
    const pageSize = this.pageSize;
    const filter = this.filter;
    const sort = this.sort;
    const overall = this.overallSearch;
    dataRequest = {pageIndex, pageSize, filter, sort, overall};
    this.getData(dataRequest);
  }

  openNew() {
    this.testDataElement = null;
    this.isShowAddNewModal = true;
    this.isEdit = false;
  }
  onHideNew() {
    this.isShowAddNewModal = false;
    this.isEdit = false;
  }

  deleteSelectedProducts() {
    // console.log(this.selectedElement);
    const selectedId = new Set(this.selectedElement.map(el => el.id));

    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        if (confirmed) {
          this.testService123.deleteMultipleRecords(selectedId).subscribe(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    // console.log(this.setOfCheckedId.size);
  }
  onChangeColumnView(event) {
    this.defaultDisplayColumn = JSON.parse(JSON.stringify(event));
  }

  doSearch(event) {
    this.filter = [];
    Object.entries(event).forEach(el => {
      const key = el[0];
      const value = el[1];
      this.filter.push({key, value});
    });

    this.setParams();
  }

  onAddNew(): void {
    this.isShowAddNewModal = false;
    this.isEdit = false;
  }

  doExport() {
    this.exportService.exportAsExcelFile(fakeData, 'sample');
  }
}
