import Fonts from "@/fonts";
import { ExportConfig } from "@/interfaces/common/common";
import { CustomDataGridRef } from "@/interfaces/common/table";
import { useMessages } from "@/reducer/locale/localeHooks";
import { numberWithCommas } from "@/utils";
import { Spin } from "antd";
import { DataGrid } from "devextreme-react";
import { Column, Export } from "devextreme-react/data-grid";
import { SingleMultipleOrNone } from "devextreme/common";
import { exportDataGrid } from "devextreme/pdf_exporter";
import { DataGridScrollMode, Summary } from "devextreme/ui/data_grid";
import { jsPDF } from "jspdf";
import { debounce, isArray } from "lodash";
import React, { PropsWithChildren } from "react";
import CustomDataGridHeader from "./CustomDataGridHeader";

type FuncExportFileName = () => string;

type ExportFileNameProp = string | FuncExportFileName;

interface Props extends PropsWithChildren<{}> {
  data: any[];
  loading: boolean;
  scroll?: boolean;
  selectedRows?: any;
  onChangeSelection?: () => void;
  selection?: boolean;
  selectionKey?: string;
  index?: boolean;
  rowIndex?: boolean;
  className?: string;
  paging?: boolean;
  autoExpandAll?: boolean;
  useExport?: boolean;
  exportFileName?: ExportFileNameProp;
  scrollMode?: DataGridScrollMode | undefined;
  summary?: Summary<any, any>;
  filterRow?: boolean;
  showGroupPanel?: boolean;
  selectionMode?: SingleMultipleOrNone;
}

const CustomDataGrid = React.forwardRef((props: Props, ref) => {
  const {
    children,
    scroll = false,
    data,
    loading,
    selectedRows,
    selection = true,
    selectionKey,
    index = false,
    rowIndex = false,
    onChangeSelection,
    className,
    paging = false,
    autoExpandAll = true,
    useExport = false,
    exportFileName = "DataGrid",
    scrollMode = "standard",
    summary = undefined,
    filterRow = false,
    showGroupPanel = true,
    selectionMode = "single",
  } = props;

  const messages = useMessages();
  const [height, setHeight] = React.useState(0);
  const [isGrouping, setIsGrouping] = React.useState(true);
  const [dataSource, setDataSource] = React.useState<any>([]);

  const me = React.useRef<any>(null);
  const tableRef = React.useRef<any>(null);
  const scrollRef = tableRef.current?.instance?.getScrollable();
  const selectionChangedRaiseRef = React.useRef<any>(null);

  const updateHeight = () => {
    const element = me?.current;
    const height = element ? element.offsetHeight : 0;
    setHeight(height);
  };

  const exportPdf = (config: ExportConfig) => {
    const {
      fontSize = 10,
      fontSizeHeader = 10,
      columnWidths = undefined,
      padding = { left: 2, right: 2, top: 1, bottom: 1 },
      booleanExport = [],
    } = config;
    const doc = new jsPDF();
    doc.addFileToVFS("Roboto-Bold-bold.ttf", Fonts.RobotoBold);
    doc.addFileToVFS("Roboto-Regular-normal.ttf", Fonts.RobotoRegular);
    doc.addFont("Roboto-Bold-bold.ttf", "Roboto-Bold", "bold");
    doc.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");

    //total column width is 180
    exportDataGrid({
      jsPDFDocument: doc,
      component: tableRef.current?.instance,
      columnWidths: columnWidths,
      customizeCell: (options) => {
        const { gridCell, pdfCell } = options;
        if (!pdfCell || !gridCell) return;

        pdfCell.textColor = "#000000";
        pdfCell.padding = padding;

        if (gridCell.rowType === "group" || gridCell.rowType === "header") {
          pdfCell.font = {
            name: "Roboto-Bold",
            style: "bold",
            size: fontSizeHeader,
          };
          pdfCell.horizontalAlign = "center";
          return;
        }

        if (gridCell.rowType === "data") {
          pdfCell.font = {
            name: "Roboto-Regular",
            style: "normal",
            size: fontSize,
          };
          booleanExport?.forEach((item) => {
            if (gridCell.column?.dataField === item.key) {
              pdfCell.text = item.value?.[gridCell.data?.[item.key]];
            }
          });
        }
      },
    }).then(() => {
      doc.save(
        `${
          exportFileName instanceof Function ? exportFileName() : exportFileName
        }.pdf`
      );
    });
  };

  const handleExporting = React.useCallback((model: any) => {
    if (model && model.fileName && exportFileName) {
      model.fileName =
        exportFileName instanceof Function ? exportFileName() : exportFileName;
    }
  }, []);

  const exportXlsx = () => {
    tableRef.current?.instance?.exportToExcel();
  };

  const getSelectedRowsData = () => {
    return tableRef.current?.instance?.getSelectedRowsData();
  };

  const deselectAll = () => {
    return tableRef.current?.instance?.deselectAll();
  };

  const handleChangeSelection = () => {
    if (onChangeSelection) {
      onChangeSelection();
    }
  };

  const onCalcHeightDebounce = debounce(updateHeight, 500);

  const createdHandle = (): CustomDataGridRef => {
    return {
      me,
      tableRef,
      scrollRef,
      selectionChangedRaiseRef,
      updateHeight,
      exportPdf,
      exportXlsx,
      getSelectedRowsData,
      deselectAll,
    };
  };

  React.useEffect(() => {
    updateHeight();
    window.addEventListener("resize", onCalcHeightDebounce);
    return () => {
      window.removeEventListener("resize", onCalcHeightDebounce);
    };
  }, []);

  React.useEffect(() => {
    const newDataSource =
      data && isArray(data)
        ? data?.map((item: any, index: number) => ({
            ...item,
            rowIndex: index,
          }))
        : [];
    setDataSource(newDataSource);
  }, [data]);

  React.useImperativeHandle(ref, createdHandle);

  const tableElement = React.useMemo(
    () => (
      <DataGrid
        ref={tableRef}
        onExporting={handleExporting}
        className={`custom-data-grid  ${className || ""}`}
        dataSource={dataSource}
        filterRow={{ visible: filterRow }}
        selection={
          selection
            ? {
                allowSelectAll: selectionMode === "multiple",
                mode: selectionMode,
                showCheckBoxesMode:
                  selectionMode === "multiple" ? "always" : "none",
              }
            : undefined
        }
        loadPanel={{
          enabled: false,
        }}
        onSelectionChanged={(_: any) => {
          handleChangeSelection();
          selectionChangedRaiseRef.current = true;
        }}
        onContentReady={(e) => {
          let columns = e.component.getVisibleColumns();
          setIsGrouping(
            scrollMode !== "virtual" &&
              !!columns?.find((item: any) => item.groupIndex !== undefined)
          );
        }}
        rowAlternationEnabled={true}
        showBorders={true}
        paging={{
          enabled: paging,
        }}
        pager={
          paging
            ? {
                visible: true,
                showNavigationButtons: true,
                showInfo: true,
                showPageSizeSelector: true,
                displayMode: "compact",
                infoText: messages["common.grid.pageInfor"],
              }
            : undefined
        }
        wordWrapEnabled={true}
        groupPanel={{
          visible: showGroupPanel,
          emptyPanelText: messages["datagrid.emptyPanelText"],
        }}
        grouping={{
          autoExpandAll: autoExpandAll,
          texts: {
            groupContinuedMessage:
              messages["common.grid.groupContinuedMessage"],
            groupContinuesMessage:
              messages["common.grid.groupContinuesMessage"],
          },
        }}
        scrolling={
          scroll
            ? {
                mode: scrollMode,
                showScrollbar: "always",
                useNative: true,
                scrollByThumb: true,
              }
            : {}
        }
        height={scroll ? height : undefined}
        noDataText={messages["datagrid.noTextData"]}
        onRowClick={(e) => {
          if (selectionMode === "single") {
            e.event?.stopImmediatePropagation();
            if (!selectionChangedRaiseRef.current) {
              var dataGrid = e.component;
              var keys = dataGrid.getSelectedRowKeys();
              dataGrid.deselectRows(keys);
            }
            selectionChangedRaiseRef.current = false;
          } else if (selectionMode === "multiple") {
            const keys = e.component.getSelectedRowKeys();
            const index = keys.indexOf(e.key);

            if (index > -1) {
              keys.splice(index, 1);
            } else {
              keys.push(e.key);
            }

            e.component.selectRows(keys, true);

            if (!selectionChangedRaiseRef.current) {
              e.component.deselectRows(e.key);
            }
            selectionChangedRaiseRef.current = false;
          }
        }}
        keyboardNavigation={{ enabled: false }}
        autoNavigateToFocusedRow={false}
        summary={summary}
      >
        {selection && selectionMode === "single" && (
          <Column
            name="selection"
            alignment={"center"}
            dataType="string"
            width={"60px"}
            allowResizing={false}
            allowGrouping={false}
            allowSearch={false}
            allowSorting={false}
            allowFiltering={false}
            dataField={"index"}
            caption={""}
            cellRender={() => {
              return <div className={`fake-radio`}></div>;
            }}
          />
        )}
        {rowIndex && (
          <Column
            alignment={"center"}
            dataType="string"
            width={"60px"}
            allowResizing={false}
            allowGrouping={false}
            allowSearch={false}
            caption={"STT"}
            headerCellComponent={() => (
              <CustomDataGridHeader caption={"STT"} name={""} filters={{}} />
            )}
            cellRender={(value: any) => {
              return numberWithCommas(value?.row?.dataIndex + 1);
            }}
          />
        )}
        {index && (
          <Column
            alignment={"center"}
            dataType="string"
            width={"60px"}
            allowResizing={false}
            allowGrouping={false}
            allowSearch={false}
            dataField={"rowIndex"}
            caption={"STT"}
            headerCellComponent={() => (
              <CustomDataGridHeader caption={"STT"} name={""} filters={{}} />
            )}
            cellRender={(value: any) => {
              return numberWithCommas(value?.key?.rowIndex + 1);
            }}
          />
        )}
        {children}
        {isGrouping && (
          <Column
            alignment={"center"}
            allowGrouping={false}
            allowSearch={false}
            allowResizing={true}
            caption={""}
          />
        )}
        {useExport ? <Export enabled={true} formats={["pdf", "xlsx"]} /> : null}
      </DataGrid>
    ),
    [
      setIsGrouping,
      handleExporting,
      // children,
      className,
      filterRow,
      dataSource,
      showGroupPanel,
      autoExpandAll,
      scrollMode,
      paging,
      scroll,
      height,
      summary,
      selection,
      selectionMode,
      rowIndex,
      index,
      isGrouping,
      useExport,
    ]
  );

  return (
    <div
      className="cus-data-grid-wrapper"
      style={scroll ? { flex: 1 } : {}}
      ref={me}
    >
      <Spin spinning={loading}>{tableElement}</Spin>
    </div>
  );
});

export default CustomDataGrid;
