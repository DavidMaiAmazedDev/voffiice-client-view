import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-page',
  templateUrl: './private-page.component.html',
  styleUrls: ['./private-page.component.scss']
})
export class PrivatePageComponent implements OnInit {
  breadCrumbItems: any = [];
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Private Page' }];
  }

}
