import { Coupon } from './coupon.model.ts';

export class Course {
    id: string;
    name: string;
    img: string;
    coupons: Coupon[];
    description?: string

    constructor(id?: string, name?: string, img?: string, coupons?: Coupon[], description?: string) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.coupons = coupons;
        this.description = description;
    }

}
