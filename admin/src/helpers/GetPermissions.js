export const GetPermissions = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const permissions = user.roles || [];
  return permissions;
}
