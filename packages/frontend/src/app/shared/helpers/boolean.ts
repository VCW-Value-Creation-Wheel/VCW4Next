function isEmpty(object: object) {
  for (let _ in object) {
    return false;
  }
  return true;
}

function isStringEmpty(value?: string | null) {
  if (value) return value?.length === 0 || !value.trim();

  return true;
}

function hasUndefinedProperty(object: object) {
  return Object.values(object).some(
    (value) => typeof value === 'undefined' || value === null
  );
}

export { isEmpty, isStringEmpty, hasUndefinedProperty };
