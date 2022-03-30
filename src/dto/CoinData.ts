/* eslint-disable camelcase */
export interface CoinData {
    id: string,
    rank?: string, // market_cap_rank
    icon: string, // image.thumb
    name: string, // name
    symbol: string, // symbol
    price?: number, // market_data.current_price.aud
    priceChange1h?: number, // price_change_percentage_1h_in_currency
    priceChange24h?: number, // price_change_percentage_24h_in_currency
    priceChange7d?: number, // price_change_percentage_7d_in_currency
    volume24h?: number, // total_volume
    mktCap?: number, // market_cap.aud

}

export interface CoinApiData {
    id: string,
    market_cap_rank?: string,
    image: string,
    name: string,
    symbol: string,
    current_price?: number,
    price_change_percentage_1h_in_currency?: number, // price_change_percentage_1h_in_currency
    price_change_percentage_24h_in_currency?: number, // price_change_percentage_24h_in_currency
    price_change_percentage_7d_in_currency?: number, // price_change_percentage_7d_in_currency
    total_volume?: number,
    market_cap?: number, // market_cap.aud
}
