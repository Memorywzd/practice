import Mock from 'mockjs';
import setupMock from '@/utils/setupMock';

setupMock({
    setup: () => {
        const getTimeLine = (name) => {
            const timeArr = new Array(12).fill(0).map((_, index) => {
                const time = index * 2;
                return time < 9 ? `0${time}:00` : `${time}:00`;
            });
            return new Array(12).fill(0).map((_, index) => ({
                name,
                time: timeArr[index],
                count: Mock.Random.natural(10, 80),
            }));
        };

        Mock.mock(new RegExp('/api/datagram/history'), () => {
            return [
                ...getTimeLine('温度'),
            ];
        });
    },
});
