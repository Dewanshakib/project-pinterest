import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check all fields
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // check the user exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send({ message: "Already have an account with this email" });
    }

    // hashpassword before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // save the user
    const regUser = await User.create({ name, email, password: hashPassword });

    // generate token
    const token = jwt.sign({ _id: regUser._id }, process.env.SECRET_KEY, {
      expiresIn: "15d",
    });

    // send cookies
    res.cookie("token", token, {
      maxAge: 15 * 3600 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return res
      .status(200)
      .send({ message: "User registerd successfully", regUser, token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check all fields
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // check the user does exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User with this email is not registerd" });
    }

    // compare password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).send({ message: "Password did'nt matched" });
    }

    // generate token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15d",
    });

    // send cookies
    res.cookie("token", token, {
      maxAge: 15 * 3600 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return res
      .status(200)
      .send({ message: "User Logged In successfully", token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// protected route me
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// get user from params id
export const getProfile = async (req, res) => {
  const data = await User.findById(req.params.id).select("-password");
  res.send(data);
};

// get user detail for follow & unfollow
export const followAndUnfollowUser = async (req, res) => {
  // getting user data from req params
  const user = await User.findById(req.params.id);

  // getting user data of logged in user
  const loggedInUser = await User.findById(req.user._id);

  // check if user from params does exits
  if (!user) {
    return res.status(400).send({ message: "User with this id not found" });
  }

  // check that if i am following myself
  if (user._id.toString() === loggedInUser._id.toString()) {
    return res.status(400).send({ message: "You can't follow yourself" });
  }

  // find which number of index i am following the user
  if (user.followers.includes(loggedInUser._id)) {
    const indexOfFollowing = loggedInUser.followings.indexOf(user._id);
    const indexOfFollowers = user.followings.indexOf(loggedInUser._id);

    loggedInUser.followings.splice(indexOfFollowing, 1); // unfollowing
    user.followers.splice(indexOfFollowers, 1); // removing myself from follower

    await loggedInUser.save();
    await user.save();

    return res.status(200).send({ message: "User unfollowed" });
  } else {
    loggedInUser.followings.push(user._id); // i am following user
    user.followers.push(loggedInUser._id); //  i am a follower of user

    await loggedInUser.save();
    await user.save();

    return res.status(200).send({ message: "User followed" });
  }
};


// logOut user
export const logOutUser = async (req,res) => {
  try {
    res.cookie("token","",{
      maxAge:0
    })
    return res.status(200).send({message:"Logged Out Successfully"})
  } catch (error) {
    return res.status(400).send({error:error.message})
  }
}