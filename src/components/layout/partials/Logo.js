import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <h1 className="m-0">
      </h1>
    </div>
  );
}

export default Logo;

// <Link to="/">
//   <Image
//     src={require('./')}
//     alt="Open"
//     width={32}
//     height={32} />
// </Link>