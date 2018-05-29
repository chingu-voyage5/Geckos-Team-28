const express = require('express');
const passport = require('passport');

const router = express.Router();
const Routine = require('../../models/routineSchema');
const User = require('../../models/userSchema');

const validateRoutine = require('../validation/validateRoutine');

/**
 * @route   GET api/routines
 * @desc    Get routines
 * @access  Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) =>
	Routine.find()
		.sort({ date: -1 })
		.then(routines => res.json(routines))
		.catch(err => res.status(404).json({ noRoutinesFound: 'No routines, or something bad happened :(', devMsg: err }))
);

/**
 * @route   GET api/routines/:routine_id
 * @desc    Get specific routine by id
 * @access  Private
 */
router.get('/:routine_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Routine.findById(req.params.routine_id)
		.then(routine => res.json(routine))
		.catch(err => res.status(404).json({ noRoutineFound: "We couldn't find routine with that ID", devMsg: err }));
});

/**
 * @route   POST api/routines
 * @desc    Create new routine
 * @access  Private
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateRoutine(req.body);
	const { id } = req.user;
	const newRoutine = new Routine({
		user: id,
	});
	// Check if input is valid
	if (!isValid) return res.status(400).json(errors);

	newRoutine
		.save()
		.then(routine => res.json(routine))
		.catch(err => res.status(400).json(err));
});

/**
 * @route   DELETE api/routines/:routine_id
 * @desc    Delete routine by id
 * @access  Private
 */
router.delete('/:routine_id', passport.authenticate('jwt', { session: false }), (req, res) =>
	User.findOne({ user: req.user.id }).then(profile => {
		if (!profile) return res.status(404);

		Routine.findById(req.params.routine_id)
			.then(routine => {
				// Check for routine owner
				if (routine.user.toString() !== req.user.id)
					return res.status(401).json({ notAuthorized: 'Not authorized to do that' });

				// Delete routine
				routine
					.remove()
					.then(() => res.json({ success: 'Routine deleted' }))
					.catch(err => res.status(404).json({ routineNotFound: 'Routine not found', devMsg: err }));
			})
			.catch(err => res.status(404).json({ routineNotFound: 'Routine not found', devMsg: err }));
	})
);

/**
 * @route   POST api/routines/activity/:routine_id
 * @desc    Add activity to routine
 * @access  Private
 */
router.post('/activity/:routine_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateRoutine(req.body);
	// Check if input is valid
	if (!isValid) return res.status(400).json(errors);

	Routine.findById(req.params.routine_id)
		.then(routine => {
			const newActivity = {
				user: req.user.id,
			};

			// Add to activities array
			routine.activities.unshift(newActivity);
			// Save
			routine
				.save()
				.then(_routine => res.json(_routine))
				.catch(err => res.status(404).json({ routineNotFound: 'Routine not found', devMsg: err }));
		})
		.catch(err => res.status(404).json({ routineNotFound: 'Routine not found', devMsg: err }));
});

/**
 * @route   DELETE api/routines/activity/:routine_id/:activity_id
 * @desc   	Delete activity from routine
 * @access  Private
 */
router.delete('/activity/:routine_id/:activity_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Routine.findById(req.params.routine_id)
		.then(routine => {
			// Check if activity exists
			if (routine.activities.filter(activity => activity._id.toString() === req.params.activity_id).length === 0) {
				return res.status(404).json({ activityNotExists: "Can't find that activity" });
			}

			// Remove activity from activities array
			routine.activities = routine.activities.filter(activity => activity._id.toString() !== req.params.activity_id);
			routine
				.save()
				.then(_routine => res.json(_routine))
				.catch(err => res.json({ errHappened: 'Somethings wrong, please try again', devMsg: err }));
		})
		.catch(err => res.status(404).json({ activityNotExists: "Can't find that activity", devMsg: err }));
});

module.exports = router;
