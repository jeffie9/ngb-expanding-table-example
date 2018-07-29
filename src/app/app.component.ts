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
  columnOrder = new Map<string, boolean>();

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

  sortColumn(id: string) {
    if (this.columnOrder.has(id)) {
      this.columnOrder.set(id, !this.columnOrder.get(id));
    } else {
      this.columnOrder.set(id, true);
    }

    const order = this.columnOrder.get(id) ? 1 : -1;

    this.data.sort((a, b) => {
      if (a[id] < b[id]) {
        return order * -1;
      } else if (a[id] > b[id]) {
        return order;
      }
      return 0;
    });

    this.cd.markForCheck();
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
