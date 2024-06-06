// Componente Card separado
const Card = ({ title, description }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="font-bold mb-2">{title}</div>
      <div>{description}</div>
    </div>
  );

  export default Card; 