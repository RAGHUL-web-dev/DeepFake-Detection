"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    LayoutDashboard,
    Users,
    ImageIcon,
    Activity,
    Settings,
    LogOut,
    ShieldAlert,
    Bell,
    ChevronDown,
    Search
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCurrentUser, useLogoutUser } from '@/hooks/authHooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { href: '/admin/users', icon: Users, label: 'User Management' },
    { href: '/admin/media', icon: ImageIcon, label: 'Media Moderation' },
    { href: '/admin/system', icon: Activity, label: 'System Diagnostics' },
];

function AdminSidebar() {
    const pathname = usePathname();
    const { mutate: logout } = useLogoutUser();

    return (
        <Sidebar className="border-r border-gray-200 bg-white">
            <SidebarHeader className="h-16 flex items-center px-6 border-b border-gray-100">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5C45FD] to-[#8E78FF] flex items-center justify-center">
                        <ShieldAlert size={16} className="text-white" />
                    </div>
                    <div>
                        <span className="font-bold text-gray-900 tracking-tight text-lg">
                            DeepShield
                        </span>
                        <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            Admin
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-3 py-6">
                <div className="px-3 mb-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        Navigation
                    </p>
                </div>
                <SidebarMenu>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    className={`h-11 rounded-lg font-medium transition-all ${
                                        isActive
                                            ? 'bg-[#5C45FD] text-white hover:bg-[#5C45FD] hover:text-white'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <Link href={item.href} className="flex items-center gap-3 px-3">
                                        <item.icon size={18} />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>

                <div className="mt-8 px-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        System
                    </p>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="h-11 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            >
                                <Link href="/admin/settings" className="flex items-center gap-3 px-3">
                                    <Settings size={18} />
                                    <span>Settings</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarContent>

            <SidebarFooter className="px-3 pb-6 border-t border-gray-100 pt-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-11 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium"
                    onClick={() => logout()}
                >
                    <LogOut size={18} />
                    Sign Out
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}

function AdminHeader() {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const [showNotifications, setShowNotifications] = useState(false);

    const getPageTitle = () => {
        if (pathname === '/admin') return 'Dashboard Overview';
        const segment = pathname.split('/').pop();
        return segment?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Admin';
    };

    // Sample notifications
    const notifications = [
        { id: 1, text: 'New user registration', time: '5 min ago', read: false },
        { id: 2, text: 'Media moderation needed', time: '15 min ago', read: false },
        { id: 3, text: 'System update completed', time: '1 hour ago', read: true },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="h-16 border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="text-gray-500 hover:text-gray-900 lg:hidden" />
                <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
                
                {/* Quick Search */}
                <div className="hidden md:flex items-center ml-8">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search..."
                            className="pl-9 pr-4 h-9 w-64 rounded-lg border-gray-200 bg-gray-50 text-sm focus:bg-white"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications - Custom implementation without Badge */}
                <div className="relative">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </Button>

                    {/* Notifications dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-900">Notifications</p>
                            </div>
                            {notifications.length > 0 ? (
                                <>
                                    {notifications.map(notification => (
                                        <div 
                                            key={notification.id} 
                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}
                                        >
                                            <p className="text-sm text-gray-900">{notification.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                    <div className="px-4 py-2 border-t border-gray-100">
                                        <button className="text-xs text-[#5C45FD] font-medium hover:underline">
                                            Mark all as read
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="px-4 py-8 text-center">
                                    <p className="text-sm text-gray-500">No notifications</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Admin Profile */}
                <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#5C45FD] to-[#8E78FF] text-white flex items-center justify-center text-sm font-semibold">
                            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-gray-900 leading-none">
                                {user?.name || 'Administrator'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Root Access
                            </p>
                        </div>
                    </div>
                    <ChevronDown size={16} className="text-gray-400 hidden md:block" />
                </div>
            </div>
        </header>
    );
}

export default function AdminLayout({ children }) {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();

    // Rehydrate session from the server cookie on mount
    const { isError } = useCurrentUser();

    useEffect(() => {
        // Redirect if session is invalid or user is not admin
        if (isError || (isAuthenticated && user?.role !== 'admin')) {
            router.replace('/auth/login');
        }
    }, [isError, isAuthenticated, user, router]);

    // Show nothing while rehydrating to avoid flash
    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-[#5C45FD] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium text-gray-500">
                        Verifying admin access...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
                <AdminSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <AdminHeader />
                    <main className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-[1600px] mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}