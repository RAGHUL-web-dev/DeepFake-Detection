"use client";

import { useState } from 'react';
import { Card, Table, Tag, Modal, Space, message } from 'antd';
import {
    Search,
    UserCheck,
    UserX,
    Shield,
    Trash2,
    Eye,
    RefreshCw,
    AlertTriangle
} from 'lucide-react';
import { useAdminUsers, useUpdateUser, useDeleteUser } from '@/hooks/adminHooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, error, refetch } = useAdminUsers();
    const { mutate: updateUser } = useUpdateUser();
    const { mutate: deleteUser } = useDeleteUser();

    const users = data?.users || [];

    const handleStatusToggle = (record) => {
        const newStatus = record.status === 'active' ? 'inactive' : 'active';
        Modal.confirm({
            title: `${newStatus === 'inactive' ? 'Suspend' : 'Reactivate'} User`,
            content: `Are you sure you want to ${newStatus === 'inactive' ? 'suspend' : 'reactivate'} ${record.name}?`,
            onOk: () => {
                updateUser(
                    { id: record._id, data: { status: newStatus } },
                    {
                        onSuccess: () => message.success(`User ${newStatus === 'inactive' ? 'suspended' : 'reactivated'} successfully`),
                        onError: (err) => message.error(err.message),
                    }
                );
            },
        });
    };

    const handleRoleToggle = (record) => {
        const newRole = record.role === 'admin' ? 'user' : 'admin';
        Modal.confirm({
            title: `Change Role to ${newRole}`,
            content: `Set ${record.name}'s role to "${newRole}"?`,
            onOk: () => {
                updateUser(
                    { id: record._id, data: { role: newRole } },
                    {
                        onSuccess: () => message.success(`Role updated to ${newRole}`),
                        onError: (err) => message.error(err.message),
                    }
                );
            },
        });
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Delete User Account',
            content: `Permanently delete ${record.name}? This cannot be undone.`,
            okType: 'danger',
            okText: 'Yes, Delete',
            onOk: () => {
                deleteUser(record._id, {
                    onSuccess: () => message.success('User deleted'),
                    onError: (err) => message.error(err.message),
                });
            },
        });
    };

    const columns = [
        {
            title: 'User',
            key: 'user',
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-700 border border-gray-200 shrink-0">
                        {record.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-black">{record.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{record.email}</p>
                    </div>
                </div>
            )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={role === 'admin' ? 'purple' : 'default'} className="rounded-full px-3 font-bold uppercase">
                    {role}
                </Tag>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    color={status === 'active' ? 'success' : status === 'inactive' ? 'error' : 'default'}
                    className="rounded-full px-3 font-bold uppercase"
                >
                    {status}
                </Tag>
            )
        },
        {
            title: 'Login Count',
            key: 'loginCount',
            render: (_, record) => (
                <span className="font-bold text-gray-700">{record.auth?.loginCount ?? 0}</span>
            )
        },
        {
            title: 'Joined',
            key: 'createdAt',
            render: (_, record) => (
                <span className="text-gray-500 font-medium text-sm">
                    {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : '—'}
                </span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space size={4}>
                    <Button
                        variant="ghost"
                        size="icon"
                        title={record.status === 'active' ? 'Suspend User' : 'Reactivate User'}
                        className={`h-9 w-9 rounded-lg ${record.status === 'active' ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}
                        onClick={() => handleStatusToggle(record)}
                    >
                        {record.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        title={record.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                        className="h-9 w-9 rounded-lg text-[#5C45FD] hover:bg-[#5C45FD]/5"
                        onClick={() => handleRoleToggle(record)}
                    >
                        <Shield size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        title="Delete User"
                        className="h-9 w-9 rounded-lg text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(record)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </Space>
            )
        }
    ];

    const filtered = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-80 w-full rounded-3xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <AlertTriangle size={40} className="text-red-500" />
                <p className="font-bold text-black">{error.message}</p>
                <Button onClick={() => refetch()} variant="outline" className="gap-2"><RefreshCw size={16} /> Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-extrabold text-black">User Management</h2>
                    <p className="text-gray-500 font-medium mt-1">{users.length} total registered accounts</p>
                </div>
                <Button onClick={() => refetch()} variant="outline" className="gap-2 rounded-xl">
                    <RefreshCw size={16} /> Refresh
                </Button>
            </div>

            <Card className="bg-white border-gray-100 shadow-sm rounded-3xl overflow-hidden p-0 user-table-card">
                <div className="p-6 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-1 max-w-lg">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search by name or email..."
                            className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <Table
                    dataSource={filtered}
                    columns={columns}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                    className="user-mgmt-table"
                />
            </Card>

            <style jsx global>{`
                .user-table-card .ant-card-body { padding: 0 !important; }
                .user-mgmt-table .ant-table { background: transparent !important; }
                .user-mgmt-table .ant-table-thead > tr > th {
                    background: #FAFAFB !important;
                    color: #6B7280 !important;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-weight: 800;
                    border-bottom: 1px solid #F3F4F6 !important;
                    padding: 14px 24px !important;
                }
                .user-mgmt-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid #F9FAFB !important;
                    padding: 18px 24px !important;
                }
                .user-mgmt-table .ant-table-tbody > tr:hover > td {
                    background: #F9FAFB !important;
                }
            `}</style>
        </div>
    );
}
