import { pricingService } from './../src/services/pricing.service';


jest.mock('node-fetch', () => jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ isBooked: false }),
  })
))

describe('pricing-service', () => {

  describe('getPrice:', () => {
    it('should return breakdown of prices with discount if booking is longer than 3 days', async () => {
      let result = await pricingService.getPrice(
        'some-id',
        1000,
        new Date('2021-01-01T00:00:00'),
        new Date('2021-01-07T00:00:00')
      );
      expect(result.baseFeeCents).toBeGreaterThan(0);
      expect(result.discountCents).toBeGreaterThan(0);
      expect(result.insurancePriceCents).toBeGreaterThan(0);
      expect(result.serviceFeeCents).toBeGreaterThan(0);
      expect(result.subTotalCents).toBeGreaterThan(0);
      expect(result.totalCents).toBeGreaterThan(0);
    });

    it('should return breakdown of prices without discount if booking is shorter than 3 days', async () => {
      let result = await pricingService.getPrice(
        'some-id',
        1000,
        new Date('2021-01-01T00:00:00'),
        new Date('2021-01-02T00:00:00')
      );
      expect(result.baseFeeCents).toBeGreaterThan(0);
      expect(result.discountCents).toBe(0);
      expect(result.insurancePriceCents).toBeGreaterThan(0);
      expect(result.serviceFeeCents).toBeGreaterThan(0);
      expect(result.subTotalCents).toBeGreaterThan(0);
      expect(result.totalCents).toBeGreaterThan(0);
    });

    it('should return correct prices for less than one day', async () => {
      let result = await pricingService.getPrice(
        'some-id',
        1000,
        new Date('2021-01-01T00:00:00'),
        new Date('2021-01-01T00:01:00')
      );
      expect(result.baseFeeCents).toBe(1000);
      expect(result.discountCents).toBe(0);
      expect(result.insurancePriceCents).toBe(100);
      expect(result.serviceFeeCents).toBe(100);
      expect(result.subTotalCents).toBe(1200);
      expect(result.totalCents).toBe(1200);
    });
  })
});
