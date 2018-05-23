function currencyHelper(dataTransactionsPrice) {
	var toNumber = Number(dataTransactionsPrice)
	return `Rp.${toNumber.toLocaleString()}`
} 

module.exports = currencyHelper