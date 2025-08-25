export const welcomeMessage = (req, res) => {
    res.json({
        message: 'Welcome to the Recipes API! Use https://project-recipesback.onrender.com/api-docs to see API documentation.',
    });
};