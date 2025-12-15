import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import Navbar from "../components/Navbar";
import DoubleCalendar from "../components/DoubleCalendar";

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection', },]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                //const res = await api.get("/reservations");
                //console.log(res.data);
                //setReservations(res.data);
            } catch (error) {
                console.log("Error fetching reservations");
                toast.error("Failed to load reservations");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading reservations...</div>}

                {/* {reservations.length === 0 && <div className="text-center text-primary py-10">There are no reservations yet.</div>} */}

                <DoubleCalendar dateRange={dateRange} setDateRange={setDateRange} />
            </div>
        </div>
    );
};

export default ReservationsPage;