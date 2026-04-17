import { useMutation } from "@tanstack/react-query";
import { makePdfStay } from "./pdf.api";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const usePdfStay = () => {
  const { t } = useTranslation();

  const { mutate: mutatePdfStay, isPending: isPendingPdfStay } = useMutation({
    mutationFn: makePdfStay,
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      //   a.download = "stay-bill.pdf";
      a.click();
      URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error(t("toast.pdffail"));
    },
  });

  return { mutatePdfStay, isPendingPdfStay };
};
