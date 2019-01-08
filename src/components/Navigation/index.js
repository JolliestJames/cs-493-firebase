import React from 'react';
import { Link } from 'react-router-dom';

import * as Routes from '../constant/routes';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={Routes.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={Routes.HOME}>Home</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
