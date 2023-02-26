const BigNumber = require('bignumber.js');
const LineByLineReader = require('line-by-line')
import { parseSale, parseMarketRates, isValidMarketRate, isValidSale } from './utils/parseLines'
import { getCurrentMarketRates } from './utils/getCurrentRates';

BigNumber.config({ ROUNDING_MODE: 1 })

export interface MarketRates {
  BTC: typeof BigNumber,
  ETH: typeof BigNumber,
  DOGE: typeof BigNumber
}

const rl = new LineByLineReader(process.stdin)

var marketRates: MarketRates

var lineCount: number = 1

calculateAllSales()

async function calculateAllSales(): Promise<void> {
  rl.on('line', async (line: string) => {
    if (lineCount === 1) {
      if (line === 'CURRENT') {
        try {
          rl.pause()
          marketRates = await getCurrentMarketRates()
          rl.resume()
        } catch (error) {
          console.log(error)
          rl.close()
        }
      } else {
        const lineAsArr: Array<string> = line.split(" ")
        if (isValidMarketRate(lineAsArr)) {
          marketRates = parseMarketRates(lineAsArr)
        } else {
          console.log('Currency rate format is not valid')
          rl.close()
        }
      } 
    } else {
      const lineAsArr: Array<string> = line.split(" ")
      if (isValidSale(lineAsArr, lineCount)) {
        parseSale(lineAsArr, marketRates)
      } else {
        rl.close()
      }
    }
    lineCount++
  });
}

export function isNumber(element: string): Boolean {
  return !isNaN(Number(element))
}