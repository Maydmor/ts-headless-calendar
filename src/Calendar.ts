

export class Calendar {
    /**
     * Calendar constructor
     */
    constructor(){
    }

    /**
     * This method returns all years between two given years as YearCalendar
     * @param from - the begin year
     * @param to - the end year
     * @returns all years between `from` and `to` as YearCalendar
     */
    public years(from: number, to:number): Array<YearCalendar> {
        const entryCount = to - from;
        return Array.from({ length: entryCount }, (_, index) => new YearCalendar(from + index));
    }

    /**
     * This method returns a YearCalendar for a given year
     * @param year - the year
     * @returns the YearCalendar for the given year
     */
    public year(year: number) {
        return new YearCalendar(year);
    }
}

export class YearCalendar extends Calendar{
    protected _year!: number;
    /**
     * 
     * @param year - The year for the calendar
     */
    constructor(year: number) {
        super();
        this._year = year;
    }

    /**
     * This method returns the list of MonthCalendars for this year
     * @returns the list, holding all MonthCalendars for this YearCalendar
     */
    public months(): Array<MonthCalendar> {
        return Array.from({length: 11}, (_,i)=> new MonthCalendar(this._year, i))
    }
    /**
     * This method returns the MonthCalendar for the given `month` and the year of this instance.
     * @param month - a month between 0 and 11
     * @returns the MonthCalendar for the given `month` and this YearCalendar 
     */
    public month(month: number) {
        return new MonthCalendar(this._year, month);
    }

    /**
     * This method returns `true` if the current year is a leap year
     * @returns `true` if the YearCalendar instance is for a leap year 
     */
    public isLeapYear() {
        return new Date(this._year, 1, 29).getDate() === 29;
    }

    /**
     * 
     * @returns the JS Date object for the given year of this calendar
     */
    public date() {
        return new Date(this._year, 0);
    }

    /**
     * 
     * @returns The calendar for the next year
     */
    public next() {
        return new YearCalendar(this._year + 1);;
    }

    /**
     * 
     * @returns The calendar for the previous year
     */
    public previous() {
        return new YearCalendar(this._year - 1);
    }

    /**
     * 
     * @returns The year number of this calendar
     */
    public yearNumber() {
        return this._year;
    }
}

export class MonthCalendar extends YearCalendar {
    protected _month!: number;
    /**
     * 
     * @param year - The year for the calendar (e.g. 2000)
     * @param month - The month for the calendar (0-11)
     */
    constructor(year: number, month: number) {
        super(year);
        this._month = month;
    }
    /**
     * This method returns all days of this month
     * @returns The list of DayCalendars for this month
     */
    public days(): Array<DayCalendar> {
        return Array.from({length: this.daysInMonth()}, (_,i)=> new DayCalendar(this._year, this._month, i + 1));
    }

    /**
     * This method returns the number of days in this month
     * @returns The number of days in this calendar
     */
    public daysInMonth() {
        return new Date(this._year, this._month + 1, 0).getDate();
    }

    /**
     * @param day - the day starting by 1 for the first
     * @returns The DayCalendar for the given `day`
     */
    public day(day: number) {
        return new DayCalendar(this._year, this._month, day)
    }


    /**
     * 
     * @returns the JS Date object for this calendar
     */
    public date() {
        return new Date(this._year, this._month);
    }
    /**
     * @returns the MonthCalendar for the next month
     */
    public next() {
        if(this._month === 11) {
            return new MonthCalendar(this._year + 1, 0 );
        }
        return new MonthCalendar(this._year, this._month + 1 );
    }
    
    /**
     * @returns the MonthCalendar for the previous month
     */
    public previous() {
        if(this._month === 0) {
            return new MonthCalendar(this._year - 1, 11);
        }
        return new MonthCalendar(this._year, this._month - 1);
    }

    /**
     * 
     * @returns The month number of this calendar
     */
    public monthNumber() {
        return this._month;
    }
}


export class DayCalendar extends MonthCalendar {
    protected _day!: number;

    /**
     * @param year - the year for the calendar (e.g. 2000)
     * @param month - the month for the calendar (0-11)
     * @param day - the day for the calendar (1-31)
     */
    constructor(year: number, month: number, day: number) {
        super(year, month);
        this._day = day;
    }

    /**
     * 
     * @returns A list of HourCalendars for the current day
     */
    public hours(): Array<HourCalendar> {
        return Array.from({length: 24}, (_,i)=> new HourCalendar(this._year, this._month, this._day, i));
    }

    /**
     * 
     * @returns the JS Date object for this calendar
     */
    public date() {
        return new Date(this._year, this._month, this._day);
    }

    /**
     * 
     * @param hour - the hour starting by 0 - 23
     * @returns The HourCalendar for the given hour
     */
    public hour(hour: number) {
        return new HourCalendar(this._year, this._month, this._day, hour);
    }

    /**
     * 
     * @returns The DayCalendar for the next day
     */
    public next() {
        
        if(this._day === this.daysInMonth()) {
            if(this._month === 11) {
                return new DayCalendar(this._year + 1, 0, 1);
            }
            return new DayCalendar(this._year, this._month + 1, 1);
        }
        return new DayCalendar(this._year, this._month, this._day + 1);
    }

    /**
     * 
     * @returns The DayCalendar for the previous Day
     */
    public previous(): DayCalendar {
        if(this._day === 1) {
            if(this._month === 0) {
                return new DayCalendar(this._year - 1, 11, 31);
            }
            return new DayCalendar(this._year, this._month - 1, new MonthCalendar(this._year, this._month - 1).daysInMonth());
        }
        return new DayCalendar(this._year, this._month, this._day - 1);
    }

    /**
     * 
     * @returns The day number of this calendar
     */
    public dayNumber() {
        return this._day;
    }

}

export class HourCalendar extends DayCalendar {
    private _hour!: number;
    /**
     * 
     * @param year - the year for the calendar (e.g. 2000)
     * @param month - the month for the calendar (0-11)
     * @param day - the day for the calendar (1-31)
     * @param hour - the hour for the calendar(0-23)
     */
    constructor(year: number, month: number, day: number, hour: number) {
        super(year, month, day);
        this._hour = hour;
    }
    /**
     * 
     * @returns A List of JS Dates for each minute in the hour
     */
    public minutes(): Array<Date> {
        return Array.from({length: 60}, (_,i)=> new Date(this._year, this._month, this._day, this._hour, i));
    }

    /**
     * 
     * @returns The JS Date object for this calendar
     */
    public date(): Date {
        return new Date(this._year, this._month, this._day, this._hour);
    }

    /**
     * 
     * @returns The hour number of this calendar
     */
    public hourNumber() {
        return this._hour;
    }
}
