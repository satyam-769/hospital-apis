import mongoose from 'mongoose';

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  reports:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reports',
    }
  ]
}, {
  timestamps: true
}
)

const User = mongoose.model('User', userSchema);
export default User;
