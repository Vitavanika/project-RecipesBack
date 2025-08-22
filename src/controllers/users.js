import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const getCurrentUser = async (req, res) => {
  const { user } = req;
  
  res.json({
    status: 'success',
    code: 200,
    data: {
      user,
    },
  });
};

export default {
  getCurrentUser: ctrlWrapper(getCurrentUser),
};
// ss