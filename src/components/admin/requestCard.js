import React from 'react';

//patientName requestDate status action(approve/reject)
function OrderCard({ id, patientName, requestDate, quantity, status }) {
  // Map status to Tailwind classes for styling
  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  const statusClass = statusStyles[status] || 'bg-gray-100 text-gray-800';

  let action;

  function handelAction({ status, id }) {
    if (status === 'Pending') {
        action = (
            <div className="flex items-center space-x-2">
                <button
                className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-300 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={() => alert(`Approved order ${id}`)}
                >
                Approve
                </button>
                <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => alert(`Rejected order ${id}`)}
                >
                Reject
                </button>
            </div>
        )
        
        } else if (status === 'Approved') {
            action = (
                <div className="flex items-center space-x-2">
                    <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => alert(`Viewing details for order ${id}`)}
                        >
                        View Details
                    </button>
                    {/* <button
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        onClick={() => alert(`Editing order ${id}`)}
                    >
                        Edit
                    </button>
                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        onClick={() => alert(`Deleting order ${id}`)}
                    >
                        Delete
                    </button> */}
                </div>
            )
        } else if (status === 'Rejected') {
            // action = (
            //     <div className="flex items-center space-x-2">
            //         <button
            //         className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            //         onClick={() => alert(`Approved order ${id}`)}
            //         >
            //         Approve
            //         </button>
            //     </div>
            // )
           
        }

        return action;
  }

  return (
    <div className="w-full flex items-center justify-between p-4 rounded-[15px] bg-white border-b border-gray-200 hover:bg-emerald-50 transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900">Request #{id}</div>
        <div className="text-sm text-gray-600 truncate">
          <span className="font-medium">Patient:</span> {patientName}
        </div>
      </div>
      <div className="flex-1 min-w-0 text-sm text-gray-600 truncate">
        <span className="font-medium">requestDate:</span> {requestDate}
      </div>
      {/* <div className="flex-1 min-w-0 text-sm text-gray-600">
        <span className="font-medium">Quantity:</span> {quantity}
      </div> */}
      <div className="flex-1 min-w-0 text-sm">
        <div className="w-[100px] h-[32px] flex items-center justify-center">
            <span
            className={`w-full text-center px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
            >
            {status}
            </span>
        </div>
      </div>

      <div className="flex justify-center items-center w-[250px] h-[40px]">
        {handelAction({ status, id })}
      </div>

        {/* <div className="flex items-center space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => alert(`Viewing details for order ${id}`)}
        >
          View Details
        </button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          onClick={() => alert(`Editing order ${id}`)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={() => alert(`Deleting order ${id}`)}
        >
          Delete
        </button>
        </div> */}
    </div>
  );
}

export default OrderCard;