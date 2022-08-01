### Mustang Test

## Description

This is an api that consumes from NPP Web Api to get the best price to buy and sell gold for the last 5 years.

## Docker

To run with docker exec the next command

`docker run a30786a2abac'

## API Requqests

Get '/'
It gives you all the information of the best price to had buyed and selled gold for the last year

Get '/buy'
It send you and object with the best buying date and price {date, price}

Get '/sell'
It send you and object with the best selling date and price {date, price}