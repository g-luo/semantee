import React from 'react';
import classNames from 'classnames';
import Image from '../../elements/Image';


const AboutCard = ({
  name,
  role, 
  contact,
  bio,
  photo,
  ...props
}) => {

  const photo_object = require('./../../../assets/images/about/' + photo);

  return (
      <div className="tiles-item reveal-from-bottom">
        <div className="tiles-item-inner bio-card">
          <div className="features-tiles-item-header">
            <div className="features-tiles-item-image mb-16">
              <Image
                src={photo_object}
                alt="Features tile icon 01"
                width={180}
                height={180} />
            </div>
          </div>
          <div className="features-tiles-item-content bio-info">
            <h5 className="mt-0 mb-8 ta-l">
              {name}
            </h5>
            <p className="m-0 text-xs ta-l">
              {role}
            </p>
            <p className="m-0 text-xs ta-l">
              {bio}
            </p>
          </div>
        </div>
      </div>
  );
}

export default AboutCard;