/**
 * 无间AR云识别，token生成示例
 * 
 * 开发者中心: https://portal.wujianar.com
 */

function getToken(accessKey, accessSecret, expires) {
    const arr = {
        // 服务器或客户端密钥
        'accessKey': accessKey,
        // 有效期（时间戳）,使用毫秒
        'expires': new Date().getTime() + expires * 1000
    };
    
    // 转换为JSON字符串
    const json = JSON.stringify(arr);
    
    // 计算签名，拼接JSON字符串与访问密钥，再使用sha256哈希生成签名
    const signature = sha256(json + accessSecret);
    
    // 原始token数据
    const raw = signature + json;
    
    // 转换为base64编码, 此token为最终的认证token, 在有效期内无需重新生成
    return base64Encode(raw);
}

// base64编码，微信小程序中不支持btoa方法
function base64Encode(str) {
    return window.btoa(str);
}
