import { Errors } from 'models';

import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from '../services/category.js';
import ServerResponse from '../models/response.js';
import { canMemberDoAction } from '../services/member.js';
import categoryValidator from '../validators/category.validator.js';

const editCategory: typeof categoryValidator.editCategory = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const categoryId = +req.params.id;
  if (!categoryId || isNaN(categoryId)) throw Errors.category.invalidId;
  const category = await getCategoryById(categoryId, req.user.id);
  if (!category) throw Errors.category.invalidId;
  const hasAccess = await canMemberDoAction(
    req.user.id,
    category.serverId,
    'MANAGE_SERVER'
  );
  if (!hasAccess) throw Errors.unauthorized;
  const newCategory = await updateCategory(categoryId, req.body);
  return ServerResponse.success(res, newCategory);
};

const deleteServerCategory: typeof categoryValidator.checkId = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const categoryId = +req.params.id;
  if (!categoryId || isNaN(categoryId)) throw Errors.category.invalidId;
  const category = await getCategoryById(categoryId, req.user.id);
  if (!category) throw Errors.category.invalidId;
  const hasAccess = await canMemberDoAction(
    req.user.id,
    category.serverId,
    'MANAGE_SERVER'
  );
  if (!hasAccess) throw Errors.unauthorized;
  if (category._count.channels != 0) throw Errors.category.notEmpty;
  await deleteCategory(categoryId);
  return ServerResponse.success(res);
};

export default { editCategory, deleteServerCategory };
