import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentTable from "./AppointmentTable";
import ConfirmModal from "./ConfirmModal";
import { days, headCellClass, valueCellClass } from "./constants";
import { initialAppointments, initialPatients } from "./mocData";
import axios from "axios";
import LoadingOverlay from './../../../components/shared/LoadingOverlay'


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



    // [SENU] ❤️ LOADING
    const [loading, setLoading] = useState(false)

    // PATEINTS - APPOINTMENTS STATES
    const [patients, setPatients] = useState(initialPatients);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [timeSlots, setTimeSlots] = useState([])

    // STATES FOR UPDATES
    const [patientToRemove, setPatientToRemove] = useState(null);
    const [cancelReason, setCancelReason] = useState("The doctor is sorry, but due to an unexpected situation, the appointment has to be cancelled.");
    const [patientStatus, setPatientStatus] = useState( Object.fromEntries(Object.keys(initialPatients).map(name => [name, "approved"])));

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
            const res = await axios.get("http://localhost:8000/appointments/?not_reserve_status=available");
            const data = res.data;
            console.log("appointments data = ", data)
      
            // CONTAINERS
            const structuredAppointments = {};
            const structuredPatients = {};
            const fetchedTimeSlots = []

            // LOOP ON FETCHED APPOINTMENTS
            for (const { from_time, day, patient } of data) {

              // CONVERT DAY
              const dayname = dayMap[day]
              
              // APPTS
              if (!structuredAppointments[from_time]) structuredAppointments[from_time] = {};
              structuredAppointments[from_time][dayname] = patient.patient_id;
              console.log("structuredAppointments = ", structuredAppointments)

              // PATIENT:
              const age = new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear();
              structuredPatients[patient.patient_id] = {
                name: patient.name,
                age,
                patient_image_path: patient.patient_image_path,
              };
              console.log("structuredPatients = ", structuredPatients)

              // TIME SLOTS
              fetchedTimeSlots.push(from_time)


            }
      
            // UPDATE STATES
            setAppointments(structuredAppointments);
            setPatients(structuredPatients);
            setTimeSlots(fetchedTimeSlots)
          } catch (err) {
            console.error("Failed to fetch appointments:", err);
          } finally{
            setLoading(false) // 💔 STOP LOADING
          }
        };
      
        fetchData();
      }, []);
      
      
    // REMOVE/CANCEL APPTS
    const handleRemoveClick = (patient) => setPatientToRemove(patient);


    // CONFIRM REMOVE/CANCEL
    const confirmRemove = () => {
        if (!patientToRemove) return;
        const name = patientToRemove.name;
        const updatedAppointments = { ...appointments };

        // nested loop [??]
        for (const time in updatedAppointments) {
            for (const day in updatedAppointments[time]) {
                if (updatedAppointments[time][day] === name) {
                    delete updatedAppointments[time][day];
                }
            }
        }

        setAppointments(updatedAppointments);
        setPatientToRemove(null);
    };

    // CHANGE APPTS STATUS
    const handleStatusChange = (name, newStatus) => { setPatientStatus(prev => ({ ...prev, [name]: newStatus }));};


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

        {/* TABLE */}        
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
        />

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
