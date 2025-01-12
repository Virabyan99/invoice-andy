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
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import SubmitButton from '@/app/components/SubmitButton'
import PaidGif from '@/public/paid-gif.gif'
import Image from 'next/image'
import { markAsPaid } from '@/app/actions'

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

export default async function MarkAsPaid({ params }: { params: Params }) {
  const session = await requireUser()
  const { invoiceId } = await params
  await Authorize(invoiceId, session.user?.id as string)
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Mark as paid ?</CardTitle>
          <CardDescription>
            Are you sure you want to mark this Invoice as Paid
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={PaidGif} alt="as paid" className='rounded-lg' />
        </CardContent>
        <CardFooter className="w-full flex justify-between">
          <Button asChild variant="secondary">
            <Link href="/dashboard/invoices">Cancel</Link>
          </Button>
          <form action={async () => {
            "use server"
            await markAsPaid(invoiceId)
          }}
          >
            <SubmitButton text="Mark as Paid!" />
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
