// import dependencies
import { Schema, model } from 'mongoose';

// define handler
const TodoSchema = new Schema({
    id: {
        type: String
    },

    title: {
        type: String,
        // required: true
    },

    completed: {
        type: Boolean,
        // default: false
    },

    body: {
        type: String,
        // required: true
    },
    dueDate: {
        type: Date,
        default: Date.now(),
        // required: false
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "High",
        // required: false
    }

});

const Todo = model("Todo", TodoSchema);

// export handler
export default Todo;