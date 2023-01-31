import { camelCase, snakeCase } from 'lodash';
import { stringFormat } from '../utils';

export const generateLocale = (value: any, setResult: (key: string, result: string) => void) => {
    let resultText = `"${camelCase(value.key)}.title":"${value.title}",\n`;
    resultText += value.column?.reduce((prev: any, cur: any) => prev + `"${camelCase(value.key)}.${camelCase(cur.key)}":"${cur.title}",\n`, '');
    resultText += value.search?.reduce((prev: any, cur: any) => prev + `"${camelCase(value.key)}.search.${camelCase(cur.key)}":"${cur.title}",\n`, '');
    resultText += value.search?.reduce(
        (prev: any, cur: any) => prev + `"${camelCase(value.key)}.search.${camelCase(cur.key)}.placeholder":"${cur.type === 'input' ? 'Nhập ' : 'Chọn '}${cur.title}",\n`,
        '',
    );
    resultText += value.form?.reduce((prev: any, cur: any) => prev + `"${camelCase(value.key)}.create.${camelCase(cur.key)}":"${cur.title}",\n`, '');
    resultText += value.form?.reduce(
        (prev: any, cur: any) => prev + `"${camelCase(value.key)}.create.${camelCase(cur.key)}.placeholder":"${cur.type === 'input' ? 'Nhập ' : 'Chọn '}${cur.title}",\n`,
        '',
    );

    setResult('locale', resultText);
};

export const generateForm = (value: any, setResult: (key: string, result: string) => void) => {
    const key = snakeCase(value.key);
    let resultText = value.search?.reduce((prev: any, cur: any) => prev + `export const FS_${key?.toUpperCase()}_${cur.key?.toUpperCase()}="${cur.key}";\n`, '');
    resultText += '\n';
    resultText += value.form?.reduce((prev: any, cur: any) => prev + `export const FC_${key?.toUpperCase()}_${cur.key?.toUpperCase()}="${cur.key}";\n`, '');
    setResult('form', resultText);
};

export const generateTable = (value: any, setResult: (key: string, result: string) => void) => {
    const key = snakeCase(value.key);
    let resultText = value.table?.reduce((prev: any, cur: any) => prev + `export const TC_${key?.toUpperCase()}_${cur.key?.toUpperCase()}="${cur.key}";\n`, '');
    setResult('table', resultText);
};

export const columnRenderByType = (type: string, key: string) => {
    switch (type) {
        case 'string':
            return `value.key.${snakeCase(key)} || '--';`;
        case 'date':
            return `formatDate(value.key.create_date, DATE_FORMAT, true) || '--';`;
        case 'number':
            return `numberWithCommas(value.key.cod_fee) || '--';`;
        case 'boolean':
            return `!!value.key.${snakeCase(key)};`;
        default:
            return `value.key.${snakeCase(key)} || '--';`;
    }
};

export const columnAlignByType = (type: string) => {
    switch (type) {
        case 'string':
            return `left`;
        case 'date':
            return `center`;
        case 'number':
            return `right`;
        case 'boolean':
            return `center`;
        default:
            return `left`;
    }
};

export const generateTableColumn = (value: any, setResult: (key: string, result: string) => void) => {
    const key = snakeCase(value.key);
    const headerCell = value?.tableHeaderType === 'none' ? `<p className="header-title header-align-center">{{1}}</p>` : `<CustomDataGridHeader {0} caption={{1}} name={{2}} filters={filters} {3} />}`;

    let resultText =
        (value?.rowIndex
            ? `<Column
    alignment={'center'}
    dataType="string"
    width={60}
    allowResizing={false}
    allowGrouping={false}
    allowSearch={false}
    caption={messages['common.index']}
    headerCellComponent={() => <p className="header-title header-align-center">{messages['common.index']}</p>}
    cellRender={(value: IRenderDataGrid<${value.rowInterface || 'any'}>) => {
        return numberWithCommas(value.row.dataIndex + 1);
    }}
/>\n`
            : '') +
        value.column?.reduce((prev: any, cur: any) => {
            const columnKey = `TC_${key?.toUpperCase()}_${cur.key?.toUpperCase()}`;
            return (
                prev +
                ` <Column
          alignment="${columnAlignByType(cur.type)}"
          dataType="${cur.type}"
          minWidth={164}
          width={${cur.width || 164}}
          allowResizing={true}
          dataField={${columnKey}}
          caption={messages['${camelCase(key)}.${camelCase(cur.key)}']}
          headerCellComponent={() => ${stringFormat(
              headerCell,
              cur.search ? `ref={columnRef[${columnKey}]} ` : '',
              `messages['${camelCase(key)}.${camelCase(cur.key)}']`,
              `${columnKey}`,
              cur.search ? `onChange={onSearchChange}` : '',
          )}}
          cellRender={(value: IRenderDataGrid<${value.tableRowInterface || 'any'}>) => {
              return ${columnRenderByType(cur.type, cur.key)}
          }}
      />\n`
            );
        }, '');
    setResult('column', resultText);
};

export const generateInterface = (value: any, setResult: (key: string, result: string) => void) => {
    const key = snakeCase(value.key);
    const orinalKey = value.key?.charAt(0)?.toLocaleUpperCase() + value?.key?.slice(1);
    let resultText = '';
    if (value.search?.length) {
        resultText += `export type ${orinalKey}SearchFormSearch = {\n`;
        resultText += value.search?.reduce((prev: any, cur: any) => prev + `[FS_${key?.toUpperCase()}_${cur.key?.toUpperCase()}]:${cur.interface}\n`, '');
        resultText += '}\n';
    }
    if (value.form?.length) {
        resultText += `export type ${orinalKey}FormValues = {\n`;
        resultText += value.form?.reduce((prev: any, cur: any) => prev + `[FC_${key?.toUpperCase()}_${cur.key?.toUpperCase()}]:${cur.interface}\n`, '');
        resultText += '}\n';
    }
    setResult('interface', resultText);
};
