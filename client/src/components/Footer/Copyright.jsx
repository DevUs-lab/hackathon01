import React from 'react';
import { Row, Col, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { Paragraph } = Typography;

    return (
        <div className="container">
            <Row justify="center" gutter={[12, 12]}>
                <Col xs={24} style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '12px', fontSize: '20px' }}>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#fff', marginRight: '15px' }}>
                            <FacebookOutlined />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: '#fff', marginRight: '15px' }}>
                            <TwitterOutlined />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#fff', marginRight: '15px' }}>
                            <InstagramOutlined />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#fff' }}>
                            <GithubOutlined />
                        </a>
                    </div>
                    <Paragraph style={{ margin: 0, color: '#ccc' }}>
                        &copy; {new Date().getFullYear()} All Rights Reserved |{' '}
                        <Link to="/privacy" style={{ color: '#ccc' }}>Privacy Policy</Link>
                    </Paragraph>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
