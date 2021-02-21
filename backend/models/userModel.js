import mongoose from 'mongoose'
import brcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await brcrypt.compare(enteredPassword, this.password)
}

// `pre` method with value `save` will run the code before saving
userSchema.pre('save', async function (next) {
  // do this only if the password field is sent or modified
  // later on when we make an updateProfile function
  // we don't want this function to run or else we'll
  // have a new salt generated and we won't be able to login
  if (!this.isModified('password')) {
    next()
  }

  // Salt is request to hash the password asynchronously
  const salt = await brcrypt.genSalt(10)
  this.password = await brcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
