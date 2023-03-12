const User = require("../models/userModel");

exports.follow_Unfollow = async (req, res) => {
  try {
    // 1: check if the user to be followed is different then the current user
    // 2: check if both the current user, and the user to be followed already exist
    // 3: check if the current user is not following the second one already and vise versa

    if (req.params.id !== req.body.currentUserId) {
      try {
        const currentUser = await User.findById(req.body.currentUserId);

        if (!currentUser) {
          return res
            .status(400)
            .json({ message: "please login before you start this request" });
        }

        const userToBeFollowed = await User.findById(req.params.id);
        if (!userToBeFollowed) {
          return res
            .status(404)
            .json({ message: "user to be followed is not found" });
        }

        if (!userToBeFollowed.followers.includes(req.body.currentUserId)) {
          await userToBeFollowed.updateOne({
            $push: { followers: req.body.currentUserId },
          });

          await currentUser.updateOne({
            $push: { following: req.params.id },
          });
          res.status(200).json("you are now following this user");
        } else {
          await userToBeFollowed.updateOne({
            $pull: { followers: req.body.currentUserId },
          });

          await currentUser.updateOne({
            $pull: { following: req.params.id },
          });
          res.status(200).json("you are now unfollowing this user");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return res
        .status(409)
        .json({ message: "you cannot follow/unfollow yourself" });
    }
  } catch (err) {
    console.log(err);
  }
};
