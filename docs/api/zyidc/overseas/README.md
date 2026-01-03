# 云驰互联(亚太加速)API文档

## 接口说明

获取可用的海外IP地址列表，用于网络连接和测试。

## 请求地址

`https://api.cnae.top/zyidc/overseas/`

## 请求方法

GET

## 请求参数

无

## 返回示例

```
1.1.1.1
2.2.2.2
3.3.3.3
4.4.4.4
5.5.5.5
```

## 使用示例

### cURL

```bash
curl -X GET "https://api.cnae.top/zyidc/overseas/"
```

### JavaScript

```javascript
fetch('https://api.cnae.top/zyidc/overseas/')
  .then(response => response.text())
  .then(data => {
    const ipList = data.split('\n').filter(ip => ip.trim());
    console.log('IP列表:', ipList);
  })
  .catch(error => console.error('请求失败:', error));
```

### Python

```python
import requests

response = requests.get('https://api.cnae.top/zyidc/overseas/')
if response.status_code == 200:
    ip_list = response.text.strip().split('\n')
    print('IP列表:', ip_list)
else:
    print('请求失败:', response.status_code)
```

## 错误处理

- 如果服务器暂时无法提供IP列表，可能会返回空内容或错误状态码
- 建议实现重试机制，以应对临时性网络问题

## 注意事项

- IP列表会定期更新，请不要缓存过长时间
- 获取的IP地址可能随时变更，请在使用前验证有效性
- 请合理使用API，避免频繁请求