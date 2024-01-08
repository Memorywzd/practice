export function getTemperature(data: number) {
    if (localStorage.getItem('temperature') === 'Celsius')
        return data;
    else
        return (data * 9 / 5) + 32;
}

export function getHumidity(data: number, factor: number) {
    if (localStorage.getItem('humidity') === 'Percentage')
        return data;
    else
        return data * factor;
}

export function getPressure(data: number) {
    if (localStorage.getItem('pressure') === 'kPa')
        return data;
    else
        return data * 1000;
}

export function getCo2(data: number) {
    if (localStorage.getItem('co2') === 'ppm')
        return data;
    else
        return data / 1000000;
}


export function getWindSpeed(data: number) {
    if (localStorage.getItem('windSpeed') === 'm/s')
        return data;
    else
        return data * 3.6;
}


export function getSoilHumidity(data: number, factor: number) {
    if (localStorage.getItem('soilHumidity') === 'Percentage')
        return data;
    else
        return data * factor;
}


export function getPH(data: number) {
    if (localStorage.getItem('ph') === 'pH')
        return data;
    else
        return 10 ** (-data);
}


export function getVisibility(data: number) {
    if (localStorage.getItem('visibility') === 'm')
        return data;
    else
        return data / 1000;
}


export function getData(data, factor1: number, factor2: number) {
    data.d1 = getTemperature(data.d1);
    data.d2 = getHumidity(data.d2, factor1);
    data.d3 = getPressure(data.d3);
    //data.d4 = data.d4;
    data.d5 = getCo2(data.d5);
    data.d6 = getWindSpeed(data.d6);
    data.d7 = getSoilHumidity(data.d7, factor2);
    data.d8 = getPH(data.d8);
    data.d9 = getVisibility(data.d9);
}


export function getDataByIndex(data, index: number, factor: number) {
    switch (index) {
        case 1:
            return getTemperature(data);
        case 2:
            return getHumidity(data, factor);
        case 3:
            return getPressure(data);
        case 4:
            return data;
        case 5:
            return getCo2(data);
        case 6:
            return getWindSpeed(data);
        case 7:
            return getSoilHumidity(data, factor);
        case 8:
            return getPH(data);
        case 9:
            return getVisibility(data);
        default:
            return data;
    }
}
