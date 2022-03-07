import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Logger } from 'src/app/helper/logger.service';
import { mock_Files } from '../../../mock/mock-files-list';
import { FilesList } from '../../../interface/files-list'

const logger = new Logger('files-list.component')

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {
  displayedColumns: string[] = ['No', 'fileNo', 'type', 'name', 'dateOfTransaction', 'dateOfRequest', 'amount', 'remark', 'status'];
  dataSource!: MatTableDataSource<FilesList>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  faSearch = faSearch
  faCircle = faCircle
  selectedType = ''
  startDate = ''
  endDate = ''
  typeofFile = [
    { id: 1, name: 'ทั้งหมด', value: '' },
    { id: 2, name: 'เบิกค่าใช้จ่าย', value: 'เบิกค่าใช้จ่าย' },
    { id: 3, name: 'ลางาน', value: 'ลางาน' }
  ]
  pageSize = 10;
  pageSizeOptions = [10, 20, 30, 50, 100]
  currentPage = 0;

  constructor() {
    this.dataSource = new MatTableDataSource(mock_Files);
    // filter search
    this.dataSource.filterPredicate = (data, filter) => {
      let createDate = new Date(data.dateOfTransaction)
      if (this.selectedType === '' && this.startDate && this.endDate) {
        return new Date(createDate.setHours(0, 0, 0)) >= new Date(this.startDate) && new Date(createDate.setHours(0, 0, 0)) <= new Date(this.endDate);
      } else if (this.selectedType !== '' && this.startDate && this.endDate) {
        return data.type === this.selectedType && new Date(createDate.setHours(0, 0, 0)) >= new Date(this.startDate) && new Date(createDate.setHours(0, 0, 0)) <= new Date(this.endDate);
      }
      return true;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    this.dataSource.filter = '' + Math.random();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  transformToThaiDate(d: string) {
    const date = new Date(d)
    const result = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    return result
  }

  displayDateRange(sdate: string, edate: string = '') {
    const start = new Date(sdate)
    const end = new Date(edate)
    let result = ''
    if (edate === '') {
      result = start.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    } else {
      result = `${start.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })} - ${end.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })}`
    }
    return result
  }

  getAmount(value: any) {
    let float = ''
    let suffix = ''
    if (value.type === 'เบิกค่าใช้จ่าย') {
      float = parseFloat(value.amount).toFixed(2)
      suffix = 'บาท'
    } else if (value.type === 'ลางาน') {
      float = `${parseFloat(value.amount).toFixed(2)}`
      suffix = 'วัน'
    }
    return `${float} ${suffix}`
  }

  setCurrentPage(event: any) {
    this.currentPage = event.pageIndex
  }
}
