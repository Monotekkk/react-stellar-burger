const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
ws.onopen = function () {
    console.log('Соединение установлено');
}
ws.onmessage = function (event) {
    return JSON.parse(event.data)
}
export default ws;