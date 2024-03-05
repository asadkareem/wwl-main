export const calculateAverageRating = (ratings) => {
    const avgRating = (ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length).toFixed(1);
    return avgRating;
}

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export function decimalToFraction(decimal) {
    if (decimal) {
        if (decimal % 1 === 0) return decimal;
        let numerator = 1;
        let denominator = 1;
        let error = Math.abs(decimal - numerator / denominator);
        for (let d = 2; d <= 100; d++) {
            let n = Math.round(decimal * d);
            if (Math.abs(decimal - n / d) < error) {
                numerator = n;
                denominator = d;
                error = Math.abs(decimal - numerator / denominator);
            }
        }
        if (numerator.length > 1 && String(denominator).length > 1) {
            if (decimal > 0) {
                function gcd(a, b) {
                    if (b === 0) {
                        return a;
                    }
                    return gcd(b, a % b);
                }

                const commonDivisor = gcd(numerator, denominator);
                const simplifiedNumerator = numerator / commonDivisor;
                const simplifiedDenominator = denominator / commonDivisor;
                return simplifiedNumerator + "/" + simplifiedDenominator;
            }
        } else {
            const result =
                numerator < denominator
                    ? ""
                    : Math.floor(numerator / denominator).toString();
            const remainder = Math.floor(numerator % denominator);
            return result + "  " + remainder + "/" + denominator;
        }
    }
}

// Import the 'decimalToFraction' function if not already available
// import { decimalToFraction } from './utils';
export function splitDecimal(number) {
    if (typeof number !== 'number') {
        throw new Error('Input should be a number');
    }

    const beforeDecimal = Math.floor(number);
    const afterDecimal = number - beforeDecimal;

    return [beforeDecimal, afterDecimal];
}

export function roundToFraction(value) {
    if (value <= 0 || value >= 1) {
        throw new Error("Value should be between 0 and 1");
    }

    // List of denominators
    const denominators = [2, 3, 4, 8];

    // Helper function to calculate the Greatest Common Divisor
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }

    // Helper function to reduce fraction
    function reduceFraction(numerator, denominator) {
        const divisor = gcd(numerator, denominator);
        return [numerator / divisor, denominator / divisor];
    }

    let closestFraction = [0, 1];
    let closestDistance = Math.abs(value - closestFraction[0] / closestFraction[1]);

    for (let denominator of denominators) {
        const numerator = Math.round(value * denominator);
        const distance = Math.abs(value - numerator / denominator);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestFraction = [numerator, denominator];
        }
    }

    // Reduce the fraction to its simplest form
    return reduceFraction(...closestFraction);
}

function roundToNearestHalf(value) {
    return Math.ceil(value * 2) / 2;
}

export function getText(
    dairyFree,
    glutenFree,
    dataToRender,
    counterData,
    servings,
    unit_preference
) {
    const {id, title, qty, measurement, amount_in_base_units, metric_shopping_unit} =
    dataToRender || {};
    if (unit_preference?.toLowerCase() === 'metric') {
        const quantityTobeUsed = splitDecimal(roundToNearestHalf(qty * (counterData / servings)));
        let res;
        if (quantityTobeUsed[1] !== 0) {
            const [numerator, denominator] = roundToFraction(quantityTobeUsed[1])
            res = numerator + "/" + denominator
        } else {
            res = ''
        }
        return `${qty ? `${quantityTobeUsed[0] === 0 ? "" : quantityTobeUsed[0] || ""} ${res}` : ''} ${measurement ? (measurement === 'Item(s)' && !qty ? '' : measurement) : ''} ${id?.title || title}`;
    }

    const adjustedQty =
        unit_preference === 'Metric'
            ? (amount_in_base_units * counterData) / servings
            : (qty * counterData) / servings;
    let result;
    const quantityTobeUsed = splitDecimal(adjustedQty);
    if (quantityTobeUsed[1] !== 0) {
        const [numerator, denominator] = roundToFraction(quantityTobeUsed[1])
        result = numerator + "/" + denominator
    } else {
        result = ''
    }

    const quantity = (quantityTobeUsed[0] > 0 ? quantityTobeUsed[0] : " ") + " " + result;
    const unit = unit_preference === 'Metric' ? metric_shopping_unit || "" : measurement || "";
    return `${quantity || ""} ${unit} ${id?.title || title}`;
}


export function getImages(description) {
    const regex = /<img[^>]*(?:srcset|src)="([^">]+)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(description))) {
        matches.push(match[1]);
    }
    if (matches.length > 3) {
        return matches.slice(0, 3);
    }
    return matches;
}

export function removeImages(description) {
    const regex = /<img[^>]*(?:srcset|src)="([^">]+)"(?:[^>]*)(?:\/?>|><\/img>)/g;
    if (description) {
        return description.replace(regex, '');
    }
}

export function isEmptyObject(obj) {
    return Object.values(obj).length <= 1;
}

export function getFirstChar(name) {
    if (Array.isArray(name)) {
        return name[0]?.name[0] || name[0];
    } else {
        return name[0];
    }
}

export const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

export function isEmptyShoppingObject({data}) {
    for (let i = 0; i < data?.length; i++) {
        if (data[i].ingredients.length > 0) {
            return false;
        }
    }
    return true;
}

export function truncateText(text, length) {
    if (text.length <= length) {
        return text;
    }

    return text.slice(0, length) + '...';
}

export function arrayToQueryParamString(arr) {
    const jsonStr = JSON.stringify(arr);
    const encodedJson = encodeURIComponent(jsonStr);
    return encodedJson;
}


