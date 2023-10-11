import BookingCompleted from './BookingCompleted';

export default class BookingEvent {
  id!: string;
  partitionKey!: string;
  timestamp!: number;
  type!: string;
  booking_completed!: BookingCompleted;

  constructor(init: Partial<BookingEvent>) {
    Object.assign(this, init);

    if (init.booking_completed) {
      this.booking_completed = new BookingCompleted(init.booking_completed);
    }
  }
}
