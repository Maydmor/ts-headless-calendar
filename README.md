# ts-headless-calendar
A easy to use headless calendar built purely with typescript and no dependencies.

## Getting started

### Installation

Install the package with 
```
npm install ts-headless-calendar
```
or
```
yarn add ts-headless-calendar
```

### User Guide

Start by importing Calendar

```typescript
import { Calendar } from 'ts-headless-calendar/lib'
```

#### Create a calendar instance
```typescript
import { Calendar } from 'ts-headless-calendar/lib'

const calendar = new Calendar();
```

#### How to create iterable for years, months, days and hours 

```typescript
import { Calendar } from 'ts-headless-calendar/lib'

const calendar = new Calendar();

calendar.years(2000, 2022); // Gives you an array containing all YearCalendars in the range (2000, 2022)
calendar.year(2011).months(); // Gives you an array containing all MonthCalendars in the year 2011.
calendar.year(2011).month(0).days(); // Gives you an array containing all DayCalendars for January 2011.
calendar.year(2011).month(0).day(1).hours(); // Gives you an array containing all HourCalendars for January-1-2011
```

#### Navigating the calendar

You can navigate the calendar by using the next and previous methods.

NOTE: The HourCalendar currently does not support next and previous.


```typescript
import { Calendar } from 'ts-headless-calendar/lib'

const calendar = new Calendar();


// Next and previous year
calendar.year(2011).next(); // Gives you the YearCalendar for 2012
calendar.year(2011).previous(); // Gives you the YearCalendar for 2010

// next and previous month
calendar.year(2011).month(0).next(); // Gives you the month calendar for February 2011.
calendar.year(2011).month(1).previous(); // Gives you the month calendar for January 2011.

// wrap around is also supported e.g.:
calendar.year(2011).month(0).previous(); // Gives you the month calendar for December 2010

// next and previous day
calendar.year(2011).month(0).day(10).next(); // Gives you the day calendar for January-11-2011.
calendar.year(2011).month(0).day(10).next(); // Gives you the day calendar for January-9-2011.

// wrap around is also supported e.g.:
calendar.year(2011).month(0).day(1).previous(); // Gives you the day calendar for December-31-2010

```

#### Converting to Date objects

All classes have a corresponding Date representation.
You can simply call the date() method, to get the corresponding JS Date.

```typescript
import { Calendar } from 'ts-headless-calendar/lib'

const calendar = new Calendar();


// Next and previous year
calendar.year(2011).date(); // Gives you the JS Date for 2012
calendar.year(2011).month(0).date(); // Gives you the JS Date January 2011.
calendar.year(2011).month(0).day(10).date(); // Gives you the JS Date for January-10-2011.
calendar.year(2011).month(0).day(10).hour(23).date(); // Gives you the JS Date for January-10-2011 23:00.

```

## Documentation
See https://maydmor.github.io/ts-headless-calendar/
## License
MIT
