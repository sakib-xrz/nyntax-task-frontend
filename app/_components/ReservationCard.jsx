"use client";

import DateTimePicker from "@/components/shared/DateTimePicker";
import FormikErrorBox from "@/components/shared/FormikErrorBox";
import SelectField from "@/components/shared/SelectField";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDuration } from "@/lib/utils";

export default function ReservationCard({
  formik,
  vehicleTypeOptions,
  vehicleOptions,
  data,
  setSelectedCar,
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="border-b-2 pb-1 text-lg font-semibold mb-5">
          Reservation Details
        </div>

        <Card className="space-y-2">
          <div>
            <Label>Reservation ID</Label>
            <Input disabled value={formik.values.reservationId} />
          </div>
          <div>
            <Label className="block">
              Pickup Date<span className="text-destructive">*</span>{" "}
            </Label>
            <DateTimePicker
              selectedDate={formik.values.pickupDate}
              onDateChange={(date) => {
                formik.setFieldValue("pickupDate", date),
                  formik.values.returnDate &&
                    formik.setFieldValue(
                      "duration",
                      formatDuration(date, formik.values.returnDate)?.formatted
                    );
              }}
            />
            <FormikErrorBox formik={formik} field="pickupDate" />
          </div>
          <div>
            <Label className="block">
              Return Date<span className="text-destructive">*</span>
            </Label>
            <DateTimePicker
              selectedDate={formik.values.returnDate}
              onDateChange={(date) => {
                formik.setFieldValue("returnDate", date),
                  formik.values.pickupDate &&
                    formik.setFieldValue(
                      "duration",
                      formatDuration(formik.values.pickupDate, date)?.formatted
                    );
              }}
            />
            <FormikErrorBox formik={formik} field="returnDate" />
          </div>
          <div className="flex items-center gap-10 !mt-5">
            <Label>Duration</Label>
            <Input disabled value={formik.values.duration} />
          </div>
          <div>
            <Label>Discount (%)</Label>
            <Input
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </Card>
      </div>

      <div>
        <div className="border-b-2 pb-1 text-lg font-semibold mb-5">
          Vehicle Information
        </div>

        <Card className="space-y-2">
          <div>
            <Label>
              Vehicle Type<span className="text-destructive">*</span>
            </Label>
            <SelectField
              options={vehicleTypeOptions}
              onChange={(value) => {
                setSelectedCar(null);
                formik.setFieldValue("vehicle", null);
                formik.setFieldValue("vehicleType", value);
              }}
              value={formik.values.vehicleType}
              placeholder="Select Vehicle Type"
            />
            <FormikErrorBox formik={formik} field="vehicleType" />
          </div>
          <div>
            <Label>
              Vehicle<span className="text-destructive">*</span>
            </Label>
            <SelectField
              isDisabled={!formik.values.vehicleType}
              options={vehicleOptions}
              onChange={(value) => {
                formik.setFieldValue("vehicle", value);
                setSelectedCar(data?.find((car) => car.model === value.value));
              }}
              value={formik.values.vehicle}
              placeholder="Select Vehicle"
            />
            <FormikErrorBox formik={formik} field="vehicle" />
          </div>
        </Card>
      </div>
    </div>
  );
}
