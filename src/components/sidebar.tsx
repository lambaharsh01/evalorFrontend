import React, { useState, useEffect } from "react";
import {
    Menu,
    LayoutDashboard,
    Calendar,
    BarChart,
    Users,
    FileText,
    Image,
    Headphones,
    MessageSquare,
} from "lucide-react";
import type { SidebarItem, SidebarProp } from "./types";
import { isMdOrLess, isMdOrMore } from "@/packages/utils/screen";

const Sidebar: React.FC<SidebarProp> = ({ children }) => {


    const [sidebarOpen, setSidebarOpen] = useState<boolean>(isMdOrMore());
    const isSmallScreen = isMdOrLess()


    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [activeMenuItem, setActiveMenuItem] = useState("DDDD");

    const showAllAccordions = false;

    const [items, setItems] = useState<SidebarItem[]>([])

    useEffect(() => {

        const items: SidebarItem[] = [

            { id: "DDDDDD", icon: LayoutDashboard, label: "DDDDD", subItems: [], path: "#" },
            {
                id: "AAA",
                icon: MessageSquare,
                label: "AAA",
                subItems: [
                    { label: "AAAA", path: "#" },
                    { label: "AAAAA", path: "#" },
                ],
            },
            {
                id: "BBB",
                icon: Calendar,
                label: "BBB",
                subItems: [
                    { label: "BBBB", path: "#" },
                    { label: "BBBBB", path: "#" },
                ],
            },
            { id: "CCC", icon: FileText, label: "CCC", subItems: [], path: "#" },
            { id: "DDD", icon: BarChart, label: "DDD", subItems: [], path: "#" },
            {
                id: "EEE",
                icon: Users,
                label: "EEE",
                subItems: [
                    { label: "EEE", path: "#" },
                    { label: "EEEE", path: "#" },
                    { label: "EEEEE", path: "#" },
                ],
            },
            { id: "FFF", icon: Image, label: "FFF", subItems: [], path: "#" },
            { id: "GGG", icon: Headphones, label: "GGG", subItems: [], path: "#" },
        ]

        setItems(items)

        if (showAllAccordions) {

            const openMenuItems: Record<string, boolean> = {}

            for (const { id } of items) {
                openMenuItems[id] = true
            }

            setOpenMenus(openMenuItems)

        }

    }, [])

    useEffect(() => {

        if (!isSmallScreen) {
            return
        }

        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById("sidebar");
            const menuButton = document.getElementById("menu-button");

            if (
                sidebarOpen &&
                sidebar &&
                !sidebar.contains(event.target as Node) &&
                !menuButton?.contains(event.target as Node)
            ) {
                setSidebarOpen(false);
            }
        };

        if (sidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [sidebarOpen]);


    const toggleMenu = (menu: string) => {
        setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleMenuItemClick = (item: string) => {
        setActiveMenuItem(item);
    };

    return (
        <div className="flex min-h-screen   font-sans">

            {sidebarOpen && (
                <aside
                    id="sidebar"
                    className={`text-sm md:text-lg
                        z-30 w-64 md:w-80 bg-white 
                        shadow-md border-r border-slate-200 transition-transform
                    `}
                >
                    {/* Profile */}
                    <div className="flex items-center ps-5 border-b border-slate-200 h-20"
                        style={{
                            background: "linear-gradient(to bottom right, #e5f0fa, #faf1f1, #eaf8f0)",
                        }}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="h-11 w-11 bg-[#003366]/10 rounded-full flex items-center justify-center">
                                <h1 className="text-[#003366]">HL</h1>
                            </div>
                            <div>
                                <h2 className="text-[#003366]">Harsh Yadav Lamba</h2>
                                <h3 className="text-slate-500">AABBCC</h3>
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <nav className="p-4 space-y-1">
                        {items.map((item) => (
                            <div key={item.id} className="flex flex-col">
                                {/* Main menu item */}
                                <button
                                    onClick={() => {
                                        handleMenuItemClick(item.id);
                                        if (item.subItems) toggleMenu(item.id);
                                    }}
                                    className={
                                        `flex items-center justify-between space-x-3 ps-4 py-2 rounded-md transition-colors w-full text-left ${activeMenuItem === item.id
                                            ? "bg-[#003366]/10 text-[#003366] font-medium"
                                            : "hover:bg-[#f1f2f4] text-slate-700 hover:text-[#003366]"
                                        }`
                                    }
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </div>
                                    {/* Show arrow if submenu exists */}
                                    {item.subItems.length > 0 && (
                                        <svg
                                            className={`h-4 w-4 transition-transform ${(openMenus[item.id]) ? "rotate-90" : ""
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </button>

                                {/* Submenu items */}
                                {item.subItems.length > 0 &&
                                    (openMenus[item.id]) && (
                                        <div className="ml-8 mt-1 flex flex-col space-y-1 text-xs md:text-sm ">
                                            {item.subItems.map((sub, idx) => (
                                                <button
                                                    key={idx}
                                                    className="text-start ps-8 py-2 text-slate-600 rounded-md hover:bg-[#f1f2f4] hover:text-[#003366]"
                                                >
                                                    {sub.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </nav>
                </aside>
            )}

            {/* Main Content */}
            <div className="flex flex-1 flex-col min-w-0">
                {/* Header */}
                <header className="bg-white h-20 border-b border-slate-200 shadow-sm backdrop-blur-sm bg-opacity-95">
                    <div className="flex items-center justify-between px-6 py-4">
                        {!sidebarOpen && (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 hover:bg-[#f1f2f4] rounded-lg transition-colors duration-200"
                                >
                                    <Menu className="h-6 w-6 text-[#003366]" />
                                </button>
                            </div>
                        )}

                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            {/* <button className="relative p-2 hover:bg-[#f1f2f4] rounded-lg transition-colors duration-200 group">
                                <Bell className="h-5 w-5 text-slate-600 group-hover:text-[#003366]" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                </span>
                            </button> */}

                            {/* Settings */}
                            {/* <button className="p-2 hover:bg-[#f1f2f4] rounded-lg transition-colors duration-200 group">
                                <Settings className="h-5 w-5 text-slate-600 group-hover:text-[#003366] group-hover:rotate-90 transition-all duration-200" />
                            </button> */}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main
                    className="flex-1"
                    style={{
                        background: "linear-gradient(to bottom right, #e5f0fa, #faf1f1, #eaf8f0)",
                    }}
                >
                    <div className="mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}

export default Sidebar;
