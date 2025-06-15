import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentTable from "./AppointmentTable";
import ConfirmModal from "./ConfirmModal";
import { days, headCellClass, valueCellClass } from "./constants";
import { initialAppointments, initialPatients } from "./mocData";
import axios from "axios";
import LoadingOverlay from './../../../components/shared/LoadingOverlay'
import apiEndpoints from "../../../services/api";

export default function DoctorAppointments() {

    /*
    APPOINTMENTS
        KEYS: TIME,
        VALUES: {...DAYNAME: PATEINT_ID}
    */

     /*
     PATIENTS:
        KEYS: ID,
        VALUE: {NAME ,AGE , IMG}
     */

    /*
    [LOGIC]--------------------------------------------------------------------
    
    ON MOUNT

        > FETCH APPOINTMENTS NOT AVAILABLE
        > LOOP ON THE APPOINTMENTS:
            > STATE_APPTS[FROM-TIME] = {...DAY: PATIENT_ID}

            > FETCH DATA NAME[USER], DOB,IMAGE[PATIENT]
            > AGE  = CURRENT - DOB
            > STATE_PATIENT[ID] = {NAME:name, AGE:age , IMG: patient_image_path}

    ----------------------------------------------------------------------------
    */

    /*
    HOW THE STATUS IN THE CARDS INITIATED: [IT INIATED CORRECTLY]
    --------------------------------------------------------------


    HOW WE UPDATE IT HERE
    ---------------------
    */

    // [SENU] ❤️ LOADING
    const [loading, setLoading] = useState(false)
    const [loadingAppointments, setLoadingAppointments] = useState({}) // Track loading per appointment

    // PATEINTS - APPOINTMENTS STATES
    const [patients, setPatients] = useState(initialPatients);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [timeSlots, setTimeSlots] = useState([])

    // [SENU] 🛑 HANDLE EMPTY CASE
    const [noAppointments, setNoAppointments] = useState(false);

    // STATES FOR UPDATES
    const [patientToRemove, setPatientToRemove] = useState(null);
    const [cancelReason, setCancelReason] = useState("The doctor is sorry, but due to an unexpected situation, the appointment has to be cancelled.");
    const [patientStatus, setPatientStatus] = useState({});

    // DAY MAPPER
    const dayMap = {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
      sun: "Sunday"
    };

    useEffect(() => { //ON MOUNT
        const fetchData = async () => {
          try {
            // ❤️ START LOADING
            setLoading(true)

            // FETCH appointments that only has reserve status pending
            const userResponse = await apiEndpoints.users.getCurrentUser();
            const doctorId = userResponse.data.id;
            const res = await axios.get("http://localhost:8000/appointments/", {
              params: {
                not_reserve_status: "available,cancelled",
                doctor_id: doctorId, // <== ADD THIS LINE
              },
            });
                        const data = res.data;
            console.log("appointments data = ", data)

            // [SENU] 🛑 CHECK EMPTY CASE
            if (!data || data.length === 0) {
              setNoAppointments(true);
              return;
            }

            // CONTAINERS
            const structuredAppointments = {};
            const structuredPatients = {};
            const fetchedTimeSlots = []
            const statusMap = {};

            // LOOP ON FETCHED APPOINTMENTS
            for (const { from_time, day, patient, id, reserve_status } of data) {
              // CONVERT DAY
              const dayname = dayMap[day]

              // APPTS
              if (!structuredAppointments[from_time]) structuredAppointments[from_time] = {};
              structuredAppointments[from_time][dayname] = patient.patient_id;
              console.log("structuredAppointments = ", structuredAppointments)

              // PATIENT:
              const age = new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear();
              structuredPatients[patient.patient_id] = {
                appointment_id: id,
                appointment_reserve_status: reserve_status,
                patient_id: patient.patient_id,
                name: patient.name,
                age,
                patient_image_path: patient.patient_image_path,
              };
              console.log("structuredPatients = ", structuredPatients)

              // STATUS
              statusMap[patient.patient_id] = reserve_status;

              // TIME SLOTS
              fetchedTimeSlots.push(from_time)
            }

            console.log("from useEffect: structured patients = ", structuredPatients)

            // UPDATE STATES
            setAppointments(structuredAppointments);
            setPatients(structuredPatients);
            setTimeSlots(fetchedTimeSlots)
            setPatientStatus(statusMap);
          } catch (err) {
            console.error("Failed to fetch appointments:", err);
          } finally {
            setLoading(false) // 💔 STOP LOADING
          }
        };

        fetchData();
      }, []);

    // REMOVE/CANCEL APPTS
    const handleRemoveClick = (patient) => setPatientToRemove(patient);

    // CONFIRM REMOVE/CANCEL
    const confirmRemove = async () => {
        if (!patientToRemove) return;

        const { patient_id, appointment_id } = patientToRemove;
        const updatedAppointments = { ...appointments };
        const prevAppointments = { ...appointments }; // Store for rollback
        const prevPatients = { ...patients }; // Store for rollback
        const prevPatientStatus = { ...patientStatus }; // Store for rollback

        // Remove from frontend
        for (const time in updatedAppointments) {
            for (const day in updatedAppointments[time]) {
                if (updatedAppointments[time][day] === patient_id) {
                    delete updatedAppointments[time][day];
                }
            }
        }

        // Update frontend states
        setAppointments(updatedAppointments);
        setPatientStatus(prev => ({ ...prev, [patient_id]: "cancelled" }));
        setPatients(prev => {
            const updated = { ...prev };
            delete updated[patient_id]; // Remove patient from state
            return updated;
        });

        try {
            // Update backend: Set status to cancelled and add cancellation reason
            await axios.patch(`http://localhost:8000/appointments/${appointment_id}/`, {
                reserve_status: "cancelled",
                reason_of_cancellation: cancelReason,
            });

            console.log("Appointment cancelled successfully");
        } catch (error) {
            console.error("Failed to cancel appointment:", error.response?.data || error.message);

            // Rollback frontend changes
            setAppointments(prevAppointments);
            setPatientStatus(prevPatientStatus);
            setPatients(prevPatients);
        } finally {
            setPatientToRemove(null);
            setCancelReason("The doctor is sorry, but due to an unexpected situation, the appointment has to be cancelled."); // Reset reason
        }
    };

    // CHANGE APPTS STATUS
    const handleStatusChange = async (appointmentId, patientId, newStatus) => {
      // INPUT:
      console.log("appointmentId = ", appointmentId)
      console.log("patientId = ", patientId)
      console.log("newStatus = ", newStatus)

      // ❤️ PARTIAL LOADING IN CARD START [SO YOU CAN MAKE ANOTHER UPDATE WHILE MAKING THE FIRST]
      setLoadingAppointments(prev => ({ ...prev, [appointmentId]: true }))

      // Store previous status for rollback
      const prevStatus = patientStatus[patientId];

      // 🇪🇬 UPDATE FRONTEND
      setPatientStatus(prev => ({ ...prev, [patientId]: newStatus }));
      setPatients((prev) => ({
        ...prev,
        [patientId]: {
          ...prev[patientId],
          appointment_reserve_status: newStatus,
        },
      }));

      try {
        // 🇪🇬 UPDATE BACKEND
        await axios.patch(`http://localhost:8000/appointments/${appointmentId}/`, {
          reserve_status: newStatus,
        });

        console.log("Status updated successfully");
      } catch (error) {
        console.error("Failed to update status:", error);

        // 🇪🇬 ROLLBACK
        setPatientStatus(prev => ({ ...prev, [patientId]: prevStatus }));
        setPatients((prev) => ({
          ...prev,
          [patientId]: {
            ...prev[patientId],
            appointment_reserve_status: prevStatus,
          },
        }));
      } finally {
        // ❤️ STOP LOADING
        setLoadingAppointments(prev => ({ ...prev, [appointmentId]: false }))
      }
    };

    //::HTML/CSS 🤙:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    return (
    <div className="p-8 max-w-6xl mx-auto relative">
        {/* ❤️ LOADING */}
        {loading && <LoadingOverlay/>}

        <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold text-green-700">Appointments</h1>
        <Link
            to="/doctor/scheduler"
            className="flex items-center px-6 py-3 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
        >
            Manage your Available Time
            <ChevronRight className="ms-2 w-8 h-8" />
        </Link>
        </div>

        <p className="text-xl text-gray-700 mb-10">
        This table displays and manage appointments for the current week, categorized by day and time
        </p>

        {/* [SENU] 🛑 SHOW NO APPOINTMENTS CASE */}
        {noAppointments ? (
          <p className="text-lg text-center text-gray-500 italic mt-20">No appointments found at the moment.</p>
        ) : (
          <AppointmentTable
            appointments={appointments}
            patients={patients}
            days={days}
            timeSlots={timeSlots}
            headCellClass={headCellClass}
            valueCellClass={valueCellClass}
            onRemoveClick={handleRemoveClick}
            patientStatus={patientStatus}
            onStatusChange={handleStatusChange}
            loadingAppointments={loadingAppointments} // [SENU] add loading
          />
        )}

        {patientToRemove && (
        <ConfirmModal
            patient={patientToRemove}
            cancelReason={cancelReason}
            onCancelReasonChange={setCancelReason}
            onConfirm={confirmRemove}
            onClose={() => setPatientToRemove(null)}
        />
        )}
    </div>
    );
}
