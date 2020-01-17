export class Coupon {
    id: string;
    price: number;
    url: string;
    start: string;
    end: string;
    dateStart: Date;
    dateEnd: Date;
    code: string;
    
    constructor(id?: string, price?: number, url?: string,
        dateStart?: Date, dateEnd?: Date, code?: string) {
        this.id = id;
        this.price = price;
        this.url = url;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.code = code;
    }

}
