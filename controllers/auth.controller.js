const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');
const User = db.user;

const config = require('../config/auth.config');
const getValidationErrors = require('../helpers/getValidationErrors');

exports.signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, studyAt, city } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).send({ message: 'Email is already in use' });
    }

    const newUser = new User({
      email,
      password: password ? bcrypt.hashSync(password, 8) : null,
      firstName,
      lastName,
      profilePicture: null,
      studyAt: studyAt ? studyAt : null,
      city: city ? city : null,
    });

    await newUser.save();
    res.status(204).json();
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send(getValidationErrors(error));
    }
    res.status(500).json({ message: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return res.status(401).send({ message: `Authentication failed. Invalid email` });
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password' });
    }

    const token = jwt.sign({ id: existingUser._id }, config.secret, {
      expiresIn: config.expiresIn,
    });

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
