// カートの中身を保存する配列
let cart = [];

// 要素の取得
const addBtns = document.querySelectorAll('.add-btn');
const cartList = document.getElementById('cart-list');
const totalPriceElem = document.getElementById('total-price');
const resetBtn = document.getElementById('reset-btn');
const checkoutBtn = document.getElementById('checkout-btn'); // ★追加

// 「カートに追加」ボタンが押されたとき
addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'));

        // カートに追加
        cart.push({ name, price });

        // 画面を更新
        updateCart();
    });
});

// カートの表示を更新する関数
function updateCart() {
    // リストをいったん空にする
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li id="empty-msg">カートは空です</li>';
        totalPriceElem.textContent = '0';
        return;
    }

    let total = 0;

    // カートの中身を1つずつ表示していく
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ¥${item.price.toLocaleString()}`;
        cartList.appendChild(li);

        total += item.price;
    });

    // 合計金額を更新
    totalPriceElem.textContent = total.toLocaleString();
}

// 「カートを空にする」ボタンが押されたとき
resetBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
});

// ★「お会計に進む」ボタンが押されたとき
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('カートに商品が入っていません！お好きなグッズを追加してくださいね。');
        return;
    }

    const total = totalPriceElem.textContent;
    alert(`🎉 ご注文ありがとうございます！\nお支払い総額は ${total}円 です。\n（※お買い物シミュレーター完了です！）`);
    
    // お会計が終わったらカートをリセットする
    cart = [];
    updateCart();
});
// ==========================================
// カテゴリ絞り込み機能
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const goodsCards = document.querySelectorAll('.goods-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. すべてのボタンから「active」を外して、クリックされたボタンだけにつける
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. 押されたボタンのカテゴリを取得
        const filterValue = btn.getAttribute('data-filter');

        // 3. 全ての商品をチェックして、一致しないものを隠す
        goodsCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hidden'); // 表示する
            } else {
                card.classList.add('hidden');    // 隠す
            }
        });
    });
});

// ==========================================
// 価格順並び替え機能
// ==========================================
const sortBtn = document.getElementById('sort-price');
const goodsGrid = document.getElementById('goods-grid');

sortBtn.addEventListener('click', () => {
    // 1. 商品カードを配列（リスト）に変換する
    let cardsArray = Array.from(goodsCards);

    // 2. 価格（data-price）を比較して安い順に並び替える
    cardsArray.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.add-btn').getAttribute('data-price'));
        const priceB = parseInt(b.querySelector('.add-btn').getAttribute('data-price'));
        return priceA - priceB;
    });

    // 3. 並び替えた順番でHTMLに入れ直す
    cardsArray.forEach(card => {
        goodsGrid.appendChild(card);
    });
});

// ==========================================
// FAQアコーディオン開閉機能
// ==========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        // クリックされた質問の親要素（.faq-item）を取得して、activeクラスをつけ外しする
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});