// Add.jsx - Example content
import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Add = () => {
    return (
        <Card>
            <Title level={2}>Add New Item</Title>
            <p>This is the Add component. You can add content here.</p>
        </Card>
    );
};

export default Add;