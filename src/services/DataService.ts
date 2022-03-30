import axios from 'axios';
import API_URL from '../util/constants';
import { CoinData, CoinApiData } from '../dto/CoinData';

class DataService {
  static async getDataPerPage(curr: string, len: number, num: number): Promise<Array<CoinData>> {
    const result = await axios.get(
      `${API_URL}/coins/markets?vs_currency=${curr.toLowerCase()}&order=market_cap_desc&per_page=${len}&page=${num}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
    );

    // const coinData = [...Array(len)].map((_, i) => {
    //   const data = result.data[i];
    //   return {
    //     rank: data.market_cap_rank,
    //     icon: data.image,
    //     name: data.name,
    //     symbol: data.symbol.toUpperCase(),
    //     price: data.current_price,
    //     priceChange1h: data.price_change_percentage_1h_in_currency,
    //     priceChange24h: data.price_change_percentage_24h_in_currency,
    //     priceChange7d: data.price_change_percentage_7d_in_currency,
    //     volume24h: data.total_volume,
    //     mktCap: data.market_cap,
    //   };
    // });

    const coinData = result.data.map((coinApiData: CoinApiData) => {
      return {
        id: coinApiData.id,
        rank: coinApiData.market_cap_rank,
        icon: coinApiData.image,
        name: coinApiData.name,
        symbol: coinApiData.symbol.toUpperCase(),
        price: coinApiData.current_price?.toFixed(2),
        priceChange1h: coinApiData.price_change_percentage_1h_in_currency?.toFixed(1),
        priceChange24h: coinApiData.price_change_percentage_24h_in_currency?.toFixed(1),
        priceChange7d: coinApiData.price_change_percentage_7d_in_currency?.toFixed(1),
        volume24h: coinApiData.total_volume,
        mktCap: coinApiData.market_cap,
      };
    });

    return coinData;
  }
}

export default DataService;
