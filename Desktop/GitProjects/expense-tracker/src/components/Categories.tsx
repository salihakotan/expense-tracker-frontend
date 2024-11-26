import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, Space, Table, Tag, Form, Select, ColorPicker } from 'antd';

import type { TableProps } from 'antd';
import { Category, CategoryForm, CategoryTypeDispatch } from '../types/category';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../store/actions/categoryActions';
import { AppDispatch } from '../store/store';
import { AppState } from '../store';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Mode } from '../types/general';
import { useNavigate } from 'react-router-dom';





const emptyForm: CategoryForm = {
    name: "",
    type: "expense",
    color: "black"

}

function Categories() {
    const token = localStorage.getItem('token');


    const dispatch: AppDispatch = useDispatch();


    const { data, loading, error } = useSelector((state: AppState) => state.categories)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<CategoryForm>(emptyForm);

    const [mode, setMode] = useState<Mode>("new");
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getCategories());
    }, [])

   



    const showModal = (mode: Mode) => {
        setIsModalOpen(true);
        setMode(mode)
    };

    const handleOk = () => {
        if (mode === "new") dispatch(addCategory(form))
        else if (mode === "edit") dispatch(updateCategory(form, updateId as number));
        else if (mode === "delete") dispatch(deleteCategory(deleteId as number));

        setIsModalOpen(false);
        setMode("new")
        setForm(emptyForm)
        setUpdateId(null)
        setDeleteId(null)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMode("new")
        setForm(emptyForm)
        setUpdateId(null)
        setDeleteId(null)
    };

    console.log("data: " + data);
    console.log("ladoing: " + loading);
    console.log("error: " + error);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text: string, category: Category) => {
                return <Tag color={category.color}>{category.type}</Tag>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, category: Category) => (
                <Space size="middle">
                    <EditOutlined style={{ color: "blue" }} onClick={() => {
                        showModal("edit")
                        setForm(category)
                        setUpdateId(category.id)
                    }} />
                    <DeleteOutlined onClick={() => {
                        showModal("delete")
                        setDeleteId(category.id)
                    }} style={{ color: "red" }} />
                </Space>
            ),
        },
    ];



    return (
        <>
            <Button style={{ float: "right", marginBottom:"20px" }} type="primary" onClick={() => showModal("new")}> 
                New Category
            </Button>
            <Modal title={mode === "new" ? "Create new category" : mode ==="edit" ? "Update category" : "Delete category"}
                open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: (mode !=="delete" && !form.name )}}
            >

                {
                    mode === "edit" || mode === "new" ?
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >



                            <Form.Item label="Category name" required>
                                <Input name='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </Form.Item>
                            <Form.Item label="Category type">
                                <Select value={form.type} defaultValue={form.type} onChange={(value) => setForm({ ...form, type: value as "income" | "expense" })}>
                                    <Select.Option value="income">Income</Select.Option>
                                    <Select.Option value="expense">Expense</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Color">
                                <ColorPicker value={form.color} onChange={(value) => setForm({ ...form, color: value.toHexString() })} />
                            </Form.Item>
                        </Form>
                        : mode === "delete" ?

                        <div>
                            Are you sure?
                        </div> 
                        : null
                }

            </Modal>

            <Table loading={loading} columns={columns} dataSource={data} />


        </>


    )
}

export default Categories