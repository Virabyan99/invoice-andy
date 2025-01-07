import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import InvoiceActions from "./InvoiceActions"

const InvoiceList = () => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>#1</TableCell>
                <TableCell>Jeremy Hunt</TableCell>
                <TableCell>$66.88</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>07/01/2025</TableCell>
                <TableCell className="text-right">
                    <InvoiceActions/>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
  )
}

export default InvoiceList
