import {
	calculateSubtotal,
} from "../../../../services";


export function updateTotals(){
	this.draftOffer.totals.subtotal = calculateSubtotal({
		items: this.draftOffer.items,
	});
};
