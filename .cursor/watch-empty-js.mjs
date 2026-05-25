/**
 * Fills new/empty *.js files with repo-root template.md (manual create / save).
 * Run from workspace root: node .cursor/watch-empty-js.mjs
 * Started automatically via .vscode/tasks.json (folder open).
 */
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  watch,
  writeFileSync,
} from "node:fs";
import { join, normalize, relative, sep } from "node:path";

const ROOT = process.cwd();
const TEMPLATE_FILE = join(ROOT, "template.md");

function skipPath(rel) {
  const p = rel.split(sep).join("/");
  return (
    p.startsWith("node_modules/") ||
    p.startsWith(".git/") ||
    p === "node_modules" ||
    p === ".git"
  );
}

function loadTemplate() {
  if (!existsSync(TEMPLATE_FILE)) return null;
  return readFileSync(TEMPLATE_FILE, "utf8");
}

const timers = new Map();

function schedule(relPath) {
  if (!relPath || skipPath(relPath)) return;
  if (!relPath.endsWith(".js")) return;
  const abs = normalize(join(ROOT, relPath));
  clearTimeout(timers.get(abs));
  timers.set(
    abs,
    setTimeout(() => {
      timers.delete(abs);
      tryFill(abs);
    }, 200),
  );
}

function tryFill(absPath) {
  let template;
  try {
    if (!existsSync(absPath)) return;
    const st = statSync(absPath);
    if (!st.isFile()) return;
    template = loadTemplate();
    if (template == null) return;
    const cur = readFileSync(absPath, "utf8");
    if (cur.trim() !== "") return;
    if (cur === template) return;
    writeFileSync(absPath, template, "utf8");
  } catch {
    /* race with editor */
  }
}

const template = loadTemplate();
if (template == null) {
  console.error("watch-empty-js: template.md not found at repo root; exiting.");
  process.exit(1);
}

function scanExistingEmptyJs(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const rel = relative(ROOT, join(dir, name.name));
    if (skipPath(rel)) continue;
    const abs = join(dir, name.name);
    if (name.isDirectory()) {
      scanExistingEmptyJs(abs);
    } else if (name.isFile() && name.name.endsWith(".js")) {
      tryFill(abs);
    }
  }
}

scanExistingEmptyJs(ROOT);

try {
  watch(ROOT, { recursive: true }, (_event, filename) => {
    if (typeof filename === "string" && filename.length) schedule(filename);
  });
} catch (e) {
  console.error(
    "watch-empty-js: fs.watch recursive failed (need Node 19+ on macOS):",
    e.message,
  );
  process.exit(1);
}

console.log("watch-empty-js: watching for empty *.js → template.md (stop: Ctrl+C)");
