import { format } from "date-fns";
import Image from "next/image";
import { forwardRef } from "react";

export const PrintPage = forwardRef(function PrintPage(
  { selectedReceipt, duration, formik, selectedCar },
  ref
) {
  const totalCharges = selectedCar
    ? selectedCar.rates.weekly * duration.weeks +
      selectedCar.rates.daily * duration.days +
      selectedCar.rates.hourly * duration.hours
    : 0;

  const start = new Date(
    selectedReceipt?.pickupDate || formik.values.pickupDate
  );
  const end = new Date(
    selectedReceipt?.dropoffDate || formik.values.returnDate
  );

  return (
    <div ref={ref} className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">CH Car Place Inc</h1>
          <p>162 Bergen st</p>
          <p>Brooklyn, NY 11213</p>
          <p>PH#</p>
        </div>
        <div className="flex items-center justify-center">
          <Image src="/logo.png" alt="Car Icon" width={100} height={100} />
        </div>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold">RENTER INFO</h2>
          <p>
            {selectedReceipt?.customerName ||
              `${formik.values.firstName} ${formik.values.lastName}`}
          </p>
          <>
            <p href="mailto:test@gmail.com" className="text-blue-600">
              {selectedReceipt?.customerEmail || formik.values.email}
            </p>
          </>
          <p>Phone: {selectedReceipt?.customerPhone || formik.values.phone}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Reservation</h2>
          <p>{selectedReceipt?.invoiceId}</p>
          <h2 className="text-lg font-bold">REPAIR ORDER:</h2>
          <p>CLAIM:</p>
          <p>
            Date/Time Out:{" "}
            {(selectedReceipt?.pickupDate || formik.values.pickupDate) &&
              format(start, "Pp")}
          </p>
          <p>
            Date/Time In:{" "}
            {(selectedReceipt?.dropoffDate || formik.values.returnDate) &&
              format(end, "Pp")}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold">CHARGE SUMMARY</h2>
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
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold">ADDITIONAL AUTHORIZED DRIVER(S)</h2>
        <p></p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold">UNIT DETAILS</h2>
        <p>
          Unit:{" "}
          {selectedReceipt?.carName ||
            `${selectedCar?.make} ${selectedCar?.model}`}
        </p>
        <p>
          Make & Model:{" "}
          {selectedReceipt?.carName ||
            `${selectedCar?.make} ${selectedCar?.model}`}
        </p>
        <p>BILL TO:</p>
        <p>Payment Type: Unpaid</p>
        <p>AUTH: $0.00</p>
      </div>

      <div className="mb-2">
        <p>Referral:</p>
        <p>
          {`NOTICE: Collision Insurance (CDW) - $7 per day Limits liability of
          damages to one's own vehicle up to $1000 in event of an accident, by
          waiving this coverage renter agrees to be hold liable for damages up
          to the entire value of the vehicle.`}
        </p>
        <div className="flex items-center space-x-4 mt-2">
          <button className="px-4 py-2 border border-gray-300">Accept</button>
          <button className="px-4 py-2 border border-gray-300">Reject</button>
        </div>
      </div>

      <div className="mb-4">
        <p>
          Rental service may be refused anyone when done in the best interest of
          the renting company or customer - Rates do not include gasoline. -
          Reserves the right to collect deposit covering estimated rental
          charges.
        </p>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <p>Renters Signature</p>
          <p className="border-b border-gray-300 w-64"></p>
        </div>
        <div>
          <p>Additional Driver 1</p>
          <p className="border-b border-gray-300 w-64"></p>
        </div>
      </div>
    </div>
  );
});
