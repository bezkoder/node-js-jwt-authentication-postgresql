import { RequestHandler } from "express";

export const allAccess: RequestHandler = (req, res) => {
  res.status(200).send("Public Content.");
};

export const userBoard: RequestHandler = (req, res) => {
  res.status(200).send("User Content.");
};

export const adminBoard: RequestHandler = (req, res) => {
  res.status(200).send("Admin Content.");
};

export const moderatorBoard: RequestHandler = (req, res) => {
  res.status(200).send("Moderator Content.");
};
