import * as convert from './convert';
import { unitsMap } from './units';
import { repeatingFractions } from './repeatingFractions';
import { toTasteMap } from './numbers';

// import * as Natural from 'natural';

// const nounInflector = new Natural.NounInflector();

export interface Ingredient {
  ingredient: string;
  quantity: string | null;
  unit: string | null;
  minQty: string | null;
  maxQty: string | null;
}

export function toTasteRecognize(input: string, language: string) {
  const toTaste = toTasteMap[language];
  const firstLetter = toTaste.match(/\b(\w)/g);
  // componing first two word
  // const word = firstWord.concat(' ').concat(secondWord)

  if (firstLetter) {
    // checking the extended version
    let regEx = new RegExp('\\b' + toTaste + '\\b', 'gi');
    if (input.match(regEx)) {
      return [(firstLetter.join('.') + '.').toLocaleLowerCase(), convert.getFirstMatch(input, regEx), true] as [string, string, boolean];
    }
    const regExString = firstLetter.join('[.]?') + '[.]?';
    regEx = new RegExp('\\b' + regExString + '\\b', 'gi');
    // const a = input.toString().split(/[\s-]+/);
    if (input.match(regEx)) {
      return [(firstLetter.join('.') + '.').toLocaleLowerCase(), convert.getFirstMatch(input, regEx), false] as [string, string, boolean];
    }
  }
  return ['', '', false] as [string, string, boolean];
}

function getUnit(input: string, language: string): [string, string, string, number, number] {
  // const word = input.concat(' ').concat(secondWord)
  const unit = unitsMap.get(language);
  const units = unit[0];
  const pluralUnits = unit[1];
  const symbolUnits = unit[3];
  let response: [string, string, string, number, number] = ["", "", "", 0, 0] ;
  const [toTaste, match, extFlag] = toTasteRecognize(input, language);
  if (toTaste) {
    if (extFlag) {
      response = [toTaste, toTaste, match, 0, 0];
    } else {
      response = [toTaste, toTaste, match, 0, 0];
    }
  } else {
    if (units[input] || pluralUnits[input]) {

      response = [input, pluralUnits[input], input, 0, 0];
    }
    let suffixRegex: string = '';
    if (language === 'deu') {
      suffixRegex = '(\\(n\\))?';
    } else if (language === 'eng') {
      suffixRegex = '(\\(s\\))?';
    }
    for (const quantityUnit of Object.keys(units)) {
      for (const shorthand of units[quantityUnit]) {
        const regex = new RegExp('\\b' + shorthand + '\\b' + suffixRegex, 'gi');
        const regexMatch = regex.exec(input);
        if (regexMatch !== null) {
          response = [quantityUnit, pluralUnits[quantityUnit], shorthand, regexMatch.index, regexMatch.index + regexMatch[0].length];
        }
      }
    }
    for (const pluralUnit of Object.keys(pluralUnits)) {
      const regex = new RegExp('\\b' + pluralUnits[pluralUnit] + '\\b'  + suffixRegex, 'gi');
      const regexMatch = regex.exec(input);
      if (regexMatch !== null) {
        response = [pluralUnit, pluralUnits[pluralUnit], pluralUnits[pluralUnit], regexMatch.index, regexMatch.index + regexMatch[0].length];
      }
    }
  }
  const symbol = symbolUnits[response[0]];
  response.splice(2, 0, symbol);

  return response;
}

/* return the proposition if it's used before of the name of
the ingredient */
function getPreposition(input: string, language: string) {
  const prepositionMap = unitsMap.get(language);
  const prepositions = prepositionMap[2];
  for (const preposition of prepositions) {
    const regex = new RegExp('^' + preposition);
    if (convert.getFirstMatch(input, regex)) {
      return preposition;
    }
  }
  return null;
}

export function parse(
  ingredientLine: string,
  language: string
) {
  let remainingIndexStart = 0;
  let remainingIndexEnd = ingredientLine.length - 1;

  [remainingIndexStart, remainingIndexEnd] = skipWhitespaces(ingredientLine, remainingIndexStart, remainingIndexEnd);

  /* restOfIngredient represents rest of ingredient line.
  For example: "1 pinch salt" --> quantity: 1, restOfIngredient: pinch salt */
  let [quantity, quantityStart, quantityEnd]
    = convert.findQuantityAndConvertIfUnicode(ingredientLine, language);

  if (quantity == null) quantity = "";
  quantity = convert.convertFromFraction(quantity);

  if (remainingIndexStart == quantityStart) {
    remainingIndexStart = quantityEnd;
  } else {
    remainingIndexEnd = quantityStart;
  }

  [remainingIndexStart, remainingIndexEnd] = skipWhitespaces(ingredientLine, remainingIndexStart, remainingIndexEnd);

  /* extraInfo will be any info in parentheses. We'll place it at the end of the ingredient.
  For example: "sugar (or other sweetener)" --> extraInfo: "(or other sweetener)" */
  const regexMatchExtraInfo = / \(([^\)]+)\)/.exec(getSubstring(ingredientLine, remainingIndexStart, remainingIndexEnd));
  const extraInfoStart = regexMatchExtraInfo != null
    ? remainingIndexStart + regexMatchExtraInfo.index
    : 0;
  const extraInfoEnd = regexMatchExtraInfo != null
    ? remainingIndexStart + regexMatchExtraInfo.index + regexMatchExtraInfo[0].length
    : 0;
  if (remainingIndexStart == extraInfoStart) {
    remainingIndexStart = extraInfoEnd;
  } else {
    remainingIndexEnd = extraInfoStart;
  }
  if (regexMatchExtraInfo != null) {
    //restOfIngredient = restOfIngredient.replace(extraInfo, '').trim();
  }

  [remainingIndexStart, remainingIndexEnd] = skipWhitespaces(ingredientLine, remainingIndexStart, remainingIndexEnd);

  // grab unit and turn it into non-plural version, for ex: "Tablespoons" OR "Tsbp." --> "tablespoon"
  const unitResult = getUnit(getSubstring(ingredientLine, remainingIndexStart, remainingIndexEnd), language);
  let unit = unitResult[0];
  let unitPlural = unitResult[1];
  const symbol = unitResult[2];
  let unitStart: number = 0;
  let unitEnd: number = 0;

  if (unitResult[4] != 0) {
    unitStart = remainingIndexStart + unitResult[3];
    unitEnd = remainingIndexStart + unitResult[4];
  }

  if (remainingIndexStart == unitStart) {
    remainingIndexStart = unitEnd;
  } else {
    remainingIndexEnd = unitStart;
  }

  // remove unit from the ingredient if one was found and trim leading and trailing whitespace
  //const regex_originalunit = RegExp('\\b' + getSubstring(ingredientLine, unitStart, unitEnd) + '\\b', 'gi');
  //const regex_unit = RegExp('\\b' + unit + '\\b', 'gi');

  let ingredient = getSubstring(ingredientLine, unitStart, unitEnd);
  //let ingredient = !!getSubstring(ingredientLine, unitStart, unitEnd)
  //  ? restOfIngredient.replace(regex_originalunit, '').trim()
  //  : restOfIngredient.replace(regex_unit, '').trim();
  ingredient = ingredient.split('.').join('').trim();
  const preposition = getPreposition(ingredient.split(' ')[0], language);

  if (preposition) {
    const regex = new RegExp('^' + preposition);
    ingredient = ingredient.replace(regex, '').trim();
  }

  let minQty = quantity; // default to quantity
  let maxQty = quantity; // default to quantity

  // if quantity is non-nil and is a range, for ex: "1-2", we want to get minQty and maxQty
  if (quantity && quantity.includes('-')) {
    [minQty, maxQty] = quantity.split('-');
  }
  if ((!quantity || quantity === '0') && !unit) {
    unit = 'q.b.';
    unitPlural = 'q.b.';
  }
  return {
    text: ingredientLine,
    quantity: {
      parsed: +quantity,
      start: quantityStart,
      end: quantityEnd
    },
    unit: {
      parsed: !!unit ? unit : null,
      start: unitStart,
      end: unitEnd,
      plural: !!unitPlural ? unitPlural : null,
      symbol: !!symbol ? symbol : null
    },
    ingredient: ingredient.replace(/( )*.( )*/g, ''),
    extraInfo: regexMatchExtraInfo != null ? {
      parsed: regexMatchExtraInfo[0],
      start: extraInfoStart,
      end: extraInfoEnd
    } : null,
    minQty: +minQty,
    maxQty: +maxQty,
  };
}

export function multiLineParse(recipeString: string, language: string) {
  let ingredients = recipeString.split(/,|👉🏻|👉|\r|\n|-|;/g);
  ingredients = ingredients.filter((line) => {
    // Verifica se la riga contiene una qualsiasi delle varianti della parola "ingredienti"
    if (/ingredient[ei]/i.test(line)) {
      return false;
    }
    // Verifica se la riga contiene solo numeri
    if (/^\d+$/.test(line)) {
      return false;
    }
    // Verifica se la riga contiene solo spazi bianchi o è vuota
    if (/^\s*$/.test(line)) {
      return false;
    }
    return true;
  });
  const result = [];
  let i;
  for (const ingredient of ingredients) {
    i = parse(ingredient, language);
    if (i.ingredient) {
      result.push(i);
    }
  }
  return result;
}

export function skipWhitespaces(input: string, startIndex: number, endIndex: number) {
  while (startIndex < input.length && input.charAt(startIndex) === " ") {
    startIndex++;
  }
  while (endIndex >= 0 && endIndex > startIndex && input.charAt(endIndex) === " ") {
    endIndex--;
  }
  return [startIndex, endIndex];
}

export function getSubstring(input: string, startIndex: number, endIndex: number) {
  return input.substring(startIndex, endIndex);
}

export function combine(ingredientArray: Ingredient[]) {
  const combinedIngredients = ingredientArray.reduce((acc, ingredient) => {
    const key = ingredient.ingredient + ingredient.unit; // when combining different units, remove this from the key and just use the name
    const existingIngredient = acc[key];

    if (existingIngredient) {
      return Object.assign(acc, { [key]: combineTwoIngredients(existingIngredient, ingredient) });
    } else {
      return Object.assign(acc, { [key]: ingredient });
    }
  }, {} as { [key: string]: Ingredient });

  return Object.keys(combinedIngredients).reduce((acc, key) => {
    const ingredient = combinedIngredients[key];
    return acc.concat(ingredient);
  }, [] as Ingredient[]).sort(compareIngredients);
}

export function prettyPrintingPress(ingredient: Ingredient) {
  let quantity = '';
  const unit = ingredient.unit;
  if (ingredient.quantity) {
    const [whole, remainder] = ingredient.quantity.split('.');
    if (+whole !== 0 && typeof whole !== 'undefined') {
      quantity = whole;
    }
    if (+remainder !== 0 && typeof remainder !== 'undefined') {
      let fractional;
      if (repeatingFractions[remainder]) {
        fractional = repeatingFractions[remainder];
      } else {
        const fraction = '0.' + remainder;
        const len = fraction.length - 2;
        let denominator = Math.pow(10, len);
        let numerator = +fraction * denominator;

        const divisor = gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;
        fractional = Math.floor(numerator) + '/' + Math.floor(denominator);
      }

      quantity += quantity ? ' ' + fractional : fractional;
    }
    /* if (((+whole !== 0 && typeof remainder !== 'undefined') || +whole > 1) && unit) {
       unit = nounInflector.pluralize(unit);
     }*/
  } else {
    return ingredient.ingredient;
  }

  return `${quantity}${unit ? ' ' + unit : ''} ${ingredient.ingredient}`;
}

function gcd(a: number, b: number): number {
  if (b < 0.0000001) {
    return a;
  }

  return gcd(b, Math.floor(a % b));
}

// TODO: Maybe change this to existingIngredients: Ingredient | Ingredient[]
function combineTwoIngredients(existingIngredients: Ingredient, ingredient: Ingredient): Ingredient {
  const quantity = existingIngredients.quantity && ingredient.quantity ? (Number(existingIngredients.quantity) + Number(ingredient.quantity)).toString() : null;
  const minQty = existingIngredients.minQty && ingredient.minQty ? (Number(existingIngredients.minQty) + Number(ingredient.minQty)).toString() : null;
  const maxQty = existingIngredients.maxQty && ingredient.maxQty ? (Number(existingIngredients.maxQty) + Number(ingredient.maxQty)).toString() : null;
  return Object.assign({}, existingIngredients, { quantity, minQty, maxQty });
}

function compareIngredients(a: Ingredient, b: Ingredient) {
  if (a.ingredient === b.ingredient) {
    return 0;
  }
  return a.ingredient < b.ingredient ? -1 : 1;
}
