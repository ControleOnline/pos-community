export function copyObject(obj) {
  if (obj === null || !(obj instanceof Object)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const newArray = obj.map((item) => copyObject(item));
    return newArray;
  }

  if (obj instanceof Function) {
    return obj;
  }

  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = copyObject(obj[key]);
    }
  }

  return newObj || {};
}
