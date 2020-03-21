const Router = require("express").Router;
const { loginValidation } = require("../../validators/joiValidator");
const userService = require("../../services/auth.service")();

const router = Router({
    mergeParams: true
});
// Login
router.post("/login", async(req, res, next) => {
    try {
        loginValidation(req.body);
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;