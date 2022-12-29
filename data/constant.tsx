export const importContanst_ =
  "import withAuthorized from '@/HOC/withAuthorized';\nimport withModalHandler from '@/HOC/withModalHandler';\nimport { IOption } from '@/interfaces/common/common';\nimport { CustomDataGridRef, ExportDataGridRef } from '@/interfaces/common/table';\nimport { useMessages } from '@/reducer/locale/localeHooks';\nimport { useCloseAllModal, useCloseModal, useOpenModal } from '@/reducer/modal/modalHook';\nimport { useUpdateEffect } from '@/utils/hooks';\nimport Head from 'next/head';\nimport { ParsedUrlQuery } from 'querystring';\nimport React, { useEffect } from 'react';\nimport { useForm } from 'react-hook-form';\nimport Manipulation from '@/components/manipulation/Manipulation';\nimport CustomPagination from '@/components/shared/CustomPagination';\n";

export const actionOptions = [
  {
    value: "ACTION_CREATE",
    label: "CREATE",
  },
  {
    value: "ACTION_UPDATE",
    label: "UPDATE",
  },
  {
    value: "ACTION_DELETE",
    label: "DELETE",
  },
  {
    value: "ACTION_VIEW_DETAIL",
    label: "VIEW_DETAIL",
  },
  {
    value: "ACTION_PRINT",
    label: "PRINT",
  },
  {
    value: "ACTION_EXPORT_EXCEL",
    label: "EXPORT_EXCEL",
  },
  {
    value: "ACTION_REFRESH",
    label: "REFRESH",
  },
  {
    value: "ACTION_SAVE",
    label: "SAVE",
  },
];

export const modalOptions = [
  {
    value: "CREATE",
    label: "CREATE",
  },
  {
    value: "DETAIL",
    label: "DETAIL",
  },
];

export const paginationOptions = [
  {
    value: "NEW",
    label: "NEW",
  },
  {
    value: "OLD",
    label: "OLD",
  },
  {
    value: "NONE",
    label: "NONE",
  },
];

export const tableHeaderOptions = [
  {
    value: "filter",
    label: "Filter",
  },
  {
    value: "none",
    label: "none",
  },
];

export const interfaceOptions = [
  {
    value: "string",
    label: "String",
  },
  {
    value: "number",
    label: "Number",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
  {
    value: "any",
    label: "Any",
  },
  {
    value: "IOption<number>",
    label: "Option number",
  },
  {
    value: "IOption<string>",
    label: "Option string",
  },
  {
    value: "string[]",
    label: "Array String",
  },
  {
    value: "number[]",
    label: "Array Number",
  },
  {
    value: "boolean[]",
    label: "Array Boolean",
  },
  {
    value: "IOption<number>[]",
    label: "Array Option number",
  },
  {
    value: "IOption<string>[]",
    label: "Array Option string",
  },
];

export const dataTypeOptions = [
  {
    value: "string",
    label: "String",
  },
  {
    value: "number",
    label: "Number",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
  {
    value: "date",
    label: "Date",
  },
];
