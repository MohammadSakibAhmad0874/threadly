"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingProgress from "@/components/booking/BookingProgress";
import Step1Garment from "@/components/booking/Step1Garment";
import Step2Customizations from "@/components/booking/Step2Customizations";
import Step3Measurement from "@/components/booking/Step3Measurement";
import Step4Fabric from "@/components/booking/Step4Fabric";
import Step5Schedule from "@/components/booking/Step5Schedule";
import Step6Review from "@/components/booking/Step6Review";
import { useBookingStore } from "@/store/bookingStore";
import { useOrdersStore } from "@/store/ordersStore";
import { useUserStore } from "@/store/userStore";
import { GarmentType, MeasurementMethod, FabricSourceType } from "@/types";

function BookingWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    step,
    data,
    setStep,
    setGarment,
    setQuantity,
    setCustomizations,
    setMeasurementMethod,
    setFabric,
    setSchedule,
    setDeliverySpeed,
    setAddress,
    setConfirmedOrder,
    reset,
  } = useBookingStore();

  const { createOrder } = useOrdersStore();
  const { addresses } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync query params on mount
  useEffect(() => {
    const garmentParam = searchParams.get("garment") as GarmentType;
    if (garmentParam && ["shirt", "trousers", "suit", "kurta", "blouse", "dress"].includes(garmentParam)) {
      setGarment(garmentParam);
    }

    const fabricParam = searchParams.get("fabric") as FabricSourceType;
    if (fabricParam && ["provide_own", "source_threadly"].includes(fabricParam)) {
      setFabric({
        ...data.fabric,
        type: fabricParam,
      });
    }

    const measurementParam = searchParams.get("measurement") as MeasurementMethod;
    if (measurementParam && ["doorstep_tailor", "sample_garment", "stored_profile"].includes(measurementParam)) {
      setMeasurementMethod(measurementParam);
    }

    const expressParam = searchParams.get("express");
    if (expressParam === "true") {
      setDeliverySpeed("express");
    }

    // If default address available and no address set yet
    if (addresses.length > 0 && !data.address.street) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setAddress(defaultAddr);
    }
  }, [searchParams, addresses]);

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    try {
      const newOrder = await createOrder(data);
      setConfirmedOrder(newOrder.orderId, newOrder.id);
      router.push(`/order-confirmation?id=${newOrder.orderId}`);
    } catch (err) {
      console.error("Order creation failed", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <BookingProgress currentStep={step} onStepClick={(s) => setStep(s)} />

      <div className="mt-8 rounded-3xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-10 shadow-xl">
        {step === 1 && (
          <Step1Garment
            selectedGarment={data.garment}
            quantity={data.quantity}
            onSelectGarment={setGarment}
            onChangeQuantity={setQuantity}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2Customizations
            garment={data.garment}
            customizations={data.customizations}
            onChange={setCustomizations}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <Step3Measurement
            method={data.measurementMethod}
            onSelectMethod={setMeasurementMethod}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <Step4Fabric
            fabric={data.fabric}
            onChangeFabric={setFabric}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && (
          <Step5Schedule
            schedule={data.schedule}
            deliverySpeed={data.deliverySpeed}
            address={data.address}
            onChangeSchedule={setSchedule}
            onChangeDeliverySpeed={setDeliverySpeed}
            onChangeAddress={setAddress}
            onNext={() => setStep(6)}
            onBack={() => setStep(4)}
          />
        )}

        {step === 6 && (
          <Step6Review
            data={data}
            isSubmitting={isSubmitting}
            onConfirm={handleConfirmOrder}
            onBack={() => setStep(5)}
          />
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[var(--muted-foreground)] mt-4">Loading bespoke booking engine...</p>
        </div>
      }
    >
      <BookingWizardContent />
    </Suspense>
  );
}
