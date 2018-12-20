import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { CompanyService } from '../../services/company.service';
import { ConfigService } from './configuration.service';
import { API, TableAPI, TableMouseEvent } from '../../../../projects/ngx-easy-table/src/lib';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  providers: [ConfigService, CompanyService],
})
export class ContextMenuComponent implements OnInit {
  @ViewChild('phoneTpl') phoneTpl: TemplateRef<any>;
  public columns;
  public data: Company[] = [];
  public configuration;
  public readonly api = new TableAPI();
  public edit: number;

  ngOnInit(): void {
    this.configuration = ConfigService.config;
    this.columns = [
      { key: 'phone', title: 'Phone', width: '15%', cellTemplate: this.phoneTpl },
      { key: 'age', title: 'Age', width: '10%' },
      { key: 'company', title: 'Company', width: '15%' },
      { key: 'name', title: 'Name', width: '15%' },
      { key: 'isActive', title: 'STATUS', width: '15%' },
    ];
    this.data = data;
  }

  copyCell($event: any = null, object: TableMouseEvent) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(object.row);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.api.set({ type: API.rowContextMenuClicked });
  }

  editCell($event: any = null, object: TableMouseEvent) {
    this.edit = object.rowId;
    this.api.set({ type: API.rowContextMenuClicked });
  }

  update($event) {
    this.data[this.edit].phone = $event.target.value;
    this.edit = -1;
  }
}
