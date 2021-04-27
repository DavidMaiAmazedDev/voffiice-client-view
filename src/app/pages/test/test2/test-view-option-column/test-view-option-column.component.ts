import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DeepCopy} from '../../../../core/helpers/utils';

@Component({
  selector: 'app-test-view-option-column',
  templateUrl: './test-view-option-column.component.html',
  styleUrls: ['./test-view-option-column.component.scss']
})
export class TestViewOptionColumnComponent implements OnInit {

  @Input() listColumnNames: string[];
  @Input() defaultDisplayColumn: string[];
  @Output() changeColumnViews = new EventEmitter<string[]>();
  selectedColumns: string[];
  isFirstToCome = true;
  @ViewChild('op') inputElement: any;
  constructor() { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.inputElement.hide();
  }

  ngOnInit(): void {
    this.getDefaultDisplayColumn(this.listColumnNames);
  }

  getDefaultDisplayColumn(data: string[]) {
    if (this.isFirstToCome){
      this.selectedColumns = JSON.parse(DeepCopy(this.defaultDisplayColumn));
    } else {
      this.isFirstToCome = false;
    }
  }

  upDateColumnViews() {
    this.changeColumnViews.emit(this.selectedColumns);
  }

}
