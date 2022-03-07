import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
    constructor() {
        super();

        this.InitCustomPaginator();
    }

    InitCustomPaginator() {
        this.itemsPerPageLabel = "จำนวนต่อหน้า";
        this.nextPageLabel = "ต่อไป";
        this.previousPageLabel = "ก่อนหน้า";
        this.firstPageLabel = "หน้าแรก";
        this.lastPageLabel = "หน้าสุดท้าย";
        this.changes.next();
    }

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} / ${length}`;
    }
}