//importColumnKey(key)
// importContanst(key)
// importFormKey(key)
// importModal(key,true,true)
// importInterfaces(key, true)
// importQueryString(key)
// importComponent(key)
// import withAuthorized from '@/HOC/withAuthorized';
// import withModalHandler from '@/HOC/withModalHandler';
// import { IOption } from '@/interfaces/common/common';
// import { CustomDataGridRef, ExportDataGridRef } from '@/interfaces/common/table';
// import { useMessages } from '@/reducer/locale/localeHooks';
// import { useCloseAllModal, useCloseModal, useOpenModal } from '@/reducer/modal/modalHook';
// import { useUpdateEffect } from '@/utils/hooks';
// import Head from 'next/head';
// import { ParsedUrlQuery } from 'querystring';
// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import Manipulation from '@/components/manipulation/Manipulation';
// import CustomPagination from '@/components/shared/CustomPagination';

// defineModal(key,true, true)

// interface Props {
//     serverQuery: ParsedUrlQuery;
// }

// function SiteRoute(props: Props) {
//     const {
//         page: page_,
//         size: size_,
//         last_page: last_page_,
//         last_count: last_count_,
//         first_item: first_item_,
//         last_item: last_item_,
//         refresh: refresh_,
//         department_labels,
//         department_ids,
//         supplier_value,
//         supplier_label,
//         ...otherFilters
//     } = props.serverQuery;

//     const { control, watch } = useForm<RouteSearchFormValues>({
//         defaultValues: {
//             [FS_ROUTE_DEPARTMENT]: qsParseObjectArray(department_ids, department_labels),
//             [FS_ROUTE_SUPPLIER]: qsParseObject(supplier_value, supplier_label),
//         },
//     });

//     const [page, setPage] = React.useState<number>(() => {
//         return qsParseNumber(page_, DEFAULT_PAGE);
//     });
//     const [size, setSize] = React.useState<number>(() => {
//         return qsParseNumber(size_, DEFAULT_LIMIT);
//     });
//     const [pagination, setPagination] = React.useState<PaginationWithOutPageSize>({
//         refresh: qsParseNumber(refresh_, DEFAULT_REFRESH),
//         last_page: qsParseNumber(last_page_, DEFAULT_LAST_PAGE),
//         last_count: qsParseNumber(last_count_, DEFAULT_LAST_COUNT),
//         first_item: qsParseNumber(first_item_, DEFAULT_FIRST_ITEM),
//         last_item: qsParseNumber(last_item_, DEFAULT_LAST_ITEM),
//     });
//     const [refresh, setRefresh] = React.useState<boolean>(false);
//     const [action, setAction] = React.useState<string>(ACTION_CREATE);
//     const [actionLoading, setActionLoading] = React.useState<boolean>(false);
//     const [data, setData] = React.useState<RouteRecord[]>([]);
//     const [dataDetail, setDataDetail] = React.useState<RouteFormValues | undefined>(undefined);
//     const [isExporting, setIsExporting] = React.useState<boolean>(false);

//     const tableRef = React.useRef<ExportDataGridRef<CustomDataGridRef | null>>(null);
//     const messages = useMessages();
//     const openModal = useOpenModal();
//     const closeModal = useCloseModal();
//     const closeAllModal = useCloseAllModal();

//     const [filters, setFilters] = React.useState<any>({
//         ...otherFilters,
//     });

//     const [selectedRows, setSelectedRows] = React.useState<RouteRecord[]>([]);

//     const watchDepartment = watch(FS_ROUTE_DEPARTMENT);
//     const watchSupplier = watch(FS_ROUTE_SUPPLIER);

//     const getPayload = () => {
//         return {
//             page,
//             size,
//             ...pagination,
//             ...filters,
//         };
//     };

//     const dataSource = { data: [] };
//     const total = 0;
//     const loading = false;

//     const refresPaginationParams = () => {
//         setPagination({
//             ...pagination,
//             refresh: DEFAULT_REFRESH,
//             last_page: DEFAULT_LAST_PAGE,
//             last_count: DEFAULT_LAST_COUNT,
//             first_item: DEFAULT_FIRST_ITEM,
//             last_item: DEFAULT_LAST_PAGE,
//         });
//     };

//     const onCreate = () => {
//         setAction(ACTION_CREATE);
//         setSelectedRows([]);
//         setDataDetail(undefined);
//         openModal({ name: ROUTE_FORM_MODAL });
//     };

//     const onEdit = () => {
//         setAction(ACTION_UPDATE);
//         openModal({ name: ROUTE_FORM_MODAL });
//         const id = selectedRows?.[0]?.[TC_ROUTE_ID];
//         getDataDetail(id);
//     };

//     const onEditFromDetail = () => {
//         setAction(ACTION_UPDATE);
//         openModal({ name: ROUTE_FORM_MODAL });
//     };

//     const onDelete = () => {
//         const id = selectedRows?.[0]?.[TC_ROUTE_ID];
//         //YOUR DELETE CODE
//     };

//     const onViewDetail = () => {
//         openModal({ name: ROUTE_DETAILS_MODAL });
//         const id = selectedRows?.[0]?.[TC_ROUTE_ID];
//         getDataDetail(id);
//     };

//     const onPrint = () => {
//         if (!tableRef?.current?.exportPdf) return;
//         tableRef?.current?.exportPdf({
//             //YOUR SETTING EXPORT
//         });
//     };

//     const onExport = () => {
//         setSelectedRows([]);
//         //YOUR EXPORT CODE
//     };

//     const onRefresh = () => {
//         if (tableRef.current?.getSearchQuery) {
//             setFilters(tableRef.current?.getSearchQuery());
//         } else {
//             setRefresh(!refresh);
//         }
//         setSelectedRows([]);
//         setAction(ACTION_CREATE);
//         refresPaginationParams();
//     };

//     const onAdd = (value: RouteFormValues) => {
//         //YOUR ADD CODE
//     };

//     const onUpdate = (value: RouteFormValues) => {
//         const id = selectedRows?.[0]?.[TC_ROUTE_ID];
//         //YOUR UPDATE CODE
//     };

//     const actionsData = [
//         {
//             type: ACTION_CREATE,
//             onClick: onCreate,
//         },
//         {
//             type: ACTION_UPDATE,
//             borderRight: true,
//             disabled: selectedRows?.length === 0,
//             onClick: onEdit,
//         },
//         {
//             type: ACTION_VIEW_DETAIL,
//             disabled: selectedRows?.length === 0,
//             onClick: onViewDetail,
//         },
//         {
//             type: ACTION_DELETE,
//             borderRight: true,
//             disabled: selectedRows?.length === 0,
//             onClick: onDelete,
//         },
//         {
//             type: ACTION_PRINT,
//             onClick: onPrint,
//         },
//         {
//             type: ACTION_EXPORT_EXCEL,
//             onClick: onExport,
//             disabled: isExporting,
//         },
//         {
//             type: ACTION_REFRESH,
//             right: true,
//             disabled: loading,
//             onClick: onRefresh,
//         },
//     ];

//     const getDataDetail = (id: number) => {
//         //YOUR CODE GET DETAIL
//     };

//     // const getDataAdd = (value: RouteFormValues): DriverScheduleRoutePayload => {
//     //     //YOUR GET DATA ADD
//     // };

//     const onChangeSelection = (selectedRows: RouteRecord[]) => {
//         setSelectedRows(selectedRows);
//     };

//     const onSearchChange = (value: RouteRecord, name: string) => {
//         setPage(DEFAULT_PAGE);
//         setFilters((prevFilters: RouteRecord) => {
//             return {
//                 ...prevFilters,
//                 [name]: value || undefined,
//             };
//         });
//         refresPaginationParams();
//     };

//     const onChangePage = (newPage: number, newSize: number | undefined) => {
//         setPagination({
//             ...pagination,
//             refresh: 0,
//             last_page: page,
//             last_count: total,
//         });
//         setPage(newPage);
//         if (newSize) {
//             setSize(newSize);
//         }
//     };

//     const refreshPageToDefault = () => {
//         setPage(DEFAULT_PAGE);
//         refresPaginationParams();
//     };

//     useEffect(() => {
//         if (dataSource && dataSource.data) {
//             setPagination({
//                 ...pagination,
//                 first_item: data?.[0]?.[TC_ROUTE_ID],
//                 last_item: data?.[data.length - 1]?.[TC_ROUTE_ID],
//             });
//         }
//     }, [dataSource]);

//     useUpdateEffect(() => {
//         const queryString = qsStringify({
//             page,
//             size,
//             department_ids: watchDepartment?.map((item: IOption<number>) => item.value),
//             department_labels: watchDepartment?.map((item: IOption<number>) => item.label),
//             supplier_value: watchSupplier?.value,
//             supplier_label: watchSupplier?.label,
//             ...pagination,
//             ...filters,
//         });
//         pushQueryString(queryString);
//     }, [page, size, watchDepartment, watchSupplier, filters]);

//     return (
//         <>
//             <Head>
//                 <title>{messages['routes.title']}</title>
//             </Head>
//             <>
//                 <Manipulation loading={loading} data={actionsData} />
//                 <RouteSearch control={control} loading={loading} refreshPageToDefault={refreshPageToDefault} />
//                 {/* <RouteTable
//                     ref={tableRef}
//                     data={data}
//                     loading={loading}
//                     selectionKey={'id'}
//                     onChangeSelection={onChangeSelection}
//                     selectedRows={selectedRows}
//                     filters={filters}
//                     onSearchChange={onSearchChange}

//                 /> */}
//                 <CustomPagination disabled={loading} page={page} size={size} total={total} onChange={onChangePage} />
//                 {/* <RouteDetailModalWithHandler data={dataDetail} onAction={onEditFromDetail} loading={actionLoading} />
//                 <RouteFormModalWithHandler data={dataDetail} loading={actionLoading} action={action} onSuccess={action === ACTION_CREATE ? onAdd : onUpdate} /> */}
//             </>
//         </>
//     );
// }

// export default withAuthorized(SiteRoute);
