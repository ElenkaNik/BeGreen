
function sendRequest(method = 'GET', data) {
  $.ajax({
    url: 'http://localhost:3000/products',
    method,
    data
  }).done((result) => {
    if (result === 'ok') {
      console.log('WOOOHOOO, we did it');
    } else {
      const array = JSON.parse(result);
      products = array;
    }
  });
}

function sendOrder(order) {
  let json = JSON.stringify(order);
  sendRequest('POST', { json });
}
