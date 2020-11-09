import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, of as observableOf, merge } from 'rxjs';


export interface MainTableItem {
  title: string;
  varenummer: number;
  placering: string;
  pris: number;
  antal: number;
  status: string;
}


const EXAMPLE_DATA: MainTableItem[] = [
  {title: 'Opel Karl', varenummer: 1, placering: 'Hal 3, Gang 2, hylde 5,', pris: 120000, antal: 2, status: 'paa lager'},
  {title: 'Opel astra', varenummer: 2, placering: 'Hal 4, Gang 3, hylde 5,', pris: 320000, antal: 1, status: 'paa lager'},
  {title: 'Fodbold', varenummer: 3, placering: 'Hal 1, Gang 2, hylde 1,', pris: 120, antal: 6, status: 'paa lager'},
  {title: 'Huawei P30 Pro', varenummer: 4, placering: 'Hal 1, Gang 1, hylde 1,', pris: 3000, antal: 2, status: 'paa lager'},
  {title: 'Huawei P40 Pro', varenummer: 5, placering: 'Hal 5, Gang 2, hylde 5,', pris: 7000, antal: 2, status: 'paa lager'},
  {title: 'Sko', varenummer: 7, placering: 'Hal 3, Gang 2, hylde 5,', pris: 1400, antal: 2, status: 'paa lager'},
  {title: 'Sko', varenummer: 8, placering: 'Hal 3, Gang 2, hylde 5,', pris: 1500, antal: 5, status: 'paa lager'},
  {title: 'Bukser', varenummer: 9, placering: 'Hal 5, Gang 2, hylde 4,', pris: 500, antal: 2, status: 'ikke paa lager'},
  {title: 'Briller', varenummer: 10, placering: 'Hal 1, Gang 5, hylde 2,', pris: 1200, antal: 6, status: 'ikke paa lager'},
  {title: 'kager', varenummer: 11, placering: 'Hal 1, Gang 9, hylde 2,', pris: 20, antal: 9, status: 'ikke paa lager'},
];

/**
 * Data source for the MainTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MainTableDataSource extends DataSource<MainTableItem> {
  data: MainTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MainTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MainTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MainTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'varenummer': return compare(a.varenummer, b.varenummer, isAsc);
        case 'placering': return compare(a.placering, b.placering, isAsc);
        case 'pris': return compare(a.pris, b.pris, isAsc);
        case 'antal': return compare(a.antal, b.antal, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
