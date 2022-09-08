// import { FC_ROUTE_LIST, FC_ROUTE_NAME } from '@/data/form-key';
// import { useMessages } from '@/reducer/locale/localeHooks';
// import { CloseOutlined } from '@ant-design/icons';
// import { Button, Descriptions, Modal, Spin } from 'antd';
// import React from 'react';
// import RoutePassingOffice from './RoutePassingOffice';

// interface Props {
//     data: any;
//     loading: boolean;
//     onAction: () => {};
//     onClose?: () => {};
// }

// function RouteDetailModal(props: Props) {
//     const { data, loading, onAction, onClose } = props;
//     const messages = useMessages();

//     return (
//         <Modal
//             className="custom-modal office-detail-modal"
//             visible={true}
//             title={<div className="title-center">{messages['modal.routeForm']}</div>}
//             onCancel={onClose}
//             footer={false}
//             maskClosable={false}
//             width={'85%'}
//             closeIcon={<CloseOutlined style={{ fontSize: 20 }} />}
//         >
//             <Spin spinning={loading}>
//                 <Descriptions column={12} className="custom-description">
//                     <Descriptions.Item span={4} label={messages['route.detail.supplier']}>
//                         {data?.supplier_name}
//                     </Descriptions.Item>
//                     <Descriptions.Item span={8} label={messages['route.detail.name']}>
//                         {data?.[FC_ROUTE_NAME]}
//                     </Descriptions.Item>
//                     <Descriptions.Item span={12}>
//                         <div className="divider"></div>
//                     </Descriptions.Item>
//                 </Descriptions>
//                 <RoutePassingOffice data={data?.[FC_ROUTE_LIST]} />
//             </Spin>
//             <div className="modal-footer-group-btn">
//                 <Button className="btn" shape="round" onClick={onClose} disabled={loading}>
//                     {messages['modal.btnBack']}
//                 </Button>
//                 <Button className="btn" shape="round" onClick={onAction} type="primary" disabled={loading}>
//                     {messages['modal.btnEdit']}
//                 </Button>
//             </div>
//         </Modal>
//     );
// }

// export default RouteDetailModal;
