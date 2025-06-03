"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

export default function ReportsPage() {
    const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

    const [detailed, setDetailed] = useState(null)
    const [efficiency, setEfficiency] = useState(null)
    const [trend, setTrend] = useState(null)
    const [performance, setPerformance] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        const headers = { Authorization: `Bearer ${token}` }

        axios.get(`${API_BASE_URL}/api/tasks/report/detailed`, { headers }).then(res => setDetailed(res.data))
        axios.get(`${API_BASE_URL}/api/tasks/report/efficiency`, { headers }).then(res => setEfficiency(res.data))
        axios.get(`${API_BASE_URL}/api/tasks/report/trend`, { headers }).then(res => setTrend(res.data))
        axios.get(`${API_BASE_URL}/api/tasks/report/performance`, { headers }).then(res => setPerformance(res.data))
    }, [])

    if (!detailed || !efficiency || !trend || !performance) return <p className="p-4">Loading reports...</p>

    const trendDates = [...new Set([
        ...trend.tasksCreated.map(item => item.date),
        ...trend.tasksCompleted.map(item => item.date)
    ])].sort()

    const trendData = trendDates.map(date => {
        const created = trend.tasksCreated.find(d => d.date === date)?.count || 0;
        const completed = trend.tasksCompleted.find(d => d.date === date)?.count || 0;
        return { date, Created: created, Completed: completed };
    })

    const typeData = Object.entries(detailed.tasksByType).map(([key, value]) => ({
        type: key,
        count: value
    }))

    const efficiencyByType = Object.entries(efficiency.avgTimesByType).map(([key, value]) => ({
        type: key,
        avgTime: value
    }))

    const efficiencyByUser = Object.entries(efficiency.avgTimesByUser).map(([key, value]) => ({
        user: key,
        avgTime: value
    }))

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Tasks</CardTitle>
                        <CardDescription>{detailed?.totalTasks ?? 0}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Submitted</CardTitle>
                        <CardDescription>{detailed?.tasksByStatus?.submitted ?? 0}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Approved</CardTitle>
                        <CardDescription>{detailed?.tasksByStatus?.approved ?? 0}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Rejected</CardTitle>
                        <CardDescription>{detailed?.tasksByStatus?.rejected ?? 0}</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <Tabs defaultValue="types" className="w-full">
                <TabsList>
                    <TabsTrigger value="types">By Type</TabsTrigger>
                    <TabsTrigger value="trend">Task Trends</TabsTrigger>
                    <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                    <TabsTrigger value="users">By User</TabsTrigger>

                </TabsList>

                <TabsContent value="trend">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Trend Overview</h3>
                        </CardHeader>
                        <CardContent className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Created" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="Completed" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="types">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Type Distribution</h3>
                        </CardHeader>
                        <CardContent className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={typeData}>
                                    <XAxis dataKey="type" interval={0} angle={-45} textAnchor="end" height={100} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="green" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">User Performance</h3>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Assigned</TableHead>
                                        <TableHead>Completed</TableHead>
                                        <TableHead>Rate (%)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(performance.avgCompletionTimeByUser)
                                        .sort(([, a], [, b]) => b.completed - a.completed) // Sorting logic here
                                        .map(([user, stats]) => (
                                            <TableRow key={user}>
                                                <TableCell>{user}</TableCell>
                                                <TableCell>{stats.total}</TableCell>
                                                <TableCell>{stats.completed}</TableCell>
                                                <TableCell>{stats.rate}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>


                <TabsContent value="efficiency">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Average Completion Time by Type</CardTitle>
                            </CardHeader>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={efficiencyByType}>
                                        <XAxis dataKey="type" interval={0} angle={-45} textAnchor="end" height={100} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="avgTime" fill="#34d399" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Average Completion Time by User</CardTitle>
                            </CardHeader>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={efficiencyByUser}>
                                        <XAxis dataKey="user" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="avgTime" fill="#fbbf24" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
