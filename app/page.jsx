/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as Yup from "yup";
import { useEffect, useRef, useState, useCallback } from "react";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import ReservationCard from "./_components/ReservationCard";
import CustomerCard from "./_components/CustomerCard";
import ChargeCard from "./_components/ChargeCard";
import Loading from "@/components/shared/Loading";
import { formatDuration } from "@/lib/utils";
import { PrintPage } from "./_components/PrintPage";
import ApiKit from "@/common/ApiKit";

const validationSchema = Yup.object().shape({
  pickupDate: Yup.date().required("Pickup date is required"),
  returnDate: Yup.date().required("Return date is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  vehicleType: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string(),
    })
    .required("Vehicle type is required"),
  vehicle: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string(),
    })
    .required("Vehicle is required"),
});

const initialFormValues = {
  reservationId: "",
  pickupDate: "",
  returnDate: "",
  duration: "",
  discount: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  vehicleType: null,
  vehicle: null,
  hasDamage: false,
  hasInsurance: false,
  hasTax: false,
};

export default function Home() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const cashReceiptRef = useRef();

  const handlePrintCashReceipt = useReactToPrint({
    content: () => cashReceiptRef.current,
    documentTitle: `cash_receipt`,
  });

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        invoiceId: values.reservationId,
        customerName: `${values.firstName} ${values.lastName}`,
        customerEmail: values.email,
        customerPhone: values.phone,
        carId: selectedCar?.id,
        pickupDate: values.pickupDate,
        dropoffDate: values.returnDate,
        discount: values.discount,
        hasDamage: values.hasDamage,
        hasInsurance: values.hasInsurance,
        hasTax: values.hasTax,
      };

      ApiKit.postInvoice(payload)
        .then(({ data }) => {
          setSelectedReceipt(data);
          handlePrintCashReceipt();
        })
        .catch((error) => {
          console.error("Error:", error);
          setSelectedReceipt({});
        });
    },
  });

  useEffect(() => {
    if (formik.values.pickupDate && formik.values.returnDate) {
      setDuration(
        formatDuration(formik.values.pickupDate, formik.values.returnDate)
      );
    }
  }, [formik.values.pickupDate, formik.values.returnDate]);

  useEffect(() => {
    const id = Math.floor(Math.random() * 10000);
    formik.setFieldValue(
      "reservationId",
      `RA #${id.toString().padStart(4, "0")}`
    );
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: () => ApiKit.getCars().then(({ data }) => data?.data),
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      formik.handleSubmit();
    },
    [formik]
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const vehicleTypeOptions = Array.from(
    new Set(data?.map((car) => car?.type))
  ).map((type) => ({
    label: type,
    value: type,
  }));

  const vehicleOptions = data
    ?.filter((car) => car.type === formik.values.vehicleType?.value)
    .map((car) => ({
      label: car.model,
      value: car.model,
    }));

  return (
    <main>
      <Container>
        <form>
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-bold text-2xl">Reservation</h3>
            <Button type="submit" onClick={handleSubmit}>
              Print / Download
            </Button>
          </div>

          <div className="grid grid-cols-10 gap-6">
            <div className="col-span-10 md:col-span-5 lg:col-span-3">
              <ReservationCard
                formik={formik}
                vehicleTypeOptions={vehicleTypeOptions}
                vehicleOptions={vehicleOptions}
                data={data}
                setSelectedCar={setSelectedCar}
              />
            </div>
            <div className="col-span-10 md:col-span-5 lg:col-span-3">
              <CustomerCard formik={formik} />
            </div>
            <div className="col-span-10 lg:col-span-4">
              <ChargeCard
                duration={duration}
                formik={formik}
                selectedCar={selectedCar}
              />
            </div>
          </div>
        </form>
      </Container>

      <div className="hidden">
        <PrintPage
          ref={cashReceiptRef}
          selectedReceipt={selectedReceipt}
          duration={duration}
          formik={formik}
          selectedCar={selectedCar}
        />
      </div>
    </main>
  );
}
