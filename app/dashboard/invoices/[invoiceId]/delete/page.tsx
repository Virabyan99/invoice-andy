import { deleteInvoice } from '@/app/actions'
import prisma from '@/app/utils/db'
import { requireUser } from '@/app/utils/hooks'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import WarningGif from '@/public/warning-gif.gif'
import SubmitButton from '@/app/components/SubmitButton'

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  })

  if (!data) {
    return redirect('/dashboard/invoices')
  }
}

type Params = Promise<{ invoiceId: string }>

const DeleteInvoiceType = async ({ params }: { params: Params }) => {
  const session = await requireUser()
  const { invoiceId } = await params
  await Authorize(invoiceId, session.user?.id as string)
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this Invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={WarningGif}
            alt="warning gif"
            className="rounded-lg size-[300px]"
          />
        </CardContent>
        <CardFooter className="w-full flex justify-between">
          <Button asChild variant="secondary">
            <Link href="/dashboard/invoices">Cancel</Link>
          </Button>
          <form action={async () => {
            "use server"
            await deleteInvoice(invoiceId)
          }}>
            <SubmitButton variant='destructive' text='Delete Invoice'/>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

export default DeleteInvoiceType
