/* eslint-disable react/prop-types */

import Card from "./Card";

function Cards({ handleClick, imageMappings, shuffledKeys }) {
  return (
    <div className="cards-list">
      {shuffledKeys.map((key) => (
        <Card
          key={key}
          imageSrc={imageMappings[key]}
          onClick={() => handleClick(key)}
        />
      ))}
    </div>
  );
}

export default Cards;
