import { Schemas, validate as zodValidate } from "@/lib/validation";
import Exception from "@/models/error";

const validate = <P, Q extends PropertyDescriptor & ThisType<any>, B, R>(
  schemas: Schemas<P, Q, B, R>
) =>
  zodValidate(schemas, ({ bodyError, paramsError, queryError }, res) => {
    const error = bodyError ?? paramsError ?? queryError;
    if (error) throw Exception.fromZod(error);
  });

export default validate;
