export class Order {
    key: string;
    ordername: string; // => jordan
    store: string; // => nordstrom
    trackingNumber: string;
    serviceImg: String;
    service: String; // => fedex
    currentLocation: String; // => somewhere
    status: String; // => departed
    deliveryDate: String; // => date, evening/afternoon/moring;
    timeStamp: Number;
    active: boolean = true;
    archived: boolean = false;
    eta: String;
}
