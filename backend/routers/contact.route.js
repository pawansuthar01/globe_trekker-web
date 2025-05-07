import { Router } from "express";
import { getContact } from "../controller/contact.controller.js";

const contact = Router();
contact.get("/", getContact);
export default contact;
