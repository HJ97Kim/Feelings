import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const StartLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/login"><a>Feelings</a></Link>
      </div>
      {children}
    </div>
  );
};

StartLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StartLayout;