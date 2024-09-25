const http = require('https');
const dotenv = require('dotenv');

dotenv.config();

const cloud_fn_url = process.env.CLOUD_URL;

for (let i = 0; i < 10000; i ++) {
    console.log(`sending req #${i}`);
    fetchDataFromUrl(cloud_fn_url);
}

function fetchDataFromUrl(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}
