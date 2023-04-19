export const engUnits = {
  bag: ['bag', 'bags'],
  box: ['box'],
  can: ['can'],
  cup: ['cup', 'c', 'c.', 'C', 'Cups'],
  clove: ['clove'],
  gallon: ['gallon', 'gal'],
  ounce: ['ounce', 'oz', 'oz.'],
  pint: ['pint', 'pt', 'pts', 'pt.'],
  pound: ['pound', 'lb', 'lb.', 'lbs', 'lbs.', 'Lb', 'Lbs'],
  quart: ['quart', 'qt', 'qt.', 'qts', 'qts.'],
  tablespoon: ['tbs', 'tbsp', 'tbspn', 'T', 'T.', 'Tablespoons', 'Tablespoon'],
  teaspoon: ['teaspoon', 'tsp', 'tspn', 't', 't.'],
  gram: ['gram', 'g', 'g.'],
  kilogram: ['kilogram', 'kg', 'kg.', 'Kg', 'Kg.'],
  liter: ['liter', 'l', 'l.', 'lt', 'Lt', 'LT', 'L', 'L.'],
  milligram: ['milligram', 'mg', 'mg.'],
  milliliter: ['milliliter', 'ml', 'ml.', 'mL', 'mL.'],
  package: ['package', 'pkg', 'pkgs'],
  stick: ['stick', 'sticks'],
  piece: ['piece', 'pcs', 'pcs.'],
  pinch: ['pinch'],
  small: ['Small'],
  slice: ['slice'],
  medium: ['Medium'],
  large: ['large', 'Large'],
} as { [key: string]: string[] };

export const engPluralUnits = {
  cup: 'cups',
  gallon: 'gallons',
  ounce: 'ounces',
  pint: 'pints',
  pound: 'pounds',
  quart: 'quarts',
  tablespoon: 'tablespoons',
  teaspoon: 'teaspoons',
  gram: 'grams',
  kilogram: 'kilograms',
  liter: 'liters',
  milligram: 'milligrams',
  milliliter: 'milliliters',
  clove: 'cloves',
  bag: 'bags',
  box: 'boxes',
  pinch: 'pinches',
  can: 'cans',
  slice: 'slices',
  piece: 'pieces'
} as { [key: string]: string };

export const engNameToSymbol = {
  cup: 'c',
  gallon: 'gal',
  ounce: 'oz',
  pint: 'pt',
  pound: 'lb',
  quart: 'qt',
  tablespoon: 'tbs',
  teaspoon: 'tsp',
  gram: 'g',
  kilogram: 'kg',
  liter: 'lt',
  milligram: 'mg',
  milliliter: 'ml',
  clove: '',
  bag: '',
  box: '',
  pinch: '',
  can: '',
  slice: '',
  piece: ''
} as { [key: string]: string };

export const engPluralEndingsRegex = "(\\(s\\))?";

export const engPreposition = ['of'];


export const itaUnits = {
  barattolo: ['barattolo', 'barattoli'],
  bicchiere: ['bicchiere'],
  bottiglia: ['bottiglie', 'bottiglia'],
  bustina: ['bustina', 'bustine'],
  cubetto: ['cubetto', 'cubetti'],
  cucchiaio: ['cucchiai', 'cucchiaio'],
  cucchiaino: ['cucchiaini', 'cucchiaino'],
  confezione: ['confezioni', 'confezione'],
  grammo: ['g', 'g\\.', 'gr\\.', 'gr', 'grammi', 'grammo'],
  chilogrammo: ['kg.', 'kg', 'kilogrammo', 'chilogrammi', 'kilogrammo', 'chilogrammo'],
  fetta: ['fetta', 'fette'],
  fettina: ['fettina', 'fettine'],
  fogliolina: ['fogliolina', 'foglioline'],
  foglia: ['foglie', 'foglia'],
  foglio: ['fogli', 'foglio'],
  gambo: ['gambo', 'gambi'],
  litro: ['l\\.', 'l', 'lt', 'litro'],
  mazzo: ['mazzo', 'mazzi'],
  mazzetto: ['Mazzetto', 'mazzetti', 'mazzetto'],
  lattina: ['Lattina', 'lattina'],
  milligrammo: ['mg.', 'mg', 'milligrammo'],
  millilitro: ['ml', 'ml\\.', 'millilitro'],
  panetto: ['Panetto', 'panetti', 'panetto'],
  pacco: ['pkg', 'pkgs', 'pacchetto', 'pacco'],
  pezzo: ['pezzo', 'pcs', 'pcs.', 'pezzi'],
  pizzico: ['pizzico', 'pizzichi'],
  tazza: ['tazza', 'tazzina', 'tazzine'],
  sacco: ['sacco', 'sacchi'],
  spicchio: ['spicchio', 'spicchi'],
  scatola: ['scatola', 'scatole'],
  vasetto: ['vasetto', 'vasetti'],
  filo: ['filo'],
  ciuffo: ['ciuffo'],
  scatoletta: ['scatoletta'],
  manciata: ['manciata'],
  rametto: ['rametto', 'rametti'],
  rotolo: ['rotolo'],
  pugno: ['pugno', 'pugni'],
  bicchierino: ['bicchierino'],

  //noce: ['noce'],
} as { [key: string]: string[] };

export const itaPluralUnits = {
  barattolo: 'barattoli',
  bicchiere: 'bicchieri',
  bustina: 'bustine',
  bottiglia: 'bottiglie',
  cubetto: 'cubetti',
  gambo: 'gambi',
  tazza: 'tazze',
  quarto: 'quarti',
  cucchiaio: 'cucchiai',
  cucchiaino: 'cucchiaini',
  confezione: 'confezioni',
  grammo: 'grammi',
  chilogrammo: 'chilogrammi',
  litro: 'litri',
  milligrammo: 'milligrammi',
  millilitro: 'millilitri',
  spicchio: 'spicchi',
  scatola: 'scatole',
  pizzico: 'pizzichi',
  lattina: 'lattine',
  fetta: 'fette',
  fettina: 'fettine',
  pezzo: 'pezzi',
  panetto: 'panetti',
  foglio: 'fogli',
  fogliolina: 'foglioline',
  foglia: 'foglie',
  mazzo: 'mazzi',
  mazzetto: 'mazzetti',
  vasetto: 'vasetti',
  filo: 'fili',
  ciuffo: 'ciuffi',
  sacco: 'sacchi',
  scatoletta: 'scatolette',
  manciata: 'manciate',
  rametto: 'rametti',
  rotolo: 'rotoli',
  bicchierino: 'bicchierini',
  pugno: 'pugni'
  //noce: 'noci'
} as { [key: string]: string };

export const itaNameToSymbol = {
  bicchiere: '',
  bustina: '',
  cubetto: '',
  gambo: '',
  tazza: '',
  quarto: '',
  cucchiaio: '',
  spicchio: '',
  scatola: '',
  pizzico: '',
  lattina: '',
  fetta: '',
  pezzo: '',
  panetto: '',
  foglia: '',
  mazzetto: '',
  manciata: '',
  vasetto: '',
  grammo: 'g',
  cucchiaino: 'cc',
  chilogrammo: 'kg',
  litro: 'lt',
  milligrammo: 'mg',
  millilitro: 'ml',
} as { [key: string]: string };

export const itaPluralEndingsRegex = "";

export const itaPreposition = ['di', 'd\''];

export const deuUnits = {
  Tüte: ['Beutel', 'Tüte'],
  Box: ['Box', 'Schachtel'],
  Dose: ['Dose', 'Büchse', 'Konserve', 'Konservendose'],
  Tasse: ['Tasse'],
  Gallone: ['Gallone'],
  Unze: ['Unze', 'oz', 'oz.'],
  Pint: ['Pint', 'pt', 'pts', 'pt.'],
  Pfund: ['Pfund', 'lb', 'lb.', 'lbs', 'lbs.', 'Lb', 'Lbs'],
  Quart: ['Quart', 'qt', 'qt.', 'qts', 'qts.'],
  Esslöffel: ['el', 'el.', 'EL', 'EL.', 'esslöffel'],
  Teelöffel: ['TL', 'TL.', 'tl', 'tl.', 'teelöffel'],
  Gramm: ['gramm', 'g', 'g.', 'G'],
  Kilogramm: ['kilogramm', 'kg', 'kg.', 'Kg', 'Kg.', 'KG'],
  Liter: ['liter', 'l', 'l.', 'lt', 'Lt', 'LT', 'L', 'L.'],
  Milligramm: ['milligramm', 'mg', 'mg.'],
  Milliliter: ['milliliter', 'ml', 'ml.', 'mL', 'mL.', 'ML'],
  Packung: ['packung', 'pack', 'pk', 'pck', 'päckchen'],
  Stange: ['stange'],
  Stück: ['stück', 'stk', 'stk.'],
  Prise: ['prise', 'priese'],
  Messerspitze: ['messerspitze'],
  Scheibe: ['scheibe'],
  klein: ['klein', 'kleine', 'kleines'],
  mittel: ['Medium', 'mittelgroße', 'mittlere', 'mittel', 'mittelgroß', 'mittelgroßes', 'mittleres'],
  groß: ['groß', 'großes', 'große'],
} as { [key: string]: string[] };

export const deuPluralUnits = {
  Tasse: 'Tassen',
  Gallone: 'Gallonen',
  Unze: 'Unzen',
  Pint: 'Pints',
  Pfund: 'Pfund',
  Quart: 'quarts',
  Tüte: 'Tüten',
  Box: 'Schachteln',
  Prise: 'Prisen',
  Dose: 'Dosen',
  Stange: 'Stangen',
  Scheibe: 'Scheiben',
  Stück: 'Stücke'
} as { [key: string]: string };

export const deuNameToSymbol = {
  cup: 'c',
  gallon: 'gal',
  ounce: 'oz',
  pint: 'pt',
  pound: 'lb',
  quart: 'qt',
  tablespoon: 'tbs',
  teaspoon: 'tsp',
  gram: 'g',
  kilogram: 'kg',
  liter: 'lt',
  milligram: 'mg',
  milliliter: 'ml',
  clove: '',
  bag: '',
  box: '',
  pinch: '',
  can: '',
  slice: '',
  piece: ''
} as { [key: string]: string };

export const deuPluralEndingsRegex = "(\\(n\\))?";

export const deuPreposition = [''];

export const unitsMap = new Map();
unitsMap.set("eng", [engUnits, engPluralUnits, engPreposition, engNameToSymbol]);
unitsMap.set("ita", [itaUnits, itaPluralUnits, itaPreposition, itaNameToSymbol]);
unitsMap.set("deu", [deuUnits, deuPluralUnits, deuPreposition, deuNameToSymbol]);

export const pluralEndingsMap = new Map();
pluralEndingsMap.set("eng", engPluralEndingsRegex);
pluralEndingsMap.set("ita", itaPluralEndingsRegex);
pluralEndingsMap.set("deu", deuPluralEndingsRegex);