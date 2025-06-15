// components/dashboard/StatCard.jsx
const StatCard = ({ icon, title, value, color }) => (
    <div className={`${color} p-6 rounded-lg shadow-sm`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
  
  export default StatCard;
  