import CryptoJS from "crypto-js";

export function validateEmail(email: string) {
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(email)) {
    return false;
  } else {
    return true;
  }
}

export const validatePasswordLowercase = (password: string) => {
  if (password.match(/[a-z]+/g)) {
    return true;
  } else {
    return false;
  }
};

export const validatePasswordUpperCase = (password: string) => {
  if (password.match(/[A-Z]+/g)) {
    return true;
  } else {
    return false;
  }
};

export const validatePasswordSpecialCharacter = (password: string) => {
  if (password.match(/[!@#$.%^&*_=+-]/g)) {
    return true;
  } else {
    return false;
  }
};

export const validatePasswordNumber = (password: string) => {
  if (password.match(/[0-9]+/g)) {
    return true;
  } else {
    return false;
  }
};

export const capitalizeFirstWord = (sentence: string) => {
  const words = sentence.split(" ");

  if (words.length > 0) {
    const capitalizedFirstWord =
      words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();

    const capitalizedSentence =
      capitalizedFirstWord + " " + words.slice(1).join(" ");

    return capitalizedSentence;
  } else {
    return sentence;
  }
};

export function HandlepaginationHelper(c: any, m: any) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    // eslint-disable-next-line eqeqeq, no-mixed-operators
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  // console.log(rangeWithDots);
  return rangeWithDots;
}

export function numberFormatChart({ num, digits }: any) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "Q" },
    { value: 1e18, symbol: "QT" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}


export const decryptTokenFunc = (tok: any) => {
  if (tok) {
    const encryptedToken = tok;
    const secretKey =
      "ygb0728hnw7eyhidh7t762y2bdxr6abxjbaxr6wuetyehjwu73ehuyst7gduu";

    // Encrypt the token
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(tok);
    // console.log(decryptedToken);
    return decryptedToken;
  }
};

export const encryptTokenFunc = (tok: any) => {
  const token = tok;
  const secretKey =
    "ygb0728hnw7eyhidh7t762y2bdxr6abxjbaxr6wuetyehjwu73ehuyst7gduu";

  // Encrypt the token
  const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
  return encryptedToken;
};
export function GetInitials(text: string) {
  const fullName = text;
  const splitName = fullName.split(" ");
  const initials = splitName.map((name) => name.charAt(0));
  const initialToString = initials.join("");
  return initialToString;
}

export const customErrorId = "jgsvbjbx";
export const customSuccessId = "jgsvbjiuysbx";
export const customInfoId = "jgsvdfbnbjbx";
