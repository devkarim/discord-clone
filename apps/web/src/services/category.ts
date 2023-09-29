import { Category } from 'database';
import {
  BaseResponse,
  BaseResponseNoData,
  CreateCategorySchema,
  UpdateCategorySchema,
} from 'models';

import client from './client';

type CategoryResponse = BaseResponse<Category>;

export const createCategory = (serverId: number, data: CreateCategorySchema) =>
  client
    .post<CategoryResponse>(`/servers/${serverId}/category`, data)
    .then((res) => res.data.data);

export const updateCategory = (id: number, data: UpdateCategorySchema) =>
  client
    .patch<CategoryResponse>(`/categories/${id}`, data)
    .then((res) => res.data.data);

export const deleteCategory = (id: number) =>
  client
    .delete<BaseResponseNoData>(`/categories/${id}`)
    .then((res) => res.data);
