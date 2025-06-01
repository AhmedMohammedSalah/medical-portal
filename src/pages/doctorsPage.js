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
    {name: 'Sara Mahmoud', speciality: "spetiality", id: '1'},
    {name: 'Amira Mohamed', speciality: "spetiality", id: '2'},
    {name: 'Ahmed Salah', speciality: "spetiality", id: '3'},
    {name: 'Ahmed Senuse', speciality: "spetiality", id: '4'},
    {name: 'Omar Khaled', speciality: "spetiality", id: '5'},

  ];


function Doctors() {
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
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">Doctors</h1>


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
          path="/admin/users/add"
          text="Add Doctor"
        />
        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Users.map((item, index) => (
            <>
              <MedCard
                user={item}
                Users={Users}
                onDelete={() => handleDeleteuser(index)}
                onEdit={() => handleEdit(index)} 
              />
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

export default Doctors;
