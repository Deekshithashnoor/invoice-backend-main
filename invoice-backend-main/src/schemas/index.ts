import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string({ required_error: 'Customer name is required' }).min(1, 'Customer name cannot be empty'),
  email: z.string({ required_error: 'Email is required' }).email('Please provide a valid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z.string({ required_error: 'Product name is required' }).min(1, 'Product name cannot be empty'),
  description: z.string().optional(),
  price: z.number({ required_error: 'Product price is required', invalid_type_error: 'Product price must be a number' }).min(0, 'Product price cannot be negative'),
});

export const createInvoiceSchema = z.object({
  customerId: z.string({ required_error: 'Customer ID is required' }).uuid('Customer ID must be a valid unique identifier (UUID)'),
  items: z.array(
    z.object({
      productId: z.string({ required_error: 'Product ID is required for every item' }).uuid('Product ID must be a valid UUID'),
      quantity: z.number({ required_error: 'Quantity is required', invalid_type_error: 'Quantity must be a number' }).min(1, 'Quantity must be at least 1')
    })
  ).min(1, 'An invoice must contain at least one item'),
});

export const updateInvoiceStatusSchema = z.object({
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'CANCELLED'], {
    errorMap: () => ({ message: "Status must be one of: 'DRAFT', 'SENT', 'PAID', 'CANCELLED'" })
  })
});
