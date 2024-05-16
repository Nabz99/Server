// ./src/routes/index.js

import express from 'express';
import auth from './auth.js';
import admin from './admin.js';
import article from './article.js';
import client from './client.js';
import cmdarticle from './cmdarticle.js';
// import pub from './pub.js';
import versement from './versement.js';

const router = express.Router();

// Apply the auth middleware to all routes except login
router.use('/auth', auth);
router.use('/admin', admin);
router.use('/article', article);
router.use('/client', client);
router.use('/cmdarticle', cmdarticle);
// router.use('/pub', pub);
router.use('/versement', versement);

export { router };
