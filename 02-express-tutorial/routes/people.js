import {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
} from "../controllers/people.js";
import express from "express";
const router = express.Router();

// we gave base path "/api/people" in app.js, that's why we use "/" here
// router.get("/", getPeople);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

// ALTERNATIVE WAY
router.route("/").get(getPeople).post(createPerson);
router.route("/:id").put(updatePerson).delete(deletePerson);

export default router;
