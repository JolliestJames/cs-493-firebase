import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.CATEGORIES}>Note Categories</Link>
      </li>
      <li>
        <Link to={ROUTES.CREATE_CATEGORY}>Create Category</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
