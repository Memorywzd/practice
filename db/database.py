from datetime import datetime
import json

import pymysql

db = pymysql.connect(
    host="bj.memorywzd.tk",
    port=9306,
    user="practice",
    password="Wm1g2V6sHiJ",
    database="practice",
    autocommit=True
)

cursor = db.cursor()


def dao_get_dev_list():
    sql = "SELECT devID FROM device"
    cursor.execute(sql)
    result_list = []
    for row in cursor.fetchall():
        result_list.append(row[0])
    return result_list


def dao_get_monitor_list():
    sql = "SELECT devID, devArea, devNode FROM device"

    cursor.execute(sql)
    result_dict_list = []
    for row in cursor.fetchall():
        result_dict = {"devID": row[0], "devArea": row[1], "devNode": row[2]}
        result_dict_list.append(result_dict)
    return result_dict_list


def dao_get_datagram(areaID, nodeID, recordID):
    if recordID == 0:
        sql = (f"SELECT * FROM device "
               f"JOIN datagram ON device.devArea = datagram.areaID AND device.devNode = datagram.nodeID "
               f"WHERE device.devArea={areaID} AND device.devNode={nodeID} "
               f"ORDER BY recordID DESC LIMIT 1")
    else:
        sql = (f"SELECT * FROM device "
               f"JOIN datagram ON device.devArea = datagram.areaID AND device.devNode = datagram.nodeID "
               f"WHERE device.devArea={areaID} AND device.devNode={nodeID} AND recordID={recordID}")

    cursor.execute(sql)
    # 获取表头字段
    table_headers = [desc[0] for desc in cursor.description]
    result_dict_list = []
    for row in cursor.fetchall():
        result_dict = {}
        for i in range(len(table_headers)):
            result_dict[table_headers[i]] = row[i]
        result_dict_list.append(result_dict)
    return result_dict_list


def dao_get_monitor(userID):
    if userID == 1:
        # 查询设备列表
        sql = "SELECT devID, devArea, devNode FROM device"

        cursor.execute(sql)
        device_list = []
        for row in cursor.fetchall():
            device_list.append([row[0], row[1], row[2]])
        # 查询监控数据
        result_dict_list = []
        # 循环查询每个设备的最新监控数据
        for device in device_list:
            sql = (f"SELECT device.devID, device.devArea, device.devNode, device.isAlive, "
                   f"datagram.recordID, datagram.time, "
                   f"d1,d2,d3,d4,d5,d6,d7,d8,d9 FROM device "
                   f"JOIN datagram ON device.devArea = datagram.areaID AND device.devNode = datagram.nodeID "
                   f"WHERE device.devArea={device[1]} AND device.devNode={device[2]} "
                   f"ORDER BY recordID DESC LIMIT 1")
            cursor.execute(sql)
            # 获取表头字段
            table_headers = [desc[0] for desc in cursor.description]
            for row in cursor.fetchall():
                result_dict = {}
                for i in range(len(table_headers)):
                    if isinstance(row[i], datetime):
                        result_dict[table_headers[i]] = row[i].strftime("%Y-%m-%d %H:%M:%S")
                    else:
                        result_dict[table_headers[i]] = row[i]
                result_dict_list.append(result_dict)
    else:
        # 查询用户设备列表
        sql = f"SELECT devID FROM userDevices WHERE userID={userID}"
        cursor.execute(sql)
        device_list = []
        for row in cursor.fetchall():
            device_list.append(row[0])
        # 查询监控数据
        result_dict_list = []
        # 循环查询每个设备的指定监控数据
        for device in device_list:
            sql = (f"SELECT device.devID, device.devArea, device.devNode, device.isAlive, "
                   f"datagram.recordID, datagram.time, "
                   f"d1,d2,d3,d4,d5,d6,d7,d8,d9 FROM device "
                   f"JOIN datagram ON device.devArea = datagram.areaID AND device.devNode = datagram.nodeID "
                   f"WHERE device.devID={device} "
                   f"ORDER BY recordID DESC LIMIT 1")
            cursor.execute(sql)
            # 获取表头字段
            table_headers = [desc[0] for desc in cursor.description]
            for row in cursor.fetchall():
                result_dict = {}
                for i in range(len(table_headers)):
                    if isinstance(row[i], datetime):
                        result_dict[table_headers[i]] = row[i].strftime("%Y-%m-%d %H:%M:%S")
                    else:
                        result_dict[table_headers[i]] = row[i]
                result_dict_list.append(result_dict)
    return result_dict_list


def dao_get_history(areaID, nodeID, data):
    sql = (f"SELECT time, d{data} FROM datagram "
           f"WHERE areaID={areaID} AND nodeID={nodeID} "
           f"ORDER BY recordID")

    cursor.execute(sql)
    result_dict_list = []
    # 获取表头字段
    table_headers = [desc[0] for desc in cursor.description]
    table_headers[len(table_headers) - 1] = 'count'
    dataName = {
        1: '温度',
        2: '湿度',
        3: '大气压',
        4: '光照强度',
        5: '二氧化碳浓度',
        6: '风速',
        7: '土壤湿度',
        8: '水质pH值',
        9: '能见度',
    }
    for row in cursor.fetchall():
        result_dict = {'name': dataName[data]}
        for i in range(len(table_headers)):
            if isinstance(row[i], datetime):
                result_dict[table_headers[i]] = row[i].strftime("%Y-%m-%d,%H:%M:%S")
            else:
                result_dict[table_headers[i]] = row[i]
        result_dict_list.append(result_dict)
    return result_dict_list


def dao_get_historyByTime(areaID, nodeID, data, start, end):
    sql = (f"SELECT time, d{data} FROM datagram "
           f"WHERE areaID={areaID} AND nodeID={nodeID} AND time BETWEEN '{start}' AND '{end}' "
           f"ORDER BY recordID")

    cursor.execute(sql)
    result_dict_list = []
    # 获取表头字段
    table_headers = [desc[0] for desc in cursor.description]
    table_headers[len(table_headers) - 1] = 'count'
    dataName = {
        1: '温度',
        2: '湿度',
        3: '大气压',
        4: '光照强度',
        5: '二氧化碳浓度',
        6: '风速',
        7: '土壤湿度',
        8: '水质pH值',
        9: '能见度',
    }
    for row in cursor.fetchall():
        result_dict = {'name': dataName[data]}
        for i in range(len(table_headers)):
            if isinstance(row[i], datetime):
                result_dict[table_headers[i]] = row[i].strftime("%Y-%m-%d,%H:%M:%S")
            else:
                result_dict[table_headers[i]] = row[i]
        result_dict_list.append(result_dict)
    return result_dict_list


def dao_get_area_list(userID):
    if userID == 1:
        sql = ("SELECT devArea FROM device "
               "GROUP BY devArea ORDER BY devArea")
    else:
        sql = (f"SELECT device.devArea FROM device "
               f"JOIN userDevices ON device.devID = userDevices.devID "
               f"WHERE userDevices.userID={userID} "
               f"GROUP BY devArea ORDER BY devArea")
    cursor.execute(sql)
    result_dict_list = []
    for row in cursor.fetchall():
        result_dict_list.append(row[0])
    return result_dict_list


def dao_get_node_list(areaID, userID):
    if userID == 1:
        sql = (f"SELECT devNode FROM device WHERE devArea={areaID} "
               f"GROUP BY devNode ORDER BY devNode")
    else:
        sql = (f"SELECT device.devNode FROM device "
               f"JOIN userDevices ON device.devID = userDevices.devID "
               f"WHERE device.devArea={areaID} AND userDevices.userID={userID} "
               f"GROUP BY devNode ORDER BY devNode")
    cursor.execute(sql)
    result_dict_list = []
    for row in cursor.fetchall():
        result_dict_list.append(row[0])
    return result_dict_list


def dao_get_download(areaID, nodeID, timeOfStart, timeOfEnd):
    sql = (f"SELECT * FROM datagram "
           f"WHERE areaID={areaID} AND nodeID={nodeID} AND time BETWEEN '{timeOfStart}' AND '{timeOfEnd}' "
           f"ORDER BY recordID")

    cursor.execute(sql)
    result_dict_list = []
    for row in cursor.fetchall():
        result_dict_list.append(row)
    return result_dict_list


def dao_login(user):
    sql = f"SELECT id FROM user WHERE name='{user.username}' AND password='{user.password}'"
    cursor.execute(sql)
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        return 0


def dao_get_user_by_id(id):
    sql = f"SELECT * FROM user WHERE id={id} "
    cursor.execute(sql)
    # 获取表头字段
    result_dict = {}
    table_headers = [desc[0] for desc in cursor.description]
    for row in cursor.fetchall():
        for i in range(len(table_headers)):
            result_dict[table_headers[i]] = row[i]
    # 获取用户设备列表
    if id == 1:
        result_dict['devices'] = dao_get_dev_list()
    else:
        sql = f"SELECT devID FROM userDevices WHERE userID={id} "
        cursor.execute(sql)
        result_dict['devices'] = []
        for row in cursor.fetchall():
            result_dict['devices'].append(row[0])
    return result_dict


def dao_add_user(user):
    sql = f"SELECT id FROM user WHERE name='{user.username}'"
    cursor.execute(sql)
    result = cursor.fetchone()
    if result:
        return False
    else:
        sql = (f"INSERT INTO user(name, password, avatar, role) "
               f"VALUES ('{user.username}', '{user.password}', "
               f"'{user.avatar}', 'user')")
        cursor.execute(sql)
        return True


def dao_allocate_dev(userID, areaID, nodeID):
    # 从device表中查出devID，检查是否已经分配
    sql = f"SELECT devID FROM device WHERE devArea={areaID} AND devNode={nodeID}"
    cursor.execute(sql)
    result = cursor.fetchone()
    if result:
        # 从userDevices表中查出devID，检查是否已经分配
        sql = f"SELECT devID FROM userDevices WHERE userID={userID} AND devID={result[0]}"
        cursor.execute(sql)
        result1 = cursor.fetchone()
        if result1:
            return False
        else:
            # 从userDevices表中插入数据
            sql = f"INSERT INTO userDevices(userID, devID) VALUES ({userID}, {result[0]})"
            cursor.execute(sql)
            return True
    else:
        return False


def dao_get_user_list():
    sql = "SELECT id, name FROM user WHERE role='user'"
    cursor.execute(sql)
    result_dict_list = []
    for row in cursor.fetchall():
        result_dict_list.append({"id": row[0], "name": row[1]})
    return result_dict_list


# 构造命令，4字节指令方向（值为3），4字节指令代码（值为2或3），8字节指令长度，变长指令内容，10字节终止符（FF FF FF FF FF FF FF FF \r \n）
def dao_construct_comm(direction, code, content):
    # 4字节指令方向（值为3）
    direction = direction.to_bytes(4, byteorder='big')
    # 4字节指令代码（值为2或3）
    code = code.to_bytes(4, byteorder='big')
    # 8字节指令长度
    length = len(content).to_bytes(8, byteorder='big')
    # 变长指令内容
    if code == 2:
        content = int(content).to_bytes(8, byteorder='big')
    else:
        content = content.to_bytes(28, byteorder='big')
    # 10字节终止符（FF FF FF FF FF FF FF FF \r \n）
    end = b'\xff\xff\xff\xff\xff\xff\xff\xff\r\n'
    # 拼接命令
    comm = direction + code + length + content + end
    print(comm)
    return comm


def dao_send_comm(areaID, nodeID, code, content):
    # 从device表中查出设备的ip和port
    sql = f"SELECT devIP, devPort FROM device WHERE devArea={areaID} AND devNode={nodeID} "
    cursor.execute(sql)
    result = cursor.fetchone()
    comm = dao_construct_comm(3, code, content)
    if result:
        # 发送命令
        import socket
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.sendto(comm, (result[0], result[1]))
        s.close()
        return True
    else:
        return False

