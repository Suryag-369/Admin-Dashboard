import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

// import data from "./data.json"
import { LoginForm } from "@/components/login-form"
import data from "@/data.json";
import {useEffect, useState} from "react";
import {EmployeeTable} from "@/components/Employee/EmployeeTable.jsx";
import {Outlet} from "react-router-dom";

export default function App() {

    return (
        <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    }
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
    )
}

