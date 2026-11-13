import { tmpdir } from "node:os";
import { join } from "node:path";

/** Program khusus uji beban check-in, dibuat oleh siapkanDataBeban.ts. */
export const ID_PROGRAM_BEBAN = "uji-beban-program";

/** File berisi cookie sesi relawan uji beban, ditulis di folder temp. */
export const FILE_SESI = join(tmpdir(), "rekanbumi-sesi-beban.json");
