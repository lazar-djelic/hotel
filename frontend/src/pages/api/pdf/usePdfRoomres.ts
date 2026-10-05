import { useMutation } from "@tanstack/react-query";
import { makePdfRoomres } from "./pdf.api";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const usePdfRoomres = () => {
  const { t } = useTranslation();

  const { mutate: mutatePdfRoomres, isPending: isPendingPdfRoomres } =
    useMutation({
      mutationFn: makePdfRoomres,
      onSuccess: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // a.download = "room-reservation-bill.pdf";
        a.click();
        URL.revokeObjectURL(url);
      },
      onError: () => {
        toast.error(t("toast.pdffail"));
      },
    });

  return { mutatePdfRoomres, isPendingPdfRoomres };
};
