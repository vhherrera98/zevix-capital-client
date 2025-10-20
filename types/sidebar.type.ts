import { LucideIcon } from "lucide-react";

type NavMainSubItem = {
  role: string[];
  icon: LucideIcon;
  title: string;
  url: string;
}

export type NavMainType = {
  role: string[];
  icon: LucideIcon;
  title: string;
  url: string;
  children: NavMainSubItem[];
}