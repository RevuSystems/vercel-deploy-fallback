import fs from "fs";

export function stackingAuditInjector() {
  const auditJSON = JSON.parse(fs.readFileSync("exports/vault_heatmap.json", "utf8"));
  const tagDB = JSON.parse(fs.readFileSync("exports/claude_tags.json", "utf8"));
  const additions = [];

  for (const { file, score } of auditJSON) {
    if (score >= 6 && tagDB[file]?.includes("stacking")) {
      const content = fs.readFileSync(`vault/${file}`, "utf8");
      additions.push({
        file,
        content,
        note: "Flagged for stacking patterns",
      });
    }
  }

  fs.writeFileSync("exports/stacking_training_inject.json", JSON.stringify(additions, null, 2));
  return "exports/stacking_training_inject.json";
}