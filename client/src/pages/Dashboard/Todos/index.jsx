// // src/pages/dashboard/Todos.jsx
// import React, { useEffect, useState } from "react";
// import { Input, Button, List, Checkbox, Card, Empty, Typography, Tag, Space, Popconfirm, Spin, message } from "antd";
// import { PlusOutlined, EditOutlined, CloseOutlined, CheckOutlined, LoadingOutlined } from "@ant-design/icons";

// // Mock data - replace with actual API calls
// const mockTodos = [
//   { _id: '1', text: 'Learn React', completed: false },
//   { _id: '2', text: 'Build a project', completed: true },
//   { _id: '3', text: 'Deploy to production', completed: false },
// ];

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
// const { Text } = Typography;

// const Todos = () => {
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editValue, setEditValue] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API call
//     const fetchTodos = async () => {
//       setLoading(true);
//       try {
//         // Replace with actual API call
//         // const res = await axios.get(`${API_BASE}/api/todos`, { headers });
//         // setTodos(res.data);

//         // Using mock data for demo
//         setTimeout(() => {
//           setTodos(mockTodos);
//           setLoading(false);
//         }, 1000);
//       } catch (err) {
//         console.error(err);
//         message.error("Failed to load todos");
//         setLoading(false);
//       }
//     };
//     fetchTodos();
//   }, []);

//   const addTodo = async () => {
//     if (!inputValue.trim()) return;
//     try {
//       // Replace with actual API call
//       // const res = await axios.post(`${API_BASE}/api/todos`, { text: inputValue.trim() }, { headers });
//       const newTodo = {
//         _id: Date.now().toString(),
//         text: inputValue.trim(),
//         completed: false
//       };
//       setTodos(prev => [newTodo, ...prev]);
//       setInputValue("");
//       message.success("Todo added");
//     } catch (err) {
//       console.error(err);
//       message.error("Error adding todo");
//     }
//   };

//   const toggleTodo = async (todo) => {
//     try {
//       // Replace with actual API call
//       // const res = await axios.put(`${API_BASE}/api/todos/${todo._id}`, { completed: !todo.completed }, { headers });
//       setTodos(prev => prev.map(t =>
//         t._id === todo._id ? { ...t, completed: !t.completed } : t
//       ));
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to update");
//     }
//   };

//   const deleteTodo = async (id) => {
//     try {
//       // Replace with actual API call
//       // await axios.delete(`${API_BASE}/api/todos/${id}`, { headers });
//       setTodos(prev => prev.filter(t => t._id !== id));
//       message.success("Todo deleted");
//     } catch (err) {
//       console.error(err);
//       message.error("Delete failed");
//     }
//   };

//   const startEditing = (id, text) => {
//     setEditingId(id);
//     setEditValue(text);
//   };

//   const saveEdit = async (id) => {
//     try {
//       // Replace with actual API call
//       // const res = await axios.put(`${API_BASE}/api/todos/${id}`, { text: editValue }, { headers });
//       setTodos(prev => prev.map(t =>
//         t._id === id ? { ...t, text: editValue } : t
//       ));
//       setEditingId(null);
//       message.success("Updated");
//     } catch (err) {
//       console.error(err);
//       message.error("Edit failed");
//     }
//   };

//   if (loading) return (
//     <div style={{
//       textAlign: 'center',
//       padding: 40
//     }}>
//       <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
//       <Text>Loading your todos...</Text>
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
//                 key={item._id}
//                 actions={[
//                   editingId === item._id ? (
//                     <>
//                       <Button
//                         type="text"
//                         icon={<CheckOutlined />}
//                         onClick={() => saveEdit(item._id)}
//                       />
//                       <Button
//                         type="text"
//                         icon={<CloseOutlined />}
//                         onClick={() => setEditingId(null)}
//                       />
//                     </>
//                   ) : (
//                     <>
//                       <Button
//                         type="text"
//                         icon={<EditOutlined />}
//                         onClick={() => startEditing(item._id, item.text)}
//                       />
//                       <Popconfirm
//                         title="Delete this todo?"
//                         onConfirm={() => deleteTodo(item._id)}
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
//                   {editingId === item._id ? (
//                     <Input
//                       value={editValue}
//                       onChange={(e) => setEditValue(e.target.value)}
//                       onPressEnter={() => saveEdit(item._id)}
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
//                   <Tag
//                     color={['green', 'blue', 'orange', 'red'][Math.min(index, 3)]}
//                     style={{ marginLeft: 8 }}
//                   >
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
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth";
import { List, Input, Button, Checkbox } from "antd";

const Todos = () => {
  const { user } = useAuthContext();
  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const addTodo = async () => {
    if (!text) return;
    try {
      const res = await axios.post(
        `${API}/api/todos`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([res.data, ...todos]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const res = await axios.put(
        `${API}/api/todos/${todo._id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(t => (t._id === todo._id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Todos</h2>
      <Input
        placeholder="Add a new todo"
        value={text}
        onChange={e => setText(e.target.value)}
        onPressEnter={addTodo}
        style={{ width: "300px", marginRight: "8px" }}
      />
      <Button type="primary" onClick={addTodo}>Add</Button>

      <List
        style={{ marginTop: "20px" }}
        bordered
        dataSource={todos}
        renderItem={todo => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => deleteTodo(todo._id)}>Delete</Button>
            ]}
          >
            <Checkbox checked={todo.completed} onChange={() => toggleComplete(todo)}>
              {todo.text}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Todos;
