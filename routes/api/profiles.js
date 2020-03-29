const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const User  = require('../../models/User');

// validations
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


// @route GET api/profiles
// @desc Get CURRENT User profile
// @access Private
router.get(
  '/', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id }) 
    // bringing name and avatar from "user" collection
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(() => res.json({ noprofile: 'There is no profile for this user' }));
  }     
);

// @route   GET api/profiles/all
// @desc    Get ALL Users profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  // .find() is for ALL
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if (profiles.length === 0) {
      errors.noprofile = 'There are no profiles';
      return res.status(404).json(errors);
    }
    res.json(profiles);
  })
  .catch(() => res.status(404).json({ noprofile: 'There are no profiles' }));
});

// @route   GET api/profiles/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.json(profile);
  })
    .catch(() => res.json({ noprofile: 'There is no profile for this user' }));
});

// @route   GET api/profiles/user/:user_id
// @desc    Get profile by User _id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors)
    }
    res.json(profile)
  })
  .catch(() => res.status(404).json({ noprofile: 'There is no profile for this user' }));
});

// @route POST api/profile
// @desc CREATE or UPDATE User profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }  

    // Get fields (fill up the empty textboxes on UI). Since it includes "optional" boxes, here we write "if statement" and only fill up the given information in profileFields object
    const profileFields = {};
    
    profileFields.user = req.user.id;

    if (req.body.handle) {
      profileFields.handle = req.body.handle
    }

    if (req.body.company) {
      profileFields.company = req.body.company
    }

    if (req.body.website) {
      profileFields.website = req.body.website
    }

    if (req.body.location) {
      profileFields.location = req.body.location
    }

    if (req.body.bio) {
      profileFields.bio = req.body.bio
    }

    if (req.body.status) {
      profileFields.status = req.body.status
    }

    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername
    }

    // SKILLS : split into an Array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',')
    }

    // SOCIAL 
    profileFields.social = {};
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube
    }

    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter
    }

    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook
    }

    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin
    }

    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram
    }

    Profile.findOne({user: req.user.id})
    .then(profile => {
      if (profile) {
        // UPDATE the current profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile));
      } else {
        // CREATE a new profile

        // BUT check if the handle exists!
        Profile.findOne({ handle: profileFields.handle }) 
        .then(profile => {
          if (profile) {
            errors.handle = 'This handle already exists';
            return res.status(400).json(errors);
          } 
          // if there is no duplicate handle, then SAVE Profile
          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))       
        });
      }
    })
  }
);

// @route api/profiles/experience
// @desc ADD Experience to profile
// @access Private
router.post(
  '/experience',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors)
    }
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.to,
          description: req.body.description
        };

        // ADD to experience array
        // shifting newExp to the experience array
        profile.experience.unshift(newExp);

        // save
        profile.save()
        .then(profile => res.json(profile))
      } else {
        return res.status(404).json({ profile: 'Profile not found' });
      }
    })
    .catch(() => res.status(404).json({ profile: 'Profile not found' }));
  }
);

// @route POST api/profiles/education
// @desc ADD Education to the profile
// @access Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current
          };

          // ADD to experience array
          // shifting newEdu to the education array
          profile.education.unshift(newEdu);
          profile.save()
            .then(profile => res.json(profile))
        } else {
          return res.status(404).json({ profile: 'Profile not found' });
        }
      })
      .catch(() => res.status(404).json({ profile: 'Profile not found' }));
  }
);

// @route api/profile/experience/:exp_id
// @desc DELETE Experience from profile
// @access Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // get INDEX that want to be REMOVED
        // each {education} has its own unique _id generated by MongoDB
        const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

        if (removeIndex === -1) {
          errors.educationnotfound = 'Education not found';
          return res.status(404).json(errors);
        }

        // Splice the array
        profile.education.splice(removeIndex, 1);

        profile.save()
        .then(profile => res.json(profile));
      } else {
        err => res.status(404).json(err)
      }
    })
    .catch(err => res.status(404).json(err))
  }
)

// @route api/profiles/education/:edu_id
// @desc DELETE Education from profile
// @access Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // get INDEX that want to be REMOVED
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        if (removeIndex === -1) {
          errors.experiencenotfound = 'Experience not found';
          return res.status(404).json(errors);
        }

        // splice the array
        profile.experience.splice(removeIndex, 1);

        // save
        profile.save()
          .then(profile => res.json(profile));
      } else {
        return res.status(404).json({ profile: 'Profile not found' });
      }
    })
    .catch(() => res.status(404).json({ profile: 'Profile not found' }));
  }
);

// @route api/profiles/delete
// @desc DELETE User and Profile
// @access Private

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findByIdAndRemove({ _id: req.user.id })
      .then(() => res.json({ success: true }));
    })
  }
);

module.exports = router;