import { useEffect, useState } from "react"
import axios from "axios"
import {
    IconUsersGroup,
    IconUserShield,
    IconUserStar,
    IconClipboardList
} from "@tabler/icons-react"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(
                    'https://sasyak-backend.onrender.com/api/admin/users/dashboard',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                )
                setDashboardData(response.data)
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error)
            }
        }

        fetchDashboardData()
    }, [])

    if (!dashboardData) {
        return <p className="px-4 py-6">Loading...</p>
    }

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <IconUsersGroup className="w-5 h-5" />
                        <CardDescription>Total Employees</CardDescription>
                    </div>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {dashboardData.totalEmployees}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <IconUserShield className="w-5 h-5" />
                        <CardDescription>Total Supervisors</CardDescription>
                    </div>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {dashboardData.totalSupervisors}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <IconUserStar className="w-5 h-5" />
                        <CardDescription>Total Managers</CardDescription>
                    </div>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {dashboardData.totalManagers}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <IconClipboardList className="w-5 h-5" />
                        <CardDescription>Total Tasks</CardDescription>
                    </div>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {dashboardData.totalTasks}
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}
