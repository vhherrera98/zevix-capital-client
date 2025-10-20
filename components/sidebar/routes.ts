import { NavMainType } from "@/types/sidebar.type";
import { ArrowDownUp, BellDot, BellPlus, CircleDollarSign, CreditCard, FileStack, HandCoins, HeartHandshake, House, Inbox, Landmark, LayoutDashboard, PiggyBank, ShieldMinus, Signature, UserRoundCheck, UserRoundPlus, Users, UserSearch } from "lucide-react";

export const navMain: NavMainType[] = [
  {
    role: ["Socio", "Cliente"],
    icon: LayoutDashboard,
    title: "sb_dashboard",
    url: "#",
    children: [
      {
        role: ["Socio", "Cliente"],
        icon: House,
        title: "sb_dashboard_home",
        url: "/dashboard/home"
      }
    ]
  },
  {
    role: ["Socio"],
    icon: ShieldMinus,
    title: "sb_miscellaneous",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: HandCoins,
        title: "sb_miscellaneous_general",
        url: "/dashboard/miscellaneous"
      },
      {
        role: ["Socio"],
        icon: ArrowDownUp,
        title: "sb_miscellaneous_flow",
        url: "/dashboard/miscellaneous/flow_accounts"
      },
      {
        role: ["Socio"],
        icon: Signature,
        title: "sb_miscellaneous_kyc",
        url: "/dashboard/kyc"
      },
    ]
  },
  {
    role: ["Socio"],
    icon: Landmark,
    title: "sb_accounts",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: CreditCard,
        title: "sb_accounts_all",
        url: "/dashboard/accounts/banks"
      },
    ]
  },
  {
    role: ["Socio"],
    icon: UserRoundCheck,
    title: "sb_partners",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: UserSearch,
        title: "sb_partners_all",
        url: "/dashboard/partners"
      },
      {
        role: ["Socio"],
        icon: UserRoundPlus,
        title: "sb_partners_new",
        url: "/dashboard/partners/new"
      },
    ]
  },
  {
    role: ["Socio"],
    icon: Users,
    title: "sb_clients",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: UserSearch,
        title: "sb_clients_all",
        url: "/dashboard/clients"
      },
      {
        role: ["Socio"],
        icon: UserRoundPlus,
        title: "sb_clients_new",
        url: "/dashboard/clients/new"
      },
    ]
  },
  {
    role: ["Socio", "Cliente"],
    icon: FileStack,
    title: "sb_documents",
    url: "#",
    children: [
      {
        role: ["Socio", "Cliente"],
        icon: Signature,
        title: "sb_documents_personal",
        url: "/dashboard/documents"
      },
      {
        role: ["Socio", "Cliente"],
        icon: HeartHandshake,
        title: "sb_documents_beneficiary",
        url: "/dashboard/documents/beneficiaries"
      },
      {
        role: ["Socio"],
        icon: Inbox,
        title: "sb_documents_requests",
        url: "/dashboard/documents/requests"
      },
    ]
  },
  {
    role: ["Socio", "Cliente"],
    icon: CreditCard,
    title: "sb_investments",
    url: "#",
    children: [
      {
        role: ["Socio", "Cliente"],
        icon: PiggyBank,
        title: "sb_investments_incomes",
        url: "/dashboard/investments"
      },
      {
        role: ["Socio"],
        icon: CircleDollarSign,
        title: "sb_investments_requests",
        url: "/dashboard/investments/requests"
      },
    ]
  },
  {
    role: ["Socio"],
    icon: BellDot,
    title: "sb_notifications",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: BellPlus,
        title: "sb_notifications_authorize",
        url: "/dashboard/notifications/requests"
      }
    ]
  },
];

export const navMainPartner: NavMainType[] = [
  {
    role: ["Socio", "Cliente"],
    icon: LayoutDashboard,
    title: "sb_dashboard",
    url: "#",
    children: [
      {
        role: ["Socio", "Cliente"],
        icon: House,
        title: "sb_dashboard_home",
        url: "/dashboard/home"
      }
    ]
  },
  {
    role: ["Socio"],
    icon: ShieldMinus,
    title: "sb_miscellaneous",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: HandCoins,
        title: "sb_miscellaneous_general",
        url: "/dashboard/miscellaneous"
      },
      {
        role: ["Socio"],
        icon: ArrowDownUp,
        title: "sb_miscellaneous_flow",
        url: "/dashboard/miscellaneous/flow_accounts"
      },
    ]
  },
  {
    role: ["Socio"],
    icon: Landmark,
    title: "sb_accounts",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: CreditCard,
        title: "sb_accounts_all",
        url: "/dashboard/accounts/banks"
      },
    ]
  },
  {
    role: ["Socio"],
    icon: UserRoundCheck,
    title: "sb_partners",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: UserSearch,
        title: "sb_partners_all",
        url: "/dashboard/partners"
      },
      {
        role: ["Socio"],
        icon: UserRoundPlus,
        title: "sb_partners_new",
        url: "/dashboard/partners/new"
      },
    ]
  },
  {
    role: ["Socio"],
    icon: Users,
    title: "sb_clients",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: UserSearch,
        title: "sb_clients_all",
        url: "/dashboard/clients"
      },
      {
        role: ["Socio"],
        icon: UserRoundPlus,
        title: "sb_clients_new",
        url: "/dashboard/clients/new"
      },
    ]
  },
  {
    role: ["Socio", "Cliente"],
    icon: FileStack,
    title: "sb_documents",
    url: "#",
    children: [
      {
        role: ["Socio", "Cliente"],
        icon: Signature,
        title: "sb_documents_personal",
        url: "/dashboard/documents"
      },
      {
        role: ["Socio", "Cliente"],
        icon: HeartHandshake,
        title: "sb_documents_beneficiary",
        url: "/dashboard/documents/beneficiaries"
      },
      {
        role: ["Socio"],
        icon: Inbox,
        title: "sb_documents_requests",
        url: "/dashboard/documents/requests"
      },
    ]
  },
  {
    role: ["Socio", "Cliente"],
    icon: CreditCard,
    title: "sb_investments",
    url: "#",
    children: [
      {
        role: ["Socio", "Cliente"],
        icon: PiggyBank,
        title: "sb_investments_incomes",
        url: "/dashboard/investments"
      },
      {
        role: ["Socio"],
        icon: CircleDollarSign,
        title: "sb_investments_requests",
        url: "/dashboard/investments/requests"
      },
    ]
  },
  {
    role: ["Socio"],
    icon: BellDot,
    title: "sb_notifications",
    url: "#",
    children: [
      {
        role: ["Socio"],
        icon: BellPlus,
        title: "sb_notifications_authorize",
        url: "/dashboard/notifications/requests"
      }
    ]
  },
];