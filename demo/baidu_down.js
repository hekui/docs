var DocInfo = pageData['docInfo2019']['doc_info'];
var text = '';

var saveFile = (fileName, data) => {
  console.log('saveFile', fileName, data)
  var blob = new Blob([data], {
    type: 'text/plain'
  });
  var elem = window.document.createElement('a');
  elem.href = window.URL.createObjectURL(blob);
  elem.download = fileName;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}


var start = () => {
  console.log('start')
  $('.reader-page').each((index, element) => {
    //debugger;
    var elements = $('.ie-fix>', element);
    text += elements.text();
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
  console.log('text', text)
  // if (is_loop)
  //   setTimeout(copyLoop, 1000);
  // else
  // saveFile(DocInfo.title, text);
}

var $script = document.createElement('script')
$script.src = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js'
$script.addEventListener('load', () => {
  console.log('loaded')
  $('html,body').scrollTop(0);
  start()
})
document.body.appendChild($script)