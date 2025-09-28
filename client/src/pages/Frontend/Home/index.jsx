import { Button, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from '../../../contexts/Auth';
import Hero from './Hero';
import AboutServices from '../About/AboutServices';
import AboutUs from '../About/AboutUs';




const { Title } = Typography;

const Home = () => {
  const { user: authUser } = useAuthContext();
  const [userData, setUserData] = useState(authUser);
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when authUser changes
  useEffect(() => {
    if (authUser) {
      setUserData(authUser);
    }
  }, [authUser]);

  // Example of updating status
  const handleUpdateProfile = async (status) => {
    setIsLoading(true);
    try {
      // Call your backend API to update status in MongoDB
      const response = await fetch(`/api/users/${authUser._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const updatedUser = await response.json();

      setUserData(updatedUser); // update local state
      window.notify(`Status updated to ${status} successfully!`, 'success');
    } catch (error) {
      console.error(error);
      window.notify("Error updating status!", "error");
    }
    finally {
      setIsLoading(false);
    }
  };

  if (!userData) return <p>Loading...</p>;

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
            <Title level={2} className='text-center mb-0'>First Name: {userData.firstName}</Title>
            <Title level={2} className='text-center mb-0'>Last Name: {userData.lastName}</Title>
            <Title level={2} className='text-center mb-0'>
              Status: {userData.status || "Not set"}
            </Title>
            <Title level={2} className='text-center mb-0'>Email: {userData.email}</Title>
            <Title level={2} className='text-center mb-0'>ID: {userData._id}</Title>
          </Col>

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
        </Row>
      </div>
    </>
  )
}

export default Home;
