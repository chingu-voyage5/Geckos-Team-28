const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema defines how the user's data will be stored in MongoDB
const routineSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	blockName: {
		type: String, // for example - SILENCE
		required: true, // name should be required and description should be optional
		trim: true,
	},
	description: {
		// for example - Be quiet in your mind and focus on your breathing
		type: String,
		trim: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	activities: [
		{
			// this is the single activity
			name: {
				// for example Meditation, affirmation and etc
				type: String,
				required: true,
				trim: true,
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
			startTime: {
				type: Date,
				required: true, // start time is required but end time is optional
				default: Date.now,
			},
			endTime: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

const routineModel = mongoose.model('routine', routineSchema);

module.exports = routineModel;
