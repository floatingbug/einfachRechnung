import {mapCustomerDtoToEntity} from "./mapCustomerDtoToEntity.js";

export function mapCustomerDtosToEntities(dtos = []){
	return dtos.map(function(dto){
		return mapCustomerDtoToEntity(dto);
	});
}
