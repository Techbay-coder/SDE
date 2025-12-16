export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};
export const getRoleDisplayName = (role: string): string => {
  return role.replace(/_/g, ' ');
}