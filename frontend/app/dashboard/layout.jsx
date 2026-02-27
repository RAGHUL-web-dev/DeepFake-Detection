"use client";

import { useState } from 'react';
import { Layout, Menu, Button, Space, Avatar, Badge, Dropdown } from 'antd';
import {
  LayoutDashboard,
  Library,
  BookOpen,
  History,
  MessageSquare,
  LogOut,
  Menu as MenuIcon,
  Bell,
  User,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuthStore();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <LayoutDashboard size={20} />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: '/dashboard/results',
      icon: <Library size={20} />,
      label: <Link href="/dashboard/results">Results</Link>,
    },
    {
      key: '/dashboard/knowledge-hub',
      icon: <BookOpen size={20} />,
      label: <Link href="/dashboard/knowledge-hub">Knowledge Hub</Link>,
    },
    {
      key: '/dashboard/provenance',
      icon: <History size={20} />,
      label: <Link href="/dashboard/provenance">Provenance History</Link>,
    },
    {
      key: '/dashboard/feedback',
      icon: <MessageSquare size={20} />,
      label: <Link href="/dashboard/feedback">Feedback / Report</Link>,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#0A0A0B' }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        style={{
          background: '#0F0F10',
          borderRight: '1px border-white/5',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="mt-5 flex items-center px-6 py-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5C45FD] to-[#8E78FF] flex items-center justify-center shrink-0">
            <div className="w-4 h-4 rounded-sm border-2 border-white" />
          </div>
          {!collapsed && (
            <Link href="/" className="ml-3 text-xl font-bold text-white tracking-tight">DeepShield</Link>
          )}
        </div>

        <div className="mt-5 flex flex-col h-[calc(100%-160px)] justify-between px-3">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{
              background: 'transparent',
              borderRight: 'none',
            }}
            className="dashboard-menu"
          />

          <div className="mt-auto px-1 pb-4">
            <Button
              type="text"
              icon={<LogOut size={20} />}
              onClick={handleLogout}
              className="w-full h-12 flex items-center hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
              {!collapsed && <span className="ml-3 font-medium">Logout</span>}
            </Button>
          </div>
        </div>
      </Sider>

      {/* Main Content Area */}
      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'all 0.2s', background: 'transparent' }}>
        {/* Header */}
        <Header style={{
          background: 'rgba(10, 10, 11, 0.8)',
          backdropFilter: 'blur(20px)',
          padding: '0 32px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">
              {menuItems.find(item => item.key === pathname)?.label || 'Overview'}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <Badge dot color="#5C45FD">
              <Button type="text" icon={<Bell size={20} className="text-gray-400" />} />
            </Badge>

            <div className="h-6 w-[1px] bg-white/10" />

            <Space size={12} className="cursor-pointer">
              <Avatar
                icon={<User size={18} />}
                src={user?.avatar}
                style={{ background: '#1A1A1B', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white leading-none">{user?.name || 'User'}</span>
                  <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Pro Member</span>
                </div>
              )}
            </Space>
          </div>
        </Header>

        <Content style={{ padding: '32px' }}>
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </Content>
      </Layout>

      <style jsx global>{`
                .dashboard-menu .ant-menu-item {
                    height: 50px !important;
                    border-radius: 12px !important;
                    margin-bottom: 8px !important;
                    color: #9CA3AF !important;
                    padding-left: 16px !important;
                }
                .dashboard-menu .ant-menu-item-selected {
                    background: rgba(92, 69, 253, 0.1) !important;
                    color: #FFFFFF !important;
                }
                .dashboard-menu .ant-menu-item:hover {
                    background: rgba(255, 255, 255, 0.05) !important;
                    color: #FFFFFF !important;
                }
                .dashboard-menu .ant-menu-item-selected .anticon,
                .dashboard-menu .ant-menu-item-selected svg {
                    color: #5C45FD !important;
                }
            `}</style>
    </Layout>
  );
}
