export function formatMoney(num, symbol = "$", places = 2) {
    let str = num.toFixed(places);
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return symbol + str;
  }