import { Router } from "express";
import { submitForm } from "../controllers/form.js"
const formRouter = Router();

// ??
const isLoggedIn = (req, res) => {
    return req.session.user.id != null
}

formRouter.post('/', isLoggedIn, submitForm)

export default formRouter;