// Helmet Validation schema - same as web
import { z } from "zod";

const REQUIRED_FIELD = { message: "Field ini wajib diisi" };

const HelmetValidation = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  path_slug: z
    .string({
      required_error: REQUIRED_FIELD.message,
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Hanya boleh huruf, angka, dan underscore (_), tanpa spasi atau karakter khusus.",
    }),
  rtsp_url: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  need_convert: z.boolean().optional(),
  region_id: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
});

export { HelmetValidation };
export type HelmetSchema = z.infer<typeof HelmetValidation>;
