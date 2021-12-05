import { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import { config } from "../config/auth.config";
import { db } from "../models";
import { User } from '../models/user.model';





const verifyToken: RequestHandler = (req, res, next) => {
  let token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    (req as any).userId = decoded.id;
    next();
  });
};

const isAdmin: RequestHandler = (req, res, next) => {
  User.findByPk((req as any).userId).then(user => {
    user!.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const isModerator: RequestHandler = (req, res, next) => {
  User.findByPk((req as any).userId).then(user => {
    user!.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

const isModeratorOrAdmin: RequestHandler = (req, res, next) => {
  User.findByPk((req as any).userId).then(user => {
    user!.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

export const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

