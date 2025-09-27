// // Import necessary React and external libraries
// import React, { useState } from 'react'; // Core React library + state hook
// import {
//     Input,       // Text input component
//     Button,      // Button component
//     Typography,  // Text styling components
//     Row,         // Layout row
//     Col,         // Layout column
//     Card,        // Card container
//     message,     // Notification system
//     Form         // Form handling
// } from 'antd'; // From Ant Design library

// // Firebase authentication and database functions
// import { createUserWithEmailAndPassword } from "firebase/auth"; // For user registration
// import { doc, setDoc } from "firebase/firestore"; // For database operations
// import { auth } from '../../../config/firebase'; // Firebase configuration

// const Register = () => {
//     // Destructure Title component from Typography for consistent heading styles
//     const { Title } = Typography;

//     // Form instance for programmatic form control
//     const [form] = Form.useForm();

//     // Loading state for submit button
//     const [isLoading, setIsLoading] = useState(false);

//     /**
//      * Handle form submission
//      * @param {Object} values - Contains all form field values
//      */
//     const handleSubmit = async (values) => {
//         try {
//             // Set loading state to true to show loading indicator
//             setIsLoading(true);

//             // Destructure needed values from form
//             const { email, password, firstName, lastName } = values;

//             // 1. Create user in Firebase Authentication
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // 2. Save additional user data to Firestore database
//             // await setDoc(doc(db, "users", user.uid), {
//             //     firstName,      // User's first name
//             //     lastName,       // User's last name
//             //     email,          // User's email
//             //     createdAt: new Date(),  // Timestamp of creation
//             //     uid: user.uid   // Reference to auth user
//             // });

//             // 3. Show success message and reset form
//             message.success("Account created successfully!");
//             form.resetFields();

//         } catch (error) {
//             // Default error message
//             let errorMessage = "Registration failed. Please try again.";

//             // Handle specific Firebase error codes
//             switch (error.code) {
//                 case 'auth/email-already-in-use':
//                     errorMessage = "This email is already registered.";
//                     break;
//                 case 'auth/weak-password':
//                     errorMessage = "Password must be at least 6 characters.";
//                     break;
//                 case 'auth/invalid-email':
//                     errorMessage = "Please enter a valid email address.";
//                     break;
//                 default:
//                     console.error("Registration error:", error); // Log technical details
//             }

//             // Show error message to user
//             message.error(errorMessage);
//         } finally {
//             // Always reset loading state whether success or failure
//             setIsLoading(false);
//         }
//     };

//     // Main component render
//     return (
//         <main className="register-page p-3 p-md-4">
//             <Card className="register-card p-3 p-md-4">
//                 {/* Page title */}
//                 <Title level={2} className="register-title">Create Account</Title>

//                 {/* Main form - uses Ant Design's Form component */}
//                 <Form
//                     form={form}           // Connect form instance
//                     layout="vertical"     // Stack form items vertically
//                     onFinish={handleSubmit} // Handle submission
//                     size="large"          // Uniform large size for all inputs
//                 >
//                     {/* Form fields organized in responsive grid */}
//                     <Row gutter={16}> {/* 16px gutter between columns */}

//                         {/* First Name Field */}
//                         <Col xs={24} md={12}> {/* Full width on mobile, half on desktop */}
//                             <Form.Item
//                                 name="firstName"  // Field identifier
//                                 label="First Name" // Field label
//                                 rules={[          // Validation rules
//                                     {
//                                         required: true, // Mandatory field
//                                         message: 'Please enter your first name', // Error message
//                                         whitespace: true // Prevent whitespace-only input
//                                     }
//                                 ]}
//                             >
//                                 <Input placeholder="First name" /> {/* Actual input */}
//                             </Form.Item>
//                         </Col>

//                         {/* Last Name Field */}
//                         <Col xs={24} md={12}>
//                             <Form.Item
//                                 name="lastName"
//                                 label="Last Name"
//                             // No validation rules as this is optional
//                             >
//                                 <Input placeholder="Last name" />
//                             </Form.Item>
//                         </Col>

//                         {/* Email Field */}
//                         <Col xs={24}>
//                             <Form.Item
//                                 name="email"
//                                 label="Email"
//                                 rules={[
//                                     {
//                                         type: 'email', // Must be valid email format
//                                         message: 'Please enter a valid email'
//                                     },
//                                     {
//                                         required: true, // Mandatory field
//                                         message: 'Please enter your email'
//                                     }
//                                 ]}
//                             >
//                                 <Input placeholder="Email address" />
//                             </Form.Item>
//                         </Col>

//                         {/* Password Field */}
//                         <Col xs={24}>
//                             <Form.Item
//                                 name="password"
//                                 label="Password"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Please enter your password'
//                                     },
//                                     {
//                                         min: 6, // Minimum 6 characters
//                                         message: 'Password must be at least 6 characters'
//                                     }
//                                 ]}
//                                 hasFeedback // Shows validation feedback icon
//                             >
//                                 <Input.Password placeholder="Password" /> {/* Password masked input */}
//                             </Form.Item>
//                         </Col>

//                         {/* Confirm Password Field */}
//                         <Col xs={24}>
//                             <Form.Item
//                                 name="confirmPassword"
//                                 label="Confirm Password"
//                                 dependencies={['password']} // Watches password field for changes
//                                 hasFeedback
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Please confirm your password'
//                                     },
//                                     // Custom validator to check password match
//                                     ({ getFieldValue }) => ({
//                                         validator(_, value) {
//                                             if (!value || getFieldValue('password') === value) {
//                                                 return Promise.resolve(); // Validation passes
//                                             }
//                                             return Promise.reject('Passwords do not match'); // Fails
//                                         },
//                                     }),
//                                 ]}
//                             >
//                                 <Input.Password placeholder="Confirm password" />
//                             </Form.Item>
//                         </Col>

//                         {/* Submit Button */}
//                         <Col span={24}>
//                             <Button
//                                 type="primary"  // Primary styling
//                                 htmlType="submit" // Makes it a submit button
//                                 block          // Full width
//                                 loading={isLoading} // Shows spinner when loading
//                             >
//                                 Register
//                             </Button>
//                         </Col>
//                     </Row>
//                 </Form>
//             </Card>
//         </main>
//     );
// };

// export default Register;