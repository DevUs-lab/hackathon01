// import { Button, Card, Col, Divider, Row, Typography, Upload, message, Input, Avatar } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { CameraOutlined, EditOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
// import { useAuthContext } from '../../../contexts/Auth';
// import { doc, onSnapshot, setDoc } from 'firebase/firestore';
// import { firestore } from '../../../config/firebase';

// const { Title, Text } = Typography;
// const { TextArea } = Input;

// const UserProfile = () => {
//   const { user: authUser } = useAuthContext();
//   const [userData, setUserData] = useState(authUser);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [tempData, setTempData] = useState({});

//   useEffect(() => {
//     if (!authUser?.uid) return;

//     const unsubscribe = onSnapshot(
//       doc(firestore, "users", authUser.uid),
//       (doc) => {
//         if (doc.exists()) {
//           const updatedData = { ...authUser, ...doc.data() };
//           setUserData(updatedData);
//         }
//       }
//     );

//     return () => unsubscribe();
//   }, [authUser]);

//   const handleUpdateProfile = async (status) => {
//     setIsLoading(true);
//     try {
//       await setDoc(
//         doc(firestore, "users", authUser.uid),
//         { status },
//         { merge: true }
//       );
//       message.success(`Status updated to ${status} successfully!`);
//     } catch (e) {
//       message.error("Error updating status!");
//       console.error("Error updating document: ", e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEditToggle = () => {
//     if (isEditing) {
//       setIsEditing(false);
//     } else {
//       setTempData({
//         firstName: userData?.firstName,
//         lastName: userData?.lastName,
//         bio: userData?.bio || '',
//         phone: userData?.phone || ''
//       });
//       setIsEditing(true);
//     }
//   };

//   const handleSaveProfile = async () => {
//     setIsLoading(true);
//     try {
//       await setDoc(
//         doc(firestore, "users", authUser.uid),
//         { ...tempData },
//         { merge: true }
//       );
//       message.success('Profile updated successfully!');
//       setIsEditing(false);
//     } catch (e) {
//       message.error("Error updating profile!");
//       console.error("Error updating document: ", e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setTempData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="profile-page">
//       <Card className="profile-card">
//         <Row gutter={[24, 24]}>
//           <Col xs={24} md={8} className="profile-avatar-col">
//             <div className="profile-image-container">
//               {userData?.photoURL ? (
//                 <img
//                   src={userData.photoURL}
//                   alt="Profile"
//                   className="profile-image"
//                 />
//               ) : (
//                 <Avatar
//                   size={160}
//                   icon={<UserOutlined />}
//                   className="profile-avatar-default"
//                 />
//               )}
//               <Upload
//                 className="profile-upload-button"
//                 showUploadList={false}
//                 beforeUpload={() => false}
//               >
//                 <Button
//                   shape="circle"
//                   icon={<CameraOutlined />}
//                   className="upload-icon-btn"
//                 />
//               </Upload>
//             </div>

//             <Title level={3} className="profile-name">
//               {userData?.firstName} {userData?.lastName}
//             </Title>
//             <Text type="secondary" className="profile-email">
//               {userData?.email}
//             </Text>
//           </Col>

//           <Col xs={24} md={16} className="profile-details-col">
//             <div className="profile-header">
//               <Title level={3}>Profile Information</Title>
//               <Button
//                 icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
//                 onClick={isEditing ? handleSaveProfile : handleEditToggle}
//                 loading={isLoading}
//                 type={isEditing ? 'primary' : 'default'}
//               >
//                 {isEditing ? 'Save Changes' : 'Edit Profile'}
//               </Button>
//             </div>

//             <Divider className="profile-divider" />

//             <div className="profile-details">
//               <Row gutter={[16, 24]}>
//                 <Col span={12} className="profile-field">
//                   <Text strong>First Name</Text>
//                   {isEditing ? (
//                     <Input
//                       value={tempData.firstName}
//                       onChange={(e) => handleInputChange('firstName', e.target.value)}
//                     />
//                   ) : (
//                     <div className="profile-value">{userData?.firstName}</div>
//                   )}
//                 </Col>
//                 <Col span={12} className="profile-field">
//                   <Text strong>Last Name</Text>
//                   {isEditing ? (
//                     <Input
//                       value={tempData.lastName}
//                       onChange={(e) => handleInputChange('lastName', e.target.value)}
//                     />
//                   ) : (
//                     <div className="profile-value">{userData?.lastName}</div>
//                   )}
//                 </Col>
//                 <Col span={12} className="profile-field">
//                   <Text strong>Email</Text>
//                   <div className="profile-value">{userData?.email}</div>
//                 </Col>
//                 <Col span={12} className="profile-field">
//                   <Text strong>Phone</Text>
//                   {isEditing ? (
//                     <Input
//                       value={tempData.phone}
//                       onChange={(e) => handleInputChange('phone', e.target.value)}
//                     />
//                   ) : (
//                     <div className="profile-value">
//                       {userData?.phone || 'Not provided'}
//                     </div>
//                   )}
//                 </Col>
//                 <Col span={24} className="profile-field">
//                   <Text strong>Bio</Text>
//                   {isEditing ? (
//                     <TextArea
//                       rows={4}
//                       value={tempData.bio}
//                       onChange={(e) => handleInputChange('bio', e.target.value)}
//                     />
//                   ) : (
//                     <div className="profile-value">
//                       {userData?.bio || 'No bio yet'}
//                     </div>
//                   )}
//                 </Col>
//                 <Col span={24} className="profile-field">
//                   <Text strong>Account Status</Text>
//                   <div className="profile-status-buttons">
//                     <Button
//                       onClick={() => handleUpdateProfile("active")}
//                       type={userData?.status === 'active' ? 'primary' : 'default'}
//                     >
//                       Active
//                     </Button>
//                     <Button
//                       onClick={() => handleUpdateProfile("inactive")}
//                       type={userData?.status === 'inactive' ? 'primary' : 'default'}
//                     >
//                       Inactive
//                     </Button>
//                   </div>
//                 </Col>
//               </Row>
//             </div>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default UserProfile;





import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Typography, Upload, Avatar, Input, Divider, message } from "antd";
import { CameraOutlined, EditOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
const { Title, Text } = Typography;
const { TextArea } = Input;

const UserProfile = () => {
  const { user, token, logout } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/users/${user._id || user.id || user._id}`, { headers });
        setUserData(res.data);
      } catch (err) {
        console.error(err);
        message.error("Failed to load profile");
      }
    };
    fetch();
  }, [user, token]);

  const handleUpdateProfile = async (status) => {
    if (!userData) return;
    setIsLoading(true);
    try {
      const res = await axios.put(`${API_BASE}/api/users/${userData._id}`, { status }, { headers });
      setUserData(res.data);
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
      const res = await axios.put(`${API_BASE}/api/users/${userData._id}`, tempData, { headers });
      setUserData(res.data);
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
              {userData.photoURL ? <img src={userData.photoURL} alt="Profile" style={{ width: 160, height: 160, borderRadius: 80 }} /> : <Avatar size={160} icon={<UserOutlined />} />}
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
              <Button icon={isEditing ? <SaveOutlined /> : <EditOutlined />} onClick={isEditing ? handleSaveProfile : handleEditToggle} loading={isLoading}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}><Text strong>First Name</Text>{isEditing ? <Input value={tempData.firstName} onChange={(e) => setTempData(p => ({ ...p, firstName: e.target.value }))} /> : <div>{userData.firstName}</div>}</Col>
              <Col span={12}><Text strong>Last Name</Text>{isEditing ? <Input value={tempData.lastName} onChange={(e) => setTempData(p => ({ ...p, lastName: e.target.value }))} /> : <div>{userData.lastName}</div>}</Col>
              <Col span={12}><Text strong>Email</Text><div>{userData.email}</div></Col>
              <Col span={12}><Text strong>Phone</Text>{isEditing ? <Input value={tempData.phone} onChange={(e) => setTempData(p => ({ ...p, phone: e.target.value }))} /> : <div>{userData.phone || 'Not provided'}</div>}</Col>
              <Col span={24}><Text strong>Bio</Text>{isEditing ? <TextArea rows={4} value={tempData.bio} onChange={(e) => setTempData(p => ({ ...p, bio: e.target.value }))} /> : <div>{userData.bio || 'No bio yet'}</div>}</Col>
              <Col span={24}><Text strong>Account Status</Text><div style={{ marginTop: 8 }}>
                <Button type={userData.status === 'active' ? 'primary' : 'default'} onClick={() => handleUpdateProfile('active')}>Active</Button>
                <Button style={{ marginLeft: 8 }} type={userData.status === 'inactive' ? 'primary' : 'default'} onClick={() => handleUpdateProfile('inactive')}>Inactive</Button>
              </div></Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;
