const roleUrl = {
  'Recruiter Head': '/recruiter/assessment',
  'Program manager': '/programmanager',
};

export const getRoleUrl = (role) => roleUrl[role] || '/';

export default getRoleUrl;
