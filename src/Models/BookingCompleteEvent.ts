export default class BookingCompleteEvent {
  product_order_id_buyer!: number; // A unique reference ID for the buyer's order
  timestamp!: string; // A timestamp describing when the event occurred, in ISO 8601 format
  product_provider_buyer!: string; // The seller providing the product

  constructor(init: BookingCompleteEvent) {
    this.product_order_id_buyer = init.product_order_id_buyer;
    this.timestamp = init.timestamp;
    this.product_provider_buyer = init.product_provider_buyer;
  }
}
