import SidebarComponent from "@/components/sidebar-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarComponent>{children}</SidebarComponent>;
}
