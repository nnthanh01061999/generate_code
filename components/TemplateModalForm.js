// import { ACTION_CREATE } from "@/data/constants";
// import {
//   FC_ROUTE_BREAK_TIME,
//   FC_ROUTE_DEPARTMENT_LIST,
//   FC_ROUTE_LIST,
//   FC_ROUTE_NAME,
//   FC_ROUTE_SUPPLIER,
// } from "@/data/form-key";
// import { RouteFormValues } from "@/interfaces/form-values";
// import { useMessages } from "@/reducer/locale/localeHooks";
// import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Button, Col, Form, Modal, Row } from "antd";
// import React from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { CustomInput } from "../shared/CustomFormItem";
// import CustomFormItemLabel from "../shared/CustomFormItemLabel";
// const { confirm } = Modal;

// type actionType = "create" | "update";

// interface Props {
//   data: any;
//   action: actionType;
//   onClose?: () => void;
//   onSuccess: (data: any) => void;
//   loading: boolean;
// }

// function RouteFormModal(props: Props) {
//   const { data, loading, action, onClose, onSuccess } = props;

//   const schema = yup.object({
//     [FC_ROUTE_SUPPLIER]: yup
//       .object()
//       .required("Vui lòng nhập đơn vị vận chuyển")
//       .nullable(),
//     [FC_ROUTE_NAME]: yup.string().required("Vui lòng nhập tên lộ trình"),
//   });

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm <
//   RouteFormValues >
//   {
//     defaultValues: {
//       //YOUR DEFAULT VALUES
//     },
//     resolver: yupResolver(schema),
//   };
//   const messages = useMessages();

//   React.useEffect(() => {
//     if (data) {
//       setValue(
//         `${FC_ROUTE_LIST}.${FC_ROUTE_BREAK_TIME}`,
//         data?.[FC_ROUTE_LIST]?.[FC_ROUTE_BREAK_TIME]
//       );
//       setValue(
//         `${FC_ROUTE_LIST}.${FC_ROUTE_DEPARTMENT_LIST}`,
//         data?.[FC_ROUTE_LIST]?.[FC_ROUTE_DEPARTMENT_LIST]
//       );
//     }
//   }, [data]);

//   const onSubmit = (data: RouteFormValues) => {
//     confirm({
//       style: {
//         top: 300,
//       },
//       title: messages["confirm.save"],
//       content: messages["confirm.save.warning"],
//       icon: <ExclamationCircleOutlined />,
//       okText: messages["confirm.ok"],
//       okType: "danger",
//       cancelText: messages["confirm.cancel"],
//       onOk: () => {
//         onSuccess(data);
//       },
//     });
//   };

//   return (
//     <Modal
//       className="custom-modal"
//       visible={true}
//       title={
//         <div className="title-center">
//           {action === ACTION_CREATE
//             ? messages["route.form.titleCreate"]
//             : messages["route.form.titleUpdate"]}
//         </div>
//       }
//       onCancel={onClose}
//       footer={false}
//       width={"85%"}
//       maskClosable={false}
//       closeIcon={<CloseOutlined style={{ fontSize: 20 }} />}
//     >
//       <Form
//         layout="vertical"
//         className="custom-form-modal"
//         onFinish={handleSubmit(onSubmit)}
//       >
//         <Row gutter={[24, 0]}>
//           <Col span={12}>
//             <CustomInput
//               name={FC_ROUTE_NAME}
//               control={control}
//               errors={errors}
//               required
//               label={
//                 <CustomFormItemLabel label={messages["route.form.name"]} />
//               }
//               placeholder={messages["route.form.name.placeholder"]}
//               allowClear
//             />
//           </Col>
//         </Row>

//         <div className="modal-footer-group-btn">
//           <Button
//             className="btn"
//             shape="round"
//             onClick={onClose}
//             disabled={loading}
//           >
//             {messages["modal.btnCancel"]}
//           </Button>
//           <Button
//             className="btn"
//             htmlType="submit"
//             shape="round"
//             type="primary"
//             disabled={loading}
//           >
//             {messages["modal.btnSave"]}
//           </Button>
//         </div>
//       </Form>
//     </Modal>
//   );
// }

// export default RouteFormModal;
