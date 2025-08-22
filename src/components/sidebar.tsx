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
    X,
    ChevronRight,
    Circle,
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
        <div className="flex min-h-screen font-sans">

            {sidebarOpen && (
                <aside
                    id="sidebar"
                    className={`side-bar-items-section
                        z-30 w-64 md:w-80 bg-white 
                        shadow-md border-r border-slate-200 transition-transform
                    `}
                >

                    <div
                        className="sidebar-navbar flex items-center justify-between ps-5 pe-3 border-b border-slate-200"
                        style={{
                            background: "linear-gradient(to bottom right, #e5f0fa, #faf1f1, #eaf8f0)",
                        }}
                    >
                        {/* Left Section */}
                        <div className="flex items-center space-x-3">
                            <div>
                                <h2 className="text-[#003366] font-medium">Harsh Yadav Lamba</h2>
                                <h3 className="text-slate-500 text-sm">AABBCC</h3>
                            </div>
                        </div>

                        {/* Right Section (Cut Button) */}
                        <button
                            onClick={() => { setSidebarOpen(false) }}
                            className="text-slate-500 hover:text-slate-800 transition cursor-pointer"
                        >
                            <X size={20} strokeWidth={2} />
                        </button>
                    </div>

                    {/* Menu */}
                    <nav className="space-y-1 py-2">
                        {items.map((item) => (
                            <div key={item.id} className="side-bar-menu-item flex flex-col">
                                {/* Main menu item */}
                                <button
                                    onClick={() => {
                                        handleMenuItemClick(item.id);
                                        if (item.subItems) toggleMenu(item.id);
                                    }}
                                    className={
                                        `flex items-center justify-between space-x-3 ps-4 py-2 rounded-md transition-colors w-full text-left ${activeMenuItem === item.id
                                            ? "bg-[#003366]/10 text-[#003366]"
                                            : "hover:bg-[#f1f2f4] text-slate-700 hover:text-[#003366]"
                                        }`
                                    }
                                >
                                    <div className="flex items-center space-x-3 cursor-pointer">
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </div>

                                    {/* Show arrow if submenu exists */}
                                    {item.subItems.length > 0 && (
                                        <ChevronRight
                                            size={16}
                                            className={`transition-transform ${openMenus[item.id] ? "rotate-90" : ""
                                                }`}
                                        />
                                    )}
                                </button>

                                {/* Submenu items */}
                                {item.subItems.length > 0 &&
                                    (openMenus[item.id]) && (
                                        <div className="side-bar-menu-sub-item flex flex-col">
                                            {item.subItems.map((sub, idx) => (
                                                <button
                                                    key={idx}
                                                    className="px-3 py-1 flex items-center space-x-2 text-slate-600 rounded-md hover:bg-[#f1f2f4] hover:text-[#003366] cursor-pointer transition"
                                                >
                                                    <Circle size={6} className="fill-slate-400 text-slate-400" />
                                                    <span className="text-sm">{sub.label}</span>
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

                <header className="sidebar-navbar flex items-center justify-between bg-white border-b border-slate-200 shadow-sm backdrop-blur-sm bg-opacity-95 px-4">
                    {/* Left side */}
                    <div className="flex items-center space-x-4">
                        {!sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-[#f1f2f4] rounded-lg transition-colors duration-200"
                            >
                                <Menu className="h-6 w-6 text-[#003366]" />
                            </button>
                        )}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 hover:bg-[#f1f2f4] rounded-lg transition-colors duration-200 group">
                            <div className="sidebar-initials-section bg-[#003366]/10 rounded-full flex items-center justify-center w-10 h-10">
                                <h1 className="text-[#003366] font-bold">HL</h1>
                            </div>
                        </button>
                    </div>
                </header>


                {/* Page Content */}
                <main
                    className="flex-1"
                    style={{
                        background: "linear-gradient(to bottom right, #e5f0fa, #faf1f1, #eaf8f0)",
                    }}
                >
                    {(!isSmallScreen || !sidebarOpen) && (
                        <div className="mx-auto">{children}</div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Sidebar;
