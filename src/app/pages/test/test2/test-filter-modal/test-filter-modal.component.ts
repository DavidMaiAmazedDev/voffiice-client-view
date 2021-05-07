import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TestSearchModel } from '../../../../core/models/test-model';

@Component({
  selector: 'app-test-filter-modal',
  templateUrl: './test-filter-modal.component.html',
  styleUrls: ['./test-filter-modal.component.scss'],
})
export class TestFilterModalComponent implements OnInit {
  constructor() {}
  items: MenuItem[];
  menuItems = [
    { name: 'done', active: true },
    { name: 'complete', active: false },
    { name: 'hybrid', active: false },
    { name: 'full', active: false },
  ];
  @Input() valueFilter: TestSearchModel;
  @Output() searchRequest = new EventEmitter<TestSearchModel>();
  @ViewChild('op') inputElement: any;

  ngOnInit(): void {
    this.valueFilter.name = 'messi';
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.inputElement.hide();
  }

  getMenuItem(item) {
    console.log(item);
    item.active = true;
    this.menuItems.map((el) => {
      if (el.name !== item.name) {
        el.active = false;
      }
    });
    switch (item.name) {
      case 'done':
        this.valueFilter.name = 'messi';
        break;
      case 'complete':
        this.valueFilter.age = 20;
        break;
      case 'hybird':
        this.valueFilter.dob = new Date();
        break;
      case 'full':
        this.valueFilter.job = 'doctor';
        break;
    }
  }

  search() {
    this.searchRequest.emit(this.valueFilter);
  }
}
