export const shortenAddress = (address: string) => {
  return address.slice(0, 4) + '...' + address.slice(-4);
};


export const formatFinancialValue = (value: string | number, type: string) => {
  if (type === 'duration') return { display: value, color: 'text-gray-300' };

  const numericValue =
    typeof value === 'string'
      ? parseFloat(value.replace(/[^0-9.-]/g, ''))
      : Number(value);

  if (type === 'balance')
    return {
      display: `$${Math.abs(numericValue).toFixed(2)}`,
      color: 'text-green-400'
    };

  if (numericValue > 0) {
    return {
      display: `+$${Math.abs(numericValue).toFixed(2)}`,
      color: 'text-green-400'
    };
  }
  if (numericValue < 0) {
    return {
      display: `-$${Math.abs(numericValue).toFixed(2)}`,
      color: 'text-red-400'
    };
  }
  return {
    display: `$${numericValue.toFixed(2)}`,
    color: 'text-gray-300'
  };
};

export function compactNumber(number: string | number, digits: number = 2) {
  let num = 0;
  if (typeof number === 'string') {
    const value = Number(number);
    if (isNaN(value)) {
      return number;
    }
    num = value;
  } else {
    num = number;
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast(item => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, '').concat(item.symbol)
    : '0';
}

export function formatQuantity(balance: string | number) {
  let num = 0;
  if (typeof balance === 'string') {
    const value = Number(balance);
    if (isNaN(value)) {
      return '0';
    }
    num = value;
  } else {
    num = balance;
  }

  if (num > 1) {
    return compactNumber(num, 2);  
  } else if (num < 0) {
    return `-${compactNumber(Math.abs(num), 2)}`;
  } else {
    return shitNumber(num);
  }
}
export function shitNumber(
  number: string | number,
  tailValidNumberCount: number = 4,
  limitZeroCount: number = 4
) {
  let num = 0;
  if (typeof number === 'string') {
    const value = Number(number);
    if (isNaN(value)) {
      return '0';
    }
    num = value;
  } else {
    num = number;
  }

  if (num > 1) {
    return num.toFixed(2).replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/, '');
  } else {
    const numStr = num.toString();
    const matchGroups = numStr.match(/(\d)\.(\d+)[e|E]-(\d+)/);
    if (matchGroups && matchGroups.length === 4) {
      //scientist number
      let tail = matchGroups[1] + matchGroups[2];
      if (tail.length > tailValidNumberCount) {
        tail = tail.substring(0, tailValidNumberCount);
      }
      let fixStr = '0.' + '0'.repeat(Number(matchGroups[3]) - 1) + tail;
      if (Number(matchGroups[3]) - 1 > limitZeroCount) {
        fixStr = '0.0' + `{${Number(matchGroups[3]) - 1}}` + tail;
      }
      return fixStr.replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/, '');
    } else {
      const matchGroups = numStr.match(/0\.(0+)([1-9]+)/);
      if (matchGroups && matchGroups.length === 3) {
        const zeroCount = matchGroups[1].length;
        let tail = matchGroups[2];
        if (tail.length > tailValidNumberCount) {
          tail = tail.substring(0, tailValidNumberCount);
        }
        let fixStr = '0.' + '0'.repeat(zeroCount) + tail;
        if (zeroCount > limitZeroCount) {
          fixStr = '0.0' + `{${zeroCount}}` + tail;
        }
        return fixStr.replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/, '');
      } else {
        return num
          .toFixed(tailValidNumberCount)
          .replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/, '');
      }
    }
  }
}