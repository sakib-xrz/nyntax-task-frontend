"use client";

import FormikErrorBox from "@/components/shared/FormikErrorBox";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CustomerCard({ formik }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="border-b-2 pb-1 text-lg font-semibold mb-5">
          Customer Information
        </div>

        <Card className="space-y-2">
          <div>
            <Label>
              First Name<span className="text-destructive">*</span>{" "}
            </Label>
            <Input
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="firstName"
            />
            <FormikErrorBox formik={formik} field="firstName" />
          </div>
          <div>
            <Label>
              Last Name<span className="text-destructive">*</span>{" "}
            </Label>
            <Input
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="lastName"
            />
            <FormikErrorBox formik={formik} field="lastName" />
          </div>
          <div>
            <Label>
              Email<span className="text-destructive">*</span>{" "}
            </Label>
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />
            <FormikErrorBox formik={formik} field="email" />
          </div>
          <div>
            <Label>
              Phone<span className="text-destructive">*</span>{" "}
            </Label>
            <Input
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
            />
            <FormikErrorBox formik={formik} field="phone" />
          </div>
        </Card>
      </div>

      <div>
        <div className="border-b-2 pb-1 text-lg font-semibold mb-5">
          Additional Charges
        </div>

        <Card className="space-y-8">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasDamage"
              checked={formik.values.hasDamage}
              onCheckedChange={() =>
                formik.setFieldValue("hasDamage", !formik.values.hasDamage)
              }
            />
            <Label
              htmlFor="hasDamage"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full cursor-pointer"
            >
              Collision Damage Waiver
              <p>$9.00</p>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasInsurance"
              checked={formik.values.hasInsurance}
              onCheckedChange={() =>
                formik.setFieldValue(
                  "hasInsurance",
                  !formik.values.hasInsurance
                )
              }
            />
            <Label
              htmlFor="hasInsurance"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full cursor-pointer"
            >
              Liability Insurance
              <p>$15.00</p>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasTax"
              checked={formik.values.hasTax}
              onCheckedChange={() =>
                formik.setFieldValue("hasTax", !formik.values.hasTax)
              }
            />
            <Label
              htmlFor="hasTax"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full cursor-pointer"
            >
              Rental Tax
              <p>$11.5</p>
            </Label>
          </div>
        </Card>
      </div>
    </div>
  );
}
