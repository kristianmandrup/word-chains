export const exist = (value: any) => expect(value).toBeDefined();
export const notExist = (value: any) => expect(value).not.toBeDefined();

export const isEqual = (value: any, checkValue: any) =>
  expect(value).toEqual(checkValue);

export const isNumber = (value: any) => expect(typeof value).toEqual("number");
export const isArray = (value: any) =>
  expect(Array.isArray(value)).toBeTruthy();

export const hasLength = (value: any, len: number) => {
  isArray(value);
  expect(value.length).toEqual(len);
};

export const isTrue = (value: any) => expect(value).toBeTruthy();
export const isFalse = (value: any) => expect(value).toBeFalsy();
