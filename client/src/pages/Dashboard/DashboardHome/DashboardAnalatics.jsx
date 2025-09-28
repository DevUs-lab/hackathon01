// src/pages/dashboard/DashboardAnalatics.jsx
import { useEffect } from 'react';
import { Button, Card } from 'antd';

// Create a simple trackEvent function since the hook path is wrong
const trackEvent = (eventName, data) => {
    console.log('Analytics Event:', eventName, data);
};

const DashboardAnalatics = () => {
    useEffect(() => {
        trackEvent('page_view', {
            page_title: 'Dashboard',
            user_status: 'active'
        });
    }, []);

    const handleButtonClick = (buttonName) => {
        trackEvent('button_click', {
            button_name: buttonName,
            action: 'add_to_cart'
        });
    };

    return (
        <Card title="Dashboard Analytics">
            <Button
                type="primary"
                onClick={() => handleButtonClick('primary_cta')}
            >
                Track This Button
            </Button>

            <Button
                style={{ marginLeft: 10 }}
                onClick={() => trackEvent('custom_event', { event_type: 'special_action' })}
            >
                Custom Event
            </Button>
        </Card>
    );
};

export default DashboardAnalatics;