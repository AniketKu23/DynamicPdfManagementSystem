import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dynamic PDF Template Management System API",
      version: "1.0.0",
      description: "REST APIs for managing PDF templates, configurations, logo uploads, and generated PDFs."
    },
    servers: [{ url: "/api" }],
    components: {
      schemas: {
        Template: {
          type: "object",
          properties: {
            _id: { type: "string", example: "665f4b9b51c2d6a930e44211" },
            name: { type: "string", example: "Corporate Invoice" },
            thumbnail: { type: "string", example: "/templates/corporate.svg" },
            description: { type: "string", example: "A polished tax invoice layout for GST billing." },
            category: { type: "string", example: "taxInvoice" },
            isActive: { type: "boolean", example: true }
          }
        },
        TemplateConfiguration: {
          type: "object",
          properties: {
            templateId: { type: "string", example: "665f4b9b51c2d6a930e44211" },
            isDefault: { type: "boolean", example: true },
            primaryColor: { type: "string", example: "#0d6efd" },
            secondaryColor: { type: "string", example: "#198754" },
            headerFont: { type: "string", example: "Roboto" },
            bodyFont: { type: "string", example: "Arial" },
            footerFont: { type: "string", example: "Open Sans" },
            headerSize: { type: "number", example: 24 },
            bodySize: { type: "number", example: 14 },
            footerSize: { type: "number", example: 12 },
            headerBold: { type: "boolean", example: true },
            bodyBold: { type: "boolean", example: false },
            footerBold: { type: "boolean", example: false },
            alignment: { type: "string", example: "center" },
            logo: { type: "string", example: "https://res.cloudinary.com/demo/logo.png" }
          }
        },
        PdfRequest: {
          type: "object",
          required: ["documentType", "data"],
          properties: {
            documentType: { type: "string", enum: ["taxInvoice", "proformaInvoice", "cancelledInvoice", "quotation", "serviceVoucher"] },
            data: {
              type: "object",
              example: { invoiceNumber: "INV0002", customerName: "Mr. Anurag Singh Chauhan", total: "921322.50" }
            }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Validation failed" },
            errors: { type: "array", items: { type: "object" } }
          }
        }
      }
    },
    paths: {
      "/templates": {
        get: {
          summary: "Get all templates",
          parameters: [
            { in: "query", name: "search", schema: { type: "string" } },
            { in: "query", name: "category", schema: { type: "string" } }
          ],
          responses: { "200": { description: "Template list" }, "500": { description: "Server error" } }
        },
        post: {
          summary: "Create template",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Template" } } } },
          responses: { "201": { description: "Template created" }, "400": { description: "Validation error" } }
        }
      },
      "/templates/{id}": {
        get: {
          summary: "Get template by id",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "Template" }, "404": { description: "Not found" } }
        },
        put: {
          summary: "Update template",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "Template updated" }, "400": { description: "Validation error" } }
        },
        delete: {
          summary: "Delete template",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "Template deleted" }, "404": { description: "Not found" } }
        }
      },
      "/templates/default": { get: { summary: "Get active default template", responses: { "200": { description: "Default configuration" } } } },
      "/templates/save": {
        post: {
          summary: "Save template configuration",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/TemplateConfiguration" } } }
          },
          responses: { "200": { description: "Configuration saved" }, "400": { description: "Validation error" } }
        }
      },
      "/templates/configuration": { get: { summary: "Get configuration", responses: { "200": { description: "Configuration" } } } },
      "/templates/configuration/export": { get: { summary: "Export configuration JSON", responses: { "200": { description: "configuration.json" } } } },
      "/templates/configuration/import": { post: { summary: "Import configuration JSON", responses: { "200": { description: "Configuration imported" } } } },
      "/templates/reorder": { post: { summary: "Drag-and-drop template arrangement persistence", responses: { "200": { description: "Templates reordered" } } } },
      "/pdf/generate": {
        post: {
          summary: "Generate PDF stream",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/PdfRequest" } } } },
          responses: { "200": { description: "PDF stream" }, "400": { description: "Validation error" } }
        }
      },
      "/pdf/preview": { post: { summary: "Preview generated PDF as HTML", responses: { "200": { description: "HTML preview" } } } },
      "/pdf/download": { post: { summary: "Download generated PDF", responses: { "200": { description: "PDF attachment" } } } },
      "/upload/logo": {
        post: {
          summary: "Upload custom logo",
          requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { logo: { type: "string", format: "binary" } } } } } },
          responses: { "201": { description: "Logo URL" }, "400": { description: "Invalid upload" } }
        }
      }
    }
  },
  apis: []
});
