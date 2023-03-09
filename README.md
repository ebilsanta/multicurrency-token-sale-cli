# multicurrency-token-sale-cli

## Table of Contents
+ [About](#about)
+ [Setting up](#setup)
+ [Examples](#examples)

## About <a name = "about"></a>
Supposedly there's a token sale that sells token X (SALE token) for the base currency, token Y (ETH).
This is a CLI app to calculate the amount of SALE token a given amount of ETH would fetch. ETHSALE rate is the rate of amount of SALE that 1 ETH can get and is provided as an input with the app.

A token sale may also want to accept another cryptocurrency other than ETH, such as BTC and DOGE. As the price of SALE is fixed at ETH, and BTCUSD price fluctuates according to market, BTCSALE has to be computed based on market rate of BTCUSD and ETHUSD. 

#### Example

1. ETHSALE rate is determined to be 1 ETH to 5000 SALE at start of app.
1. BTCUSD is given as 10000, ETHUSD is 200. It can be worked out that BTCETH is thus 50.
1. A purchase with 5 ETH would yield 25,000 SALE
1. A purchase with 2.4 BTC would yield 600,000 SALE

This app can either fetch live market rates from 
[Coincap](https://coincap.io) or calculate using specified market rates. 

Refer to [Examples](#examples) for more details on how to use it. 

## Setting up <a name = "setup"></a>

Clone the app
```
git clone https://github.com/ebilsanta/cake-token-exercise
```

Change directory
```
cd cake-token-exercise
```

Install dependencies

```
npm install
```

Build the repo

```
npm run build
```

Run with sample input
```bash
npm start < input.txt
```

Run test cases

```
npm run test
```

## Examples <a name="examples"></a>
Input is from standard input and should be in the following format.
```
<BTCUSD rate> <ETHUSD rate> <DOGEUSD rate>
<ETHSALE rate> <SALE decimal places> <Purchase currency> <BTC/ETH/DOGE purchase amount>
<ETHSALE rate> <SALE decimal places> <Purchase currency> <BTC/ETH/DOGE purchase amount>
<ETHSALE rate> <SALE decimal places> <Purchase currency> <BTC/ETH/DOGE purchase amount>
...
```

### Sample input (`input.txt`):
```
3825.281112 138.8911 0.00198422341298374987
1.5 3 ETH 3.5
1.5 3 BTC 3.5
1.5 3 DOGE 3.5
1.5 3 DOGE 350000
1.5 1 ETH 3.5
6540825.876543210987654325 18 ETH 992465.123456789012345678
6540825.876543210987654325 18 DOGE 992465.123456789012345678
6540825.876543210987654325 18 BTC 992465.123456789012345678
```

### Sample output
```bash
$ npm start < input.txt
5.250
144.593
0.000
7.500
5.2
6491541561072.818099748528072316
92739338.602961360930566195
178787347219043.160674656449440139
```

### Sample input with live rates (`input.txt`)
Replace the first line with "CURRENT"
```
CURRENT
1.5 3 ETH 3.5
1.5 3 BTC 3.5
1.5 3 DOGE 3.5
1.5 3 DOGE 350000
1.5 1 ETH 3.5
6540825.876543210987654325 18 ETH 992465.123456789012345678
6540825.876543210987654325 18 DOGE 992465.123456789012345678
6540825.876543210987654325 18 BTC 992465.123456789012345678
```
