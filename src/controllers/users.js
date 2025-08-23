import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const getCurrentUser = ctrlWrapper(async (req, res) => {
  const { user } = req;
  
  res.json({
    status: 'success',
    code: 200,
    data: {
      user,
    },
  });
});
