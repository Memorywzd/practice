from fastapi import APIRouter, HTTPException
import csv
from pandas import read_csv

from starlette.responses import FileResponse

from db import database

router = APIRouter()


@router.get("/list")
async def get_dev_list():
    return database.dao_get_dev_list()


@router.get("/monitorList")
async def get_monitor_list():
    return database.dao_get_monitor_list()


@router.get("/datagram")
async def get_datagram(areaID: int, nodeID: int, recordID: int = 0):
    if database.dao_get_datagram(areaID, nodeID, recordID):
        return database.dao_get_datagram(areaID, nodeID, recordID)
    else:
        return []


@router.get("/monitor")
async def get_monitor(userID: int = 1):
    if database.dao_get_monitor(userID):
        return database.dao_get_monitor(userID)
    else:
        return []


@router.get("/areaList")
async def get_area_list(userID: int = 1):
    return database.dao_get_area_list(userID)


@router.get("/nodeList")
async def get_node_list(areaID: int, userID: int = 1):
    return database.dao_get_node_list(areaID, userID)


@router.get("/history")
async def get_history(areaID: int, nodeID: int, data: int):
    if database.dao_get_history(areaID, nodeID, data):
        return database.dao_get_history(areaID, nodeID, data)
    else:
        return {}


@router.get("/historyByTime")
async def get_history(areaID: int, nodeID: int, data: int, timeOfStart: str, timeOfEnd: str):
    if database.dao_get_historyByTime(areaID, nodeID, data, timeOfStart, timeOfEnd):
        return database.dao_get_historyByTime(areaID, nodeID, data, timeOfStart, timeOfEnd)
    else:
        return {}


@router.get("/download")
async def get_download(areaID: int, nodeID: int,
                       timeOfStart: str, timeOfEnd: str, type: int = 0):
    data = database.dao_get_download(areaID, nodeID, timeOfStart, timeOfEnd)
    # 数组转csv文件，返回文件进行下载

    # 1. 创建文件对象
    f = open('data.csv', 'w', encoding='utf-8', newline='')
    # 2. 基于文件对象构建 csv写入对象
    csv_writer = csv.writer(f)
    # 3. 构建列表头
    csv_writer.writerow(['recordID', 'areaID', 'nodeID', 'time', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'])
    # 4. 写入csv文件内容
    for row in data:
        csv_writer.writerow(row)
    # 5. 关闭文件
    f.close()
    # 6. 返回文件
    if type == 0:
        return FileResponse('data.csv', filename='data.csv', media_type='application/octet-stream',
                            headers={'Access-Control-Expose-Headers': 'Content-Disposition'})

    read_csv('data.csv').to_excel('data.xlsx', sheet_name='data', index=False)

    return FileResponse('data.xlsx', filename='data.xlsx', media_type='application/octet-stream',
                        headers={'Access-Control-Expose-Headers': 'Content-Disposition'})


@router.get("/sendComm")
async def send_comm(areaID: int, nodeID: int, code: int, content: str):
    if database.dao_send_comm(areaID, nodeID, code, content):
        return {"status": "ok"}
    else:
        raise HTTPException(status_code=400, detail="Device not exists")
