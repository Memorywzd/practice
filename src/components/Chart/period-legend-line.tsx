import React from 'react';
import {Chart, Line, Axis, Tooltip, Legend, Slider} from 'bizcharts';
import {Spin} from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';
import useBizTheme from '@/utils/useChartTheme';
import useStorage from "@/utils/useStorage";

const lineColor = ['#21CCFF', '#313CA9', '#249EFF'];

function PeriodLine({data, loading}: { data: any[]; loading: boolean }) {

    const [tempUnit] = useStorage('temperature');
    //const [humidityUnit] = useStorage('humidity');
    const [pressureUnit] = useStorage('pressure');
    const [lightUnit] = useStorage('light');
    const [co2Unit] = useStorage('co2');
    const [windSpeedUnit] = useStorage('windSpeed');
    //const [soilHumidityUnit] = useStorage('soilHumidity');
    const [phUnit] = useStorage('ph');
    const [visibilityUnit] = useStorage('visibility');

    const temp = tempUnit === 'Celsius' ? '℃' : '℉';
    const humidity = '%';
    const pressure = pressureUnit === 'kPa' ? 'kPa' : 'Pa';
    const light = lightUnit === 'lux' ? 'lux' : 'cd/m2';
    const co2 = co2Unit === 'ppm' ? 'ppm' : 'ppmv';
    const windSpeed = windSpeedUnit === 'm/s' ? 'm/s' : 'km/h';
    const soilHumidity = '%'; //localStorage.getItem('soilHumidity') === 'percent' ? '%' : 'g/m3';
    const ph = phUnit === 'pH' ? 'pH' : 'mol/L';
    const visibility = visibilityUnit === 'm' ? 'm' : 'km';
    return (
        <Spin loading={loading} style={{width: '100%'}}>
            <Chart
                theme={useBizTheme()}
                forceUpdate
                height={370}
                padding={[10, 20, 120, 60]}
                data={data}
                autoFit
                scale={{time: 'time'}}
                className={'chart-wrapper'}
            >
                <Line /*shape={'smooth'}*/ position="time*count" color={['name', lineColor]}/>
                <Tooltip crosshairs={{type: 'x'}} showCrosshairs shared>
                    {(title, items) => {
                        return <CustomTooltip title={title} data={items}/>;
                    }}
                </Tooltip>
                <Axis
                    name="count"
                    label={{
                        formatter(text) {
                            return `${Number(text)}`;
                        },
                    }}
                />
                <Axis
                    name="time"
                    label={{
                        formatter(text, item) {
                            return `${item.name}`;
                        },
                    }}
                />
                <Legend
                    name="name"
                    itemValue={{
                        formatter(text) {
                            switch (text) {
                                case '温度':
                                    return temp;
                                case '湿度':
                                    return humidity;
                                case '大气压':
                                    return pressure;
                                case '光照强度':
                                    return light;
                                case '二氧化碳浓度':
                                    return co2;
                                case '风速':
                                    return windSpeed;
                                case '土壤湿度':
                                    return soilHumidity;
                                case '水质pH值':
                                    return ph;
                                case '能见度':
                                    return visibility;
                                default:
                                    return '';
                            }
                        },
                    }}
                    marker={(_, index) => {
                        return {
                            symbol: 'circle',
                            style: {
                                fill: lineColor[index],
                                r: 4,
                            },
                        };
                    }}
                />
                <Slider
                    foregroundStyle={{
                        borderRadius: ' 4px',
                        fill: 'l (180) 0:rgba(206, 224, 255, 0.9) 1:rgba(146, 186, 255, 0.8)',
                        opacity: 0.3,
                    }}
                    trendCfg={{
                        data: data.map((item) => item.count),
                        isArea: true,
                        areaStyle: {
                            fill: 'rgba(4, 135, 255, 0.15)',
                            opacity: 1,
                        },
                        backgroundStyle: {
                            fill: '#F2F3F5',
                        },
                        lineStyle: {
                            stroke: 'rgba(36, 158, 255, 0.3)',
                            lineWidth: 2,
                        },
                    }}
                    handlerStyle={{
                        fill: '#ffffff',
                        opacity: 1,
                        width: 22,
                        height: 22,
                        stroke: '#165DFF',
                    }}
                />
            </Chart>
        </Spin>
    );
}

export default PeriodLine;
