import {
    Home,
    Package,
    Eye,
    Plus,
    Users,
    MapPin,
    FileText,
    Settings,
    LogOut,
} from "lucide-react";

export const sidebarGroups = [
    { id: "home", title: "Home", icon: Home, href: "/dashboard" },
    {
        id: "inventory",
        title: "Inventory",
        icon: Package,
        items: [
            {
                key: "view",
                label: "View Items",
                icon: Eye,
                href: "/dashboard/view",
            },
            {
                key: "add",
                label: "Add Item",
                icon: Plus,
                href: "/dashboard/add",
            },
            {
                key: "suppliers",
                label: "Suppliers",
                icon: Users,
                href: "/dashboard/suppliers",
            },
            {
                key: "locations",
                label: "Locations",
                icon: MapPin,
                href: "/dashboard/locations",
            },
        ],
    },
    {
        id: "reports",
        title: "Reports",
        icon: FileText,
        items: [
            {
                key: "overview",
                label: "Overview",
                icon: FileText,
                href: "/dashboard/overview",
            },
        ],
    },
    {
        id: "settings",
        title: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
    },
    {
        id: "logs",
        title: "Logs",
        icon: LogOut,
        items: [
            { key: "logs", label: "System Logs", icon: LogOut, href: "/dashboard/logs" },
            { key: "audit", label: "Audit", icon: FileText, href: "/dashboard/audit" },
        ],
    },
];
