import { z } from 'zod';

import {
  createCategorySchema,
  createChannelSchema,
  createServerSchema,
  createRoleSchema,
  deleteRoleSchema,
} from 'models';

import validate from './validate.js';

const create = validate({
  body: createServerSchema,
});

const serverParamsSchema = z.object({
  id: z.string(),
});

const checkId = validate({
  params: serverParamsSchema,
});

const createChannel = validate({
  body: createChannelSchema,
  params: serverParamsSchema,
});

const createCategory = validate({
  body: createCategorySchema,
  params: serverParamsSchema,
});

const updateServer = validate({
  body: createServerSchema.partial(),
  params: serverParamsSchema,
});

const addRole = validate({
  params: serverParamsSchema,
  body: createRoleSchema,
});

const deleteRole = validate({
  params: serverParamsSchema.extend({
    roleId: z.string(),
  }),
});

const checkMemberId = validate({
  params: serverParamsSchema.extend({
    memberId: z.string(),
  }),
});

const changeMemberRole = validate({
  params: serverParamsSchema.extend({
    memberId: z.string(),
  }),
  body: z.object({
    roleId: z.number().optional(),
  }),
});

export default {
  create,
  checkId,
  createChannel,
  createCategory,
  updateServer,
  addRole,
  deleteRole,
  checkMemberId,
  changeMemberRole,
};
