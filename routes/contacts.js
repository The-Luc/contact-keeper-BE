const express = require('express');
const router = express.Router();

// @ts-ignore
const { body, validationResult } = require('express-validator');
// @ts-ignore
const config = require('config');
// @ts-ignore
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route		GET	api/contacts
// @desc		Get all users contacts
// @access	Private
router.get('/', auth, async (req, res) => {
  try {
    // @ts-ignore
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    // @ts-ignore
    res.status();
  }
});

// @route		POST	api/contacts
// @desc		Add new contact
// @access	Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;
    // @ts-ignore
    const newContact = new Contact({ name, email, phone, type, user: req.user.id });

    await newContact.save();

    res.json(newContact);
  } catch (error) {}
});

// @route		PUT	api/contacts/:id
// @desc		Update contact
// @access	Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFiels = {};
  name && (contactFiels.name = name);
  email && (contactFiels.email = email);
  phone && (contactFiels.phone = phone);
  type && (contactFiels.type = type);

  const contactId = req.params.id;
  const contact = await Contact.findById(contactId);

  if (!contact) return res.status(404).json({ msg: 'Contact not found' });

  // Make user user own contact
  // @ts-ignore
  if (contact.user.toString() !== req.user.id)
    return res.status(401).json({ msg: 'Not authorized' });

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: contactFiels },
    { new: true }
  );

  res.json(updatedContact);
});

// @route		DELETE	api/contacts/:id
// @desc		Get all users contacts
// @access	Private
// @ts-ignore
router.delete('/:id', auth, async (req, res) => {
  const contactId = req.params.id;
  const contact = await Contact.findById(contactId);

  // Make user user own contact
  // @ts-ignore
  if (contact.user.toString() !== req.user.id)
    return res.status(401).json({ msg: 'Not authorized' });

  await contact?.deleteOne();

  res.json({ msg: 'Contact deleted successfully' });
});

module.exports = router;
