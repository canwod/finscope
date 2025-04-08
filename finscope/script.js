// API Configuration
const API_CONFIG = {
    borsa: {
        url: "https://api.genelpara.com/embed/borsa.json",
        headers: {
            'Accept': 'application/json'
        }
    },
    kap: {
        url: "https://www.kap.org.tr/tr/api/disclosure/announcement",
        headers: {
            'Accept': 'application/json'
        }
    },
    crypto: {
        url: "https://api.binance.com/api/v3/ticker/24hr",
        headers: {
            'Accept': 'application/json'
        }
    },
    bist: {
        url: "https://api.genelpara.com/embed/bist.json",
        headers: {
            'Accept': 'application/json'
        }
    }
};

// Fetch Borsa News
async function fetchBorsaNews() {
    try {
        const response = await fetch(API_CONFIG.borsa.url, {
            method: 'GET',
            headers: API_CONFIG.borsa.headers
        });

        if (!response.ok) {
            throw new Error('Borsa haberleri alınamadı');
        }

        const data = await response.json();
        displayBorsaNews(data);
    } catch (error) {
        console.error('Borsa haberleri alınırken hata:', error);
        // Fallback to static news if API fails
        const fallbackNews = [
            {
                title: "Borsa İstanbul'da Günlük Değerlendirme",
                snippet: "BIST 100 endeksi günü yükselişle kapattı...",
                published: new Date().toISOString(),
                link: "https://www.bloomberght.com/borsa"
            },
            {
                title: "Borsa'da Günün Öne Çıkanları",
                snippet: "Bankacılık sektörü günü güçlü kapatırken...",
                published: new Date().toISOString(),
                link: "https://www.bloomberght.com/borsa"
            },
            {
                title: "Borsa'da Sektörel Analiz",
                snippet: "Teknoloji hisseleri günü yükselişle kapattı...",
                published: new Date().toISOString(),
                link: "https://www.bloomberght.com/borsa"
            },
            {
                title: "Borsa'da Yabancı Yatırımcı Hareketleri",
                snippet: "Yabancı yatırımcılar günü net alıcı olarak kapattı...",
                published: new Date().toISOString(),
                link: "https://www.bloomberght.com/borsa"
            },
            {
                title: "Borsa'da Günün Teknik Analizi",
                snippet: "BIST 100 endeksi teknik olarak güçlü sinyaller veriyor...",
                published: new Date().toISOString(),
                link: "https://www.bloomberght.com/borsa"
            },
            {
                title: "Borsa'da Günün Özeti",
                snippet: "Borsa İstanbul'da günün öne çıkan gelişmeleri...",
                published: new Date().toISOString(),
                link: "https://www.bloomberght.com/borsa"
            }
        ];
        displayBorsaNews({ items: fallbackNews });
    }
}

// Fetch KAP News
async function fetchKapNews() {
    try {
        const response = await fetch(API_CONFIG.kap.url, {
            method: 'GET',
            headers: API_CONFIG.kap.headers
        });

        if (!response.ok) {
            throw new Error('KAP haberleri alınamadı');
        }

        const data = await response.json();
        displayKapNews(data);
    } catch (error) {
        console.error('KAP haberleri alınırken hata:', error);
        // Fallback to static news if API fails
        const fallbackNews = [
            {
                title: "KAP'ta Günün Önemli Duyuruları",
                description: "Şirketlerden önemli açıklamalar...",
                date: new Date().toISOString(),
                link: "https://www.kap.org.tr"
            },
            {
                title: "KAP Duyuruları",
                description: "Güncel şirket duyuruları ve açıklamaları...",
                date: new Date().toISOString(),
                link: "https://www.kap.org.tr"
            },
            {
                title: "KAP'ta Özel Durum Açıklamaları",
                description: "Şirketlerden özel durum açıklamaları...",
                date: new Date().toISOString(),
                link: "https://www.kap.org.tr"
            },
            {
                title: "KAP'ta Finansal Tablolar",
                description: "Şirketlerin finansal tablo açıklamaları...",
                date: new Date().toISOString(),
                link: "https://www.kap.org.tr"
            },
            {
                title: "KAP'ta Genel Kurul Duyuruları",
                description: "Şirketlerin genel kurul toplantı duyuruları...",
                date: new Date().toISOString(),
                link: "https://www.kap.org.tr"
            },
            {
                title: "KAP'ta Günün Özeti",
                description: "KAP'ta günün öne çıkan duyuruları...",
                date: new Date().toISOString(),
                link: "https://www.kap.org.tr"
            }
        ];
        displayKapNews({ result: fallbackNews });
    }
}

// Fetch Cryptocurrency Data
async function fetchCryptoData() {
    try {
        console.log('Fetching cryptocurrency data...');
        const response = await fetch(API_CONFIG.crypto.url, {
            method: 'GET',
            headers: API_CONFIG.crypto.headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Cryptocurrency data received:', data);
        
        // Binance API'sinden gelen veriyi işle
        const processedData = {};
        data.forEach(item => {
            if (item.symbol.endsWith('USDT')) {
                processedData[item.symbol] = {
                    lastPrice: item.lastPrice,
                    priceChangePercent: item.priceChangePercent
                };
            }
        });
        
        displayCryptoData(processedData);
    } catch (error) {
        console.error('Kripto verileri alınırken hata:', error);
        // Fallback to static data if API fails
        const fallbackData = {
            BTCUSDT: { lastPrice: "1000000", priceChangePercent: "2.5" },
            ETHUSDT: { lastPrice: "50000", priceChangePercent: "1.8" },
            BNBUSDT: { lastPrice: "25000", priceChangePercent: "-0.5" },
            XRPUSDT: { lastPrice: "1000", priceChangePercent: "3.2" },
            ADAUSDT: { lastPrice: "500", priceChangePercent: "-1.2" },
            DOGEUSDT: { lastPrice: "100", priceChangePercent: "5.0" },
            SOLUSDT: { lastPrice: "8000", priceChangePercent: "1.5" },
            DOTUSDT: { lastPrice: "400", priceChangePercent: "-0.8" },
            AVAXUSDT: { lastPrice: "3000", priceChangePercent: "2.1" },
            MATICUSDT: { lastPrice: "200", priceChangePercent: "-1.5" },
            LINKUSDT: { lastPrice: "1500", priceChangePercent: "0.9" },
            UNIUSDT: { lastPrice: "600", priceChangePercent: "-0.3" },
            ATOMUSDT: { lastPrice: "500", priceChangePercent: "-0.5" },
            LTCUSDT: { lastPrice: "1000", priceChangePercent: "2.0" },
            XLMUSDT: { lastPrice: "1000", priceChangePercent: "3.0" },
            VETUSDT: { lastPrice: "500", priceChangePercent: "1.0" },
            FILUSDT: { lastPrice: "10000", priceChangePercent: "2.5" },
            THETAUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            TRXUSDT: { lastPrice: "1000", priceChangePercent: "2.0" },
            EOSUSDT: { lastPrice: "5000", priceChangePercent: "1.0" },
            AAVEUSDT: { lastPrice: "10000", priceChangePercent: "1.5" },
            CAKEUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            AXSUSDT: { lastPrice: "5000", priceChangePercent: "1.0" },
            ALGOUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            KSMUSDT: { lastPrice: "10000", priceChangePercent: "1.0" },
            MKRUSDT: { lastPrice: "100000", priceChangePercent: "0.5" },
            COMPUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            GRTUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            SNXUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            SUSHIUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            YFIUSDT: { lastPrice: "100000", priceChangePercent: "0.5" },
            CRVUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            "1INCHUSDT": { lastPrice: "1000", priceChangePercent: "0.5" },
            BALUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            RENUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            UMAUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            BANDUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            NMRUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            OCEANUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            REPUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            BATUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            ZRXUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            KNCUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            ANTUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            LRCUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            OMGUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            STORJUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            MANAUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            ENJUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            ATOMUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            LTCUSDT: { lastPrice: "1000", priceChangePercent: "2.0" },
            XLMUSDT: { lastPrice: "1000", priceChangePercent: "3.0" },
            VETUSDT: { lastPrice: "500", priceChangePercent: "1.0" },
            FILUSDT: { lastPrice: "10000", priceChangePercent: "2.5" },
            THETAUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            TRXUSDT: { lastPrice: "1000", priceChangePercent: "2.0" },
            EOSUSDT: { lastPrice: "5000", priceChangePercent: "1.0" },
            AAVEUSDT: { lastPrice: "10000", priceChangePercent: "1.5" },
            CAKEUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            AXSUSDT: { lastPrice: "5000", priceChangePercent: "1.0" },
            ALGOUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            KSMUSDT: { lastPrice: "10000", priceChangePercent: "1.0" },
            MKRUSDT: { lastPrice: "100000", priceChangePercent: "0.5" },
            COMPUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            GRTUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            SNXUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            SUSHIUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            YFIUSDT: { lastPrice: "100000", priceChangePercent: "0.5" },
            CRVUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            "1INCHUSDT": { lastPrice: "1000", priceChangePercent: "0.5" },
            BALUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            RENUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            UMAUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            BANDUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            NMRUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            OCEANUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            REPUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            BATUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            ZRXUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            KNCUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            ANTUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            LRCUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            OMGUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            STORJUSDT: { lastPrice: "1000", priceChangePercent: "0.5" },
            MANAUSDT: { lastPrice: "10000", priceChangePercent: "0.5" },
            ENJUSDT: { lastPrice: "10000", priceChangePercent: "0.5" }
        };
        console.log('Using fallback cryptocurrency data');
        displayCryptoData(fallbackData);
    }
}

// Fetch BIST Data
async function fetchBistData() {
    try {
        console.log('Fetching BIST data...');
        const response = await fetch(API_CONFIG.bist.url, {
            method: 'GET',
            headers: API_CONFIG.bist.headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('BIST data received:', data);
        displayBistData(data);
    } catch (error) {
        console.error('BIST verileri alınırken hata:', error);
        // Fallback to static data if API fails
        const fallbackData = {
            XU100: { satis: "10000", degisim: "1.5" },
            XU030: { satis: "15000", degisim: "2.0" },
            XUSIN: { satis: "8000", degisim: "-0.5" },
            XUMAL: { satis: "6000", degisim: "0.8" },
            XUTUM: { satis: "12000", degisim: "3.2" },
            XUBAN: { satis: "9000", degisim: "-1.2" },
            XUHIZ: { satis: "7000", degisim: "0.5" },
            XUGIDA: { satis: "5500", degisim: "-0.7" },
            XUSAG: { satis: "4500", degisim: "1.2" },
            XUTAS: { satis: "3500", degisim: "-0.3" },
            XUELK: { satis: "2500", degisim: "0.9" },
            XUULS: { satis: "1800", degisim: "-0.4" },
            XUYAT: { satis: "10000", degisim: "1.5" },
            XUINS: { satis: "8000", degisim: "-0.5" },
            XUEMT: { satis: "6000", degisim: "0.8" },
            XUGRS: { satis: "4500", degisim: "1.2" },
            XUOTM: { satis: "12000", degisim: "3.2" },
            XUKIM: { satis: "5500", degisim: "-0.7" },
            XUTEX: { satis: "3500", degisim: "-0.3" },
            XUELT: { satis: "2500", degisim: "0.9" },
            XUMAK: { satis: "1800", degisim: "-0.4" },
            XUINB: { satis: "3500", degisim: "-0.3" },
            XUPAZ: { satis: "1800", degisim: "-0.4" },
            XUTUR: { satis: "12000", degisim: "3.2" },
            XUMED: { satis: "5500", degisim: "-0.7" },
            XUEGT: { satis: "3500", degisim: "-0.3" },
            XUSAV: { satis: "1800", degisim: "-0.4" },
            XUBIL: { satis: "1800", degisim: "-0.4" },
            XUENR: { satis: "3500", degisim: "-0.3" },
            XUTAR: { satis: "1800", degisim: "-0.4" },
            XUMAD: { satis: "5500", degisim: "-0.7" },
            XUORM: { satis: "1800", degisim: "-0.4" },
            XUBAL: { satis: "1800", degisim: "-0.4" },
            XUHAS: { satis: "1800", degisim: "-0.4" },
            XUSU: { satis: "1800", degisim: "-0.4" },
            XUGAZ: { satis: "1800", degisim: "-0.4" },
            XUATK: { satis: "1800", degisim: "-0.4" },
            XUYUK: { satis: "1800", degisim: "-0.4" },
            XUPAY: { satis: "1800", degisim: "-0.4" },
            XUTAH: { satis: "1800", degisim: "-0.4" },
            XUVAD: { satis: "1800", degisim: "-0.4" },
            XUEND: { satis: "1800", degisim: "-0.4" },
            XUSEC: { satis: "1800", degisim: "-0.4" },
            XUALT: { satis: "1800", degisim: "-0.4" },
            XUGUM: { satis: "1800", degisim: "-0.4" },
            XUPLA: { satis: "1800", degisim: "-0.4" },
            XUPAL: { satis: "1800", degisim: "-0.4" },
            XUBAK: { satis: "1800", degisim: "-0.4" },
            XUÇIN: { satis: "1800", degisim: "-0.4" },
            XUNIK: { satis: "1800", degisim: "-0.4" },
            XUKUR: { satis: "1800", degisim: "-0.4" },
            XUALM: { satis: "1800", degisim: "-0.4" }
        };
        console.log('Using fallback BIST data');
        displayBistData(fallbackData);
    }
}

// Display Borsa News
function displayBorsaNews(data) {
    const borsaNewsContainer = document.getElementById('borsa-news');
    
    if (data.items && data.items.length > 0) {
        const borsaNews = data.items.slice(0, 6);
        borsaNewsContainer.innerHTML = borsaNews.map(news => `
            <div class="news-card">
                <h3>${news.title}</h3>
                <p>${news.snippet}</p>
                <div class="news-meta">
                    <span class="news-date">${formatDate(news.published)}</span>
                    <a href="${news.link}" target="_blank" class="read-more">Devamını Oku</a>
                </div>
            </div>
        `).join('');
    } else {
        borsaNewsContainer.innerHTML = `
            <div class="news-card">
                <h3>Borsa İstanbul Güncel</h3>
                <p>Borsa İstanbul'da güncel gelişmeler ve piyasa verileri...</p>
                <div class="news-meta">
                    <span class="news-date">${formatDate(new Date())}</span>
                    <a href="https://www.bloomberght.com/borsa" target="_blank" class="read-more">Devamını Oku</a>
                </div>
            </div>
        `;
    }
}

// Display KAP News
function displayKapNews(data) {
    const kapNewsContainer = document.getElementById('kap-news');
    
    if (data.result && data.result.length > 0) {
        const kapNews = data.result.slice(0, 6);
        kapNewsContainer.innerHTML = kapNews.map(news => `
            <div class="news-card">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <div class="news-meta">
                    <span class="news-date">${formatDate(news.date)}</span>
                    <a href="${news.link}" target="_blank" class="read-more">Devamını Oku</a>
                </div>
            </div>
        `).join('');
    } else {
        kapNewsContainer.innerHTML = `
            <div class="news-card">
                <h3>KAP Duyuruları</h3>
                <p>Kamu Aydınlatma Platformu'nda güncel duyurular ve açıklamalar...</p>
                <div class="news-meta">
                    <span class="news-date">${formatDate(new Date())}</span>
                    <a href="https://www.kap.org.tr" target="_blank" class="read-more">Devamını Oku</a>
                </div>
            </div>
        `;
    }
}

// Display Cryptocurrency Data
function displayCryptoData(data) {
    const cryptoContainer = document.getElementById('crypto-data');
    if (!cryptoContainer) {
        console.error('Crypto container not found');
        return;
    }

    console.log('Displaying cryptocurrency data:', data);

    const cryptoList = [
        { key: 'BTCUSDT', name: 'Bitcoin', symbol: 'BTC' },
        { key: 'ETHUSDT', name: 'Ethereum', symbol: 'ETH' },
        { key: 'BNBUSDT', name: 'Binance Coin', symbol: 'BNB' },
        { key: 'XRPUSDT', name: 'Ripple', symbol: 'XRP' },
        { key: 'ADAUSDT', name: 'Cardano', symbol: 'ADA' },
        { key: 'DOGEUSDT', name: 'Dogecoin', symbol: 'DOGE' },
        { key: 'SOLUSDT', name: 'Solana', symbol: 'SOL' },
        { key: 'DOTUSDT', name: 'Polkadot', symbol: 'DOT' },
        { key: 'AVAXUSDT', name: 'Avalanche', symbol: 'AVAX' },
        { key: 'MATICUSDT', name: 'Polygon', symbol: 'MATIC' },
        { key: 'LINKUSDT', name: 'Chainlink', symbol: 'LINK' },
        { key: 'UNIUSDT', name: 'Uniswap', symbol: 'UNI' },
        { key: 'ATOMUSDT', name: 'Cosmos', symbol: 'ATOM' },
        { key: 'LTCUSDT', name: 'Litecoin', symbol: 'LTC' },
        { key: 'XLMUSDT', name: 'Stellar', symbol: 'XLM' },
        { key: 'VETUSDT', name: 'VeChain', symbol: 'VET' },
        { key: 'FILUSDT', name: 'Filecoin', symbol: 'FIL' },
        { key: 'THETAUSDT', name: 'Theta Network', symbol: 'THETA' },
        { key: 'TRXUSDT', name: 'TRON', symbol: 'TRX' },
        { key: 'EOSUSDT', name: 'EOS', symbol: 'EOS' },
        { key: 'AAVEUSDT', name: 'Aave', symbol: 'AAVE' },
        { key: 'CAKEUSDT', name: 'PancakeSwap', symbol: 'CAKE' },
        { key: 'AXSUSDT', name: 'Axie Infinity', symbol: 'AXS' },
        { key: 'ALGOUSDT', name: 'Algorand', symbol: 'ALGO' },
        { key: 'KSMUSDT', name: 'Kusama', symbol: 'KSM' },
        { key: 'MKRUSDT', name: 'Maker', symbol: 'MKR' },
        { key: 'COMPUSDT', name: 'Compound', symbol: 'COMP' },
        { key: 'GRTUSDT', name: 'The Graph', symbol: 'GRT' },
        { key: 'SNXUSDT', name: 'Synthetix', symbol: 'SNX' },
        { key: 'SUSHIUSDT', name: 'SushiSwap', symbol: 'SUSHI' },
        { key: 'YFIUSDT', name: 'Yearn Finance', symbol: 'YFI' },
        { key: 'CRVUSDT', name: 'Curve DAO', symbol: 'CRV' },
        { key: '1INCHUSDT', name: '1inch', symbol: '1INCH' },
        { key: 'BALUSDT', name: 'Balancer', symbol: 'BAL' },
        { key: 'RENUSDT', name: 'Ren', symbol: 'REN' },
        { key: 'UMAUSDT', name: 'UMA', symbol: 'UMA' },
        { key: 'BANDUSDT', name: 'Band Protocol', symbol: 'BAND' },
        { key: 'NMRUSDT', name: 'Numeraire', symbol: 'NMR' },
        { key: 'OCEANUSDT', name: 'Ocean Protocol', symbol: 'OCEAN' },
        { key: 'REPUSDT', name: 'Augur', symbol: 'REP' },
        { key: 'BATUSDT', name: 'Basic Attention Token', symbol: 'BAT' },
        { key: 'ZRXUSDT', name: '0x', symbol: 'ZRX' },
        { key: 'KNCUSDT', name: 'Kyber Network', symbol: 'KNC' },
        { key: 'ANTUSDT', name: 'Aragon', symbol: 'ANT' },
        { key: 'LRCUSDT', name: 'Loopring', symbol: 'LRC' },
        { key: 'OMGUSDT', name: 'OMG Network', symbol: 'OMG' },
        { key: 'STORJUSDT', name: 'Storj', symbol: 'STORJ' },
        { key: 'MANAUSDT', name: 'Decentraland', symbol: 'MANA' },
        { key: 'ENJUSDT', name: 'Enjin Coin', symbol: 'ENJ' }
    ];

    cryptoContainer.innerHTML = cryptoList.map(crypto => {
        const cryptoData = data[crypto.key];
        if (!cryptoData) {
            console.warn(`No data found for ${crypto.key}`);
            return '';
        }
        
        const price = parseFloat(cryptoData.lastPrice);
        const change = parseFloat(cryptoData.priceChangePercent);
        const changeClass = change >= 0 ? 'positive' : 'negative';
        
        return `
            <div class="market-data-card">
                <div class="market-data-header">
                    <h3>${crypto.name}</h3>
                    <span class="market-symbol">${crypto.symbol}</span>
                </div>
                <div class="market-data-content">
                    <div class="market-price">${price.toLocaleString('tr-TR')} ₺</div>
                    <div class="market-change ${changeClass}">
                        ${change >= 0 ? '+' : ''}${change.toFixed(2)}%
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Display BIST Data
function displayBistData(data) {
    const bistContainer = document.getElementById('bist-data');
    if (!bistContainer) {
        console.error('BIST container not found');
        return;
    }

    console.log('Displaying BIST data:', data);

    const bistList = [
        { key: 'XU100', name: 'BIST 100' },
        { key: 'XU030', name: 'BIST 30' },
        { key: 'XUSIN', name: 'BIST SINAİ' },
        { key: 'XUMAL', name: 'BIST METAL' },
        { key: 'XUTUM', name: 'BIST TEKNOLOJİ' },
        { key: 'XUBAN', name: 'BIST BANKA' },
        { key: 'XUHIZ', name: 'BIST HOLDİNG' },
        { key: 'XUGIDA', name: 'BIST GIDA' },
        { key: 'XUSAG', name: 'BIST SAĞLIK' },
        { key: 'XUTAS', name: 'BIST TAŞIMACILIK' },
        { key: 'XUELK', name: 'BIST ELEKTRİK' },
        { key: 'XUULS', name: 'BIST ULUSLARARASI' },
        { key: 'XUYAT', name: 'BIST YATIRIM' },
        { key: 'XUINS', name: 'BIST SİGORTA' },
        { key: 'XUEMT', name: 'BIST EMETAL' },
        { key: 'XUGRS', name: 'BIST GAYRİMENKUL' },
        { key: 'XUOTM', name: 'BIST OTOMOTİV' },
        { key: 'XUKIM', name: 'BIST KİMYA' },
        { key: 'XUTEX', name: 'BIST TEKSTİL' },
        { key: 'XUELT', name: 'BIST ELEKTRONİK' },
        { key: 'XUMAK', name: 'BIST MAKİNA' },
        { key: 'XUINB', name: 'BIST İNŞAAT' },
        { key: 'XUPAZ', name: 'BIST PAZARLAMA' },
        { key: 'XUTUR', name: 'BIST TURİZM' },
        { key: 'XUMED', name: 'BIST MEDYA' },
        { key: 'XUEGT', name: 'BIST EĞİTİM' },
        { key: 'XUSAV', name: 'BIST SAVUNMA' },
        { key: 'XUBIL', name: 'BIST BİLİŞİM' },
        { key: 'XUENR', name: 'BIST ENERJİ' },
        { key: 'XUTAR', name: 'BIST TARIM' },
        { key: 'XUMAD', name: 'BIST MADENCİLİK' },
        { key: 'XUORM', name: 'BIST ORMAN' },
        { key: 'XUBAL', name: 'BIST BALIKÇILIK' },
        { key: 'XUHAS', name: 'BIST HAYVANCILIK' },
        { key: 'XUSU', name: 'BIST SU' },
        { key: 'XUGAZ', name: 'BIST GAZ' },
        { key: 'XUATK', name: 'BIST ATAK' },
        { key: 'XUYUK', name: 'BIST YÜKSELEN' },
        { key: 'XUPAY', name: 'BIST PAY' },
        { key: 'XUTAH', name: 'BIST TAHVİL' },
        { key: 'XUVAD', name: 'BIST VADELİ' },
        { key: 'XUEND', name: 'BIST ENDEKS' },
        { key: 'XUSEC', name: 'BIST SEKTÖR' },
        { key: 'XUALT', name: 'BIST ALTIN' },
        { key: 'XUGUM', name: 'BIST GÜMÜŞ' },
        { key: 'XUPLA', name: 'BIST PLATİN' },
        { key: 'XUPAL', name: 'BIST PALLADYUM' },
        { key: 'XUBAK', name: 'BIST BAKIR' },
        { key: 'XUÇIN', name: 'BIST ÇİNKO' },
        { key: 'XUNIK', name: 'BIST NİKEL' },
        { key: 'XUKUR', name: 'BIST KURŞUN' },
        { key: 'XUALM', name: 'BIST ALÜMİNYUM' }
    ];

    bistContainer.innerHTML = bistList.map(bist => {
        const bistData = data[bist.key];
        if (!bistData) {
            console.warn(`No data found for ${bist.key}`);
            return '';
        }
        
        const price = parseFloat(bistData.satis);
        const change = parseFloat(bistData.degisim);
        const changeClass = change >= 0 ? 'positive' : 'negative';
        
        return `
            <div class="market-data-card">
                <div class="market-data-header">
                    <h3>${bist.name}</h3>
                    <span class="market-symbol">${bist.key}</span>
                </div>
                <div class="market-data-content">
                    <div class="market-price">${price.toLocaleString('tr-TR')}</div>
                    <div class="market-change ${changeClass}">
                        ${change >= 0 ? '+' : ''}${change.toFixed(2)}%
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Son güncelleme zamanını güncelle
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('last-update-time').textContent = timeString;
}

// Initialize all data fetching
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing data fetching...');
    fetchBorsaNews();
    fetchKapNews();
    fetchCryptoData();
    fetchBistData();
    
    // İlk güncelleme zamanını ayarla
    updateLastUpdateTime();
    
    // Update market data every 5 seconds
    setInterval(() => {
        console.log('Updating market data...');
        fetchCryptoData();
        fetchBistData();
        updateLastUpdateTime(); // Her veri güncellemesinde zamanı güncelle
    }, 5000);
    
    // Update news every 2 minutes
    setInterval(() => {
        console.log('Updating news...');
        fetchBorsaNews();
        fetchKapNews();
        updateLastUpdateTime(); // Her haber güncellemesinde zamanı güncelle
    }, 120000);
    
    // Her saniye zamanı güncelle
    setInterval(updateLastUpdateTime, 1000);
}); 