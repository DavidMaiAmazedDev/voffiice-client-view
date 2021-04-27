import {Component, Injector, OnInit} from '@angular/core';
import {ConfirmationDialogService} from '../../../core/services/confirmation-dialog.service';
import {TestService} from '../../../core/services/test.service';
import {TestExperimentalService} from '../../../core/services/testExperimental.service';
import {APP_CONFIG} from '../../../core/interfaces/config-token.interface';
import {TestService123} from '../../../services/bases/test.service';
import {DeepCopy} from '../../../core/helpers/utils';
import {Filter, Sort, TestDataRequestInterface} from '../../../core/interfaces/test.dataRequest.interface';
import {NzTableSortOrder} from 'ng-zorro-antd/table';
import {TestModel, TestSearchModel} from '../../../core/models/test-model';
import {ExportService} from '../../../core/services/export.service';
import {fakeData} from '../../../core/helpers/fakeData';
export function testFactory(injector: Injector): TestExperimentalService | TestService {
  return injector.get(APP_CONFIG).experimentalEnabled ? injector.get(TestExperimentalService) : injector.get(TestService);
}

// tslint:disable-next-line:class-name
export interface columnObjects {
  title: string;
  sortOrder: NzTableSortOrder | null;
}
@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss'],
  providers: [
    {
      provide: TestService ,
      useExisting: TestExperimentalService,
      multi: true
    }
  ],
})
export class Test1Component implements OnInit {
  breadCrumbItems: any = [];
  listOfData = [];
  pageOption = [20, 50, 100];
  noResult = 'ko co data';
  title = 'title table';
  footer = 'footer table';
  total;
  isLoading = true;
  isVisibleTop = false;
  isAddNew = false;
  isEdit = false;
  visibleViewMoreColumns = false;
  listColumnNames = [];
  defaultDisplayColumn: any = [];
  sortOrder = null;
  overallStringSearch = '';
  isShowModalFilter = false;
  currentX = 0;
  currentY = 0;
  containerWidth = 800;
  pageIndex = 1;
  pageSize = this.pageOption[1];
  sort: Sort = {
    field: null,
    asc: null
  };
  isFirstToCome = true;
  filter: Filter[] = [];
  testDataElement: TestModel = null;
  filterBindingValue: TestSearchModel = new TestSearchModel({});

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  // listOfCurrentPageData: ReadonlyArray<ItemData> = [];
  // listOfData: ReadonlyArray<ItemData> = [];
  setOfCheckedId = new Set<number>();
  columnObjects: columnObjects[] = [];
  // listOfColumns: ColumnItem[] = [
  //   {
  //     name: 'Name',
  //     sortOrder: null,
  //     sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
  //     listOfFilter: [
  //       { text: 'Joe', value: 'Joe' },
  //       { text: 'Jim', value: 'Jim' }
  //     ],
  //     filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
  //   },
  //   {
  //     name: 'Age',
  //     sortOrder: null,
  //     sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
  //     listOfFilter: [],
  //     filterFn: null
  //   },
  //   {
  //     name: 'Address',
  //     sortFn: null,
  //     sortOrder: null,
  //     listOfFilter: [
  //       { text: 'London', value: 'London' },
  //       { text: 'Sidney', value: 'Sidney' }
  //     ],
  //     filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1
  //   }
  // ];
  constructor(private confirmationDialogService: ConfirmationDialogService, private testService: TestService, private testService123: TestService123, private exportService: ExportService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Test' }, { label: 'Test1', active: false }];
    this.setParams();
  }

  openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => console.log('User confirmed:', confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
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
      this.total = response.total;
      this.isLoading = false;
      this.isFirstToCome = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }
getColumnNames(data: any) {
    // this.columnObjects = [];
    // JSON.parse(DeepCopy(Object.keys(data[0]))).forEach(el => {
    //   const title = el;
    //   const sortOrder = null;
    //   this.columnObjects.push({title, sortOrder});
    // });
    // this.columnObjects = this.columnObjects.filter(el => el.title !== 'id');
    // this.listColumnNames = JSON.parse(DeepCopy(Object.keys(data[0])));
    // this.listColumnNames = this.listColumnNames.filter(el => el !== 'id');
    // this.getDefaultDisplayColumn(this.columnObjects);
    this.listColumnNames = JSON.parse(DeepCopy(Object.keys(data[0])));
    this.listColumnNames = this.listColumnNames.filter(el => el !== 'id');
    this.getDefaultDisplayColumn(this.listColumnNames);
}

getDefaultDisplayColumn(data: string[]) {
    // this.defaultDisplayColumn = this.listColumnNames.filter(el => !el.includes('extra'));
  this.defaultDisplayColumn = data.filter(el => !el.includes('extra'));
  // console.log(this.defaultDisplayColumn);
}

setParams() {
     this.setOfCheckedId = new Set<number>(null);
     this.checked = false;
     let dataRequest: TestDataRequestInterface;
     const pageIndex = this.pageIndex;
     const pageSize = this.pageSize;
     const filter = this.filter;
     const sort = this.sort;
     const overall = this.overallStringSearch;
     dataRequest = {pageIndex, pageSize, filter, sort, overall};
     console.log(dataRequest);
     this.getData(dataRequest);
}


 // callApi(e) {
 //    console.log(e);
 //    this.setOfCheckedId = new Set<number>(null);
 //    this.checked = false;
 //    let dataRequest: TestDataRequestInterface;
 //    this.pageIndex = e.pageIndex;
 //    this.pageSize = e.pageSize;
 //    const pageIndex = e.pageIndex;
 //    const pageSize = e.pageSize;
 //    const filter = e.filter;
 //    const sort = e.sort;
 //    dataRequest = {pageIndex, pageSize, filter, sort};
 //    this.getData(dataRequest);
 //  }

  editRecord(data) {
    console.log(data);
    this.testDataElement = JSON.parse(DeepCopy(data));
    console.log(this.testDataElement);
    this.isAddNew = false;
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
  }

  deleteMultipleRecord() {
    if (this.setOfCheckedId.size === 0) { return; }
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        if (confirmed) {
          this.testService123.deleteMultipleRecords(this.setOfCheckedId).subscribe(response => {
            console.log(response);
            this.checked = false;
            this.indeterminate = false;
          }, error => {
            console.log(error);
          });
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    // console.log(this.setOfCheckedId.size);
  }

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalAddNew(): void {
    this.testDataElement = null;
    this.isAddNew = true;
    this.isEdit = false;
  }

  handleOkTop(): void {
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }

  onAddNew(event: TestModel): void {
    console.log(event);
    this.isAddNew = false;
  }

  hideModalAddNew(): void {
    this.isAddNew = false;
    this.isEdit = false;
  }

  clickMe(): void {
    this.visibleViewMoreColumns = false;
  }

  change(value: boolean): void {
    // console.log(value);
  }
  overallSearch() {
    this.setParams();
  }

  isCurrentColumnDisplay(columnName: string) {
    if (this.listColumnNames.indexOf(columnName) === -1) {
      return false;
    } else {
      return true;
    }
  }

  displayColumn(listChecked: any) {
    // this.listColumnNames = JSON.parse(DeepCopy(listChecked));
    this.defaultDisplayColumn = JSON.parse(DeepCopy(listChecked));
    console.log(listChecked);
  }

  showModalFilter(event) {
    this.currentX = event.clientX;
    this.currentY = event.clientY;
    this.isShowModalFilter = true;
  }

  hideFilterModal() {
    this.isShowModalFilter = false;
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  // onCurrentPageDataChange($event: ReadonlyArray<ItemData>): void {
  //   this.listOfCurrentPageData = $event;
  //   this.refreshCheckedStatus();
  // }

  refreshCheckedStatus(): void {
    this.checked = this.listOfData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  onToggleSort(name: string) {
    const { field, asc } = this.sort;
    this.sort = {
      field: name,
      asc: field === name ? !asc : true,
    };
  }

  pageIndexChange(e){
    this.pageIndex = e;
    this.setParams();
  }

  pageSizeChange(e) {
    this.pageSize = e;
    this.setParams();
  }
  SortOrderChange(colName, e) {
    const field = colName;
    const asc = e;
    this.sort = {field, asc};
    this.setParams();
  }

  filterChange() {
    console.log('filter changed');
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

  onHideFilterModal() {
    this.isShowModalFilter = false;
  }
  doExport() {
    console.log('export');
    this.exportService.exportAsExcelFile(fakeData, 'sample');
  }
}
