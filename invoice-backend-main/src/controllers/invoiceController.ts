import { Request, Response, NextFunction } from 'express';
import prisma from '../prismaClient';

interface InvoiceItemPayload {
  productId: string;
  quantity: number;
}

export const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, items } = req.body as { customerId: string; items: InvoiceItemPayload[] };

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'An invoice must contain at least one item' });
    }

    // Process all items concurrently to fetch their prices
    let totalAmount = 0;
    const itemsDataToInsert = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      const unitPrice = Number(product.price);
      const totalPrice = unitPrice * item.quantity;
      totalAmount += totalPrice;

      itemsDataToInsert.push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
      });
    }

    // Create Invoice with nested items
    const invoice = await prisma.invoice.create({
      data: {
        customerId,
        totalAmount,
        status: 'DRAFT',
        items: {
          create: itemsDataToInsert,
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const getAllInvoices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: { name: true, email: true }
        }
      }
    });
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: { product: true }
        }
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const updateInvoiceStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['DRAFT', 'SENT', 'PAID', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(updatedInvoice);
  } catch (error) {
    next(error);
  }
};
