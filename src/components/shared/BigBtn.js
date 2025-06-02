import React from "react";


/**
 * COMPONENT:=> GENERAL BIG BUTTON:
 * @param: text: text inside it
 * @param: function that will work when clicking
 * @param: take the color [not added yet]
 * AUTHOR BY: [SENU 🇪🇬]
*/

export default function BigBtn({ text, onClick }) {
  return (

    // BUTTON
    <button onClick={onClick}
            className=" w-full
                        bg-[#0A9A73]
                        text-white
                        py-2
                        rounded-lg
                        text-lg
                        hover:bg-black
                        transition
                        duration-200"
    >
      {text}
    </button>
  );
}
