import {Table} from '@arco-design/web-react';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import './mock';
import axios from "axios";
import {getData, getUnit} from '@/utils/unitConversion';
import useStorage from "@/utils/useStorage";
import {useSelector} from "react-redux";


axios.defaults.baseURL = 'http://bj.memorywzd.tk:9308';

export default function Monitor() {
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

    const unit = useSelector((state: any) => state.unit);
    const factor = useSelector((state: any) => state.factor);
    const adder = useSelector((state: any) => state.adder);

    const columns = [
        {
            title: '存活状态',
            dataIndex: 'isAlive',
        },
        {
            title: '设备ID',
            dataIndex: 'devID',
        },
        {
            title: '区域ID',
            dataIndex: 'devArea',
        },
        {
            title: '结点ID',
            dataIndex: 'devNode',
        },
        {
            title: '数据时间',
            dataIndex: 'time',
        },
        {
            title: unit[0],
            dataIndex: 'd1',
        },
        {
            title: unit[1],
            dataIndex: 'd2',
        },
        {
            title: '大气压/' + pressure,
            dataIndex: 'd3',
        },
        {
            title: '光照强度/' + light,
            dataIndex: 'd4',
        },
        {
            title: '二氧化碳浓度/' + co2,
            dataIndex: 'd5',
        },
        {
            title: '风速/' + windSpeed,
            dataIndex: 'd6',
        },
        {
            title: '土壤湿度/' + soilHumidity,
            dataIndex: 'd7',
        },
        {
            title: '水质pH值/' + ph,
            dataIndex: 'd8',
        },
        {
            title: '能见度/' + visibility,
            dataIndex: 'd9',
        },
    ];

    //使用 axios.get('/api/datagrams') 传入参数recordID、devID，获取对应的数据
    //每秒刷新一次
    const [data, setData] = useState([]);
    const userID = useStorage('userId')[0];
    const getTableData = async () => {
        const response = await axios
            .get('/api/dev/monitor', {
                params: {
                    userID: userID,
                }
            });
        let index = 0;
        response.data.map((item) => {
            const dataIndex = 'd' + index.toString();
            item[dataIndex] = getUnit(item, factor[index++], adder[index++]);
            /*const startDate = moment(item.time);
            const endDate = moment(new Date());
            if (endDate.diff(startDate, 'minutes') > 5) {
                item.isAlive = '离线';
            }
            else {
                item.isAlive = '在线';
            }*/
            if (item.isAlive === 0) {
                item.isAlive = '离线';
            }
            else {
                item.isAlive = '在线';
            }
        });
        setData(response.data);
    }
    useEffect(() => {
        const timer = setInterval(() => {
            getTableData();
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Table
            columns={columns}
            data={data}
            border={true}
            hover={true}
            borderCell={true}
            showHeader={true}
            style={{marginTop: 10,}}
            pagination={{pageSize: 5,}}
        />
    );
}
