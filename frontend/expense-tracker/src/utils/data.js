import {
    LuLayoutDashboard,
    LuLogOut,
} from "react-icons/lu";

import { BsPiggyBank } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";


export const SIDE_MENU_DATA =[
    {
        id : "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/home"
    },
    {
        id: "02",
        label: "Income",
        icon: BsPiggyBank,
        path:"/income"
    },

    {
        id : "03",
        label: "Expenses",
        icon: GiTakeMyMoney,
        path: "/expense"
    },
    {
        id: "04",
        label: "Logout",
        icon: LuLogOut,
        path:"/logout"
    }
]
