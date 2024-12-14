const { generateToken } = require('../helpers/jwtHelper.js'); // Helper function to generate JWT token


const loginController = (req, res) => {
    const { email, password } = req.body;
    
    const validEmail = process.env.VALID_EMAIL;
    const validPassword = process.env.VALID_PASSWORD;

    console.log('Received login request:', { email, password });
    console.log('Valid email:', validEmail, 'Valid password:', validPassword);

    if (email === validEmail && password === validPassword) {

        const token = generateToken(email);
        return res.status(200).json({ message: 'Login successful', token });
    }

    res.status(401).json({ message: 'Invalid email or password' });
};

module.exports = {
    loginController,
};
