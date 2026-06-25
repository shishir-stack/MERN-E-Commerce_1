// routes/cartRoutes.js
import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getUserCart, updateCart } from './../controller/cartController.js';
import { addToCart } from './../controller/cartController.js';

const cartRoutes = express.Router();

cartRoutes.post('/get', isAuth, getUserCart);
cartRoutes.post('/add', isAuth, addToCart);
cartRoutes.post('/update', isAuth, updateCart);

export default cartRoutes;