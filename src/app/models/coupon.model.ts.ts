export class Coupon {
    id: string;
    price: number;
    urlComplete: string;
    urlCourse: string;
    start: string;
    end: string;
    course_name: string;
    dateStart: Date;
    dateEnd: Date;
    code: string;
    author: string;
    user: string;
    platform: string;

    constructor(id?: string, price?: number, urlComplete?: string, urlCourse?: string,
        dateStart?: Date, dateEnd?: Date, code?: string, 
        course_name?: string, author?: string, user?: string, platform?: string) {
        this.id = id;
        this.course_name = course_name;
        this.price = price;
        this.urlComplete = urlComplete;
        this.urlCourse = urlCourse;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.code = code;
        this.author = author;
        this.user = user;
        this.platform = platform;
    }

}
