import React from 'react';
import { Redirect } from 'react-router-dom';
import UserInfo from '@models/UserInfo';

const RoleBasedRoute = () => {
  const role = UserInfo.getRole();
  let redirectUrl;

  if (role === 'organization_admin') {
    redirectUrl = '/orgadmin';
  } else if (role === 'recruiter_head') {
    redirectUrl = '/orgunits';
  } else if (role === 'participant') {
    redirectUrl = '/participant';
  } else if (role === 'program_manager') {
    redirectUrl = '/orgunits';
  }

  return (
    <>
      {(redirectUrl)
        ? (
          <Redirect to={redirectUrl} />
        ) : (
          <Redirect to="/home" />
        )}
    </>
  );
};

export default RoleBasedRoute;
