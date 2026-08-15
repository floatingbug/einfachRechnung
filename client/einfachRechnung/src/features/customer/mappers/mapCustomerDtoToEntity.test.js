import {describe, expect, it} from "vitest";
import {mapCustomerDtoToEntity} from "./mapCustomerDtoToEntity.js";

describe("mapCustomerDtoToEntity", () => {
	it("bewahrt den Namen aus dem Backend-DTO", () => {
		expect(mapCustomerDtoToEntity({_id: "customer-1", name: "Ada Lovelace"})).toMatchObject({id: "customer-1", name: "Ada Lovelace"});
	});
});
