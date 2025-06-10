import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Calendar,
  Users,
  UserCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  ClipboardList,
  User,
} from "lucide-react"

const Sidebar = ({ userRole = "patient", isCollapsed = false, onToggle }) => {
  const location = useLocation()

  const getMenuItems = () => {
    switch (userRole) {
      case "admin":
        return [
          { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin/dashboard" },
          { id: "users", label: "Manage Users", icon: Users, href: "/admin/users" },
          { id: "doctors", label: "Manage Doctors", icon: UserCheck, href: "/admin/doctors" },
          { id: "specialties", label: "Specialties", icon: Stethoscope, href: "/admin/specialties" },
          { id: "appointments", label: "All Appointments", icon: Calendar, href: "/admin/appointments" },
          { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
        ]
      case "doctor":
        return [
          { id: "dashboard", label: "Dashboard", icon: Home, href: "/doctor/dashboard" },
          { id: "calendar", label: "Manage Time", icon: Calendar, href: "/doctor/scheduler" },
          { id: "appointments", label: "Appointments", icon: ClipboardList, href: "/doctor/appointments/view" },
          { id: "profile", label: "My Profile", icon: User, href: "/doctor/DoctorProfile" },
          { id: "settings", label: "Settings", icon: Settings, href: "/doctor/settings" },
        ]
      case "patient":
      default:
        return [
          { id: "dashboard", label: "Dashboard", icon: Home, href: "/patient/dashboard" },
          { id: "doctors", label: "Find Doctors", icon: UserCheck, href: "/patient/doctors" },
          { id: "appointments", label: "My Appointments", icon: Calendar, href: "/patient/appointments" },
          { id: "profile", label: "My Profile", icon: User, href: "/patient/patientprofile" },
          { id: "settings", label: "Settings", icon: Settings, href: "/patient/settings" },
        ]
    }
  }

  const menuItems = getMenuItems()

  const getRoleColor = () => {
    switch (userRole) {
      case "admin":
        return "bg-red-600"
      case "doctor":
        return "bg-green-500"
      case "patient":
      default:
        return "bg-emerald-600"
    }
  }

  const getRoleLabel = () => {
    return userRole.charAt(0).toUpperCase() + userRole.slice(1)
  }

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} bg-white shadow-lg h-screen flex flex-col transition-all duration-300 border-r border-gray-200`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${getRoleColor()} rounded-lg flex items-center justify-center`}>
                <div className="text-white font-bold text-sm">+</div>
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Vicodin</h2>
                <p className="text-xs text-gray-500">{getRoleLabel()} Portal</p>
              </div>
            </div>
          )}
          <button onClick={onToggle} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname.startsWith(item.href)

            return (
              <li key={item.id}>
                <Link
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? `${getRoleColor()} text-white` : "text-gray-600 hover:bg-gray-100"
                  }`}
                  title={isCollapsed ? item.label : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}>
          <div className={`w-8 h-8 ${getRoleColor()} rounded-full flex items-center justify-center`}>
            <User className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">{getRoleLabel()}</p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button className="w-full mt-3 flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Sidebar
