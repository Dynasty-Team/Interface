import ERC20_INTERFACE from 'constants/abis/erc20'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import priceContracts from 'constants/priceContracts'
import { useMulticallContract } from './useContract'

type ApiResponse = {
  updated_at: string
  data: {
    [key: string]: {
      name: string
      symbol: string
      price: string
      price_BNB: string
    }
  }
}

type yPantyPriceApiResponse = {
  /* eslint-disable camelcase */
  updated_at: string
  data: {
    name: string
    symbol: string
    price: string
    price_BNB: string
  }
}

export const useGetPriceData = () => {
  const [data, setData] = useState<number>(0)

  const multicallContract = useMulticallContract();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (multicallContract) {
          const { pantyAddress, busdAddress, bnbAddress, pantyBnbLpAddress, busdBnbLpAddress } = priceContracts;
          const calls = [
            [pantyAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [pantyBnbLpAddress])],
            [bnbAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [pantyBnbLpAddress])],
            [busdAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [busdBnbLpAddress])],
            [bnbAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [busdBnbLpAddress])],
          ];

          const [resultsBlockNumber, result] = await multicallContract.aggregate(calls);
          const [pantyAmount, bnbAmount1, busdAmount, bnbAmount2] = result.map(r => ERC20_INTERFACE.decodeFunctionResult("balanceOf", r));

          const panty = new BigNumber(pantyAmount);
          const bnb1 = new BigNumber(bnbAmount1);
          const busd = new BigNumber(busdAmount);
          const bnb2 = new BigNumber(bnbAmount2);
          const pantyPrice = bnb1.div(panty).multipliedBy(busd.div(bnb2)).toNumber();

          setData(pantyPrice)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [multicallContract])

  return data
}

export const useGetyPantyPrice = () => {
  const [data, setData] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = 'dynasty-coin';
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const parsedData = await response.json();
        console.log(parsedData); // Log the API response

        const price = parseFloat(parsedData[token]?.usd || '0');
        if (!Number.isNaN(price)) {
          setData(price);
        } else {
          console.error('Price data is not a valid number:', parsedData[token]?.usd);
        }
      } catch (error) {
        console.error('Error fetching CoinGecko price data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
};


export default useGetPriceData
