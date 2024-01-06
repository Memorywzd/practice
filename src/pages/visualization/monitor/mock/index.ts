import Mock from 'mockjs';
import setupMock from '../../../../utils/setupMock';

setupMock({
  mock:false,
  setup: () => {
    Mock.mock(new RegExp('/api/datagrams'), () => {
      const data = Mock.mock({
        'data|4': [
          {
            'devID|+1': 1,
            'areaID|1-4': 1,
            'nodeID|1-4': 1,
            devIP: '127.0.0.1',
            time: '@now',
            isAlive: 1,
            devPort: 54305,
          },
        ],
      });
      return data.data;
    });
  },
});

