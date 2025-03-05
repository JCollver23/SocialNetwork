import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  first: string;
  last: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/, 'Please enter a valid email address'],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
    },
  ]
  },
  {

    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual: Friend Count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);


// userSchema
//   .virtual('fullName')
//   // Getter
//   .get(function () {
//     return `${this.first} ${this.last}`;
//   })
//   // Setter to set the first and last name
//   .set(function (v) {
//     const first = v.split(' ')[0];
//     const last = v.split(' ')[1];
//     this.set({ first, last });
//   });

// // Initialize our User model
// const User = model('user', userSchema);

// User.create({
//     username: 'test',
//     email: 'test@test.com'
// })

export default User;
