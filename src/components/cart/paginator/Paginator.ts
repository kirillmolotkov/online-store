import { IbasketItem, IproductItem } from '../../../types/interfaces';
class PaginationHelper {
  items: IbasketItem[];
  itemsPerPage: number;
  constructor(collection: IbasketItem[], itemsPerPage: number) {
    this.items = collection;
    this.itemsPerPage = itemsPerPage;
  }
  public itemCount() {
    return this.items.length;
  }
  public pageCount() {
    console.log('length ' +this.items.length)
    console.log('Items per page  ' +this.itemsPerPage)
    return Math.ceil(this.items.length / this.itemsPerPage);
  }
  public pageItemCount(pageIndex: number): number {
    let pages = this.pageCount();
    if (pageIndex >= pages || pageIndex < 0) return -1;
    if (pageIndex < pages - 1) return this.itemsPerPage;
    return this.items.length - (pages - 1) * this.itemsPerPage;
  }
  public pageIndex(itemIndex: number): number {
    let pages = this.pageCount();
    if (itemIndex >= this.items.length || itemIndex < 0 || this.items.length <= 0) return -1;
    return Math.floor(itemIndex / this.itemsPerPage);
  }
}

export default PaginationHelper;