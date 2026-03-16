"use client";

import { useState, useEffect } from 'react';
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
import { useLogoutUser } from '@/hooks/authHooks';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logoutUser } = useLogoutUser();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#5C45FD] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
    logoutUser();
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        style={{
          background: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 100,
          boxShadow: '4px 0 10px rgba(0, 0, 0, 0.02)'
        }}
      >
        <div className="flex items-center px-6 py-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5C45FD] to-[#8E78FF] flex items-center justify-center shrink-0">
            <div className="w-4 h-4 rounded-sm border-2 border-white" />
          </div>
          {!collapsed && (
            <Link href="/" className="ml-3 text-xl font-bold text-gray-900 tracking-tight">
              DeepShield
            </Link>
          )}
        </div>

        <div className="flex flex-col h-[calc(100%-160px)] justify-between px-3">
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
              className="w-full h-12 flex items-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              {!collapsed && <span className="ml-3 font-medium">Logout</span>}
            </Button>
          </div>
        </div>
      </Sider>

      {/* Main Content Area */}
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 280, 
        transition: 'all 0.2s', 
        background: '#F9FAFB' 
      }}>
        {/* Header */}
        <Header style={{
          background: '#FFFFFF',
          padding: '0 32px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E5E7EB',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
        }}>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {menuItems.find(item => item.key === pathname)?.props?.label || 'Overview'}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <Badge dot color="#5C45FD">
              <Button 
                type="text" 
                icon={<Bell size={20} className="text-gray-600" />}
                className="hover:bg-gray-100"
              />
            </Badge>

            <div className="h-6 w-[1px] bg-gray-200" />

            <Space size={12} className="cursor-pointer">
              <Avatar
                icon={<User size={18} />}
                src={user?.avatar}
                style={{ 
                  background: '#F3F4F6', 
                  border: '1px solid #E5E7EB',
                  color: '#4B5563'
                }}
              />
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 leading-none">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">
                    Pro Member
                  </span>
                </div>
              )}
            </Space>
          </div>
        </Header>

        <Content style={{ padding: '32px' }}>
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </Content>
      </Layout>

      <style jsx global>{`
        .dashboard-menu .ant-menu-item {
          height: 50px !important;
          border-radius: 12px !important;
          margin-bottom: 8px !important;
          color: #6B7280 !important;
          padding-left: 16px !important;
          font-weight: 500 !important;
        }
        .dashboard-menu .ant-menu-item-selected {
          background: rgba(92, 69, 253, 0.08) !important;
          color: #5C45FD !important;
        }
        .dashboard-menu .ant-menu-item-selected .ant-menu-title-content {
          color: #5C45FD !important;
          font-weight: 600 !important;
        }
        .dashboard-menu .ant-menu-item:hover {
          background: rgba(0, 0, 0, 0.02) !important;
          color: #5C45FD !important;
        }
        .dashboard-menu .ant-menu-item .anticon {
          color: #9CA3AF !important;
        }
        .dashboard-menu .ant-menu-item-selected .anticon {
          color: #5C45FD !important;
        }
        .dashboard-menu .ant-menu-item:hover .anticon {
          color: #5C45FD !important;
        }
      `}</style>
    </Layout>
  );
}