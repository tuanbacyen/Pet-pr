$(document).ready(function(){
  $("#ahihi").click(function(){
    $('#qrcode').qrcode("hello");
    var a = $('#txt').val().trim();
    if(a != ''){
      var b = stringToBinary(a);
      $("#rel").html(b);
      var cp = '<button type="button" class="btn btn-primary" id="mycopy">Copy</button>';
      var cl = '<button type="button" class="btn btn-light" id="myclear">Clear</button>';
      if (!$("#mycopy").length){
        $('#show-rel').append(cp);
        $('#show-rel').append(cl);
      }
    }
  });

  $("#aaaa").click(function(){
    var a = $('#txtCode').val().trim();
    if(a != ''){
      var b = binaryToString(a.split(' '));
      $(this).attr('href', b.trim());
    }
  });

  $('body').on('click', '#mycopy', function(){
    var a = $('#rel').text();
    if(a != ''){
      copyToClipboard(a);
      $('#txtCode').val(a);
    }
  });
  $('body').on('click', '#myclear', function(){
    $('#txtCode').val('');
    $("#rel").html('');
    $('#mycopy').remove();
    $(this).remove();
  });

  function stringToBinary(a){
    if(a.includes('http') && a.includes('//')){

    }
    else{
      a = 'https://' + a;
    }
    var b = '';
    for (var i = 0; i < a.length; i++) {
      b += a[i].charCodeAt(0).toString(2) + " ";
    }
    return b.trim();
  }

  function binaryToString(a){
    var result = '';
    for (var i = 0; i < a.length; i++) {
      result += String.fromCharCode(parseInt(a[i], 2));
    }
    return result;
  }

  function copyToClipboard(elem) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(elem).select();
    document.execCommand("copy");
    $temp.remove();
  }
});
