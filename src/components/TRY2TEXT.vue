<template>
	<div class="main">
		<div class="input">
			<input type="number" v-model="newNumber" >
			<button @click="Ekle()">Ekle</button>
		</div>
		<div v-for="(number, index) in numbers" :key="index" class="try2text">
			<h2>{{ number }}</h2>
			<h3>{{ number | try2text }}</h3>
		</div>

	</div>
</template>

<script>

import try2text from '../filters/try-2-text';
export default {
	mixins: [try2text],
	data: () => {
		return  {
			newNumber: null,
			numbers: [
				'10000000000000000',
				'1145334534577',
				'987213545600',
				'989400',
				'3490',
				'233678746505',
				'99909065756',
				'56565656500',
				'1212110',
			]
		}
	},
	methods: {
		Ekle() {
			this.numbers.unshift(+(this.newNumber))
			
			this.newNumber = null
		}
	}
}

</script>

<style scoped>
	.try2text {
		margin-bottom: 90px;
	}

	h3 {
		font-size: 22px;
	}

	h3 {
		font-size: 18px;
	}

</style>
