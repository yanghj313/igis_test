// Example Header Component
import React from 'react';

type Props = {
  userAgent: 'pc' | 'tablet' | 'mb';
};

const Header = ({ userAgent }: Props) => {
  return (
    <header>
      <h1>IGIS Header ({userAgent})</h1>
    </header>
  );
};

export default Header;
