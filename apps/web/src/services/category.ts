import { Category } from 'database';
import { BaseResponse, CreateCategorySchema } from 'models';

import client from './client';

type CategoryResponse = BaseResponse<Category>;

export const createCategory = (serverId: number, data: CreateCategorySchema) =>
  client.post<CategoryResponse>(`/servers/${serverId}/category`, data);
