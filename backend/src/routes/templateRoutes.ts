import { Router } from "express";
import {
  createTemplate,
  deleteTemplate,
  exportTemplateConfiguration,
  getConfiguration,
  getConfigurationByTemplate,
  getDefaultTemplate,
  getTemplateById,
  getTemplates,
  importTemplateConfiguration,
  reorderTemplates,
  saveTemplateConfiguration,
  updateTemplate
} from "../controllers/templateController";
import { validate } from "../middleware/validate";
import {
  idParamSchema,
  importConfigurationSchema,
  reorderTemplatesSchema,
  saveConfigurationSchema,
  templateCreateSchema,
  templateUpdateSchema
} from "../validators/templateValidator";

const router = Router();

router.get("/", getTemplates);
router.get("/default", getDefaultTemplate);
router.get("/configuration", getConfiguration);
router.get("/:id/configuration", validate(idParamSchema), getConfigurationByTemplate);
router.get("/configuration/export", exportTemplateConfiguration);
router.post("/configuration/import", validate(importConfigurationSchema), importTemplateConfiguration);
router.post("/save", validate(saveConfigurationSchema), saveTemplateConfiguration);
router.post("/reorder", validate(reorderTemplatesSchema), reorderTemplates);
router.get("/:id", validate(idParamSchema), getTemplateById);
router.post("/", validate(templateCreateSchema), createTemplate);
router.put("/:id", validate(templateUpdateSchema), updateTemplate);
router.delete("/:id", validate(idParamSchema), deleteTemplate);

export default router;
