import {describe, expect, it} from "vitest";
import {canSendReminder} from "./dunning.rules.js";

describe("canSendReminder", () => {
	it("erlaubt eine Mahnung nur für überfällige offene versendete Rechnungen", () => {
		expect(canSendReminder({status: "sent", openAmount: 10, dueDate: "2020-01-01"})).toBe(true);
		expect(canSendReminder({status: "draft", openAmount: 10, dueDate: "2020-01-01"})).toBe(false);
	});
});
