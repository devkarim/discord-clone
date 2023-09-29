import express from 'express';

import requireAuth from '../middlewares/auth/requireAuth.js';
import categoryValidator from '../validators/category.validator.js';
import categoryController from '../controllers/category.controller.js';

const categoryRouter = express.Router();

// @route     PATCH /categories/:id
// @desc      Edit category
// @access    Private
categoryRouter.patch(
  '/:id',
  requireAuth,
  categoryValidator.editCategory,
  categoryController.editCategory
);

// @route     DELETE /categories/:id/messages
// @desc      Delete category
// @access    Private
categoryRouter.delete(
  '/:id',
  requireAuth,
  categoryValidator.checkId,
  categoryController.deleteServerCategory
);

export default categoryRouter;
