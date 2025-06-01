/*
Author: Sara
Description: Drugs page for the pharmacy dashboard, showcasing a list of items with delete and edit functionality.
*/
import { useState } from 'react';
import { TrashIcon, PencilIcon, HomeIcon } from '@heroicons/react/24/solid';
import { Search, User, Menu, X } from "lucide-react"
import IconButton from '../components/shared/btn'; 
import Modal from "../components/shared/modal";
import MedCard from '../components/shared/MedCard';

 const Users = [
    {name: 'Specialty 1', Description: "spetiality description", id: '1'},
    {name: 'Specialty 2', Description: "spetiality description", id: '2'},
    {name: 'Specialty 3', Description: "spetiality description", id: '3'},
    {name: 'Specialty 4', Description: "spetiality description", id: '4'},
    {name: 'Specialty 5', Description: "spetiality description", id: '5'},

  ];


function Specialty() {
  const [showModal, setShowModal] = useState(false);
  // const [items, setItems] = useState(['item1' , 'item2']); // Example data
  const [users , setUsers] = useState(Users);

  const handleDelete = (index) => {
    setUsers(Users.filter((_, i) => i !== index));
    setShowModal(false)
  };

  const handleDeleteuser = (index) => {
    setShowModal(true);
    // Logic to delete the user can be added here
    // For now, we just log the index
    console.log(`Deleting user at index: ${index}`);
    // After confirming deletion, you can remove the user from the list
    // setUsers(Users.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    
  };

  return (


    <div className="min-h-screen rounded-[20px] bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto justify-center">
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">Specialty</h1>


        <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <IconButton
          btnColor="emerald"
          btnShade="500"
          textColor="white"
          hoverShade="600"
          focusShade="400"  
          path="/admin/speciality/add"
          text="Add Specialty"
        />
        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Users.map((item, index) => (
            <>
              {/* <MedCard
                user={item}
                Users={Users}
                onDelete={() => handleDeleteuser(index)}
                onEdit={() => handleEdit(index)} 
              /> */}

              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <div className="flex space-x-2">
                    <IconButton
                      btnColor="emerald"
                      btnShade="500"
                      textColor="white"
                      hoverShade="600"
                      focusShade="400"
                      onClick={() => handleEdit(index)}
                      icon={PencilIcon}
                    />
                    <IconButton
                      btnColor="red"
                      btnShade="500"
                      textColor="white"
                      hoverShade="600"
                      focusShade="400"
                      onClick={() => handleDeleteuser(index)}
                      icon={TrashIcon}
                    />
                  </div>
                </div>
                <p className="text-gray-600">Description: {item.Description}</p>
                <p className="text-gray-600">ID: {item.id}</p>
              </div>

              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">Detele user</h2>
                <p>Are you sure you want to delete this user?</p>
                <IconButton
                  btnColor="red"
                  btnShade="500"
                  textColor="white"
                  hoverShade="600"
                  focusShade="400"
                  onClick={() => handleDelete(index)}
                  text="Delete" />
              </Modal>
            </>

          ))}
        </div>

        
      </div>
    </div>
  );
}

export default Specialty;
