import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import {ViewEmployeeDialog} from "@/components/Employee/view-employee.jsx";
import {UpdateEmployeeDialog} from "@/components/Employee/update-employee.jsx";
import {DeleteEmployeeDialog} from "@/components/Employee/delete-employee.jsx";
import {ManagerSupervisorsDialog} from "@/components/Employee/manager-supervisor.jsx";


export const Actions = ({ employee, onSuccess }) => {
    const [viewOpen, setViewOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [msOpen,setMsOpen] = useState(false)

    return (
        <>
            {/* Dropdown trigger */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setViewOpen(true)}>
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                        Delete
                    </DropdownMenuItem>
                    {
                        employee.role === "MANAGER" &&
                        <DropdownMenuItem onClick={() => setMsOpen(true)}>
                            View Supervisors
                        </DropdownMenuItem>
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialogs triggered by state */}
            {viewOpen && (
                <ViewEmployeeDialog
                    employee={employee}
                    open={viewOpen}
                    onOpenChange={setViewOpen} />
            )}
            {updateOpen && (
                <UpdateEmployeeDialog
                    employee={employee}
                    onSuccess={onSuccess}
                    open={updateOpen}
                    onOpenChange={setUpdateOpen}
                />
            )}
            {deleteOpen && (
                <DeleteEmployeeDialog
                    employee={employee}
                    onSuccess={onSuccess}
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                />
            )}

            {
                msOpen && (
                    <ManagerSupervisorsDialog
                        manager={employee}
                        open={msOpen}
                        onOpenChange={setMsOpen}
                    />
                )
            }
        </>
    )
}
