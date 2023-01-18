import { IbasketItem } from '../../../types/interfaces';
class PaginationHelper {
  items: IbasketItem[];

  itemsPerPage: number;

  constructor(collection: IbasketItem[], itemsPerPage: number) {
    this.items = collection;
    this.itemsPerPage = itemsPerPage;
  }

  public pageCount(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }
}

export default PaginationHelper;
