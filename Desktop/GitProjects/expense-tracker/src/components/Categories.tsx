import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, Space, Table, Tag, Form, Select, ColorPicker } from 'antd';

import type { TableProps } from 'antd';
import { Category, CategoryTypeDispatch } from '../types/category';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getCategories } from '../store/actions/categoryActions';
import { AppDispatch } from '../store/store';
import { AppState } from '../store';



type Mode = "new" | "edit";
export interface CategoryForm {
    name: string,
    type: "income" | "expense",
    color?: string
}

const emptyForm: CategoryForm = {
    name: "",
    type: "expense",
    color: "black"

}

function Categories() {


    const dispatch: AppDispatch = useDispatch();


    const { data, loading, error } = useSelector((state: AppState) => state.categories)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<CategoryForm>(emptyForm);

    const [mode, setMode] = useState<Mode>("new");

    useEffect(() => {
        dispatch(getCategories());
    }, [])



    const showModal = (mode: Mode) => {
        setIsModalOpen(true);
        setMode(mode)
    };

    const handleOk = () => {
        dispatch(addCategory(form))
        setIsModalOpen(false);
        setMode("new")
        setForm(emptyForm)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMode("new")
        setForm(emptyForm)
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



        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: (_, record) => (
        //     <Space size="middle">
        //       <a>Invite {record.name}</a>
        //       <a>Delete</a>
        //     </Space>
        //   ),
        // },
    ];



    return (
        <>
            <Button style={{ float: "right" }} type="primary" onClick={() => showModal("new")}>
                New Category
            </Button>
            <Modal title={mode === "new" ? "Create new category" : "Update category"} 
            open={isModalOpen} onOk={handleOk} 
            onCancel={handleCancel}
            okButtonProps={{disabled: !form.name}}
            >

                <Form
                labelCol={{span:8}}
                wrapperCol={{span:16}}
                >

              

                <Form.Item label="Category name" required>
                    <Input name='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Form.Item>
                <Form.Item label="Category type">
                    <Select defaultValue="expense" onChange={(value) => setForm({ ...form, type: value as "income" | "expense" })}>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Color">
                    <ColorPicker value={form.color} onChange={(value) => setForm({ ...form, color: value.toHexString() })} />
                </Form.Item>
                </Form>
            </Modal>

            <Table columns={columns} dataSource={data} />


        </>


    )
}

export default Categories