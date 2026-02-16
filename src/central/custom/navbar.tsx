//import { useState, useRef, useEffect } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"



import { useState, useRef, useEffect } from "react"
 
import {
  Search,
  Languages,
  Sun,
  Star,
  Bell,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Globe,
  FileText,
  Table,
  BarChart3,
  MoreHorizontal,
  Clock,
  TrendingUp,
  ShoppingCart,
  GraduationCap,
  Truck,
  MessageSquare,
  Mail,
  Calendar,
  FileCheck,
  Users,
  ShieldCheck,
  CreditCard,
  BookOpen,
  HelpCircle,
  PieChart,
  LineChart,
  BarChart,
  Layers,
  Component,
  type LucideIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router"

/* ------------------------------------------------------------------ */
/*  Types: recursive menu structure                                    */
/* ------------------------------------------------------------------ */

interface MenuNode {
  label: string
  icon: LucideIcon
  href?: string                // optional – if absent the item just opens children
  children?: MenuNode[]        // nested sub-menus (unlimited depth)
}

/* ------------------------------------------------------------------ */
/*  Menu data – edit labels, icons, hrefs and children to your needs   */
/* ------------------------------------------------------------------ */

const menuItems: MenuNode[] = [
  {
    label: "Dashboards",
    icon: LayoutDashboard,
    children: [
      { label: "CRM", icon: Clock, href: "/dashboards/crm" },
      {
        label: "Analytics",
        icon: TrendingUp,
        children: [
          { label: "Trafico Web", icon: LineChart, href: "/dashboards/analytics/trafico" },
          { label: "Conversion", icon: PieChart, href: "/dashboards/analytics/conversion" },
          { label: "Revenue", icon: BarChart, href: "/dashboards/analytics/revenue" },
        ],
      },
      { label: "eCommerce", icon: ShoppingCart, href: "/dashboards/ecommerce" },
      { label: "Academy", icon: GraduationCap, href: "/dashboards/academy" },
      { label: "Logistics", icon: Truck, href: "/dashboards/logistics" },
    ],
  },
  {
    label: "Apps",
    icon: Globe,
    children: [
      { label: "Chat", icon: MessageSquare, href: "/apps/chat" },
      {
        label: "Email",
        icon: Mail,
        children: [
          { label: "Inbox", icon: Mail, href: "/apps/email/inbox" },
          { label: "Sent", icon: FileCheck, href: "/apps/email/sent" },
        ],
      },
      { label: "Calendar", icon: Calendar, href: "/apps/calendar" },
      { label: "Invoice", icon: FileCheck, href: "/apps/invoice" },
      {
        label: "Users",
        icon: Users,
        children: [
          { label: "Lista", icon: Users, href: "/apps/users/lista" },
          { label: "Permisos", icon: ShieldCheck, href: "/apps/users/permisos" },
        ],
      },
    ],
  },
  {
    label: "Pages",
    icon: FileText,
    children: [
      {
        label: "Authentication",
        icon: ShieldCheck,
        children: [
          { label: "Login", icon: ShieldCheck, href: "/pages/auth/login" },
          { label: "Register", icon: ShieldCheck, href: "/pages/auth/register" },
          { label: "Forgot Password", icon: ShieldCheck, href: "/pages/auth/forgot" },
        ],
      },
      { label: "Account", icon: Users, href: "/pages/account" },
      { label: "Pricing", icon: CreditCard, href: "/pages/pricing" },
      { label: "FAQ", icon: HelpCircle, href: "/pages/faq" },
      { label: "Knowledge Base", icon: BookOpen, href: "/pages/knowledge" },
    ],
  },
  {
    label: "Forms & Tables",
    icon: Table,
    children: [
      { label: "Form Layouts", icon: FileText, href: "/forms/layouts" },
      { label: "Form Wizard", icon: Layers, href: "/forms/wizard" },
      { label: "Form Validation", icon: FileCheck, href: "/forms/validation" },
      { label: "Data Tables", icon: Table, href: "/forms/tables" },
    ],
  },
  {
    label: "Charts",
    icon: BarChart3,
    children: [
      { label: "Apex Charts", icon: PieChart, href: "/charts/apex" },
      { label: "Recharts", icon: LineChart, href: "/charts/recharts" },
      { label: "ChartJS", icon: BarChart, href: "/charts/chartjs" },
    ],
  },
  {
    label: "Others",
    icon: MoreHorizontal,
    children: [
      { label: "Components", icon: Component, href: "/others/components" },
      { label: "Icons", icon: Star, href: "/others/icons" },
      {
        label: "Extras",
        icon: Layers,
        children: [
          { label: "Blank Page", icon: FileText, href: "/others/extras/blank" },
          { label: "Settings", icon: Layers, href: "/others/extras/settings" },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  NestedMenu – recursive dropdown that expands to the right         */
/* ------------------------------------------------------------------ */

function NestedMenuItem({
  item,
  pathname,
  onNavigate,
  depth,
}: {
  item: MenuNode
  pathname: string
  onNavigate: () => void
  depth: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [openLeft, setOpenLeft] = useState(false)
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemRef = useRef<HTMLDivElement>(null)

  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href ? pathname === item.href : false

  function handleEnter() {
    if (!hasChildren) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Check if submenu would overflow the viewport to the right
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect()
      const spaceRight = window.innerWidth - rect.right
      setOpenLeft(spaceRight < 230)
    }

    setIsOpen(true)
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div
      ref={itemRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {item.href && !hasChildren ? (
        <Link
          to={item.href}
          onClick={onNavigate}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors ${
            isActive
              ? "text-primary font-medium bg-primary/5"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          {depth > 0 ? (
            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${isActive ? "bg-primary" : "bg-muted-foreground/50"}`} />
          ) : (
            <item.icon className="h-4.5 w-4.5 shrink-0" />
          )}
          <span className="text-sm flex-1">{item.label}</span>
        </Link>
      ) : (
        <button
          type="button"
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors ${
            isOpen
              ? "text-foreground bg-muted/50"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          {depth > 0 ? (
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
          ) : (
            <item.icon className="h-4.5 w-4.5 shrink-0" />
          )}
          <span className="text-sm flex-1 text-left">{item.label}</span>
          {hasChildren && <ChevronRight className={`h-3.5 w-3.5 opacity-50 shrink-0 transition-transform ${openLeft ? "rotate-180" : ""}`} />}
        </button>
      )}

      {/* Nested children – expands right or left based on available space */}
      {hasChildren && isOpen && (
        <div
          className={`absolute top-0 min-w-52.5 rounded-lg border border-border bg-card shadow-xl z-110 animate-in fade-in-0 duration-150 ${
            openLeft ? "right-full mr-1 slide-in-from-right-1" : "left-full ml-1 slide-in-from-left-1"
          }`}
        >
          <NestedMenu items={item.children!} pathname={pathname} onNavigate={onNavigate} depth={depth + 1} />
        </div>
      )}
    </div>
  )
}

function NestedMenu({
  items,
  pathname,
  onNavigate,
  depth = 0,
}: {
  items: MenuNode[]
  pathname: string
  onNavigate: () => void
  depth?: number
}) {
  return (
    <div className="py-1.5 px-1.5">
      {items.map((item) => (
        <NestedMenuItem
          key={item.label}
          item={item}
          pathname={pathname}
          onNavigate={onNavigate}
          depth={depth}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Navbar component                                                   */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const location = useLocation();
const pathname = location.pathname;

  //const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Check if any child (recursively) matches the current path
  function isMenuActive(node: MenuNode): boolean {
    if (node.href && pathname === node.href) return true
    if (node.children) return node.children.some(isMenuActive)
    return false
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm overflow-visible">
      <div className="max-w-360 mx-auto overflow-visible">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://bancodealimentosperu.org/assets/img/logo-wt.svg"
                alt="Logo Banco de Alimentos"
                className="h-8 object-contain"
              />
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Languages className="h-5 w-5" />
              <span className="sr-only">Language</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Sun className="h-5 w-5" />
              <span className="sr-only">Theme</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Star className="h-5 w-5" />
              <span className="sr-only">Favorites</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-9 w-9 ml-2 cursor-pointer">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Horizontal menu */}
        <nav ref={navRef} className="relative flex items-center justify-center px-6 pb-3 gap-1">
          {menuItems.map((item, idx) => {
            const active = isMenuActive(item)
            const isDashboard = item.label === "Dashboards"
            const isOpen = openMenu === item.label
            const isLastTwo = idx >= menuItems.length - 2

            const buttonClass = isDashboard
              ? "inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus:outline-none"
              : active
                ? "inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium bg-[hsl(220,14%,90%)] text-foreground shadow-sm transition-all hover:bg-[hsl(220,14%,86%)] focus:outline-none"
                : "inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted focus:outline-none"

            return (
              <div key={item.label} className="relative">
                <button
                  className={buttonClass}
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                >
                  <item.icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                  <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && item.children && (
                  <div className={`absolute top-full mt-1.5 min-w-55 rounded-lg border border-border bg-card shadow-xl z-100 animate-in fade-in-0 zoom-in-95 ${
                    isLastTwo ? "right-0" : "left-0"
                  }`}>
                    <NestedMenu
                      items={item.children}
                      pathname={pathname}
                      onNavigate={() => setOpenMenu(null)}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
