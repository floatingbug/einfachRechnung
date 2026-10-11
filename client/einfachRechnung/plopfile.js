import fs from "node:fs";
import path from "node:path";

const FEATURES_DIR = "src/features";
const NEW_FEATURE = "➕ Neues Feature anlegen";

export default function (plop) {
	const camelCase = plop.getHelper("camelCase");

	// Schreibt die index.js eines Verzeichnisses anhand der vorhandenen Dateien neu
	const regenerateBarrel = (dir) => () => {
		const absDir = path.resolve(plop.getDestBasePath(), dir);
		const names = fs
			.readdirSync(absDir)
			.filter((f) => f.endsWith(".js") && f !== "index.js")
			.map((f) => path.basename(f, ".js"))
			.sort();

		const imports = names
			.map((n) => `import { ${n} } from "./${n}.js";`)
			.join("\n");
		const exports = names.map((n) => `\t${n},`).join("\n");

		fs.writeFileSync(
			path.join(absDir, "index.js"),
			`${imports}\n\n\nexport default {\n${exports}\n};\n`
		);
		return `${dir}/index.js aktualisiert (${names.length} Einträge)`;
	};

	const existingFeatures = () => {
		const dir = path.resolve(plop.getDestBasePath(), FEATURES_DIR);
		if (!fs.existsSync(dir)) return [];
		return fs
			.readdirSync(dir, { withFileTypes: true })
			.filter((d) => d.isDirectory())
			.map((d) => d.name);
	};

	plop.setGenerator("endpoint", {
		description: "API-Endpunkt über api → services → store/actions",
		prompts: [
			{
				type: "list",
				name: "feature",
				message: "Feature:",
				choices: () => [...existingFeatures(), NEW_FEATURE],
			},
			{
				type: "input",
				name: "newFeature",
				message: "Name des neuen Features (z.B. customers):",
				when: (a) => a.feature === NEW_FEATURE,
				validate: (v) => /^[a-z][a-z0-9-]*$/.test(v) || "Nur Kleinbuchstaben/Ziffern/Bindestrich",
			},
			{
				type: "input",
				name: "name",
				message: "Funktionsname (z.B. deleteCustomer):",
				validate: (v) => /^[a-z][A-Za-z0-9]*$/.test(v) || "Muss ein camelCase-Bezeichner sein",
			},
			{
				type: "list",
				name: "method",
				message: "HTTP-Methode:",
				choices: ["get", "post", "put", "patch", "delete"],
			},
			{
				type: "input",
				name: "url",
				message: "URL (z.B. /customers/${customerId}):",
				validate: (v) => v.startsWith("/") || "URL muss mit / beginnen",
			},
			{
				type: "input",
				name: "args",
				message: "Argumente, kommagetrennt (z.B. customerId; 'query' für GET, 'body' für POST/PUT/PATCH):",
			},
		],
		actions: (answers) => {
			const feature = answers.newFeature || answers.feature;
			const root = `${FEATURES_DIR}/${feature}`;

			const args = (answers.args || "")
				.split(",")
				.map((a) => a.trim())
				.filter(Boolean);
			const argsObj = args.length ? `{ ${args.join(", ")} }` : "";

			// Zweites Argument für http.<method>(url, ...)
			let extra = "";
			if (["get", "delete"].includes(answers.method) && args.includes("query")) {
				extra = ", { params: query }";
			} else if (["post", "put", "patch"].includes(answers.method) && args.includes("body")) {
				extra = ", body";
			}

			const data = {
				feature,
				argsObj,
				requestArgs: `\`${answers.url}\`${extra}`,
				featureApi: `${camelCase(feature)}Api`,
			};

			const layers = [
				{ dir: "api", template: "api.hbs" },
				{ dir: "services", template: "service.hbs" },
				{ dir: "store/actions", template: "action.hbs" },
			];

			return layers.flatMap(({ dir, template }) => [
				{
					type: "add",
					path: `${root}/${dir}/{{name}}.js`,
					templateFile: `plop-templates/${template}`,
					data,
				},
				regenerateBarrel(`${root}/${dir}`),
			]);
		},
	});
}
