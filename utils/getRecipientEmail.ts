export const getRecipientEmail = (users, userLoggedIn) => {
  return users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];
};
