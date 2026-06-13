import offerApi from "../../api";
import {createItemEntity} from "../../entities";


export async function addItem(){
	return createItemEntity();
}
