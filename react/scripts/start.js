const { networkInterfaces } = require('os');
const { spawn } = require('child_process');
const path = require('path');

function getLocalIP() {
    const nets = networkInterfaces();
    let localIP = null;
    
    // 首先寻找本地网络地址
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                // 优先选择 192.168 或 10. 开头的地址
                if (net.address.startsWith('192.168.') || net.address.startsWith('10.')) {
                    return net.address; // 立即返回找到的本地网络地址
                }
                // 保存第一个找到的非内部 IPv4 地址作为备选
                if (!localIP) {
                    localIP = net.address;
                }
            }
        }
    }
    
    // 如果没有找到本地网络地址，使用之前找到的第一个非内部地址
    // 如果连备选地址都没有，返回 localhost
    return localIP || 'localhost';
}

// 设置环境变量并启动 React
process.env.HOST = getLocalIP();

// 使用正确的 react-scripts 路径
const reactScriptsPath = path.resolve(
    __dirname,
    '../node_modules/.bin/react-scripts'
);

const reactStart = spawn(reactScriptsPath, ['start'], {
    stdio: 'inherit',
    env: { ...process.env },
    shell: true  // 在所有平台上都安全
});

reactStart.on('error', (err) => {
    console.error('Failed to start React:', err);
});