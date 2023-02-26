import { MarketRates } from '../index'
const BigNumber = require('bignumber.js');

export const validSymbols: Array<string> = ['ETH', 'DOGE', 'BTC']

export function parseMarketRates(lineAsArr: Array<string>): MarketRates {
  return {
    BTC: BigNumber(lineAsArr[0]),
    ETH: BigNumber(lineAsArr[1]),
    DOGE: BigNumber(lineAsArr[2]),
  }
}

export function parseSale(lineAsArr: string[], marketRates: MarketRates): void {
  const ETHSale: typeof BigNumber = BigNumber(lineAsArr[0])
  const saleDecimals: number = parseInt(lineAsArr[1])
  const purchaseCurrency: string = lineAsArr[2]
  const purchaseAmount: typeof BigNumber = BigNumber(lineAsArr[3])
  var saleAmount: typeof BigNumber

  if (purchaseCurrency !== 'ETH') {
    const purchaseUSD: typeof BigNumber = marketRates[purchaseCurrency as keyof MarketRates]
                                          .multipliedBy(purchaseAmount)
    saleAmount = purchaseUSD.multipliedBy(ETHSale).dividedBy(marketRates['ETH'])                                        
  } else {
    saleAmount = purchaseAmount.multipliedBy(ETHSale)
  }
  console.log(saleAmount.toFixed(saleDecimals))
}

export function isValidMarketRate(lineAsArr: string[]): Boolean {
  const valid = lineAsArr.every(el => isPositiveNumber(el))
  return lineAsArr.length === 3 && valid
}

export function isValidSale(lineAsArr: string[], lineCount: number): Boolean {
  if (lineAsArr.length !== 4) {
    console.log(`Incorrect length at line ${lineCount}. Please follow this format: \n<ETHSALE rate> <SALE decimal places> <Purchase currency> <BTC/ETH/DOGE purchase amount>`)
    return false
  } else if (!validSymbols.includes(lineAsArr[2])) {
    console.log(`Invalid symbol at line ${lineCount}`)
    return false
  } else if (!isPositiveNumber(lineAsArr[0]) || !isPositiveNumber(lineAsArr[1]) || !isPositiveNumber(lineAsArr[3])) {
    console.log(`Invalid numbers at line ${lineCount}`)
    return false
  } 
  return true
}

export function isPositiveNumber(element: string): Boolean {
  return !isNaN(Number(element)) && Number(element) > 0
}