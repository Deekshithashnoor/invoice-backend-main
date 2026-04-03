import { Router } from 'express';
import { createCustomer, getAllCustomers, getCustomerById } from '../controllers/customerController';
import { createProduct, getAllProducts } from '../controllers/productController';
import { createInvoice, getAllInvoices, getInvoiceById, updateInvoiceStatus } from '../controllers/invoiceController';
import { validateRequest } from '../middlewares/validate';
import { createCustomerSchema, createProductSchema, createInvoiceSchema, updateInvoiceStatusSchema } from '../schemas';

const router = Router();

// Customers
router.post('/api/customers', validateRequest(createCustomerSchema), createCustomer);
router.get('/api/customers', getAllCustomers);
router.get('/api/customers/:id', getCustomerById);

// Products
router.post('/api/products', validateRequest(createProductSchema), createProduct);
router.get('/api/products', getAllProducts);

// Invoices
router.post('/api/invoices', validateRequest(createInvoiceSchema), createInvoice);
router.get('/api/invoices', getAllInvoices);
router.get('/api/invoices/:id', getInvoiceById);
router.put('/api/invoices/:id/status', validateRequest(updateInvoiceStatusSchema), updateInvoiceStatus);

export default router;
