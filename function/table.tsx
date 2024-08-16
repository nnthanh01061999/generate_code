import { commonLocales } from '@/data';
import { TTableFormValues } from '@/interfaces';
import { snakeCase, startCase } from 'lodash';

export const generateTable = (id: string, data: TTableFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const keyStartTitle = startCase(key)?.split(' ')?.join('');
    const interface_ = data.interface;
    const actions = data.actions || [];
    const columns = data.columns;
    const workspace = data.workspace;

    const update = actions.includes('update');
    const create = actions.includes('create');

    const boolean = columns.find((item) => item.type === 'boolean');
    const number = columns.find((item) => item.type === 'number');
    const date = columns.find((item) => item.type === 'date');
    const string = columns.find((item) => item.type === 'string');

    const getRenderByType = (type?: string) => {
        if (type === 'boolean') {
            return `<BooleanIcon value={value} />`;
        }
        if (type === 'number') {
            return `<NumberFormat value={value} />`;
        }
        if (type === 'date') {
            return `<TimeFormat value={value} />`;
        }
        return '';
    };

    const getAlignByType = (type?: string) => {
        if (type === 'boolean') {
            return `align: 'center',`;
        }
        if (type === 'number') {
            return `align: 'right',`;
        }
        if (type === 'date') {
            return `align: 'center',`;
        }
        if (type === 'string') {
            return `align: 'left',`;
        }
        return '';
    };

    const result = `
    ${create && `import { PlusOutlined } from "@ant-design/icons"`};${boolean ? `import BooleanIcon from '@components/common/Table/BooleanIcon';` : ''}${
        number ? `import NumberFormat from '@components/common/Table/NumberFormat';` : ''
    }${date ? `import TimeFormat from '@components/common/Table/TimeFormat';` : ''}${string ? `import StringFormat from '@components/common/Table/StringFormat';` : ''}
import { ${interface_} } from 'types';
import BaseTable from "@components/common/BaseTable";
import { useMemo, useState } from "react";
import { PERMISSIONS } from "@configs/permission";
import { renderActionButton } from "@helpers";
import withLazy from "@hooks/withLazy";
import { getSearchValues } from "@utils";
import type { ColumnsType } from "antd/es/table";
import { paginationConfig } from "constants/pagination";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
${create && `import { Switch, Typography } from "antd";`}

${create && `const ${key}Modal = withLazy(() => import("@pages/admin/${key}/${key}Modal"));`}

${update && `const { Link } = Typography;`}

function ${key}Table () {
   const { t } = useTranslation(["common","${workspace}"]);
     const [searchParams, setSearchParams] = useSearchParams();
const [open, setOpen] = useState<boolean>(false);
  const [detailUid, setDetailUid] = useState<string>();

     const currentSearchValues = useMemo(() => {
    return getSearchValues(searchParams);
  }, [searchParams]);

  const data = fakeData;

  const { pagination, records } = data?.data || {};

   const handleTableChange = (values: any) => {
    const { current, pageSize } = values;
    if (!current) return;
    setSearchParams({
      ...currentSearchValues,
      page: current,
      limit: pageSize,
    });
  };

  ${
      create &&
      `const onAddNew = () => {
    setDetailUid(undefined);
    setOpen(true);
  };`
  }

  ${
      update &&
      `const onUpdate = (uid: string) => () => {
    setDetailUid(uid);
    setOpen(true);
  };
  `
  }

  ${
      (create || update) &&
      ` const onClose = () => {
    setDetailUid(undefined);
    setOpen(false);
  };`
  }

  const onRefresh = () => {
    onClose();
  };


    const columns: ColumnsType<${interface_}> = useMemo(() =>[
        ${columns
            ?.map((item) => {
                const key = snakeCase(item.key);
                return `{
            key: '${key}',
            title: t('${commonLocales?.[key as keyof typeof commonLocales] ? 'common' : workspace}:${key}'),
            dataIndex: '${key}',
            ${item.width ? `width: ${item.width},` : ''}
            ${
                item.key === 'name'
                    ? `render: (value, record) => <Link onClick={onUpdate(record.uid)}>{value}</Link>,`
                    : item.type !== 'string'
                    ? `render: (value) => ${getRenderByType(item.type)}`
                    : ''
            }
        },`;
            })
            .join('')}
    ],
    [t],
    );

    ${
        create &&
        `
  const actionsBarConfig = useMemo(
    () => [
      {
        name: t("common:create"),
        icon: <PlusOutlined />,
        type: "primary",
        permission: PERMISSIONS.PUBLIC,
        onClick: onAddNew,
      },
    ],
    [t],
  );

  const renderActions = () => {
    return <>{renderActionButton(actionsBarConfig)}</>;
  };
`
    }

    return (
    <>
        <BaseTable
        rowKey="${data.rowKey}"
        ${create && `renderActionsBar={renderActions}`}
        loading={false}
        dataSource={records || []}
        columns={columns}
        totalResult={pagination?.total_records}
        pagination={{
          ...paginationConfig,
          total: pagination?.total_records,
          current: Number.parseInt(currentSearchValues?.page) || 1,
          pageSize: Number.parseInt(currentSearchValues?.limit) || 10,
        }}
        onChange={handleTableChange}
      />
     ${create && `<${key}Modal uid={detailUid} onSuccess={onRefresh} open={open} onCancel={onClose} />`}
      </>
    )
}

export default ${key}Table;
`;

    setResult(id, result);
};
