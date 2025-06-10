  import React, { useState, useEffect } from 'react';
  import Sidebar from '../components/shared/sidebar';
  import { UserIcon } from '@heroicons/react/24/solid';
  import apiEndpoints from '../services/api';
  import { useNavigate } from 'react-router-dom';
  import LoadingOverlay from '../components/shared/LoadingOverlay'; 
  
// [OKS] view and edit patient profile page
  export default function PatientProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
      name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      patient_image_path: '' // [SENU] ADD IMAGE
    });
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // ON MOUNT
    useEffect(() => {
      const fetchProfile = async () => {
        setLoading(true);
        try {
          const userResponse = await apiEndpoints.users.getCurrentUser();
          
          const patientResponse = await apiEndpoints.profile.getPatientProfile();
          console.log("Fetched patient data:", patientResponse.data);  // <-- SENU GIVE A LOOK
          
          // patient_image_path
          console.log("useEffect: the data = ", patientResponse.data.patient_image_path )
          setProfile({
            name: `${userResponse.data.name}`,
            email: userResponse.data.email,
            phone: patientResponse.data.phone,
            date_of_birth: patientResponse.data.date_of_birth,
            patient_image_path: patientResponse.data.patient_image_path || '' //[SENU]: ADD IMAGE
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

    // END OF MOUNT

    const handleChange = (e) => {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const response = await apiEndpoints.profile.updatePatientProfile({
          phone: profile.phone,
          date_of_birth: profile.date_of_birth,
        });
        
        setProfile(prev => ({
          ...prev,
          phone: response.data.phone,
          date_of_birth: response.data.date_of_birth,
        }));
        setEditMode(false);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to update profile');
      } finally {
        setLoading(false);
      }
    };

     if (loading && !editMode) {
        return (
          <div className="flex min-h-screen bg-gray-100">
            <LoadingOverlay />
          </div>
        );
      }
    if (error) return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 p-6 sm:p-10 flex items-center justify-center">
          <div className="text-red-500 text-lg">Error: {error}</div>
        </div>
      </div>
    );

    return (
      <div className="flex min-h-screen bg-gray-100">

        <div className="flex-1 p-6 sm:p-10">
          <div className="w-full bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">

              {/* [SENU] ADD CONDITION: ICON || IMAGE */}
              {profile.patient_image_path ? (
                <img
                  src={profile.patient_image_path}
                  alt="Patient"
                  className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
              {/* CHANGE END */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Patient Profile</h2>
                <p className="text-sm text-gray-500">Manage your personal details</p>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={profile.date_of_birth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

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
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : ''}
                  </p>
                </div>
                <div className="col-span-1 sm:col-span-2 mt-6">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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