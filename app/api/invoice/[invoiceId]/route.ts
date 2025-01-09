import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import { formatCurrency } from '@/app/utils/formatCurrency';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;

  // Fetch invoice data from the database
  const invoiceData = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      note: true,
    },
  });

  // Handle case where invoice is not found
  if (!invoiceData) {
    return NextResponse.json(
      { error: 'Invoice not found. Please check the invoice ID.' },
      { status: 404 }
    );
  }

  // Initialize PDF document
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Header with Background Color
  pdf.setFillColor(63, 81, 181); // Blue color
  pdf.rect(0, 0, 210, 30, 'F'); // Full-width rectangle
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(255, 255, 255); // White text
  pdf.text(invoiceData.invoiceName, 20, 20);

  // Reset text color to black
  pdf.setTextColor(0, 0, 0);

  // Sender details (From)
  pdf.setFontSize(12);
  pdf.text('From', 20, 40);
  pdf.setFontSize(10);
  pdf.text(
    [invoiceData.fromName, invoiceData.fromEmail, invoiceData.fromAddress],
    20,
    45
  );

  // Client details (Bill to)
  pdf.setFontSize(12);
  pdf.text('Bill to', 20, 70);
  pdf.setFontSize(10);
  pdf.text(
    [invoiceData.clientName, invoiceData.clientEmail, invoiceData.clientAddress],
    20,
    75
  );

  // Invoice details
  pdf.setFontSize(10);
  pdf.text(`Invoice Number: #${invoiceData.invoiceNumber}`, 120, 40);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
      invoiceData.date
    )}`,
    120,
    45
  );
  pdf.text(`Due Date: ${invoiceData.dueDate}`, 120, 50);

  // Table Headers with Background Color
  pdf.setFillColor(240, 240, 240); // Light gray
  pdf.rect(20, 95, 170, 10, 'F'); // Rectangle for headers
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Description', 22, 102);
  pdf.text('Quantity', 102, 102);
  pdf.text('Rate', 132, 102);
  pdf.text('Total', 162, 102);

  // Draw table header line
  pdf.setDrawColor(200, 200, 200); // Light gray
  pdf.line(20, 105, 190, 105);

  // Invoice item details
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text(invoiceData.invoiceItemDescription, 22, 112);
  pdf.text(invoiceData.invoiceItemQuantity.toString(), 102, 112);
  pdf.text(
    formatCurrency({
      amount: invoiceData.invoiceItemRate,
      currency: invoiceData.currency as any ,
    }),
    132,
    112
  );
  pdf.text(
    formatCurrency({
      amount: invoiceData.total,
      currency: invoiceData.currency as any ,
    }),
    162,
    112
  );

  // Total Section with Background Color
  pdf.setFillColor(240, 240, 240); // Light gray
  pdf.rect(130, 120, 60, 10, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Total (${invoiceData.currency})`, 132, 126);
  pdf.text(
    formatCurrency({ amount: invoiceData.total, currency: invoiceData.currency as any }),
    162,
    126
  );

  // Additional notes (if any)
  if (invoiceData.note) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Note:', 20, 140);
    pdf.text(invoiceData.note, 20, 145);
  }

  // Generate PDF buffer
  const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

  // Return PDF as response
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    },
  });
}
