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
    
    {
      name: "Kourosh",
      role: "Chief Executive Officer",
      contact: "kourosh_hakhamaneshi@berkeley.edu",
      linkedin: "https://www.linkedin.com/in/kourosh-hakhamaneshi-4816a58a/",
      bio: "RL + Unsupervised Learning Research @ BAIR.",
      photo: "kourosh.png"
    },
    { name: "Grace",
      role: "Chief Product Officer",
      contact: "graceluo@berkeley.edu",
      linkedin: "https://www.linkedin.com/in/g-luo/",
      bio: "Vision & Language Research @ BAIR. PM @ Berkeleytime.",
      photo: "grace.png"
    }, 
    { name: "Arman",
      role: "Chief Operating Officer",
      contact: "armank@berkeley.edu",
      linkedin: "https://www.linkedin.com/in/arman-k/",
      bio: "Account Executive @ AWS.",
      photo: "arman.png"
    },
    {
      name: "Qutub Khan",
      role: "Chief Tech Officer",
      contact: "qutubkhan.vajihi@berkeley.edu",
      linkedin: "https://www.linkedin.com/in/qutubkhanvajihi/",
      bio: "Data Scientist @ PayPal, Data Analyst @ Unilever.",
      photo: "qutub.png"
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
              return <AboutCard name={founder.name} role={founder.role} contact={founder.contact} linkedin={founder.linkedin} bio={founder.bio} photo={founder.photo}/>
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