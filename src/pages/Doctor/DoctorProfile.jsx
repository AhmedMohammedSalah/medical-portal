import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/shared/sidebar';
import { UserIcon } from '@heroicons/react/24/solid';
import apiEndpoints from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    doctor_bio: '',
    location: '',
    doctor_availability: false,
    available_days: [],
    specializations: [],
    doctor_image_path: null,
    national_id_image_path: null,
    background_image_path: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch doctor profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // First get user info
        const userResponse = await apiEndpoints.users.getCurrentUser();

        // Then get doctor profile
        const doctorResponse = await apiEndpoints.profile.getDoctorProfile();
        const data = doctorResponse.data;

        setProfile({
          name: userResponse.data.name,
          email: userResponse.data.email,
          doctor_bio: data.doctor_bio || '',
          location: data.location || '',
          doctor_availability: !!data.doctor_availability,
          available_days: Array.isArray(data.available_days) ? data.available_days : [],
          specializations: Array.isArray(data.specializations) ? data.specializations : [],
          doctor_image_path: data.doctor_image_path || null,
          national_id_image_path: data.national_id_image_path || null,
          background_image_path: data.background_image_path || null,
        });
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch profile');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      available_days: checked
        ? [...prev.available_days, value]
        : prev.available_days.filter(day => day !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiEndpoints.profile.updateDoctorProfile({
        doctor_bio: profile.doctor_bio,
        location: profile.location,
        doctor_availability: profile.doctor_availability,
        available_days: profile.available_days,
        specializations: profile.specializations,
      });
      const data = response.data;
      setProfile(prev => ({
        ...prev,
        doctor_bio: data.doctor_bio || '',
        location: data.location || '',
        doctor_availability: !!data.doctor_availability,
        available_days: Array.isArray(data.available_days) ? data.available_days : [],
        specializations: Array.isArray(data.specializations) ? data.specializations : [],
        doctor_image_path: data.doctor_image_path || prev.doctor_image_path,
        national_id_image_path: data.national_id_image_path || prev.national_id_image_path,
        background_image_path: data.background_image_path || prev.background_image_path,
      }));
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !editMode) return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 sm:p-10 flex items-center justify-center">
        <div className="text-lg">Loading profile...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 sm:p-10 flex items-center justify-center">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    </div>
  );

  // Days of week for selection
  const weekDays = [
    { label: 'Sat', value: 'sat' },
    { label: 'Sun', value: 'sun' },
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 sm:p-10">
        <div className="w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              {profile.doctor_image_path ? (
                <img
                  src={profile.doctor_image_path}
                  alt="Doctor"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-10 h-10" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Doctor Profile</h2>
              <p className="text-sm text-gray-500">Manage your professional details</p>
            </div>
          </div>

          {/* Images section */}
          <div className="flex gap-4 mb-6">
            {profile.national_id_image_path && (
              <img
                src={profile.national_id_image_path}
                alt="National ID"
                className="w-32 h-20 object-cover rounded-lg"
              />
            )}
            {profile.background_image_path && (
              <img
                src={profile.background_image_path}
                alt="Background"
                className="w-32 h-20 object-cover rounded-lg"
              />
            )}
          </div>

          {editMode ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <input
                  type="text"
                  name="doctor_bio"
                  value={profile.doctor_bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available</label>
                <input
                  type="checkbox"
                  name="doctor_availability"
                  checked={profile.doctor_availability}
                  onChange={handleChange}
                  className="ml-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map(day => (
                    <label key={day.value} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value={day.value}
                        checked={Array.isArray(profile.available_days) && profile.available_days.includes(day.value)}
                        onChange={handleDaysChange}
                      />
                      {day.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Specializations field can be added here as select/multiselect if you wish */}

              <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 mt-4">
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Bio</p>
                <p className="font-medium">{profile.doctor_bio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{profile.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="font-medium">{profile.doctor_availability ? 'Yes' : 'No'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Available Days</p>
                <p className="font-medium">
                  {Array.isArray(profile.available_days) && profile.available_days.length
                    ? profile.available_days.map(d => weekDays.find(wd => wd.value === d)?.label).join(', ')
                    : 'None'}
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2 mt-6">
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}