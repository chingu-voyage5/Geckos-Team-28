const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema defines how the user's data will be stored in MongoDB
const routineSchema = new Schema({
	silence: {
		activityId: {
			type: boolean,
			require:true,
			unique:true
		},
		activityName: {
			type: String,
			required:true,
			trim:true
		},
		startTime: {
			type: Date,
			required:true,
			default:Date.now
		},
		endTime: {
			type: Date,
			required:true,
			default:Date.now
		}
	},
	affirmation: {
		activityId: {
			type: boolean,
			require:true,
			unique:true
		},
		activityName: {
			type: String,
			required:true,
			trim:true
		},
		startTime: {
			type: Date,
			required:true,
			default:Date.now
		},
		endTime: {
			type: Date,
			required:true,
			default:Date.now
		}
	},
	visualization: {
		activityId: {
			type: boolean,
			require:true,
			unique:true
		},
		activityName: {
			type: String,
			required:true,
			trim:true
		},
		startTime: {
			type: Date,
			required:true,
			default:Date.now
		},
		endTime: {
			type: Date,
			required:true,
			default:Date.now
		}
	},
	exercise: {
		activityId: {
			type: boolean,
			require:true,
			unique:true
		},
		activityName: {
			type: String,
			required:true,
			trim:true
		},
		startTime: {
			type: Date,
			required:true,
			default:Date.now,
		},
		endTime: {
			type: Date,
			required:true,
			default:Date.now
		}
	},
	reading: {
		activityId: {
			type: boolean,
			require:true,
			unique:true
		},
		activityName: {
			type: String,
			required:true,
			trim:true,
		},
		startTime: {
			type: Date,
			required:true,
			default:Date.now,
		},
		endTime: {
			type: Date,
			required:true,
			default:Date.now,
		}
	},
	scibling: {
		activityId: {
			type: boolean,
			require:true,
			unique:true
		},
		activityName: {
			type: String,
			required:true,
			trim:true,
		},
		startTime: {
			type: Date,
			required:true,
			default:Date.now,
		},
		endTime: {
			type: Date,
			required:true,
			default:Date.now,
		}
	}
});

const routinerModel = mongoose.model('user', routineSchema);

module.exports = routineModel;
