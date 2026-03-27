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
  Bell,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useLogoutUser, useCurrentUser } from '@/hooks/authHooks';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logoutUser } = useLogoutUser();

  // Rehydrate session from cookie on mount
  const { isError } = useCurrentUser();

  // Page title from pathname
  const getPageTitle = () => {
    const titles = {
      '/dashboard': 'Dashboard',
      '/dashboard/results': 'Results',
      '/dashboard/knowledge-hub': 'Knowledge Hub',
      '/dashboard/provenance': 'Provenance History',
      '/dashboard/feedback': 'Feedback / Report',
    };
    return titles[pathname] || 'Dashboard';
  };

  useEffect(() => {
    // If session expired or unauthenticated, redirect to login
    if (isError || (!isAuthenticated)) {
      router.replace('/auth/login');
      return;
    }
    // Admins should use the admin dashboard
    if (isAuthenticated && user?.role === 'admin') {
      router.replace('/admin');
    }
  }, [isError, isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role === 'admin') {
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
      {/* Sidebar - Black Background */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        style={{
          background: '#000000',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 100,
          boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="flex items-center px-6 py-8">
          {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5C45FD] to-[#8E78FF] flex items-center justify-center shrink-0">
            <div className="w-4 h-4 rounded-sm border-2 border-white" />
          </div> */}
          {!collapsed && (
            <Link href="/" className="mt-6 ml-10 text-2xl font-bold text-white tracking-tight">
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
            className="dashboard-menu-dark"
          />

          <div className="mt-auto px-1 pb-4">
            <Button
              type="text"
              icon={<LogOut size={20} />}
              onClick={handleLogout}
              className="w-full h-12 flex items-center text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
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
              {getPageTitle()}
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

            <Link href="/dashboard/profile">
              <Space size={12} className="cursor-pointer hover:opacity-80 transition-opacity">
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
            </Link>
          </div>
        </Header>

        <Content style={{ padding: '32px' }}>
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </Content>
      </Layout>

      <style jsx global>{`
        /* Dark Theme Menu Styles */
        .dashboard-menu-dark .ant-menu-item {
          height: 50px !important;
          border-radius: 12px !important;
          margin-bottom: 8px !important;
          color: #9CA3AF !important;
          padding-left: 16px !important;
          font-weight: 500 !important;
        }
        .dashboard-menu-dark .ant-menu-item-selected {
          background: rgba(92, 69, 253, 0.15) !important;
          color: #FFFFFF !important;
        }
        .dashboard-menu-dark .ant-menu-item-selected .ant-menu-title-content {
          color: #FFFFFF !important;
          font-weight: 600 !important;
        }
        .dashboard-menu-dark .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #FFFFFF !important;
        }
        .dashboard-menu-dark .ant-menu-item .anticon {
          color: #6B7280 !important;
        }
        .dashboard-menu-dark .ant-menu-item-selected .anticon {
          color: #FFFFFF !important;
        }
        .dashboard-menu-dark .ant-menu-item:hover .anticon {
          color: #FFFFFF !important;
        }
        
        /* Menu link styles */
        .dashboard-menu-dark .ant-menu-item a {
          color: #9CA3AF !important;
        }
        .dashboard-menu-dark .ant-menu-item-selected a {
          color: #FFFFFF !important;
        }
        .dashboard-menu-dark .ant-menu-item:hover a {
          color: #FFFFFF !important;
        }
      `}</style>
    </Layout>
  );
}