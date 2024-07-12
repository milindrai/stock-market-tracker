const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      user.verified = true;
      await user.save();
      
      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };
  
  router.get('/verify/:token', verifyEmail);
  