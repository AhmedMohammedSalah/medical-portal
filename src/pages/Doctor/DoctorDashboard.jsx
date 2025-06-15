// IMPORTS: ICONS + COMPONENTS
import {
    Bell,
    Users,
    Clock,
    CheckCircle,
    CalendarCheck,
    Calendar,
    Search,
    ChevronDown,
  } from "lucide-react";
  import StatCard from "./../../components/DoctorDashboard/StatsCard.jsx";
  import AppointmentCard from "./../../components/DoctorDashboard/AppointementCard.jsx";
  import NotificationItem from "./../../components/DoctorDashboard/NotificationItem.jsx";
  //======================================================================
  
  
  const DoctorDashboard = () => {
  
  
    // [FETCH: DOCTOR]
    const doctor = {
      name: "Alex Carter",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      specialty: "Cardiologist",
    };
  
    // [FETCH : CALCULATE FROM FETCHED DATA]
    const stats = {
      totalPatients: 1243,
      pendingAppointments: 12,
      approvedAppointments: 8,
      completedAppointments: 34,
    };
  
    // [CHECK CURRENT DAY AND GET THE APPOINTMED FOR TI]
    const todayAppointments = [
      {
        id: 1,
        patient: "Sarah Johnson",
        time: "09:00 AM",
        status: "approved",
        type: "Follow-up",
      },
      {
        id: 2,
        patient: "Michael Chen",
        time: "10:30 AM",
        status: "approved",
        type: "Consultation",
      },
      {
        id: 3,
        patient: "David Wilson",
        time: "01:15 PM",
        status: "pending",
        type: "New Patient",
      },
      {
        id: 4,
        patient: "Emily Davis",
        time: "03:00 PM",
        status: "approved",
        type: "Check-up",
      },
    ];
  
  
    // [FETCH FIRST THREE NOTIFICATION]
    const notifications = [
      {
        id: 1,
        message: "New appointment request from Robert Smith",
        time: "2 hours ago",
        read: false,
      },
      {
        id: 2,
        message: "Your prescription for Sarah Johnson was viewed",
        time: "1 day ago",
        read: true,
      },
      {
        id: 3,
        message: "System maintenance scheduled for Sunday",
        time: "2 days ago",
        read: true,
      },
    ];
  
    const unreadCount = notifications.filter((n) => !n.read).length;
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm p-6 border-b border-gray-200">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-emerald-200"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Hey Doc,{" "}
                  <span className="text-emerald-600">
                    {doctor.name.split(" ")[0]}
                  </span>
                </h1>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Bell
                  className="text-gray-600 cursor-pointer hover:text-emerald-600"
                  size={20}
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                  <span className="text-emerald-600 font-medium">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
  
        <main className="container mx-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users size={24} className="text-emerald-600" />}
              title="Total Patients"
              value={stats.totalPatients}
              color="bg-emerald-100"
            />
            <StatCard
              icon={<Clock size={24} className="text-amber-600" />}
              title="Pending Appointments"
              value={stats.pendingAppointments}
              color="bg-amber-100"
            />
            <StatCard
              icon={<CheckCircle size={24} className="text-green-600" />}
              title="Approved Appointments"
              value={stats.approvedAppointments}
              color="bg-green-100"
            />
            <StatCard
              icon={<CalendarCheck size={24} className="text-blue-600" />}
              title="Completed Appointments"
              value={stats.completedAppointments}
              color="bg-blue-100"
            />
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Appointments */}
            <section className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Calendar className="text-emerald-600 mr-2" size={20} />
                  Today's Appointments
                </h2>
                <button className="text-emerald-600 text-sm font-medium flex items-center">
                  View All <ChevronDown size={16} className="ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {todayAppointments.map((a) => (
                  <AppointmentCard key={a.id} appointment={a} />
                ))}
              </div>
            </section>
  
            
          </div>
  
          {/* Recent Patients Placeholder */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Patients
              </h2>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="text-center py-8 text-gray-500">
              <p>Patient list component would be here</p>
            </div>
          </section>
        </main>
      </div>
    );
  };
  
  export default DoctorDashboard;
  