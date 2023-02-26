const BigNumber = require('bignumber.js')
BigNumber.config({ ROUNDING_MODE: 1 })
const { parseMarketRates, parseSale, isValidMarketRate, isValidSale, validSymbols, isPositiveNumber } = require("../build/utils/parseLines.js")

const mockMarketRates = {
  BTC: BigNumber('3825.281112'), 
  ETH: BigNumber('138.8911'),
  DOGE: BigNumber('0.00198422341298374987')
}

describe("Test parsing functions", () => {
  test("Parse market rates correctly", () => {
    const testArr = ['6491541561072.818099748528072316', '92739338.602961360930566195', '178787347219043.160674656449440139']
    const result = parseMarketRates(testArr)
    expect(result.BTC).toStrictEqual(BigNumber(testArr[0]))
    expect(result.ETH).toStrictEqual(BigNumber(testArr[1]))
    expect(result.DOGE).toStrictEqual(BigNumber(testArr[2]))
  })

  console.log = jest.fn()
  test.each([
    [['1.5', '3', 'ETH', '3.5'],'5.250'],
    [['1.5', '3', 'BTC', '3.5'],'144.593'],
    [['1.5', '3', 'DOGE', '3.5'],'0.000'],
    [['1.5', '3', 'DOGE', '350000'], '7.500'],
    [['1.5', '1', 'ETH', '3.5'],'5.2'],
    [['6540825.876543210987654325', '18', 'ETH', '992465.123456789012345678'],'6491541561072.818099748528072316'],
    [['6540825.876543210987654325', '18', 'DOGE', '992465.123456789012345678'],'92739338.602961360930566195'],
    [['6540825.876543210987654325', '18', 'BTC', '992465.123456789012345678'],'178787347219043.160674656449440139'],
  ])(
    "parseSale passes for line %j with result %j",
    (fixture, result) => {
      parseSale(fixture, mockMarketRates)
      expect(console.log).toHaveBeenCalledWith(result)
    }
  )


  test.each([
    [['158437.8761527','238016.081','560306.357973258'], true],
    [['534066.872374440759','334961.196356','223287.2723822734769'],true],
    [['594396.1214391522525','307991.725','443689.1637686190544635'], true],
    [['-180787.11040145586506964183','-2282.40031058165222170245','-429710.490',], false],
    [['56666.189','-20140.9520075','6626.15491305',], false],
    [['54990.84250158','443244.52586705','string'], false],
    [['string','string','string'], false],
    [['','',''], false],
    [['','149896.77970262','911242.7971'], false],
    [[], false],
    [['158437.8761527','238016.081','560306.357973258','307991.725'], false],
    [['158437.8761527','238016.081'], false]
  ])(
    "isValidMarketRate passes for line %j with result %j",
    (fixture, result) => {
      expect(isValidMarketRate(fixture, mockMarketRates)).toBe(result)
    }
  )
  
  test.each([
    [['158437.8761527','238016.081', 'ETH', '560306.357973258'], true],
    [['534066.872374440759','334961.196356', 'BTC', '223287.2723822734769'], true],
    [['180787.11040145586506964183','2282.40031058165222170245','DOGE','429710.490'], true],
    [['180787.11040145586506964183','2282.40031058165222170245','DOG','429710.490'], false],
    [['180787.11040145586506964183','2282.40031058165222170245','DOG','429710.490','1'], false],
    [['594396.1214391522525','307991.725'], false],
    [['180787.11040145586506964183','DOG','429710.490'], false],
    [['-180787.11040145586506964183','-2282.40031058165222170245','DOGE','-429710.490',], false],
    [['180787.11040145586506964183','2282.40031058165222170245','BTC','-429710.490'], false]
  ])(
    "isValidSale passes for line %j with result %j",
    (fixture, result) => {
      expect(isValidSale(fixture,2)).toBe(result)
    }
  )
})