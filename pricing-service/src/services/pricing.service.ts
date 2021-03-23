import { IPricingBreakdown } from './../models/pricing-breakdown';
import { differenceInBusinessDays, differenceInCalendarDays } from 'date-fns';

//TODO:move to config and inject dependencies
const INSURANCE_MODIFIER = .10;
const SERVICE_MODIFIER = .10;
const DISCOUNT_LENGTH_DAYS = 3;
const DISCOUNT_MODIFIER = .15;
const WEEKEND_MODIFIER = 1.05;

const getPrice = async (id: string, basePriceCents: number, startDate: Date, endDate: Date): Promise<IPricingBreakdown> => {
  let rentedDays = differenceInCalendarDays(endDate, startDate);
  let rentedWeekdays = differenceInBusinessDays(endDate, startDate);
  let rentedWeekends = rentedDays - rentedWeekdays;

  if (!rentedDays) {
    rentedDays = 1;
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      rentedWeekends = 1;
      rentedWeekdays = 0;
    }
    else {
      rentedWeekends = 0;
      rentedWeekdays = 1;
    }

  }

  const weekendIncrease = WEEKEND_MODIFIER * rentedWeekends;

  const insurancePrice = Math.round(((INSURANCE_MODIFIER * basePriceCents) * (rentedWeekdays + weekendIncrease)));
  const serviceFee = Math.round(((SERVICE_MODIFIER * basePriceCents) * (rentedWeekdays + weekendIncrease)));
  const baseFee = Math.round((basePriceCents) * (rentedWeekdays + weekendIncrease));

  const subTotal = insurancePrice + serviceFee + baseFee;
  let discount = 0;
  if (rentedDays > DISCOUNT_LENGTH_DAYS) {
    discount = Math.round((subTotal * DISCOUNT_MODIFIER));
  }

  const total = subTotal - discount;
  return {
    insurancePriceCents: insurancePrice,
    serviceFeeCents: serviceFee,
    baseFeeCents: baseFee,
    subTotalCents: subTotal,
    discountCents: discount,
    totalCents: total
  }
}

export const pricingService = { getPrice }