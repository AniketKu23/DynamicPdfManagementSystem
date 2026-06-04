import request from "supertest";
import { createApp } from "../src/app";
import { createTemplateFixture } from "./testUtils";

jest.mock("puppeteer", () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      setContent: jest.fn().mockResolvedValue(undefined),
      evaluate: jest.fn().mockResolvedValue(undefined),
      pdf: jest.fn().mockResolvedValue(Buffer.from("%PDF-1.4 mocked"))
    }),
    close: jest.fn().mockResolvedValue(undefined)
  })
}));

const app = createApp();

describe("PDF APIs", () => {
  it("returns HTML preview", async () => {
    await createTemplateFixture();

    const res = await request(app).post("/api/pdf/preview").send({
      documentType: "invoice",
      data: { invoiceNumber: "INV001", customerName: "John Doe", amount: 1500 }
    });

    expect(res.status).toBe(200);
    expect(res.text).toContain("Corporate Invoice");
    expect(res.text).toContain("John Doe");
  });

  it("generates a PDF stream", async () => {
    await createTemplateFixture();

    const res = await request(app).post("/api/pdf/generate").send({
      documentType: "invoice",
      data: { invoiceNumber: "INV001" }
    });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("application/pdf");
  });
});
