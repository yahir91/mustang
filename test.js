const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 3002;

const buyRequest = async () => {
  const buy1 = await axios.get(
    "http://api.nbp.pl/api/cenyzlota/2021-08-01/2022-07-25/"
  );
  const buy2 = await axios.get(
    "http://api.nbp.pl/api/cenyzlota/2020-08-25/2021-08-24/"
  );
  const buy3 = await axios.get(
    "http://api.nbp.pl/api/cenyzlota/2019-08-25/2020-08-24/"
  );
  const buy4 = await axios.get(
    "http://api.nbp.pl/api/cenyzlota/2018-08-25/2019-08-24/"
  );
  const buy5 = await axios.get(
    "http://api.nbp.pl/api/cenyzlota/2017-08-24/2018-08-25/"
  );
  const prices = [
    ...buy1.data,
    ...buy1.data,
    ...buy2.data,
    ...buy3.data,
    ...buy4.data,
    ...buy5.data,
  ];
  let minPrice = 10000000;
  let minIndex = 999999999;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i].cena < minPrice) {
      minPrice = prices[i].cena;
      minIndex = i;
    }
  }
  return { date: prices[minIndex].data, price: minPrice };
};

const exchangeRequest = async () => {
  const ex1 = await axios.get(
    "http://api.nbp.pl/api/exchangerates/rates/a/gbp/2021-08-01/2022-07-25/"
  );
  const ex2 = await axios.get(
    "http://api.nbp.pl/api/exchangerates/rates/a/gbp/2020-08-25/2021-08-24/"
  );
  const ex3 = await axios.get(
    "http://api.nbp.pl/api/exchangerates/rates/a/gbp/2019-08-25/2020-08-24/"
  );
  const ex4 = await axios.get(
    "http://api.nbp.pl/api/exchangerates/rates/a/gbp/2018-08-25/2019-08-24/"
  );
  const ex5 = await axios.get(
    "http://api.nbp.pl/api/exchangerates/rates/a/gbp/2017-08-24/2018-08-25/"
  );

  const prices = [
    ...ex1.data.rates,
    ...ex1.data.rates,
    ...ex2.data.rates,
    ...ex3.data.rates,
    ...ex4.data.rates,
    ...ex5.data.rates,
  ];

  let maxPrice = 0;
  let maxIndex;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i].mid > maxPrice) {
      maxPrice = prices[i].mid;
      maxIndex = i;
    }
  }
  return { date: prices[maxIndex].effectiveDate, price: maxPrice };
};

app.get("/", async (req, res) => {
  const buy = await buyRequest();
  const sell = await exchangeRequest();
  res.send(
    `The best day to buy was in ${buy.date} at a price of ${buy.price}, and the best to sell it was in ${sell.date} at a price of ${sell.price}`
  );
});
app.get("/buy", async (req, res) => {
  const buy = await buyRequest();
  res.send({ buy });
});

app.get("/sell", async (req, res) => {
  const sell = await exchangeRequest();
  res.send(sell);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
