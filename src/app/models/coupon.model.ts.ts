export class Coupon {
    id: string;
    price: number;
    url: string;
    start: string;
    end: string;
    course_name: string;
    dateStart: Date;
    dateEnd: Date;
    code: string;
    author: string

    constructor(id?: string, price?: number, url?: string,
        dateStart?: Date, dateEnd?: Date, code?: string, course_name?: string, author?: string) {
        this.id = id;
        this.course_name = course_name;
        this.price = price;
        this.url = url;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.code = code;
        this.author = author;
    }

}
