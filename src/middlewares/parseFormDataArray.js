// NOTE: This middleware is used to parse form data arrays from multipart/form-data requests
// Since it always sends all fields as strings, we need to manually parse arrays
// Use this middleware in your routers where you expect multipart/form-data with arrays
// Example usage:
// router.post('/',parseFormDataArrays,validateBody(createRecipeSchema),createRecipeController);

export const parseFormDataArrays = (req, res, next) => {
  for (const [key, value] of Object.entries(req.body)) {
    // Check if the value "looks like" an array
    if (
      typeof value === 'string' &&
      value.trim().startsWith('[') &&
      value.trim().endsWith(']')
    ) {
      try {
        // Try to parse the string as json array
        req.body[key] = JSON.parse(value);
        // Return early if its not an array, since then we most likely got garbage data
        // Like in swagger example, it has bad support for arrays
        if (!Array.isArray(req.body[key])) {
          return res.status(400).json({ message: `${key} must be an array` });
        }
      } catch {
        return res
          .status(400)
          .json({ message: `Invalid JSON format for field "${key}"` });
      }
    }
  }

  // Since we parsed array AND changed the request body, we dont need to parse it again later
  // Most likely
  next();
};
