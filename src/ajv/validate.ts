import Ajv from "ajv"

export const validate = () => {
  const ajv = new Ajv();

  const schema = {
    type: "object",
    properties: {
      value: {},
      valueType: {
        type: "string",
        default: "string",
        enum: ["string", "number", "date"],
      }
    },
    if: {
      properties: { valueType: { enum: ["string", "date"] } },
    },
    then: {
      properties: { value: { type: "string" } },
    },
    else: {
      properties: { value: { type: "number" } },
    }
  }
  const data = {
    value: 123,
    valueType: "date"
  }

  const validate = ajv.compile(schema);
  const valid = validate(data);

  console.log('VALIDATE', validate.errors);
  console.log('VALID >>>', valid);
}

validate();