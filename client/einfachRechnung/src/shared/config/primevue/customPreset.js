import { definePreset } from "@primeuix/themes";
import Nora from "@primeuix/themes/nora";
import semantic from "./semantic.js";

const customPreset = definePreset(Nora, {
	semantic,
});

export default customPreset;
