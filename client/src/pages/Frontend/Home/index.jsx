// src/pages/Home.jsx
import { Button, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from '../../../contexts/Auth';
import Hero from './Hero';
import AboutServices from '../About/AboutServices';
import AboutUs from '../About/AboutUs';
import ScreenLoader from '../../../components/ScreenLoader';

const { Title } = Typography;

const Home = () => {
  const { user: authUser, loading } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when authUser changes (or becomes null)
  useEffect(() => {
    setUserData(authUser || null);
  }, [authUser]);

  // Example of updating status
  const handleUpdateProfile = async (status) => {
    if (!authUser) {
      window.notify("Please login to update profile", "warning");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${authUser._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        // try to parse error json
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || 'Failed to update status');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser); // update local state
      window.notify(`Status updated to ${status} successfully!`, 'success');
    } catch (error) {
      console.error(error);
      window.notify("Error updating status!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // While AuthContext is determining auth status, show the global loader
  if (loading) return <ScreenLoader />;

  return (
    <>
      <Hero />
      <AboutServices />
      <br />
      <br />
      <br />
      <AboutUs className="mt-3" />

      <div className="container">
        <Row gutter={16}>
          <Col span={24} className='mt-3'>
            <Title level={1} className='text-center mb-0'>Home page</Title>

            {userData ? (
              <>
                <Title level={2}>First Name: {userData.firstName}</Title>
                <Title level={2}>Last Name: {userData.lastName}</Title>
                <Title level={2}>Status: {userData.status || "Not set"}</Title>
                <Title level={2}>Email: {userData.email}</Title>
                <Title level={2}>ID: {userData._id}</Title>
              </>
            ) : (
              <Title level={2} className='text-center mt-2'>
                Welcome Guest 👋 — please login to see profile info
              </Title>
            )}
          </Col>

          {userData && (
            <Col span={24} className='text-center mt-3'>
              <Button
                loading={isLoading}
                onClick={() => handleUpdateProfile("active")}
                className="m-2"
                type={userData.status === 'active' ? 'primary' : 'default'}
              >
                Set Active
              </Button>
              <Button
                loading={isLoading}
                onClick={() => handleUpdateProfile("inactive")}
                className="m-2"
                type={userData.status === 'inactive' ? 'primary' : 'default'}
              >
                Set Inactive
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </>
  )
}

export default Home;
