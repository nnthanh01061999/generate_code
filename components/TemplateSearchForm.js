// import { FS_COMMON_TIME, FS_ROUTE_SUPPLIER } from '@/data/form-key';
// import { RouteSearchFormValues } from '@/interfaces/form-values';
// import { useMessages } from '@/reducer/locale/localeHooks';
// import { Col, Form, Row, Spin } from 'antd';
// import React from 'react';
// import { Control } from 'react-hook-form';
// import { CustomInput, CustomRangePicker } from '../shared/CustomFormItem';
// import CustomFormItemLabel from '../shared/CustomFormItemLabel';

// interface Props {
//     control: Control<RouteSearchFormValues>;
//     loading: boolean;
//     refreshPageToDefault: () => void;
// }

// function OfficeSearch(props: Props) {
//     const { control, loading, refreshPageToDefault } = props;
//     const messages = useMessages();

//     return (
//         <Spin spinning={loading} wrapperClassName="form-search-loading">
//             <Form layout="vertical" className="custom-form">
//                 <Row gutter={[24, 0]}>
//                     <Col span={4}>
//                         <CustomInput
//                             name={FS_ROUTE_SUPPLIER}
//                             control={control}
//                             required
//                             label={<CustomFormItemLabel label={messages['route.form.name']} />}
//                             onChangeCallBack={refreshPageToDefault}
//                             placeholder={messages['route.form.name.placeholder']}
//                             allowClear
//                         />
//                     </Col>
//                     <Col span={4}>
//                         <CustomRangePicker
//                             label={<CustomFormItemLabel label={messages['report.bill.search.time.title']} />}
//                             placeholder={[messages['report.bill.search.time.placeholder1'], messages['report.bill.search.time.placeholder2']]}
//                             name={FS_COMMON_TIME}
//                             control={control}
//                             format="DD/MM/YYYY"
//                             style={{ color: '#000' }}
//                             onChangeCallBack={refreshPageToDefault}
//                         />
//                     </Col>
//                 </Row>
//             </Form>
//         </Spin>
//     );
// }

// export default OfficeSearch;
