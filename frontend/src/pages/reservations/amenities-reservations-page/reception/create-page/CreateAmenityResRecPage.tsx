import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { RESERVATION_STATUS } from "../../../../../config/enums";
import {
  amenityReservationSimpleSchema,
  userAndAmResRecSimpleSchema,
} from "../../../../../schemas/amenityReservation.response.schema";
import type { SimpleAmResCreateReceptionStruct } from "../../../../api/structs/AmenityReservation";
import { useCreateAmenityReservationRec } from "../../../../api/amenityReservations/amenity-reservation-detail/useCreateAmenityReservation";
import { useCreateGuestAndAmResRec } from "../../../../api/amenityReservations/amenity-reservation-detail/useCreateGuestAndAmResRec";
import { createEmptyAmenityReservation } from "../../../../api/amenityReservations/amenity-reservation-detail/createEmptyAmenityReservation";
import { useAmenities } from "../../../../api/amenities/all-amenities/useAmenities";
import { useAmenitySlots } from "../../../../api/amenities/amenity-slots/useAmenitySlots";
import AmResComp from "./AmResComp";
import NewGuestInputsRecComp from "./NewGuestInputsRecComp";
import { useFindGuestAmRes } from "./useFindGuestAmRes";
import { ROUTES } from "../../../../../config/routes";

const CreateAmenityResRecPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { amenities } = useAmenities();

  const [isNew, setIsNew] = useState<boolean>(true);
  const [guestFound, setGuestFound] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null,
  );
  const [screen, setScreen] = useState<number>(1);

  const [form, setForm] = useState<SimpleAmResCreateReceptionStruct>(() =>
    createEmptyAmenityReservation(),
  );

  useEffect(() => {
    if (amenities.length > 0 && !selectedOption) {
      const firstReservableAmenity = amenities.find(
        (a) => a.requiresReservation,
      );
      if (firstReservableAmenity) {
        setSelectedOption(firstReservableAmenity._id);
      }
    }
  }, [amenities, selectedOption]);

  useEffect(() => {
    setForm(createEmptyAmenityReservation());
    setGuestFound(false);
  }, [isNew]);

  const { slots, loading } = useAmenitySlots(selectedOption, form.date);

  const { mutate: createAmenityReservation, isPending: isPendingAmenity } =
    useCreateAmenityReservationRec(navigate);

  const {
    mutate: createGuestAndAmenityReservation,
    isPending: isPendingGuest,
  } = useCreateGuestAndAmResRec(navigate);

  const isPending = isNew ? isPendingGuest : isPendingAmenity;

  const { searchGuest, isSearching } = useFindGuestAmRes({
    form,
    setForm,
    setGuestFound,
    t,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    if (isNew) {
      const parsed = userAndAmResRecSimpleSchema.safeParse({
        fName: form.fName,
        lName: form.lName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        personalID: form.personalID,
        birthDate: form.birthDate,
        notes: form.notes,
        amenity: selectedOption,
        user: null,
        startTime: form.startTime,
        endTime: form.endTime,
        numberOfPeople: form.numberOfPeople,
        status: RESERVATION_STATUS.booked,
      });

      if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message || "Invalid input";
        toast.error(firstError);
        return;
      }

      createGuestAndAmenityReservation({
        id: selectedOption,
        amenityReservation: parsed.data,
      });
    } else {
      const parsed = amenityReservationSimpleSchema.safeParse({
        amenity: selectedOption,
        user: null,
        guest: form.guest,
        startTime: form.startTime,
        endTime: form.endTime,
        numberOfPeople: form.numberOfPeople,
        status: RESERVATION_STATUS.booked,
      });

      if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message || "Invalid input";
        toast.error(firstError);
        return;
      }

      createAmenityReservation({
        id: selectedOption,
        amenityReservation: parsed.data,
      });
    }
  };

  return (
    <>
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  {t("amenityRes.resDetails")}
                </h2>

                {screen == 1 && (
                  <>
                    <NewGuestInputsRecComp
                      isNew={isNew}
                      current={form}
                      setForm={setForm}
                      guestFound={guestFound}
                      searchGuest={searchGuest}
                      isSearching={isSearching}
                      setIsNew={setIsNew}
                    />

                    <div className="flex justify-start mx-auto mt-4">
                      <button
                        type="button"
                        className="btn btn-secondary mt-4"
                        onClick={() => {
                          setScreen(2);
                        }}
                      >
                        {t("nextpage")}
                        <ArrowRightIcon className="size-5" />
                      </button>
                    </div>
                  </>
                )}

                {screen == 2 && (
                  <>
                    <AmResComp
                      amenities={amenities}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      current={form}
                      setForm={setForm}
                      loading={loading}
                      slots={slots}
                      selectedSlotIndex={selectedSlotIndex}
                      setSelectedSlotIndex={setSelectedSlotIndex}
                      handleSubmit={handleSubmit}
                      isPending={isPending}
                    />

                    <div className="flex justify-end mx-auto mt-4">
                      <button
                        type="button"
                        className="btn btn-secondary mt-4"
                        onClick={() => {
                          setScreen(1);
                        }}
                      >
                        {t("previouspage")}
                        <ArrowLeftIcon className="size-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAmenityResRecPage;
