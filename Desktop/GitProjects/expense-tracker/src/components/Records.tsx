import { Button, Space, Table, Tag, Form, Select, ColorPicker, Input, Modal, } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store'
import { Record, RecordForm } from '../types/record';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addRecord, deleteRecord, getRecords, updateRecord } from '../store/actions/recordActions';
import { AppDispatch } from '../store/store';
import { Category } from '../types/category';

import { Mode } from '../types/general';
import { getCategories } from '../store/actions/categoryActions';





const emptyForm: RecordForm = {
    title: "",
    amount: 0,
    category_id: 0,
}

function Records() {

    const { loading, error, data } = useSelector((state: AppState) => state.records);

    const { data: categories } = useSelector((state: AppState) => state.categories);

    const dispatch: AppDispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<RecordForm>(emptyForm);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [mode, setMode] = useState<Mode>("new");


    const showModal = (mode: Mode) => {
        setIsModalOpen(true);
        setMode(mode)
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: Record['amount'], record: Record) => {
                return <>{Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(amount)}</>
            }
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category: Category, record: Record) => {
                return <Tag color={category.color}>{category.name}</Tag>
            }
        },
        {
            title: 'Last Updated',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            
            render: (updatedAt: string, record: Record) => {
                const updatedAtObj = new Date(updatedAt)
                return <>
                {updatedAtObj.toLocaleDateString()} {""}
                {updatedAtObj.toLocaleTimeString(navigator.language,{
                    hour:"2-digit",
                    minute:"2-digit"
                })}
                </>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Record) =>{
                const {title,amount} = record;
                const category_id = record.category.id;
                    return (
                        <Space size="middle">
                        <EditOutlined style={{ color: "blue" }} onClick={() => {
                            showModal("edit")
                            console.log("edit record1: " + record.category.id);
                            console.log("edit record2: " + record.category_id);
                            setForm({title,amount,category_id});  
                            setUpdateId(record.id)
                        }} />
                        <DeleteOutlined onClick={() => {
                            showModal("delete")
                            setDeleteId(record.id)
                        }} style={{ color: "red" }} />
                    </Space>
                    )
            }
            ,
        },
    ];


    const handleOk = () => {
        if (mode === "new") dispatch(addRecord(form))
        else if (mode === "edit") dispatch(updateRecord(form, updateId as number));
        else if (mode === "delete") dispatch(deleteRecord(deleteId as number));

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


    useEffect(() => {
        dispatch(getRecords());
        !categories.length && dispatch(getCategories())
    }, [])

    const isFormValid = !(!form.title || form.amount === 0 || form.category_id === 0);

    return (
        <>
            <Button style={{ float: "right", marginBottom: "20px" }} type="primary" onClick={() =>
                showModal("new")
            }>
                New Record
            </Button>

            <Modal title={mode === "new" ? "Create new record" : mode === "edit" ? "Update record" : "Delete record"}
                open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: (mode !== "delete" && !isFormValid) }}
            >

                {
                    mode === "edit" || mode === "new" ?
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >



                            <Form.Item label="Title" required>
                                <Input name='title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                            </Form.Item>
                            <Form.Item label="Amount" required>
                                <Input name='amount' value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
                            </Form.Item>
                            <Form.Item label="Category">
                                <Select value={form.category_id} defaultValue={form.category_id}
                                 onChange={(category_id) => {
                                    const selectedCategory = categories.find(
                                        (category) => category.id == category_id
                                    );
                                    setForm({
                                        ...form,
                                        category_id });
                                }}
                                 >
                                    {/* , category: value as "income" | "expense" } */}
                                    <Select.Option value={0} disabled>Select a category</Select.Option>

                                    {
                                        categories.map((category) => {
                                            return <Select.Option key={category.id} value={category.id} >{category.name}</Select.Option>
                                        })
                                    }

                                </Select>
                            </Form.Item>
                            {/* <Form.Item label="Color">
                                <ColorPicker value={form.color} onChange={(value) => setForm({ ...form, color: value.toHexString() })} />
                            </Form.Item> */}
                        </Form>
                        : mode === "delete" ?

                            <div>
                                Are you sure?
                            </div>
                            : null
                }

            </Modal>
            <Table rowKey="id" loading={loading} dataSource={data} columns={columns}> </Table>
        </>
    )
}

export default Records