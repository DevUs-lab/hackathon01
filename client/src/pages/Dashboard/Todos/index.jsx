// // Todos.jsx
// import React, { useState, useEffect } from 'react';
// import { Input, Button, List, Checkbox, Card, Empty, Typography, Tag, Space, Popconfirm, Spin } from 'antd';
// import {
//   CloseOutlined, PlusOutlined, EditOutlined, CheckOutlined,
//   LoadingOutlined
// } from '@ant-design/icons';
// import {
//   collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot
// } from 'firebase/firestore';
// import { firestore } from '../../../config/firebase'; // Adjust path if needed
// import { useAuthContext } from '../../../contexts/Auth';

// const { Text } = Typography;

// const Todos = () => {
//   const { user } = useAuthContext(); // Get logged-in user
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editValue, setEditValue] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Firestore ref to user's todos
//   const todosRef = collection(firestore, "users", user.uid, "todos");

//   // Load todos from Firestore
//   useEffect(() => {
//     if (!user?.uid) return;

//     const unsubscribe = onSnapshot(todosRef, (snapshot) => {
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setTodos(data);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   },);

//   const addTodo = async () => {
//     if (inputValue.trim()) {
//       try {
//         await addDoc(todosRef, {
//           text: inputValue,
//           completed: false,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString()
//         });
//         setInputValue('');
//         window.notify('Todo added', "success");
//       } catch (error) {
//         console.error(error);
//         window.notify('Error adding todo', "error");
//       }
//     }
//   };

//   const toggleTodo = async (todo) => {
//     try {
//       await updateDoc(doc(firestore, "users", user.uid, "todos", todo.id), {
//         completed: !todo.completed,
//         updatedAt: new Date().toISOString()
//       });
//     } catch (error) {
//       console.error(error);
//       window.notify('Failed to update', "error");
//     }
//   };

//   const deleteTodo = async (id) => {
//     try {
//       await deleteDoc(doc(firestore, "users", user.uid, "todos", id));
//       window.notify('Todo deleted', 'success');
//     } catch (error) {
//       console.error(error);
//       window.notify('Delete failed', 'error');
//     }
//   };

//   const startEditing = (id, text) => {
//     setEditingId(id);
//     setEditValue(text);
//   };

//   const saveEdit = async (id) => {
//     try {
//       await updateDoc(doc(firestore, "users", user.uid, "todos", id), {
//         text: editValue,
//         updatedAt: new Date().toISOString()
//       });
//       setEditingId(null);
//       window.notify('Updated', 'success');
//     } catch (error) {
//       console.error(error);
//       window.notify('Edit failed', 'error');
//     }
//   };

//   const cancelEdit = () => setEditingId(null);

//   const getPriorityColor = (index) => {
//     const colors = ['green', 'blue', 'orange', 'red'];
//     return colors[Math.min(index, colors.length - 1)];
//   };

//   // if (loading) return <Spin tip="Loading Todos..." style={{ margin: 50 }} />;

//   // if (loading) return (
//   //   <div style={{
//   //     display: 'flex',
//   //     justifyContent: 'center',
//   //     alignItems: 'center',
//   //     minHeight: '300px' // Or whatever height works for your card
//   //   }}>
//   //     <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="Loading Todos..." size="large" />
//   //   </div>
//   // );

//   if (loading) return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '300px',
//       flexDirection: 'column'
//     }}>
//       <Spin
//         indicator={<LoadingOutlined style={{
//           fontSize: 36,
//           color: '#722ed1' // Purple color
//         }} spin />}
//         tip="Loading your todos..."
//       />
//       <Text type="secondary" style={{ marginTop: 16 }}>
//         Please wait while we fetch your tasks
//       </Text>
//     </div>
//   );

//   return (
//     <div style={{ padding: 24 }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
//         <Typography.Title level={3}>Todo List</Typography.Title>
//         <Tag color="blue">{todos.filter(t => !t.completed).length} Pending</Tag>
//       </div>

//       <Card>
//         <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
//           <Input
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Add a new task"
//             onPressEnter={addTodo}
//           />
//           <Button
//             type="primary"
//             onClick={addTodo}
//             icon={<PlusOutlined />}
//             disabled={!inputValue.trim()}
//           >
//             Add
//           </Button>
//         </Space.Compact>

//         {todos.length === 0 ? (
//           <Empty description={<Text type="secondary">No todos yet. Add one!</Text>} />
//         ) : (
//           <List
//             dataSource={todos}
//             renderItem={(item, index) => (
//               <List.Item
//                 key={item.id}
//                 actions={[
//                   editingId === item.id ? (
//                     <>
//                       <Button type="text" icon={<CheckOutlined />} onClick={() => saveEdit(item.id)} />
//                       <Button type="text" icon={<CloseOutlined />} onClick={cancelEdit} />
//                     </>
//                   ) : (
//                     <>
//                       <Button type="text" icon={<EditOutlined />} onClick={() => startEditing(item.id, item.text)} />
//                       <Popconfirm
//                         title="Delete this todo?"
//                         onConfirm={() => deleteTodo(item.id)}
//                         okText="Yes"
//                         cancelText="No"
//                       >
//                         <Button type="text" danger icon={<CloseOutlined />} />
//                       </Popconfirm>
//                     </>
//                   )
//                 ]}
//               >
//                 <Checkbox
//                   checked={item.completed}
//                   onChange={() => toggleTodo(item)}
//                 >
//                   {editingId === item.id ? (
//                     <Input
//                       value={editValue}
//                       onChange={(e) => setEditValue(e.target.value)}
//                       onPressEnter={() => saveEdit(item.id)}
//                       style={{ marginLeft: 8 }}
//                     />
//                   ) : (
//                     <Text
//                       style={{
//                         textDecoration: item.completed ? 'line-through' : 'none',
//                         marginLeft: 8,
//                         color: item.completed ? '#aaa' : 'inherit'
//                       }}
//                     >
//                       {item.text}
//                     </Text>
//                   )}
//                   <Tag color={getPriorityColor(index)} style={{ marginLeft: 8 }}>
//                     {index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}
//                   </Tag>
//                 </Checkbox>
//               </List.Item>
//             )}
//           />
//         )}
//       </Card>
//     </div>
//   );
// };

// export default Todos;


















import React, { useEffect, useState } from "react";
import { Input, Button, List, Checkbox, Card, Empty, Typography, Tag, Space, Popconfirm, Spin, message } from "antd";
import { PlusOutlined, EditOutlined, CloseOutlined, CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
const { Text } = Typography;

const Todos = () => {
  const { user, token } = useAuthContext();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!user || !token) return;
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/todos`, { headers });
        setTodos(res.data);
      } catch (err) {
        console.error(err);
        message.error("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [user, token]);

  const addTodo = async () => {
    if (!inputValue.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/api/todos`, { text: inputValue.trim() }, { headers });
      setTodos(prev => [res.data, ...prev]);
      setInputValue("");
      message.success("Todo added");
    } catch (err) {
      console.error(err);
      message.error("Error adding todo");
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const res = await axios.put(`${API_BASE}/api/todos/${todo._id}`, { completed: !todo.completed }, { headers });
      setTodos(prev => prev.map(t => t._id === res.data._id ? res.data : t));
    } catch (err) {
      console.error(err);
      message.error("Failed to update");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/todos/${id}`, { headers });
      setTodos(prev => prev.filter(t => t._id !== id));
      message.success("Todo deleted");
    } catch (err) {
      console.error(err);
      message.error("Delete failed");
    }
  };

  const startEditing = (id, text) => { setEditingId(id); setEditValue(text); };
  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`${API_BASE}/api/todos/${id}`, { text: editValue }, { headers });
      setTodos(prev => prev.map(t => t._id === res.data._id ? res.data : t));
      setEditingId(null);
      message.success("Updated");
    } catch (err) {
      console.error(err);
      message.error("Edit failed");
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 40 }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /><Text>Loading your todos...</Text></div>;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={3}>Todo List</Typography.Title>
        <Tag color="blue">{todos.filter(t => !t.completed).length} Pending</Tag>
      </div>

      <Card>
        <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Add a new task" onPressEnter={addTodo} />
          <Button type="primary" onClick={addTodo} icon={<PlusOutlined />} disabled={!inputValue.trim()}>Add</Button>
        </Space.Compact>

        {todos.length === 0 ? <Empty description={<Text type="secondary">No todos yet. Add one!</Text>} /> : (
          <List dataSource={todos} renderItem={(item, index) => (
            <List.Item key={item._id} actions={[
              editingId === item._id ? <>
                <Button type="text" icon={<CheckOutlined />} onClick={() => saveEdit(item._id)} />
                <Button type="text" icon={<CloseOutlined />} onClick={() => setEditingId(null)} />
              </> : <>
                <Button type="text" icon={<EditOutlined />} onClick={() => startEditing(item._id, item.text)} />
                <Popconfirm title="Delete this todo?" onConfirm={() => deleteTodo(item._id)} okText="Yes" cancelText="No">
                  <Button type="text" danger icon={<CloseOutlined />} />
                </Popconfirm>
              </>
            ]}>
              <Checkbox checked={item.completed} onChange={() => toggleTodo(item)}>
                {editingId === item._id ? <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} onPressEnter={() => saveEdit(item._id)} style={{ marginLeft: 8 }} /> : (
                  <Text style={{ textDecoration: item.completed ? 'line-through' : 'none', marginLeft: 8, color: item.completed ? '#aaa' : 'inherit' }}>{item.text}</Text>
                )}
                <Tag color={['green', 'blue', 'orange', 'red'][Math.min(index, 3)]} style={{ marginLeft: 8 }}>{index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}</Tag>
              </Checkbox>
            </List.Item>
          )} />
        )}
      </Card>
    </div>
  );
};

export default Todos;
