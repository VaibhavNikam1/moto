// components/TaskList.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'react-router-dom';
import Modal from './Modal';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TaskList = ({ initialData }) => {
    const [tasks, setTasks] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    let sr=1;
    const handleDelete = async (taskId) => {
        // console.log(taskId);
        try {
            const { data, error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', taskId);
    
            if (error) {
                console.error('Error deleting task:', error);
                return;
            }
    
            console.log('Task deleted successfully:', data);

            window.location.reload();

        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleUpdate = async (updatedTask) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .update(updatedTask)
                .eq('id', updatedTask.id);
    
            if (error) {
                console.error('Error updating task:', error);
                return;
            }
    
            console.log('Task updated successfully:', data);
            setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };


    return (
        <table className="min-w-full bg-black border">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Task Name</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Action</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td className="py-2 px-4 border-b">{sr++}</td>
                        <td className="py-2 px-4 border-b">{task.name}</td>
                        <td className="py-2 px-4 border-b">{task.description}</td>
                        <td className="py-2 px-4 border-b">
                                <button className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 rounded-md px-3 py-1 m-1"
                                 onClick={() => handleEdit(task)}
                                >
                                    Edit
                                </button>
                            <button
                                className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 rounded-md px-3 py-1 m-1"
                                onClick={() => handleDelete(task.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
                <div className="p-4 text-black">
                    <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(currentTask);
                    }}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Task Name
                            </label>
                            <input
                                type="text"
                                value={currentTask.name}
                                onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                value={currentTask.description}
                                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 rounded-md px-3 py-1"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </Modal>
        )}
        </table>
       
    );
};

export default TaskList;
