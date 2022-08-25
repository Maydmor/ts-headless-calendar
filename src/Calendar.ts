

export class Calendar {
    constructor(){
    }

    public years(from: number, to:number): Array<YearCalendar> {
        const entryCount = to - from;
        return Array.from({ length: entryCount }, (_, index) => new YearCalendar(from + index));
    }

    public year(year: number) {
        return new YearCalendar(year);
    }
}

class YearCalendar extends Calendar{
    protected _year!: number;
    
    constructor(year: number) {
        super();
        this._year = year;
    }

    public months(): Array<MonthCalendar> {
        return Array.from({length: 11}, (_,i)=> new MonthCalendar(this._year, i))
    }

    public month(month: number) {
        return new MonthCalendar(this._year, month);
    }

    public isLeapYear() {
        return new Date(this._year, 1, 29).getDate() === 29;
    }
    public date() {
        return new Date(this._year);
    }
    public next() {
        return new YearCalendar(this._year + 1);;
    }
    public previous() {
        return new YearCalendar(this._year - 1);
    }
}

class MonthCalendar extends YearCalendar {
    protected _month!: number;

    constructor(year: number, month: number) {
        super(year);
        this._month = month;
    }

    public days(): Array<DayCalendar> {
        return Array.from({length: this.daysInMonth()}, (_,i)=> new DayCalendar(this._year, this._month, i));
    }

    public daysInMonth() {
        return new Date(this._year, this._month + 1, 0).getDate();
    }

    public day(day: number) {
        return new DayCalendar(this._year, this._month, day)
    }

    public date() {
        return new Date(this._year, this._month);
    }

    public next() {
        if(this._month === 11) {
            return new MonthCalendar(this._year + 1, 0 );
        }
        return new MonthCalendar(this._year, this._month + 1 );
    }

    public previous() {
        if(this._month === 0) {
            return new MonthCalendar(this._year - 1, 11);
        }
        return new MonthCalendar(this._year, this._month + 1);
    }
}


class DayCalendar extends MonthCalendar {
    protected _day!: number;
    constructor(year: number, month: number, day: number) {
        super(year, month);
        this._day = day;
    }

    public hours(): Array<HourCalendar> {
        return Array.from({length: 24}, (_,i)=> new HourCalendar(this._year, this._month, this._day, i));
    }

    public date() {
        return new Date(this._year, this._month, this._day);
    }

    public hour(hour: number) {
        return new HourCalendar(this._year, this._month, this._day, hour);
    }

    public next() {
        if(this._day === super.daysInMonth()) {
            if(this._month === 11) {
                return new DayCalendar(this._year + 1, 0, 1);
            }
            return new DayCalendar(this._year, this._month + 1, 1);
        }
        return new DayCalendar(this._year, this._month, this._day + 1);
    }

    public previous(): DayCalendar {
        if(this._day === 1) {
            if(this._month === 0) {
                return new DayCalendar(this._year - 1, 11, 31);
            }
            return new DayCalendar(this._year, this._month - 1, new MonthCalendar(this._year, this._month - 1).daysInMonth());
        }
        return new DayCalendar(this._year, this._month, this._day - 1);
    }

}

class HourCalendar extends DayCalendar {
    private _hour!: number;
    constructor(year: number, month: number, day: number, hour: number) {
        super(year, month, day);
        this._hour = hour;
    }

    public minutes(): Array<Date> {
        return Array.from({length: 60}, (_,i)=> new Date(this._year, this._month, this._day, this._hour, i));
    }

    public date(): Date {
        return new Date(this._year, this._month, this._day, this._hour);
    }
}
