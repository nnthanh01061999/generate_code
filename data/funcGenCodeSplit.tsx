export const snakeCase = (value: string) => {
  const charUp = value?.split("")?.find((char) => char.toUpperCase() === char);
  const position = charUp ? value?.indexOf(charUp) : 0;
  return position
    ? value.slice(0, position) + "_" + value.slice(position)
    : value;
};

export const kebabCase = (value: string) => {
  return snakeCase(value)?.toLocaleUpperCase()?.replace("_", "-");
};

export const titleCase = (str: string) => {
  var splitStr = str ? str.toLowerCase().split(" ") : [];
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const importColumnKey = (columnKey: string): string => {
  return `import { ${columnKey} } from '@/data/column-key';\n`;
};

export const importContanst = (
  actionArr: string[],
  paginationMode: string
): string => {
  let codeResult = actionArr.length > 0 ? actionArr.join(",") + "," : "";
  switch (paginationMode) {
    case "OLD": {
      codeResult += `DEFAULT_PAGE,DEFAULT_SIZE,`;
      break;
    }
    case "NEW": {
      codeResult += `DEFAULT_PAGE,DEFAULT_SIZE, DEFAULT_FIRST_ITEM, DEFAULT_LAST_ITEM, DEFAULT_LAST_COUNT, DEFAULT_LAST_PAGE, DEFAULT_REFRESH,`;
      break;
    }
    default: {
    }
  }
  return `import { ${codeResult} } from '@/data/constant';\n`;
};

export const importFormKey = (value: any): string => {
  const key = snakeCase(value.key);
  let formKey = "";
  formKey += value.formSearch?.reduce(
    (prev: any, cur: any) =>
      prev + `FS_${key?.toUpperCase()}_${cur.key?.toUpperCase()},`,
    ""
  );
  formKey += value.formCreate?.reduce(
    (prev: any, cur: any) =>
      prev + `FC_${key?.toUpperCase()}_${cur.key?.toUpperCase()},`,
    ""
  );
  return `import { ${formKey} } from '@/data/form-key';\n`;
};

export const importModal = (value: any): string => {
  const key = snakeCase(value.key)?.toUpperCase();
  const detail = value.modal?.includes("DETAIL");
  const create = value.modal?.includes("CREATE");
  let innerText = detail ? `${key}_DETAILS_MODAL` : "";
  innerText += create ? `${key}_FORM_MODAL` : "";
  return `import { ${innerText}} from '@/data/modalList';\n`;
};

export const importInterfaces = (value: any): string => {
  const key = value.key.charAt(0).toUpperCase() + value.key.slice(1);
  const search = value.formSearch?.length > 0;
  const create = value.formSearch?.length > 0;
  const paginationNew = value.pagination === "NEW";
  let importText = `import { ${key}Record } from '@/interfaces/${snakeCase(
    value.key
  )
    ?.toLocaleLowerCase()
    ?.replace("_", "-")}';\n`;
  let formValue = search ? `${key}FormValues,` : "";
  formValue += create ? `${key}SearchFormValues,` : "";
  importText += `import { ${formValue} } from '@/interfaces/form-values';\n`;
  importText += paginationNew
    ? `${`import { PaginationWithOutPageSize } from '@/interfaces/pagination';\n`}`
    : "";
  return importText;
};

export const importQueryString = (value: any): string => {
  let importText = "";
  importText =
    value.formSearch?.length > 0 ? "qsStringify, pushQueryString" : "";
  return importText
    ? `import { ${importText} } from '@/utils/queryString';\n`
    : "";
};

export const importComponent = (value: any): string => {
  const key = value.key.charAt(0).toUpperCase() + value.key.slice(1);
  const modal = value.modal;
  const detailModal = modal?.includes("DETAIL");
  const formModal = modal?.includes("FORM");
  const search = value.formSearch?.length > 0;
  let importText = "";
  importText += detailModal
    ? `import ${key}DetailModal from '../${key}s/${key}DetailModal';\n`
    : "";
  importText += formModal
    ? `import ${key}FormModal from '../${key}s/${key}FormModal';\n`
    : "";
  importText += search
    ? `import ${key}Search from '../${key}s/${key}Search';\n`
    : "";
  return importText || "";
};

export const defineModal = (value: any): string => {
  const key = value.key;
  const create = value.modal?.includes("CREATE");
  const detail = value.modal?.includes("DETAIL");
  const keyUpperCase = snakeCase(key).toLocaleUpperCase();
  const keyUpperCaseFirstChar =
    value.key.charAt(0).toUpperCase() + value.key.slice(1);
  const addString = create
    ? `\nconst ${keyUpperCaseFirstChar}FormModalWithHandler = withModalHandler(${keyUpperCaseFirstChar}FormModal, ${keyUpperCase}_FORM_MODAL);\n`
    : "";
  const detailString = detail
    ? `const ${keyUpperCaseFirstChar}DetailModalWithHandler = withModalHandler(${keyUpperCaseFirstChar}DetailModal, ${keyUpperCase}_DETAILS_MODAL);\n`
    : "";

  return `${addString}${detailString}`;
};
