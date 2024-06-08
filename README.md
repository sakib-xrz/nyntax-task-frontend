# Car Rental Service

# Live Link: https://nyntax-task-frontend.vercel.app/

## Description

A web application to generate invoices for a car rental service using the MERN stack.

## Features

- Fetch car details from an external API
- Calculate rental charges based on duration
- Generate and save invoices
- Apply discounts and additional charges
- Get a breakdown of rental charges before generating an invoice

## API Endpoints

- `GET /cars` - Fetch car details
- `POST /invoices` - Create a new invoice

## Calculation Logic

Rental charges are calculated by breaking down the rental duration into weeks, days, and hours to ensure the most cost-effective rate is applied for the duration. The logic follows these steps:

1. **Conversion to Weeks**:

   - First, the total rental duration in hours is divided by the number of hours in a week (168 hours) to determine the number of weeks.
   - The remaining hours after accounting for full weeks are then carried forward to the next step.

2. **Conversion to Days**:

   - Next, the remaining hours are divided by the number of hours in a day (24 hours) to calculate the number of days.
   - The leftover hours after accounting for full days are carried forward to the final step.

3. **Remaining Hours**:

   - The remaining hours are taken as is since they are less than a full day.

4. **Calculation of Total Charges**:
   - The total rental charge is then calculated by multiplying the number of weeks, days, and hours by their respective rates (weekly, daily, and hourly).

The calculation logic ensures that the rental cost is optimized by applying the weekly rate first, followed by the daily rate, and finally the hourly rate for the leftover time. Here's a step-by-step breakdown of the calculation:

```javascript
function calculateRentalCharges(duration, car) {
  const hoursInDay = 24;
  const daysInWeek = 7;

  const weeks = Math.floor(duration / (hoursInDay * daysInWeek));
  duration -= weeks * hoursInDay * daysInWeek;

  const days = Math.floor(duration / hoursInDay);
  duration -= days * hoursInDay;

  const hours = duration;

  const total =
    weeks * car.rates.weekly +
    days * car.rates.daily +
    hours * car.rates.hourly;
  return total;
}
```
