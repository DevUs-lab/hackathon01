import { Button, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from '../../../contexts/Auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const { Title } = Typography

const Home = () => {
  const { user: authUser } = useAuthContext();
  const [userData, setUserData] = useState(authUser);
  const [isloading, setIsLoading] = useState(false);

  // Real-time listener for user data updates
  useEffect(() => {
    if (!authUser?.uid) return;

    const unsubscribe = onSnapshot(
      doc(firestore, "users", authUser.uid),
      (doc) => {
        if (doc.exists()) {
          const updatedData = { ...authUser, ...doc.data() };
          setUserData(updatedData);
          // Optional: Update the auth context as well
          // updateUser(updatedData);
        }
      }
    );

    return () => unsubscribe();
  }, [authUser]);

  const handleUpdateProfile = async (status) => {
    setIsLoading(true);
    try {
      await setDoc(
        doc(firestore, "users", authUser.uid),
        { status },
        { merge: true }
      );
      window.notify(`Status updated to ${status} successfully!`, 'success');
    } catch (e) {
      window.notify("Error updating status!", "error");
      console.error("Error updating document: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container ">
      <Row gutter={16}>
        <Col span={24} className='mt-3'>
          <Title level={1} className='text-center mb-0'>Home page</Title>
          <Title level={2} className='text-center mb-0'>First Name: {userData?.firstName}</Title>
          <Title level={2} className='text-center mb-0'>Last Name: {userData?.lastName}</Title>
          <Title level={2} className='text-center mb-0'>
            Status: {userData?.status || "Not set"}
          </Title>
          <Title level={2} className='text-center mb-0'>Email: {userData?.email}</Title>
          <Title level={2} className='text-center mb-0'>UID: {userData?.uid}</Title>
        </Col>

        <Col span={24} className='text-center mt-3'>
          <Button loading={isloading} onClick={() => handleUpdateProfile("active")} className="m-2" type={userData?.status === 'active' ? 'primary' : 'default'}
          >
            Set Active
          </Button>
          <Button
            loading={isloading}
            onClick={() => handleUpdateProfile("inactive")}
            className="m-2"
            type={userData?.status === 'inactive' ? 'primary' : 'default'}
          >
            Set Inactive
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Home