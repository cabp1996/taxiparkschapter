export interface SidebarItem {
  label: string;
  icon: string;
  path: string;
  hasSiblingActiveBelow?: boolean;
  hasSiblingActiveAbove?: boolean;
}
