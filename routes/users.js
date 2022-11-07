var express = require("express");
const User = require("../model/User");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await User.find();
  res.render("home", { users });
});

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email, password });
  if (!user) {
    res.redirect("/");
  }

  res.redirect("/users");
});
router.post("/addUser", async function (req, res, next) {
  const { email, username } = req.body;
  console.log(email, username);
  // solution 1 to add user by using save().then()
  // const addedUser = user

  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     res.redirect("/users");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // solution 2 to add user by using await
  // (you should use async function in the head of the function)
  try {
    const user = new User({ email, username });
    const addedUser = await user.save();
  } catch (error) {
    res.json(error.message);
  }
});

// delete user by his id
router.get("/deleteUser/:id", async function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    // method to delete user by id
    // const user = await User.findByIdAndDelete(id);
    // other method to delete user by id
    await User.findOneAndDelete({ _id: id });
    res.redirect("http://localhost:3000/users");
  } catch (error) {
    res.json(error.message);
  }
});


// delete user by his id
router.delete("/deleteUser/:id", async function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    // method to delete user by id
    // const user = await User.findByIdAndDelete(id);
    // other method to delete user by id
    const checkIfUserExists = await User.findOne({ _id: id });
    if(!checkIfUserExists) {
      throw new Error("User does not exists !");
    }
    await User.findOneAndDelete({ _id: id });
    res.json("User deleted successfuly !");
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get('/notif', async function(req, res, next){
  res.render("notification")
})
module.exports = router;
