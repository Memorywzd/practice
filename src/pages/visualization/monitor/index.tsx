import { Table, Grid, Switch, Form, Radio } from '@arco-design/web-react';
import React from 'react';
import './mock';

const FormItem = Form.Item;
const { Row, Col } = Grid;
const columns = [
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
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '温度',
    dataIndex: 'temperature',
  },
  {
    title: '湿度',
    dataIndex: 'humidity',
  },
  {
    title: '大气压',
    dataIndex: 'pressure',
  },
  {
    title: '光照强度',
    dataIndex: 'light',
  },
  {
    title: '二氧化碳浓度',
    dataIndex: 'co2',
  },
  {
    title: '风速',
    dataIndex: 'windSpeed',
  },
  {
    title: '土壤湿度',
    dataIndex: 'soilHumidity',
  },
  {
    title: '水质pH值',
    dataIndex: 'ph',
  },
  {
    title: '能见度',
    dataIndex: 'visibility',
  },
];
const defaultData = [
  {
    devID: '1',
    areaID: '1',
    nodeID: '1',
    time: '2023-12-30 10:18:55',
    temperature: '20.62',
    humidity: '58.34',
    pressure: '109.39',
    light: '7678.08',
    co2: '411.37',
    windSpeed: '8.54',
    soilHumidity: '47.28',
    ph: '7.3',
    visibility: '401.16',
  },
];
let data = defaultData;

class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: false,
      checkAll: false,
      border: true,
      borderCell: true,
      hover: true,
      stripe: false,
      loading: false,
      showHeader: true,
      fixedHeader: false,
      no_data: false,
      size: 'default',
      pagePosition: 'br',
    };
  }

  onChange = (type, checked) => {
    if (type === 'no_data') {
      data = checked ? [] : defaultData;
    }

    this.setState({
      [type]: checked,
    });
  };

  render() {
    return (
        <Table
            columns={columns}
            data={data}
            {...this.state}
            style={{marginTop: 10,}}
            pagination={{pageSize: 5,}}
        />
    /*<div>
      <Form layout='inline'>
        <FormItem label='Border' colon={false}>
          <Switch size='small' onChange={this.onChange.bind(this, 'border')} checked={border}/>
        </FormItem>
        <FormItem label='Border Cell' colon={false}>
          <Switch
              size='small'
              onChange={this.onChange.bind(this, 'borderCell')}
              checked={borderCell}
          />
        </FormItem>
        <FormItem label='Hover' colon={false}>
          <Switch size='small' onChange={this.onChange.bind(this, 'hover')} checked={hover}/>
        </FormItem>
        <FormItem label='Stripe' colon={false}>
          <Switch size='small' onChange={this.onChange.bind(this, 'stripe')} checked={stripe}/>
        </FormItem>
        <FormItem label='Checkbox' colon={false}>
          <Switch
              size='small'
              onChange={this.onChange.bind(this, 'checkbox')}
              checked={checkbox}
          />
        </FormItem>
        <FormItem label='Check All' colon={false}>
          <Switch
              size='small'
              onChange={this.onChange.bind(this, 'checkAll')}
              checked={checkAll}
          />
        </FormItem>
        <FormItem label='Loading' colon={false}>
          <Switch
              size='small'
              onChange={this.onChange.bind(this, 'loading')}
              checked={loading}
          />
        </FormItem>
        <FormItem label='Table Header' colon={false}>
          <Switch
              size='small'
              onChange={this.onChange.bind(this, 'showHeader')}
              checked={showHeader}
          />
        </FormItem>
        <FormItem label='Header fixed' colon={false}>
          <Switch
              size='small'
              onChange={this.onChange.bind(this, 'fixedHeader')}
              checked={fixedHeader}
          />
        </FormItem>
        <FormItem label='No data' colon={false}>
          <Switch
              size='small'
              onChange={this.onChange.bind(this, 'no_data')}
              checked={no_data}
          />
        </FormItem>
        <FormItem label='Size' colon={false}>
          <Radio.Group
              type='button'
              options={['default', 'middle', 'small', 'mini']}
              value={size}
              onChange={this.onChange.bind(this, 'size')}
          />
        </FormItem>
        <FormItem label='Pagination position' colon={false}>
          <Radio.Group
              type='button'
              options={[
                {
                  label: 'BottomRight',
                  value: 'br',
                },
                {
                  label: 'BottomLeft',
                  value: 'bl',
                },
                {
                  label: 'TopRight',
                  value: 'tr',
                },
                {
                  label: 'TopLeft',
                  value: 'tl',
                },
                {
                  label: 'TopCenter',
                  value: 'topCenter',
                },
                {
                  label: 'BottomCenter',
                  value: 'bottomCenter',
                },
              ]}
              value={pagePosition}
              onChange={this.onChange.bind(this, 'pagePosition')}
          />
        </FormItem>
      </Form>
    </div>*/
  )
    ;
  }
}

export default Monitor;
