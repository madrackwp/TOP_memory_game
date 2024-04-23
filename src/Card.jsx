/* eslint-disable react/prop-types */
function Card({ imageSrc, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageSrc} alt="" />
    </div>
  );
}

export default Card;
