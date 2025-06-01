function MedCard({ children, className = '' }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
// medCard.displayName = 'MedCard';
export default MedCard;