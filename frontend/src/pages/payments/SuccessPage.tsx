import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../lib/axios";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    api.get(`/payments/checkout-session/${sessionId}`).then((res) => {
      console.log("type:", res.data.type);
      console.log("metadata:", res.data.metadata);
      console.log("paymentStatus:", res.data.paymentStatus);
    });
  }, [sessionId]);

  return <div>SuccessStayPage</div>;
};

export default SuccessPage;
