export const getCurrentUser = async (req, res) => {
  const { user } = req;
  
  res.json({
    status: 200,
    message: 'Successfully retrieved current user information',
    data: user
  });
};
