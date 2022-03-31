/* eslint-disable no-useless-escape */
import axios from 'axios';
import { API_URL, GRAPH_URL } from '../util/constants';
import { CoinData, CoinApiData } from '../dto/CoinData';

class DataService {
  // fetch data using given api and fill in provided parameters
  static async getDataPerPage(curr: string, len: number, num: number): Promise<Array<CoinData>> {
    const result = await axios.get(
      `${API_URL}/coins/markets?vs_currency=${curr.toLowerCase()}&order=market_cap_desc&per_page=${len}&page=${num}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
    );

    const coinData = result.data.map((coinApiData: CoinApiData) => {
      return {
        id: coinApiData.id,
        rank: coinApiData.market_cap_rank,
        icon: coinApiData.image,
        name: coinApiData.name,
        symbol: coinApiData.symbol,
        price: coinApiData.current_price,
        priceChange1h: coinApiData.price_change_percentage_1h_in_currency,
        priceChange24h: coinApiData.price_change_percentage_24h_in_currency,
        priceChange7d: coinApiData.price_change_percentage_7d_in_currency,
        volume24h: coinApiData.total_volume,
        mktCap: coinApiData.market_cap,

        // https://www.coingecko.com/coins/{image_number}/sparkline
        sparkline: `${GRAPH_URL}/${coinApiData.image.split('/')[5]}/sparkline`,
      };
    });

    return coinData;
  }

  // fetch list of all coins and calculate total nubmer of pages based on page size of 100
  static async getTotalPage(): Promise<number> {
    const result = await axios.get(
      `${API_URL}/coins/list`,
    );

    return Math.ceil(result.data.length / 100);
  }
}

export default DataService;
