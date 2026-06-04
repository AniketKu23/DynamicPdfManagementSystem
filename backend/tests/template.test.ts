import request from "supertest";
import { createApp } from "../src/app";
import { Template } from "../src/models/Template";
import { TemplateConfiguration } from "../src/models/TemplateConfiguration";
import { createTemplateFixture } from "./testUtils";

const app = createApp();

describe("Template APIs", () => {
  it("creates and lists templates", async () => {
    const createRes = await request(app).post("/api/templates").send({
      name: "Modern Invoice",
      thumbnail: "data:image/svg+xml,test",
      description: "A clean invoice layout.",
      category: "invoice"
    });

    expect(createRes.status).toBe(201);
    expect(createRes.body.success).toBe(true);

    const listRes = await request(app).get("/api/templates");
    expect(listRes.status).toBe(200);
    expect(listRes.body.data).toHaveLength(1);
  });

  it("updates and deletes a template", async () => {
    const { template } = await createTemplateFixture();

    const updateRes = await request(app).put(`/api/templates/${template._id}`).send({
      name: "Updated Invoice"
    });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.data.name).toBe("Updated Invoice");

    const deleteRes = await request(app).delete(`/api/templates/${template._id}`);
    expect(deleteRes.status).toBe(200);
    expect(await Template.countDocuments()).toBe(0);
  });
});

describe("Configuration APIs", () => {
  it("saves one default configuration at a time", async () => {
    const first = await createTemplateFixture();
    const secondTemplate = await Template.create({
      name: "Travel Voucher",
      thumbnail: "data:image/svg+xml,test",
      description: "Travel voucher.",
      category: "voucher"
    });

    const res = await request(app).post("/api/templates/save").send({
      templateId: secondTemplate._id.toString(),
      isDefault: true,
      primaryColor: "#111827",
      secondaryColor: "#22c55e",
      headerFont: "Arial",
      bodyFont: "Roboto",
      footerFont: "Open Sans",
      headerSize: 26,
      bodySize: 15,
      footerSize: 12,
      headerBold: true,
      bodyBold: false,
      footerBold: false,
      alignment: "left"
    });

    expect(res.status).toBe(200);
    expect(res.body.data.isDefault).toBe(true);
    const oldConfig = await TemplateConfiguration.findById(first.configuration._id);
    expect(oldConfig?.isDefault).toBe(false);
  });

  it("exports and imports configuration", async () => {
    const { template } = await createTemplateFixture();
    const exportRes = await request(app).get("/api/templates/configuration/export");
    expect(exportRes.status).toBe(200);
    expect(exportRes.body.primaryColor).toBe("#0d6efd");

    const importRes = await request(app).post("/api/templates/configuration/import").send({
      templateId: template._id.toString(),
      isDefault: true,
      primaryColor: "#123456",
      secondaryColor: "#654321",
      headerFont: "Times New Roman",
      bodyFont: "Arial",
      footerFont: "Roboto",
      headerSize: 24,
      bodySize: 14,
      footerSize: 12,
      headerBold: false,
      bodyBold: true,
      footerBold: false,
      alignment: "right"
    });

    expect(importRes.status).toBe(200);
    expect(importRes.body.data.primaryColor).toBe("#123456");
  });
});
