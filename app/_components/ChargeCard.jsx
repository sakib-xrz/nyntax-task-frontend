"use client";

import { Card } from "@/components/ui/card";

export default function ChargeCard({ duration, formik, selectedCar }) {
  const totalCharges = selectedCar
    ? selectedCar.rates.weekly * duration.weeks +
      selectedCar.rates.daily * duration.days +
      selectedCar.rates.hourly * duration.hours
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <div className="border-b-2 pb-1 text-lg font-semibold mb-5">
          Charges Summary
        </div>
      </div>

      <Card className="bg-accent">
        <table className="w-full text-left text-sm">
          <thead className="border-b">
            <tr>
              <th className="pb-2">Charge</th>
              <th className="pb-2 pr-2">Unit</th>
              <th className="pb-2">Rate</th>
              <th className="pb-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {selectedCar && (
              <>
                {duration.weeks > 0 && (
                  <tr>
                    <td className="py-2">Weekly</td>
                    <td className="py-2">{duration.weeks}</td>
                    <td className="py-2">
                      ${parseFloat(selectedCar.rates.weekly).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      $
                      {parseFloat(
                        selectedCar.rates.weekly * duration.weeks
                      ).toFixed(2)}
                    </td>
                  </tr>
                )}

                {duration.days > 0 && (
                  <tr>
                    <td className="py-2">Daily</td>
                    <td className="py-2">{duration.days}</td>
                    <td className="py-2">
                      ${parseFloat(selectedCar.rates.daily).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      $
                      {parseFloat(
                        selectedCar.rates.daily * duration.days
                      ).toFixed(2)}
                    </td>
                  </tr>
                )}

                {duration.hours > 0 && (
                  <tr>
                    <td className="py-2">Hourly</td>
                    <td className="py-2">{duration.hours}</td>
                    <td className="py-2">
                      ${parseFloat(selectedCar.rates.hourly).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      $
                      {parseFloat(
                        selectedCar.rates.hourly * duration.hours
                      ).toFixed(2)}
                    </td>
                  </tr>
                )}

                {formik.values.hasDamage && (
                  <tr>
                    <td className="py-2">Collision Damage Waiver</td>
                    <td className="py-2"></td>
                    <td className="py-2">$9.00</td>
                    <td className="py-2 text-right">$9.00</td>
                  </tr>
                )}
                {formik.values.hasInsurance && (
                  <tr>
                    <td className="py-2">Liability Insurance</td>
                    <td className="py-2"></td>
                    <td className="py-2">$15.00</td>
                    <td className="py-2 text-right">$15.00</td>
                  </tr>
                )}
                {formik.values.hasTax && (
                  <tr>
                    <td className="py-2">Tax</td>
                    <td className="py-2"></td>
                    <td className="py-2">$11.50</td>
                    <td className="py-2 text-right">$11.50</td>
                  </tr>
                )}
                {formik.values.discount && (
                  <tr>
                    <td className="py-2">Discount</td>
                    <td className="py-2"></td>
                    <td className="py-2">{formik.values.discount}%</td>
                    <td className="py-2 text-right">
                      -$
                      {parseFloat(
                        (totalCharges * formik.values.discount) / 100
                      ).toFixed(2)}
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>

          {totalCharges > 0 && selectedCar ? (
            <tfoot>
              <tr className="border-t font-semibold">
                <td className="pt-2">Total</td>
                <td className="pt-2"></td>
                <td className="pt-2"></td>
                <td className="pt-2 text-right">
                  $
                  {parseFloat(
                    totalCharges +
                      (formik.values.hasDamage ? 9 : 0) +
                      (formik.values.hasInsurance ? 15 : 0) +
                      (formik.values.hasTax ? 11.5 : 0) -
                      (formik.values.discount
                        ? (totalCharges * formik.values.discount) / 100
                        : 0)
                  ).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          ) : (
            <tfoot>
              <tr>
                <td colSpan="4" className="pt-2 text-center">
                  Please select a pickup date, return date, and vehicle to
                  calculate charges.
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </Card>
    </div>
  );
}
