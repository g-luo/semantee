import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../../utils/SectionProps';
import Image from '../../elements/Image';
import AboutCard from './AboutCard';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const founders = [
    { name: "Arman",
      role: "COO",
      contact: "armank@berkeley.edu",
      bio: "Account Executive @ AWS.",
      photo: "arman.png"
    },
    {
      name: "Qutub Khan",
      role: "--",
      contact: "qutubkhan.vajihi@berkeley.edu",
      bio: "Applied Data Science & Machine Learning Data Scientist @ PayPal, Data Analyst @ Unilever.",
      photo: "qutub.png"
    },
    { name: "Grace",
      role: "--",
      contact: "graceluo@berkeley.edu",
      bio: "Vision & Language Research @ BAIR. PM @ Berkeleytime.",
      photo: "grace.png"
    }, 
    {
      name: "Kourosh",
      role: "--",
      contact: "kourosh_hakhamaneshi@berkeley.edu",
      bio: "RL + Unsupervised Learning Research @ BAIR.",
      photo: "kourosh.png"
    }

  ]

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <div className="features-tiles-header">
            <h4> Our Team </h4>
            <p className="text-sm" > We are a team of UC Berkeley business students, data scientists, and researchers
            who are passionate about making data discovery and business report building as simple as chatting with a friend.</p>
          </div>
          <div className={tilesClasses}>
            {founders.map((founder) => {
              return <AboutCard name={founder.name} role={founder.role} contact={founder.contact} bio={founder.bio} photo={founder.photo}/>
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;