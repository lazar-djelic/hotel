import { useMutation } from "@tanstack/react-query";
import { makePdfAmres } from "./pdf.api";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const usePdfAmres = () => {
  const { t } = useTranslation();

  const { mutate: mutatePdfAmres, isPending: isPendingPdfAmres } = useMutation({
    mutationFn: makePdfAmres,
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      //   a.download = "amenity-reservation-bill.pdf";
      a.click();
      URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error(t("toast.pdffail"));
    },
  });

  return { mutatePdfAmres, isPendingPdfAmres };
};
