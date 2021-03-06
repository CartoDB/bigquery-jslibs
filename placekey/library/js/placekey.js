/* eslint-disable no-unused-vars */
const RESOLUTION = 10;
const ALPHABET = '23456789bcdfghjkmnpqrstvwxyz';
const ALPHABET_LENGTH = ALPHABET.length;
const CODE_LENGTH = 9;
const TUPLE_LENGTH = 3;
const PADDING_CHAR = 'a';
const PADDING_REGEX = /a/g;
const REPLACEMENT_CHARS = 'eu';

// Two copies of the REPLACEMENT_MAP are here to hold the regular expression objects
// needed. Both should be in the same order as REPLACEMENT_MAP.
const REPLACEMENT_MAP_BACKWARD = {
    prn: /pre/g,
    f4nny: /f4nne/g,
    tw4t: /gtw4e/g,
    ngr: /ngu/g, // 'u' avoids introducing 'gey'
    dck: /dce/g,
    vjn: /vju/g, // 'u' avoids introducing 'jew'
    fck: /fce/g,
    pns: /pne/g,
    sht: /she/g,
    kkk: /kke/g,
    fgt: /fgu/g, // 'u' avoids introducing 'gey'
    dyk: /dye/g,
    bch: /bce/g
};
const REPLACEMENT_MAP_FORWARD = {
    pre: /prn/g,
    f4nne: /f4nny/g,
    gtw4e: /tw4t/g,
    ngu: /ngr/g, // 'u' avoids introducing 'gey'
    dce: /dck/g,
    vju: /vjn/g, // 'u' avoids introducing 'jew'
    fce: /fck/g,
    pne: /pns/g,
    she: /sht/g,
    kke: /kkk/g,
    fgu: /fgt/g, // 'u' avoids introducing 'gey'
    dye: /dyk/g,
    bce: /bch/g
};

const FIRST_TUPLE_REGEX = '['.concat(ALPHABET).concat(REPLACEMENT_CHARS).concat(PADDING_CHAR, ']{3}');
const TUPLE_REGEX = '['.concat(ALPHABET).concat(REPLACEMENT_CHARS, ']{3}');
const WHERE_REGEX = new RegExp('^'.concat([FIRST_TUPLE_REGEX, TUPLE_REGEX, TUPLE_REGEX].join('-'), '$'));
const WHAT_REGEX = new RegExp('^['.concat(ALPHABET, ']{3}(-[').concat(ALPHABET, ']{3})?$'));
function placekeyIsValid(placekey) {
    if (typeof placekey !== 'string') {
        return false;
    }

    let what;
    let where;

    if (placekey.includes('@')) {
        [what, where] = placekey.split('@');
    } else {
        [what, where] = [null, placekey];
    }

    if (what) {
        return Boolean(where.match(WHERE_REGEX) && what.match(WHAT_REGEX));
    }

    return Boolean(where.match(WHERE_REGEX));
}
function placekeyToH3(placekey) {
    return h3IntegerToString(placekeyToH3Integer(placekey));
}
function h3ToPlacekey(h3index) {
    return h3IntegerToPlacekey(stringToH3Integer(h3index));
}
function h3IntegerToPlacekey(h3Integer) {
    const shortH3Integer = shortenH3Integer(h3Integer);
    const encodedShortH3 = encodeShortInt(shortH3Integer);
    let cleanEncodedShortH3 = cleanString(encodedShortH3);

    if (cleanEncodedShortH3.length <= CODE_LENGTH) {
        cleanEncodedShortH3 = cleanEncodedShortH3.padStart(CODE_LENGTH, PADDING_CHAR);
    }

    const cleanChars = cleanEncodedShortH3.split('');
    const tuples = [cleanChars.splice(0, TUPLE_LENGTH).join(''), cleanChars.splice(0, TUPLE_LENGTH).join(''), cleanChars.join('')];
    return '@' + tuples.join('-');
}

function placekeyToH3Integer(placekey) {
    const wherePart = getPlacekeyLocation(placekey);
    const code = stripEncoding(wherePart);
    const dirtyEncoding = dirtyString(code);
    const shortH3Integer = decodeString(dirtyEncoding);
    return unshortenH3Integer(shortH3Integer);
}

function getPlacekeyLocation(placekey) {
    return placekey.includes('@') ? placekey.split('@')[1] : placekey;
}

function stripEncoding(string) {
    return string.replace(/@/g, '').replace(/-/g, '').replace(PADDING_REGEX, '');
}

function cleanString(string) {
    for (const [replacement, regexp] of Object.entries(REPLACEMENT_MAP_FORWARD)) {
        string = string.replace(regexp, replacement);
    }
    return string;
}

function dirtyString(string) {
    for (const [replacement, regexp] of Object.entries(REPLACEMENT_MAP_BACKWARD).reverse()) {
        string = string.replace(regexp, replacement);
    }
    return string;
}

const DECODE_OFFSETS = [[0x1, 0], [0x1c, 0], [0x310, 0], [0x55c0, 0], [0x96100, 0],
    [0x1069c00, 0], [0x1cb91000, 0], [0x243dc000, 0x3], [0xf6c10000, 0x57], [0xfd1c0000, 0x99e]];

function decodeString(string) {
    const value = [0, 0];

    for (let i = 0; i < string.length; ++i) {
        const character = string[string.length - 1 - i];
        const indexOfCharacter = ALPHABET.indexOf(character);
        const offset = DECODE_OFFSETS[i];
        const valueOfCharacter = scaleH3Integer(indexOfCharacter, offset);
        addH3Integers(value, valueOfCharacter, value);
    }

    return value;
}

function encodeShortInt(x) {
    if (x === 0) {
        return ALPHABET[0];
    }

    let int = h3IntegerToJSInteger(x);
    let result = '';

    while (int > 0) {
        const remainder = int % ALPHABET_LENGTH;
        result = ALPHABET[remainder] + result;
        int = Math.floor(int / ALPHABET_LENGTH);
    }

    return result;
}
// # sourceMappingURL=placekey.js.map
/* eslint-enable no-unused-vars */
