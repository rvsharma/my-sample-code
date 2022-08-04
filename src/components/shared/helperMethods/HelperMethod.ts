import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const dynamicSort = (property: any): any => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    // eslint-disable-next-line no-param-reassign
    property = property.substr(1);
  }
  return (a: any, b: any): any => {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    // eslint-disable-next-line no-nested-ternary
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const toPascalCase = (str: any): any => {
  return str.replace(/(\w)(\w*)/g, function (g0: any, g1: any, g2: any) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};

export const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = (error) => reject(error);
  });
};

export const isValidHttpUrl = (urlObj: string): boolean => {
  let url;
  try {
    url = new URL(urlObj);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const arraysEqual = (a1: any, a2: any): boolean => {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) === JSON.stringify(a2);
};

export const arrayUniqueByKey = (array: any, key: any): any => {
  return array.filter(
    (a: { [x: string]: any }, i: any) =>
      array.findIndex((s: { [x: string]: any }) => a[key] === s[key]) === i
  );
};

export const onConfigChange = (configData: any, event: any): any => {
  const { name, value } = event.target;
  let schema = configData; // a moving reference to internal objects within obj
  const pList = name.split('.');
  const len = pList.length;
  for (let i = 0; i < len - 1; ) {
    const elem = pList[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
    i += 1;
  }

  schema[pList[len - 1]] = value;
  return configData;
};

export const getBase64Image = (img: any): any => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0);
  const dataURL = canvas.toDataURL('image/png');
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
};

export const getGeneral = (gen: any, add: any): any => {
  /* eslint-disable no-param-reassign */
  Object.keys(gen).forEach((key: any) => {
    add[key] = gen[key].id;
  });
  return add;
  /* eslint-disable no-param-reassign */
};

export const memberCommaSeperator = (memberNumbers: any): React.ReactNode => {
  const dollarUSLocale = Intl.NumberFormat('en-US');
  return dollarUSLocale.format(memberNumbers);
};

export const dateFormat = (date: any): React.ReactNode => {
  const monthName = date.toLocaleString('default', { month: 'short' });
  const utcHours = date.getUTCHours() > 9 ? date.getUTCHours() : `0${date.getUTCHours()}`;
  const utcMinutes = date.getUTCMinutes() > 9 ? date.getUTCMinutes() : `0${date.getUTCMinutes()}`;

  let time24 = `${utcHours}${utcMinutes}`;
  const H = +time24.substr(0, 2);
  let h: any = H % 12 || 12;
  h = h < 10 ? `0${h}` : h;
  const ampm = H < 12 ? ' AM' : ' PM';
  time24 = `${h}:${time24.substr(2, 3)} ${ampm}`;

  const formatedDate = `${monthName} ${date.getDate()}, ${date.getFullYear()} ${time24}`;
  return formatedDate;
};
