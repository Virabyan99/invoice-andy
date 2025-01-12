import prisma from '@/app/utils/db'
import { requireUser } from '@/app/utils/hooks'
import { emailClient } from '@/app/utils/mailtrap'
import { NextResponse } from 'next/server'

export async function POST(request: Request, {
  params,
}: {
  params: Promise<{ invoiceId: string }>
}) {
  try {
    const session = await requireUser()
    const { invoiceId } = await params

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    })

    if (!invoiceData) {
      return NextResponse.json({ error: 'Invoice Not found!' }, { status: 404 })
    }

    const sender = {
      email: 'hello@demomailtrap.com',
      name: 'Andranik Virabyan',
    }

    emailClient.send({
      from: sender,
      to: [{ email: 'gmparstone99@gmail.com' }],
      template_uuid: "61676f5a-6d3e-46f1-a68e-d8cfa4ca4f85",
      template_variables: {
        "first_name": invoiceData.clientName,
        "company_info_name": "InvoiceAndy",
        "company_info_address": "Margaryan 33",
        "company_info_city": "Yerevan",
        "company_info_zip_code": "048564",
        "company_info_country": "Armenia"
      }
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send Email reminder' },
      { status: 500 }
    )
  }
}
