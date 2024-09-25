const http = require('https');
const dotenv = require('dotenv');

dotenv.config();

const cloud_fn_url = process.env.CLOUD_URL;
let i = 0;

fetchRunner();

async function fetchRunner() {
    while (i < 10000) {
        await fetchDataFromUrl(cloud_fn_url);
    }
    return i;
}

async function fetchDataFromUrl(url) {
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            console.log(`sending request ${i++}`);
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

            clearInterval(intervalId);
        }, 5)

    });
}
