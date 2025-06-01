/* 
Author: Sara
Description: A reusable button component that supports custom icons, colors, and click actions.
To use this component, you need to install Heroicons if you haven't already. You can
run this command for icons: npm install @heroicons/react

Input(props): btnColor, btnShade, textColor, hoverShade, focusShade, onClick, icon: Icon, name , path
*/

import { HomeIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

// Map Tailwind color classes to ensure proper purging
const colorClasses = {
  blue: {
    500: 'bg-blue-500',
    600: 'hover:bg-blue-600',
    400: 'focus:ring-blue-400',
  },
  red: {
    500: 'bg-red-500',
    600: 'hover:bg-red-600',
    400: 'focus:ring-red-400',
  },
  green: {
    500: 'bg-green-500',
    600: 'hover:bg-green-600',
    400: 'focus:ring-green-400',
  },
  gray: {
    500: 'bg-gray-500',
    600: 'hover:bg-gray-600',
    400: 'focus:ring-gray-400',
  },
  emerald:{
    500: 'bg-emerald-500',
    600: 'hover:bg-emerald-600',
    400: 'focus:ring-emerald-400',
  },
  white: {
    500: 'bg-white',
    600: 'hover:bg-gray-100',
    400: 'focus:ring-gray-200',
  },
  yellow: {
    500: 'bg-yellow-500',
    600: 'hover:bg-yellow-600',
    400: 'focus:ring-yellow-400',
  },
  purple: {
    500: 'bg-purple-500',
    600: 'hover:bg-purple-600',
    400: 'focus:ring-purple-400',
  },
  pink: {
    500: 'bg-pink-500',
    600: 'hover:bg-pink-600',
    400: 'focus:ring-pink-400',
  },
  indigo: {
    500: 'bg-indigo-500',
    600: 'hover:bg-indigo-600',
    400: 'focus:ring-indigo-400',
  },
  cyan: {
    500: 'bg-cyan-500',
    600: 'hover:bg-cyan-600',
    400: 'focus:ring-cyan-400',
  },
  teal: {
    500: 'bg-teal-500',
    600: 'hover:bg-teal-600',
    400: 'focus:ring-teal-400',
  },
  lime: {
    500: 'bg-lime-500',
    600: 'hover:bg-lime-600',
    400: 'focus:ring-lime-400',
  },
  amber: {
    500: 'bg-amber-500',
    600: 'hover:bg-amber-600',
    400: 'focus:ring-amber-400',
  },
  orange: {
    500: 'bg-orange-500',
    600: 'hover:bg-orange-600',
    400: 'focus:ring-orange-400',
  },
  brown: {
    500: 'bg-brown-500',
    600: 'hover:bg-brown-600',
    400: 'focus:ring-brown-400',
  },
  black: {
    500: 'bg-black',
    600: 'hover:bg-gray-800',
    400: 'focus:ring-gray-700',
  },
  
};

function IconButton({ btnColor, btnShade, textColor, hoverShade, focusShade, onClick, icon: Icon, text , path}) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    if (path && !onClick) {
      navigate(path); // Navigate to the specified path
    } else if (onClick) {
      onClick(); // Execute custom onClick if provided
    }
  };
  
  // Construct Tailwind classes safely
  const bgClass = colorClasses[btnColor]?.[btnShade] || 'bg-gray-500';
  const hoverClass = colorClasses[btnColor]?.[hoverShade] || 'hover:bg-gray-600';
  const focusClass = colorClasses[btnColor]?.[focusShade] || 'focus:ring-gray-400';
  const textClass = `text-${textColor || 'white'}`;

  return (
    <div className="relative">
      <button
        className={`p-2 ${bgClass} ${textClass} rounded-full ${hoverClass} focus:outline-none focus:ring-2 ${focusClass} focus:ring-opacity-75`}
        onClick={handleClick}
        aria-label={text || 'Button'}
      >
        {Icon ? <Icon className="h-6 w-6" /> : text}
      </button>
     </div>
  );
}

export default IconButton;