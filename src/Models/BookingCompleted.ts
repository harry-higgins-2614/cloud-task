export default class BookingCompleted {
  timestamp!: number;
  product_provider!: string;
  orderId!: number;

  constructor(init: Partial<BookingCompleted>) {
    Object.assign(this, init);
  }
}
