<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import Message from "primevue/message";


const route = useRoute();


const items = computed(() => {
	let isFirstRoute = true;

	return route.matched.map((routeElement, index) => {
		const breadcrumb = {
			breadcrumb: routeElement.meta.breadcrumb,
			link: "",
			isLink: false,
			hasNext: false,
			firstItem: false,
			lastItem: false,
		};

		if(isFirstRoute){
			breadcrumb.firstItem = true;
		}
		if(isFirstRoute && route.matched[index +1]){
			breadcrumb.hasNext = true;
		}

		else if(!isFirstRoute && route.matched[index +1]){
			breadcrumb.hasNext = true;
			breadcrumb.isLink = true;
			breadcrumb.link = `offer/${routeElement.path}`;
		}
		else {
			breadcrumb.lastItem = true;
		}

		isFirstRoute = false;

		return breadcrumb;
	});
});

</script>


<template>
	<div class="breadcrumb">
		<div class="breadcrumb-items-desktop" v-if="items.length > 0">
			<div v-for="(item, index) in items"
				:key="index"
				class="breadcrumb-item"
			>
				<Message v-if="item.firstItem"
					severity="info"
					variant="simple"
				>
					{{item.breadcrumb}}
				</Message>

				<Button v-if="item.isLink"
					:to="item.link"
					:label="item.breadcrumb"
					severity="secondary"
					text
				/>

				<Message v-if="item.lastItem"
					severity="secondary"
					variant="simple"
				>
					{{item.breadcrumb}}
				</Message>

				<i class="pi pi-chevron-right breadcrumb-separator"
					v-if="item.hasNext"
				/>

			</div>
		</div>

		<div class="breadcrumb-items-mobile">
			<Message
				severity="info"
				variant="simple"
			>
				{{route.matched[0].meta.breadcrumb}}
			</Message>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.breadcrumb {
	margin-left: var(--space-md);
}

.breadcrumb-items-desktop {
	display: none;
	align-items: center;
	gap: var(--space-md);
}

@include media.up(bp.$bp_md) {
	.breadcrumb-items-mobile {
		display: none;
	}

	.breadcrumb-items-desktop {
		display: flex;
	}
}

.breadcrumb-item {
	display: flex;
	align-items: center;
	gap: var(--space-md);
}

.breadcrumb-separator {
	display: flex;
	align-items: center;
	font-size: 0.7rem;
	opacity: 0.6;
}
</style>
