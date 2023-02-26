const { coinCapUrl, getCurrentMarketRates } = require("../build/utils/getCurrentRates.js")
const axios = require('axios')
const BigNumber = require('bignumber.js');

jest.mock('axios')

describe("Test fetch current rates function", () => {
  test("Data fetched successfully", async ()=> {
    const mockedData = {
      "data": [
          {
              "id": "bitcoin",
              "rank": "1",
              "symbol": "BTC",
              "name": "Bitcoin",
              "supply": "19301968.0000000000000000",
              "maxSupply": "21000000.0000000000000000",
              "marketCapUsd": "446667556993.9720452002261392",
              "volumeUsd24Hr": "7176698149.5064036499032620",
              "priceUsd": "23141.0370690683999269",
              "changePercent24Hr": "-0.0103635045310438",
              "vwap24Hr": "23097.8277779190057431",
              "explorer": "https://blockchain.info/"
          },
          {
              "id": "ethereum",
              "rank": "2",
              "symbol": "ETH",
              "name": "Ethereum",
              "supply": "122373866.2178000000000000",
              "maxSupply": null,
              "marketCapUsd": "195760393806.0259194026437139",
              "volumeUsd24Hr": "2224293439.9314182832542681",
              "priceUsd": "1599.6911747285419711",
              "changePercent24Hr": "-0.4499138870594271",
              "vwap24Hr": "1594.1258232322939528",
              "explorer": "https://etherscan.io/"
          },
          {
              "id": "dogecoin",
              "rank": "10",
              "symbol": "DOGE",
              "name": "Dogecoin",
              "supply": "132670764299.8940900000000000",
              "maxSupply": null,
              "marketCapUsd": "10759619615.3477819605440375",
              "volumeUsd24Hr": "120096651.6633199522926105",
              "priceUsd": "0.0811001555024310",
              "changePercent24Hr": "-0.7724397422733714",
              "vwap24Hr": "0.0805707244009607",
              "explorer": "http://dogechain.info/chain/Dogecoin"
          }
      ],
      "timestamp": 1677398905453
  }
  const mockedResult = {"BTC": BigNumber("23141.0370690683999269"), "DOGE": BigNumber("0.081100155502431"), "ETH": BigNumber("1599.6911747285419711")}
    axios.get.mockImplementation(() => Promise.resolve({ data: mockedData }))
    const result = await getCurrentMarketRates()
    expect(axios.get).toHaveBeenCalledWith(coinCapUrl)
    expect(result).toEqual(mockedResult)
  })

  test("Data fetching failed", async () => {
    axios.get.mockImplementation(() => Promise.reject( { status: 404 } ))
    console.log = jest.fn()
    try {
      const result = await getCurrentMarketRates()
      
    } catch (e) {
      expect(axios.get).toHaveBeenCalledWith(coinCapUrl)
      expect(e).toEqual("Error getting current market rates")
    }
  })
})