import {Table} from '@arco-design/web-react';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import './mock';
import axios from "axios";
import {getUnit} from '@/utils/unitConversion';
import useStorage from "@/utils/useStorage";
import {useSelector} from "react-redux";


axios.defaults.baseURL = 'http://bj.memorywzd.tk:9308';

export default function Monitor() {
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
            title: unit[2],
            dataIndex: 'd3',
        },
        {
            title: unit[3],
            dataIndex: 'd4',
        },
        {
            title: unit[4],
            dataIndex: 'd5',
        },
        {
            title: unit[5],
            dataIndex: 'd6',
        },
        {
            title: unit[6],
            dataIndex: 'd7',
        },
        {
            title: unit[7],
            dataIndex: 'd8',
        },
        {
            title: unit[8],
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
        response.data.map((item) => {
            for (let i = 0; i < 9; i++) {
                item['d' + (i + 1)] = getUnit(item['d' + (i + 1)], factor[i], adder[i]);
            }
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
