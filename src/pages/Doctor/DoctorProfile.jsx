import React, { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import apiEndpoints from '../../services/api';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../../components/shared/LoadingOverlay';

//[OKS] add specializations to profile 
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
  const [allSpecializations, setAllSpecializations] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userRes = await apiEndpoints.users.getCurrentUser();
        const doctorRes = await apiEndpoints.profile.getDoctorProfile();
        const specializationRes = await apiEndpoints.specializations.getAll();

        setAllSpecializations(specializationRes.data);

        setProfile({
          name: userRes.data.name,
          email: userRes.data.email,
          doctor_bio: doctorRes.data.doctor_bio || '',
          location: doctorRes.data.location || '',
          doctor_availability: !!doctorRes.data.doctor_availability,
          available_days: Array.isArray(doctorRes.data.available_days) ? doctorRes.data.available_days : [],
          specializations: doctorRes.data.specializations.map(s => s.id),
          doctor_image_path: doctorRes.data.doctor_image_path || null,
          national_id_image_path: doctorRes.data.national_id_image_path || null,
          background_image_path: doctorRes.data.background_image_path || null,
        });
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch profile');
        if (err.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    setProfile((prev) => ({
      ...prev,
      available_days: checked
        ? [...prev.available_days, value]
        : prev.available_days.filter((d) => d !== value),
    }));
  };

  // [OKS] handle specialization selction 
  const handleSpecializationChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions).map((opt) => parseInt(opt.value));
    setProfile((prev) => ({
      ...prev,
      specializations: selectedIds,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiEndpoints.profile.updateDoctorProfile({
        doctor_bio: profile.doctor_bio,
        location: profile.location,
        doctor_availability: profile.doctor_availability,
        available_days: profile.available_days,
        specialization_ids: profile.specializations,
      });

      setProfile((prev) => ({
        ...prev,
        ...res.data,
        specializations: res.data.specializations.map((s) => s.id),
      }));

      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const weekDays = [
    { label: 'Saturday', value: 'sat' },
    { label: 'Sunday', value: 'sun' },
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
  ];

  if (loading && !editMode) return <LoadingOverlay />;
  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
            {profile.doctor_image_path ? (
              <img src={profile.doctor_image_path} alt="Doctor" className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <UserIcon className="w-10 h-10" />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-800">Doctor Profile</h2>
            <p className="text-sm text-gray-500">Manage your professional details</p>
          </div>
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
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <input
                type="text"
                name="doctor_bio"
                value={profile.doctor_bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
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
                className="w-full px-4 py-2 border rounded-lg"
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

            {profile.doctor_availability && (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map((day) => (
                    <label key={day.value} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value={day.value}
                        checked={profile.available_days.includes(day.value)}
                        onChange={handleDaysChange}
                      />
                      {day.label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
              <select
                multiple
                value={profile.specializations}
                onChange={handleSpecializationChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {allSpecializations.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-gray-800 space-y-4">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.doctor_bio}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Available:</strong> {profile.doctor_availability ? 'Yes' : 'No'}</p>
            <p>
              <strong>Available Days:</strong>{' '}
              {profile.available_days.map((d) => weekDays.find((wd) => wd.value === d)?.label).join(', ') || 'None'}
            </p>
            <p>
              <strong>Specializations:</strong>{' '}
              {allSpecializations
                .filter((s) => profile.specializations.includes(s.id))
                .map((s) => s.name)
                .join(', ') || 'None'}
            </p>
            <button onClick={() => setEditMode(true)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
