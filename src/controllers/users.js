import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const getCurrentUserInfo = ctrlWrapper(async (req, res) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: req.user,
    },
  });
});
