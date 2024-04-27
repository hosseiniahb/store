import {
  Group,
  Heart,
  LayoutDashboard,
  Settings,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Undo2,
  User,
  Users,
} from "lucide-react";

export const MainNavLink = [
  {
    title: "SCIENCE",
    href: "/blog",
  },
  {
    title: "PRODUCTS",
    href: "/search",
  },
  {
    title: "ABOUT",
    href: "/about-us",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
];

export const DashboardSidebarLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    Icon: Users,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    Icon: Shirt,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    Icon: ShoppingBag,
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    Icon: Group,
  },
];

export const ProfileUserSidebarLinks = [
  {
    name: "User Info",
    href: "/profile",
    Icon: User,
  },
  {
    name: "Orders",
    href: "/profile/orders",
    Icon: ShoppingCart,
  },
  {
    name: "Favorites",
    href: "/profile/product-favorites",
    Icon: Heart,
  },
  {
    name: "Setting",
    href: "/profile/setting",
    Icon: Settings,
  },
  {
    name: "Go to site",
    href: "/",
    Icon: Undo2,
  },
];

export const DashboardCardData = [
  {
    href: "/dashboard/products",
    IconCard: ShoppingCart,
    cardHeader: "Total Products",
    cardContent: "256",
  },
  {
    IconCard: Users,
    href: "dashboard/users",
    cardHeader: "Total Users",
    cardContent: "35",
  },
  {
    IconCard: ShoppingBag,
    href: "/dashboard/orders",
    cardHeader: "Total Orders",
    cardContent: "165",
  },
];
