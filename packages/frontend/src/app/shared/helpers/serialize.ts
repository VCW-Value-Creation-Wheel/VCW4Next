import { Options, SerializeType } from '@core';

const serializeParams = (options: Options) => {
  const params = [];
  for (const option in options) { params.push(`${option}=${options[option]}`); }
  return params.join('&').replace(/ /g, '%20');
};

const serializeCategories = (options: Options) => {
  const params = [];
  for (const option in options) { params.push(option); }
  return params.join(',').replace(/ /g, '%20');
};

const serializeSelectOptions = (data: SerializeType[], label = 'name', value = 'id') => {
  return data.map((type: any) => ({
    label: type[label],
    value: type[value],
  }));
};

const serializeYears = (years: SerializeType[]) => {
  return years.map((year: any) => ({
    name: year,
    id: year,
  }));
};

const getPropsInObject = (theObject: any, targetProp: string) => {
  let result = "";

  for (const prop in theObject) {
    const objProp = theObject[prop];
    if (prop == targetProp) {
      return theObject[prop];
    }
    if (objProp instanceof Object || objProp instanceof Array) {
      result = getPropsInObject(objProp, targetProp);
    }
  }
  return result;
};

export { serializeParams, serializeCategories, serializeSelectOptions, serializeYears, getPropsInObject };
