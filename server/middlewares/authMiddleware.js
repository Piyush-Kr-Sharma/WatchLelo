import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Token Based Protected Routes
export const requireSignIn = async (req, res, next) => {
  // using next we will validate the authenticated user.
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    ); // auth-token from headers and jwt secret key which is stored in .env file. We are using verify method to validate the token with our jwt secret key. If it's valid then we will return the user object. Otherwise if it's not valid then we will throw an error.
    // after it is decoded then we will pass the user object to get the id of the user used in admin middleware and then we will pass the next function. if we don't pass the user using decode then it will not get the user and hence its id...
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id); // we will get the user using its id
    if (user.role !== 1) {
      // checking if it is a user or not, role=1 -> admin & role=0 -> user
      return res.status(401).send({
        // not an admin so show error
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next(); // if the user is admin then run the next function
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Admin middleware",
    });
  }
};
