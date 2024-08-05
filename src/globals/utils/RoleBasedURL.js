// eslint-disable-next-line import/prefer-default-export
const roleUrl = {
  'Recruiter Head': '/recruiter/assessment',
  'Program manager': '/programmanager',
};

export const getRoleUrl = (role) => roleUrl[role] || '/';

export default getRoleUrl;
