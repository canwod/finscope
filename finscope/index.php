<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FinScope</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="header-content">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                <span>FinScope</span>
            </div>
            <div class="last-update">
                <i class="fas fa-sync-alt"></i>
                <span>Son Güncelleme: <span id="last-update-time"></span></span>
            </div>
        </div>
    </header>

    <div class="container">
        <main>
            <!-- Piyasa Verileri Bölümü -->
            <section class="market-section">
                <div class="section-header">
                    <h2 class="section-title">
                        <i class="fas fa-coins"></i>
                        KRİPTOLAR
                    </h2>
                    <div class="section-actions">
                        <button class="refresh-btn" onclick="fetchCryptoData()">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
                <div id="crypto-data" class="market-data-container"></div>
            </section>

            <section class="market-section">
                <div class="section-header">
                    <h2 class="section-title">
                        <i class="fas fa-chart-bar"></i>
                        BIST ENDEKSLERİ
                    </h2>
                    <div class="section-actions">
                        <button class="refresh-btn" onclick="fetchBistData()">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
                <div id="bist-data" class="market-data-container"></div>
            </section>
        </main>

        <!-- Haberler Bölümü -->
        <section class="news-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-newspaper"></i>
                    BORSA HABERLERİ
                </h2>
                <div class="section-actions">
                    <button class="refresh-btn" onclick="fetchBorsaNews()">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
            <div id="borsa-news" class="news-container"></div>
        </section>

        <section class="news-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-bullhorn"></i>
                    KAP DUYURULARI
                </h2>
                <div class="section-actions">
                    <button class="refresh-btn" onclick="fetchKapNews()">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
            <div id="kap-news" class="news-container"></div>
        </section>
    </div>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>FinScope</h3>
                <p>Gerçek zamanlı piyasa verileri ve finansal haberler</p>
            </div>
            <div class="footer-section">
                <h3>İletişim</h3>
                <p><i class="fas fa-envelope"></i> info@finscope.com</p>
                <p><i class="fas fa-phone"></i> +90 212 123 45 67</p>
            </div>
            <div class="footer-section">
                <h3>Sosyal Medya</h3>
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 FinScope. Tüm hakları saklıdır.</p>
            <p class="disclaimer">Bu sitede yer alan bilgiler yatırım tavsiyesi değildir. Yatırım kararlarınızı kendi sorumluluğunuzda alınız.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html> 