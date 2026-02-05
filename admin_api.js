// ▼ここにGASのウェブアプリURLを貼り付けてください
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbwL63W6bjqZUkXGIGTA0WvvBGm5kFa1azEjUb-27tA11fg96Uq7h2g0Yf1zlcmH75cOlw/exec";

/**
 * GAS APIとの通信を行う共通関数
 */
async function callGasApi(action, payload = {}) {
    // 1. パスワードの取得
    const password = document.getElementById('auth-password')?.value;
    
    if (!password) {
        throw new Error("パスワードが入力されていません。");
    }

    // 2. 送信データ構築
    const requestData = {
        action: action,
        auth: password,
        payload: payload
    };

    // 3. 通信 (POST)
    // CORSエラー回避のため "text/plain" として送信し、GAS側でパースさせる方式を採用
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(requestData)
    };

    try {
        const response = await fetch(GAS_API_URL, options);
        const json = await response.json();

        if (json.success) {
            return json.data;
        } else {
            throw new Error(json.error || "サーバーエラーが発生しました");
        }
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
}