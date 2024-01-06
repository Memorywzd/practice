import React from 'react';
import {Chart, Line, Axis, Tooltip, Legend, Slider} from 'bizcharts';
import {Spin} from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';
import useBizTheme from '@/utils/useChartTheme';

const lineColor = ['#21CCFF', '#313CA9', '#249EFF'];

function PeriodLine({data, loading}: { data: any[]; loading: boolean }) {

    const temp = localStorage.getItem('temperature') === 'Celsius' ? '℃' : '℉';
    const humidity = localStorage.getItem('humidity') === 'percent' ? '%' : 'g/m3';
    const pressure = localStorage.getItem('pressure') === 'kPa' ? 'kPa' : 'Pa';
    const light = localStorage.getItem('light') === 'lux' ? 'lux' : 'cd/m2';
    const co2 = localStorage.getItem('co2') === 'ppm' ? 'ppm' : 'mg/m3';
    const windSpeed = localStorage.getItem('windSpeed') === 'm/s' ? 'm/s' : 'km/h';
    const soilHumidity = localStorage.getItem('soilHumidity') === 'percent' ? '%' : 'g/m3';
    const ph = localStorage.getItem('ph') === 'pH' ? 'pH' : 'mol/L';
    const visibility = localStorage.getItem('visibility') === 'm' ? 'm' : 'km';

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
