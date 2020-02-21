import { DdrConfigurationService } from 'ddr-configuration';
import { IFilter } from './../../models/filter';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ddr-filter-coupons',
  templateUrl: './filter-coupons.component.html',
  styleUrls: ['./filter-coupons.component.css']
})
export class FilterCouponsComponent implements OnInit {

  @Input()

  author: string;

  @Output()
  filter: EventEmitter<IFilter>;

  public filterProp: IFilter;
  public localeES: any;
  public platforms: any[];

  constructor(
    private config: DdrConfigurationService
  ) {

    this.platforms = this.config.getData('platforms');

    this.filter = new EventEmitter<IFilter>();

    this.localeES = {
      firstDayOfWeek: 1,
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

  }

  ngOnInit() {

    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    let nextMonth = new Date();
    nextMonth.setTime(nextMonth.getTime() + (1000 * 60 * 60 * 24 * 30))
    nextMonth.setHours(23);
    nextMonth.setMinutes(59);
    nextMonth.setSeconds(59);

    this.filterProp = {
      start: today,
      end: nextMonth,
      name: '',
      author: this.author ? this.author : '',
      platform: this.platforms[0].display
    }

    this.sendFilter();

  }

  sendFilter() {

    this.filterProp.start.setHours(0);
    this.filterProp.start.setMinutes(0);
    this.filterProp.start.setSeconds(0);

    this.filterProp.end.setHours(23);
    this.filterProp.end.setMinutes(59);
    this.filterProp.end.setSeconds(59);

    this.filter.emit(this.filterProp);
  }

}
