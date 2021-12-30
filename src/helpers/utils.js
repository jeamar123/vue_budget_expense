export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const isObject = (obj) => {
  return obj != null && obj.constructor.name === "Object";
};

export const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const checkForm = (formObj) => {
  let obj = {...formObj};
  Object.keys(obj).forEach((key) => {
    if((obj[key] == '' || obj[key] == undefined || obj[key] == null) && obj[key] !== false ){ 
      obj[key] = true; obj['errors'] = true; 
    }else{
      obj[key] = false;
    }
  });

  return obj;
};

export const getStatusColor = (status)  =>  {
  let statusColor
  switch (status) {
    case 'all':    statusColor = 'c-all';    break
    case 'incomplete':    statusColor = 'c-incomplete';    break
    case 'pending':    statusColor = 'c-pending';    break
    case 'active':    statusColor = 'c-active';    break
    case 'reject':    statusColor = 'c-rejected';    break
    case 'freeze':    statusColor = 'c-freeze';    break
    case 'banned':    statusColor = 'c-banned';    break
    case 'closed':    statusColor = 'c-closed';    break
    default:
      // 
      break
  }
  return statusColor
};

export const objToURLParams = (obj) =>  {
  return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')
}

export const currencyFilter = (amount, decimal = null) =>  {
  let isDecimalEmpty = decimal == null ? true : false;     
  let hasDecimalValue = checkDecimalValue(amount);
  let decimalDigits = isDecimalEmpty ? (hasDecimalValue ? 2 : 0) : decimal;
  return '₱ '+Intl.NumberFormat('fil-PH', {
    currency: 'PHP', 
    maximumFractionDigits: decimalDigits, 
    minimumFractionDigits: decimalDigits
  }).format(amount)
}

export const chunkArray = (array, length) =>  {
  var totalChunks = [];
  var chunkLength = parseInt(length, 10);

  if (chunkLength <= 0) {
    return array;
  }
  // Loop through the data and divide it into chunks
  for (var i = 0; i < array.length; i += chunkLength) {
      totalChunks.push(array.slice(i, i + chunkLength));
  }
  // Return the chunks of data
  return totalChunks;
}

export const parseIfJson = (item) =>  {
  let json = item;
  try {
    json = JSON.parse(item);
  } catch (e) {
    json = item;
  }
  return json;
}

export const isNumber = (evt) => {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (
    (charCode > 31 && (charCode < 48 || charCode > 57)) && 
    !evt.metaKey
  ) {
    evt.preventDefault();
  } else {
    return true;
  }
}

export const checkDecimalValue  = (value) =>  {
  var result = (value - Math.floor(value)) !== 0; 
   
  if (result)
    return true;
  else
    return false;
}

export const randomNumber  = () =>  {
  return Math.floor(Math.random() * 100);
}

/*
* For ShowHide Toggle Event Listeners
*/
export const checkOutsideClick = (evt, className) =>	{
  let arr = document.querySelectorAll(className);
  let isExist = false;
  arr.forEach(el => {
    if(el !== evt.target && el.contains(evt.target)) isExist = true;
  })
  return isExist;
};


export const setValueInsideArrObj = (arr, key, value) =>	{
  let list = [...arr];
  list.forEach(item => {
    item[key] = value;
  });

  return list
};

export const capitalize = (string) =>	{
  return string.charAt(0).toUpperCase() + string.slice(1)
};