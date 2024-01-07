import {Table, Grid, Switch, Form, Radio} from '@arco-design/web-react';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import './mock';
import axios from "axios";
import { getData } from '@/utils/unitConversion';


const api = 'http://bj.memorywzd.tk:9308';

export default function Monitor() {
    if(typeof window == 'undefined')
        return null;

    const temp = localStorage.getItem('temperature') === 'Celsius' ? '℃' : '℉';
    const humidity = localStorage.getItem('humidity') === 'percent' ? '%' : 'g/m3';
    const pressure = localStorage.getItem('pressure') === 'kPa' ? 'kPa' : 'Pa';
    const light = localStorage.getItem('light') === 'lux' ? 'lux' : 'cd/m2';
    const co2 = localStorage.getItem('co2') === 'ppm' ? 'ppm' : 'mg/m3';
    const windSpeed = localStorage.getItem('windSpeed') === 'm/s' ? 'm/s' : 'km/h';
    const soilHumidity = localStorage.getItem('soilHumidity') === 'percent' ? '%' : 'g/m3';
    const ph = localStorage.getItem('ph') === 'pH' ? 'pH' : 'mol/L';
    const visibility = localStorage.getItem('visibility') === 'm' ? 'm' : 'km';

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
            dataIndex: 'areaID',
        },
        {
            title: '结点ID',
            dataIndex: 'nodeID',
        },
        {
            title: '数据时间',
            dataIndex: 'time',
        },
        {
            title: '温度/' + temp,
            dataIndex: 'd1',
        },
        {
            title: '湿度/' + humidity,
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [devList, setDevList] = useState([]);
    const getDevList = async () => {
        const response = await axios
            .get(api + '/api/dev/monitorList')
        setDevList(response.data);
    }
    //使用 axios.get('/api/datagrams') 传入参数recordID、devID，获取对应的数据
    //每秒刷新一次
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([]);
    /*let id = 1;*/
    const getTableData = async () => {
        const response = await axios
            .get(api + '/api/dev/monitor'/*, {
                params: {
                    recordID: id++,
                }
            }*/);
        response.data.map((item) => {
            getData(item, 1, 1);
            const startDate = moment(item.time);
            const endDate = moment(new Date());
            console.log(item.time, ' and ', startDate, ' and ', endDate);
            if (endDate.diff(startDate, 'minutes') > 5) {
                item.isAlive = 0;
            }
        });
        setData(response.data);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getDevList();
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
