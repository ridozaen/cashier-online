function totalPriceHelper(price,qty) {
	var priceNumber = Number(price)
	var qty = Number(qty)
	
	return `${priceNumber*qty}`
} 

module.exports = totalPriceHelper