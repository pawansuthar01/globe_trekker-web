import { Router } from "express";
import { addNewContact } from "../controller/userContact.controller.js";

const userContact = Router();
userContact.post("/", addNewContact);
export default userContact;
