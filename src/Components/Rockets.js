import { React } from 'react';
import { useSelector } from 'react-redux';
import Rocket from './Rocket';

const Rockets = () => {
  const rockets = useSelector((state) => state.rockets);
  return (
    <div className="rocket-list m-5 p-3">
      { rockets.map((rocket) => (
        <Rocket
          key={rocket.id}
          id={rocket.id}
          rocketName={rocket.rocket_name}
          description={rocket.description}
          flickrImages={rocket.flickr_images}
          reserved={rocket.reserved || false}
        />
      ))}
    </div>
  );
};

export default Rockets;
