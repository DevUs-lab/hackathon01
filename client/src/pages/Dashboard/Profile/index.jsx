// src/pages/dashboard/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Typography, Upload, Avatar, Input, Divider, message } from "antd";
import { CameraOutlined, EditOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";

// Mock user data - replace with actual API calls
const mockUser = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  bio: 'Full-stack developer passionate about React and Node.js',
  status: 'active',
  photoURL: null
};

const { Title, Text } = Typography;
const { TextArea } = Input;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      try {
        // Replace with actual API call
        // const res = await axios.get(`${API_BASE}/api/users/${user._id}`, { headers });
        // setUserData(res.data);

        // Using mock data for demo
        setTimeout(() => {
          setUserData(mockUser);
        }, 500);
      } catch (err) {
        console.error(err);
        message.error("Failed to load profile");
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (status) => {
    if (!userData) return;
    setIsLoading(true);
    try {
      // Replace with actual API call
      // const res = await axios.put(`${API_BASE}/api/users/${userData._id}`, { status }, { headers });
      setUserData(prev => ({ ...prev, status }));
      message.success(`Status updated to ${status}`);
    } catch (e) {
      console.error(e);
      message.error("Error updating status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    setTempData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      bio: userData?.bio || "",
      phone: userData?.phone || ""
    });
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    if (!userData) return;
    setIsLoading(true);
    try {
      // Replace with actual API call
      // const res = await axios.put(`${API_BASE}/api/users/${userData._id}`, tempData, { headers });
      setUserData(prev => ({ ...prev, ...tempData }));
      setIsEditing(false);
      message.success("Profile updated");
    } catch (e) {
      console.error(e);
      message.error("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) return <div>Loading profile...</div>;

  return (
    <div className="profile-page">
      <Card className="profile-card">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              {userData.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt="Profile"
                  style={{ width: 160, height: 160, borderRadius: 80 }}
                />
              ) : (
                <Avatar size={160} icon={<UserOutlined />} />
              )}
              <Upload showUploadList={false} beforeUpload={() => false}>
                <Button shape="circle" icon={<CameraOutlined />} style={{ marginTop: 12 }} />
              </Upload>
              <Title level={3}>{userData.firstName} {userData.lastName}</Title>
              <Text type="secondary">{userData.email}</Text>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={3}>Profile Information</Title>
              <Button
                icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
                onClick={isEditing ? handleSaveProfile : handleEditToggle}
                loading={isLoading}
                type={isEditing ? 'primary' : 'default'}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>First Name</Text>
                {isEditing ? (
                  <Input
                    value={tempData.firstName}
                    onChange={(e) => setTempData(p => ({ ...p, firstName: e.target.value }))}
                  />
                ) : (
                  <div>{userData.firstName}</div>
                )}
              </Col>
              <Col span={12}>
                <Text strong>Last Name</Text>
                {isEditing ? (
                  <Input
                    value={tempData.lastName}
                    onChange={(e) => setTempData(p => ({ ...p, lastName: e.target.value }))}
                  />
                ) : (
                  <div>{userData.lastName}</div>
                )}
              </Col>
              <Col span={12}>
                <Text strong>Email</Text>
                <div>{userData.email}</div>
              </Col>
              <Col span={12}>
                <Text strong>Phone</Text>
                {isEditing ? (
                  <Input
                    value={tempData.phone}
                    onChange={(e) => setTempData(p => ({ ...p, phone: e.target.value }))}
                  />
                ) : (
                  <div>{userData.phone || 'Not provided'}</div>
                )}
              </Col>
              <Col span={24}>
                <Text strong>Bio</Text>
                {isEditing ? (
                  <TextArea
                    rows={4}
                    value={tempData.bio}
                    onChange={(e) => setTempData(p => ({ ...p, bio: e.target.value }))}
                  />
                ) : (
                  <div>{userData.bio || 'No bio yet'}</div>
                )}
              </Col>
              <Col span={24}>
                <Text strong>Account Status</Text>
                <div style={{ marginTop: 8 }}>
                  <Button
                    type={userData.status === 'active' ? 'primary' : 'default'}
                    onClick={() => handleUpdateProfile('active')}
                  >
                    Active
                  </Button>
                  <Button
                    style={{ marginLeft: 8 }}
                    type={userData.status === 'inactive' ? 'primary' : 'default'}
                    onClick={() => handleUpdateProfile('inactive')}
                  >
                    Inactive
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;