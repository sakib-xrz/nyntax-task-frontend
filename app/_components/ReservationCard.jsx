"use client";

import DateTimePicker from "@/components/shared/DateTimePicker";
import FormikErrorBox from "@/components/shared/FormikErrorBox";
import SelectField from "@/components/shared/SelectField";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDuration } from "@/lib/utils";

const FormField = ({
  label,
  name,
  formik,
  type = "text",
  disabled = false,
}) => (
  <div>
    <Label>
      {label}
      {name !== "duration" && <span className="text-destructive">*</span>}
    </Label>
    <Input
      type={type}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={disabled}
    />
    {name !== "duration" && <FormikErrorBox formik={formik} field={name} />}
  </div>
);

const DateField = ({ label, name, formik, onDateChange }) => (
  <div>
    <Label className="block">
      {label}
      <span className="text-destructive">*</span>
    </Label>
    <DateTimePicker
      selectedDate={formik.values[name]}
      onDateChange={onDateChange}
    />
    <FormikErrorBox formik={formik} field={name} />
  </div>
);

export default function ReservationCard({
  formik,
  vehicleTypeOptions,
  vehicleOptions,
  data,
  setSelectedCar,
}) {
  const { values, setFieldValue } = formik;

  return (
    <div className="space-y-6">
      <div>
        <div className="border-b-2 pb-1 text-lg font-semibold mb-5">
          Reservation Details
        </div>

        <Card className="space-y-2">
          <FormField
            label="Reservation ID"
            name="reservationId"
            formik={formik}
            disabled
          />

          <DateField
            label="Pickup Date"
            name="pickupDate"
            formik={formik}
            onDateChange={(date) => {
              setFieldValue("pickupDate", date);
              if (values.returnDate) {
                setFieldValue(
                  "duration",
                  formatDuration(date, values.returnDate)?.formatted
                );
              }
            }}
          />

          <DateField
            label="Return Date"
            name="returnDate"
            formik={formik}
            onDateChange={(date) => {
              setFieldValue("returnDate", date);
              if (values.pickupDate) {
                setFieldValue(
                  "duration",
                  formatDuration(values.pickupDate, date)?.formatted
                );
              }
            }}
          />

          <div className="flex items-center gap-10 !mt-5">
            <Label>Duration</Label>
            <Input disabled value={values.duration} />
          </div>

          <FormField label="Discount (%)" name="discount" formik={formik} />
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
                setFieldValue("vehicle", null);
                setFieldValue("vehicleType", value);
              }}
              value={values.vehicleType}
              placeholder="Select Vehicle Type"
            />
            <FormikErrorBox formik={formik} field="vehicleType" />
          </div>

          <div>
            <Label>
              Vehicle<span className="text-destructive">*</span>
            </Label>
            <SelectField
              isDisabled={!values.vehicleType}
              options={vehicleOptions}
              onChange={(value) => {
                setFieldValue("vehicle", value);
                setSelectedCar(data?.find((car) => car.model === value.value));
              }}
              value={values.vehicle}
              placeholder="Select Vehicle"
            />
            <FormikErrorBox formik={formik} field="vehicle" />
          </div>
        </Card>
      </div>
    </div>
  );
}
