import { withModalHanlderProps } from '@/interfaces';
import { Modal, Space, Typography } from 'antd';
import React from 'react';
const { Title, Text } = Typography;

function ExampleModal(props: withModalHanlderProps) {
    const { onClose } = props;
    return (
        <Modal open={true} onCancel={onClose} title="Example Modal">
            <Title>This is example modal!</Title>
            <Space direction="vertical">
                <Text>Some contents... </Text>
                <Text>Some contents... </Text>
                <Text>Some contents... </Text>
            </Space>
        </Modal>
    );
}

export default ExampleModal;
