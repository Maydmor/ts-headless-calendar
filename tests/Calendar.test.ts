import { Calendar } from '../src';
test('Calendar', () => {

    expect(new Calendar().years(1990, 2010).length).toEqual(20);
    expect(new Calendar().year(1990).date()).toEqual(new Date(1990, 0));
    let year = 1990;
    for(const calendar of new Calendar().years(1990, 2010)){

        expect(calendar.date().getFullYear()).toEqual(year);
        expect(calendar.month(0).date()).toEqual(new Date(year, 0) );
        expect(calendar.month(11).day(1).date()).toEqual(new Date(year, 11, 1));
        expect(calendar.month(7).day(14).hour(3).date()).toEqual(new Date(year, 7, 14, 3 ));
        year++;
    }
});


test('YearCalendar previous and next Year ', () => {
    const calendar = new Calendar().year(2015);
    expect(calendar.next().date()).toEqual(new Date(2016, 0));
    expect(calendar.next().next().date()).toEqual(new Date(2017, 0));
    expect(calendar.previous().date()).toEqual(new Date(2014, 0));
    expect(calendar.previous().previous().date()).toEqual(new Date(2013, 0));
})

test('MonthCalendar previous and next month', () => {
    const calendar = new Calendar().year(2020).month(9);
    expect(calendar.next().date()).toEqual(new Date(2020, 10));
    expect(calendar.next().next().date()).toEqual(new Date(2020, 11));
    expect(calendar.previous().date()).toEqual(new Date(2020, 8));
    expect(calendar.previous().previous().date()).toEqual(new Date(2020, 7));
})

test('MonthCalendar previous and next month wraparoud', () => {
    const calendar1 = new Calendar().year(2020).month(11);
    expect(calendar1.next().date()).toEqual(new Date(2021, 0));
    expect(calendar1.next().next().date()).toEqual(new Date(2021, 1));
    const calendar2 = new Calendar().year(2020).month(0);
    expect(calendar2.previous().date()).toEqual(new Date(2019, 11));
    expect(calendar2.previous().previous().date()).toEqual(new Date(2019, 10));
})


test('DayCalendar previous and next day wraparoud', () => {
    const calendar1 = new Calendar().year(2020).month(11).day(31);
    expect(calendar1.next().date()).toEqual(new Date(2021, 0, 1));
    expect(calendar1.next().next().date()).toEqual(new Date(2021, 0, 2));
    const calendar2 = new Calendar().year(2020).month(0).day(1);
    expect(calendar2.previous().date()).toEqual(new Date(2019, 11, 31));
    expect(calendar2.previous().previous().date()).toEqual(new Date(2019, 11, 30));
})

// test('HourCalendar previous and next hour wraparoud', () => {
//     const calendar1 = new Calendar().year(2020).month(11).day(31).hour(23);
//     expect(calendar1.next().date()).toEqual(new Date(2021, 0, 1, 0));
//     expect(calendar1.next().next().date()).toEqual(new Date(2021, 0, 1, 1));
//     const calendar2 = new Calendar().year(2020).month(0).day(1).hour(0);
//     expect(calendar2.previous().date()).toEqual(new Date(2019, 11, 31, 23));
//     expect(calendar2.previous().previous().date()).toEqual(new Date(2019, 11, 31, 23));
// })

test('YearCalendar is leap year test', () => {
    expect(new Calendar().year(2000).isLeapYear()).toBeTruthy();
    expect(new Calendar().year(2004).isLeapYear()).toBeTruthy();
    expect(new Calendar().year(1900).isLeapYear()).toBeFalsy()
    expect(new Calendar().year(2003).isLeapYear()).toBeFalsy();
    expect(new Calendar().year(2005).isLeapYear()).toBeFalsy();
    expect(new Calendar().year(2003).next().isLeapYear()).toBeTruthy();
    expect(new Calendar().year(2005).previous().isLeapYear()).toBeTruthy();
    expect(new Calendar().year(2005).month(0).previous().isLeapYear()).toBeTruthy();
    expect(new Calendar().year(2003).month(11).next().isLeapYear()).toBeTruthy()
})