import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  data: any[] = [];
  page = 1;
  pageSize = 5;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetch((data) => {
      this.data = data;
    });
  }

  get rows() {
    const start = (this.page - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  onPageChanged() {
    // need to tell Angular our 'row' property changed
    this.cd.markForCheck();
  }

  toggleRow(row: any) {
    row.isExpanded = !row.isExpanded;
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
