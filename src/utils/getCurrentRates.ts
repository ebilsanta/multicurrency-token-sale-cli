const BigNumber = require('bignumber.js');
import { MarketRates } from '../index'
import axios from 'axios'

interface AssetData {
  id: string,
  rank: string,
  symbol: string,
  name: string,
  supply: string,
  maxSupply: string,
  marketCapUsd: string,
  volumeUsd24Hr: string,
  priceUsd: string,
  changePercent24Hr: string,
  vwap24Hr: string,
  explorer: string
}
interface MarketResponse {
  data: Array<AssetData>
}

export const coinCapUrl = "http://api.coincap.io/v2/assets?ids=ethereum,bitcoin,dogecoin"

export async function getCurrentMarketRates(): Promise<MarketRates> {
  var BTC: typeof BigNumber
  var ETH: typeof BigNumber
  var DOGE: typeof BigNumber
  return new Promise((resolve, reject) => {
    axios.get<MarketResponse>(coinCapUrl)
    .then(response => {
      response.data.data.forEach((asset: AssetData) => {
        switch (asset.symbol) {
          case 'BTC':
            BTC = BigNumber(asset.priceUsd)
            break
          case 'DOGE':
            DOGE = BigNumber(asset.priceUsd)
            break
          case 'ETH':
            ETH = BigNumber(asset.priceUsd)
            break
        }
      });
      resolve({ETH, BTC, DOGE})
    })
    .catch(error => {
      reject("Error getting current market rates")
    })
  })

}
