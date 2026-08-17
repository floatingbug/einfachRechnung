<script setup>
import { useRoute, useRouter } from "vue-router";
import getItems from "./getItems";

const props = defineProps({
	collapsed: Boolean,
	mobileOpen: Boolean,
	desktop: Boolean,
});

const emit = defineEmits(["close", "toggle-collapse"]);

const router = useRouter();
const route = useRoute();
const items = getItems({ router });

function isActive(item) {
	const destinations = {
		invoiceList: "/invoice",
		invoiceCreate: "/invoice/create",
		customerList: "/customer",
		createCustomer: "/customer/create",
		offerList: "/offer/list",
		createOffer: "/offer/create",
		offerToInvoice: "/offer/convert",
		paymentList: "/payment",
		openInvoices: "/payment/open",
		dunning: "/payment/dunning",
		companySettings: "/settings/company",
		offerSettings: "/settings/offer",
		invoiceSettings: "/settings/invoice",
		taxSettings: "/settings/tax",
		emailSettings: "/settings/email",
	};

	return route.path === destinations[item.id];
}

function navigate(item) {
	item.command();
	emit("close");
}
</script>

<template>
	<div class="sidebar-wrapper">
		<aside
			class="sidebar-shell"
			:class="{
				'is-collapsed': props.collapsed,
				'is-mobile-open': props.mobileOpen,
			}"
		>
			<div class="sidebar-header">
				<RouterLink class="brand" to="/" @click="emit('close')">
					<span class="brand-mark">ER</span>
					<span class="brand-name">Einfach Rechnung</span>
				</RouterLink>

				<Button
					class="collapse-button"
					:icon="
						props.collapsed
							? 'pi pi-angle-right'
							: 'pi pi-angle-left'
					"
					:text="true"
					rounded
					:aria-label="
						props.collapsed
							? 'Navigation ausklappen'
							: 'Navigation einklappen'
					"
					@click="emit('toggle-collapse')"
				/>
			</div>

			<nav class="navigation" aria-label="Hauptnavigation">
				<template
					v-for="(group, groupIndex) in items"
					:key="group.label"
				>
					<p class="group-label">{{ group.label }}</p>

					<ul class="navigation-list">
						<li v-for="item in group.items" :key="item.id">
							<button
								class="navigation-link"
								:class="{
									'is-active': isActive(item),
								}"
								:aria-current="
									isActive(item)
										? 'page'
										: undefined
								"
								:title="
									props.collapsed
										? item.label
										: undefined
								"
								@click="navigate(item)"
							>
								<i
									:class="item.icon"
									aria-hidden="true"
								/>
								<span>{{ item.label }}</span>
							</button>
						</li>
					</ul>

					<div
						v-if="groupIndex < items.length - 1"
						class="group-divider"
					/>
				</template>
			</nav>
		</aside>

		<div
			v-if="props.mobileOpen"
			class="sidebar-overlay"
			@click="emit('close')"
		/>
	</div>
</template>

<style scoped lang="scss">
.sidebar-wrapper {
	height: 100%;
}

.sidebar-shell {
	box-sizing: border-box;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden auto;
	color: var(--sidebar-text);
	background: var(--sidebar-bg);
	border-right: 1px solid var(--sidebar-border);
	box-shadow: var(--sidebar-shadow);
}

.sidebar-header {
	min-height: var(--topbar-height);
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--space-sm);
	padding: 0 var(--space-md);
	border-bottom: 1px solid var(--sidebar-divider);
}

.brand {
	min-width: 0;
	display: inline-flex;
	align-items: center;
	gap: var(--space-sm);
	color: inherit;
	font-weight: 700;
	text-decoration: none;
	white-space: nowrap;
}

.brand-mark {
	width: 2rem;
	height: 2rem;
	display: grid;
	place-items: center;
	flex: 0 0 auto;
	border-radius: 0.65rem;
	color: var(--sidebar-mark-text);
	background: var(--sidebar-mark-bg);
	font-size: 0.7rem;
	letter-spacing: 0.04em;
}

.brand-name,
.navigation-link span,
.group-label,
.collapse-button {
	transition: opacity 160ms ease, transform 160ms ease;
}

.collapse-button {
	color: var(--sidebar-text) !important;
}

.navigation {
	padding: var(--space-md) var(--space-sm) var(--space-xl);
}

.group-label {
	margin: var(--space-sm) var(--space-sm) var(--space-xs);
	color: var(--sidebar-text-muted);
	font-size: 0.68rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}

.navigation-list {
	padding: 0;
	margin: 0;
	list-style: none;
}

.navigation-link {
	width: 100%;
	display: flex;
	align-items: center;
	gap: var(--space-md);
	padding: 0.7rem var(--space-sm);
	border: 0;
	border-radius: 0.6rem;
	color: var(--sidebar-text-muted);
	background: transparent;
	font: inherit;
	font-size: 0.9rem;
	text-align: left;
	cursor: pointer;
	transition: color 160ms ease, background-color 160ms ease;

	&:hover {
		color: var(--sidebar-text);
		background: var(--sidebar-hover);
	}

	&:focus-visible {
		outline: 2px solid var(--sidebar-focus-ring);
		outline-offset: 2px;
	}

	&.is-active {
		color: var(--sidebar-text);
		background: var(--sidebar-active);
		box-shadow: inset 3px 0 0 var(--sidebar-accent);
	}

	i {
		width: 1.25rem;
		flex: 0 0 1.25rem;
		font-size: 1rem;
		text-align: center;
	}

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.group-divider {
	height: 1px;
	margin: var(--space-md) var(--space-sm);
	background: var(--sidebar-divider);
}

.sidebar-overlay {
	display: none;
}

@media (min-width: 1024px) {
	.sidebar-shell {
		position: relative;
		width: 100%;
		height: 100%;
		transform: none;
	}

	.is-collapsed {
		.sidebar-header {
			justify-content: center;
			padding: 0;
		}

		.brand-name,
		.navigation-link span,
		.group-label,
		.group-divider {
			display: none;
		}

		.brand {
			display: none;
		}

		.navigation {
			padding-inline: var(--space-xs);
		}

		.navigation-link {
			justify-content: center;
			padding: 0.75rem;
		}
	}
}

@media (max-width: 1023px) {
	.sidebar-wrapper {
		height: 100%;
	}

	.sidebar-shell {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: min(280px, 85vw);
		height: 100vh;
		z-index: 1001;
		transform: translateX(-100%);
		transition: transform 200ms ease;
	}

	.sidebar-shell.is-mobile-open {
		transform: translateX(0);
	}

	.sidebar-overlay {
		position: fixed;
		inset: 0;
		display: block;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.45);
	}

	.collapse-button {
		display: none;
	}
}
</style>
