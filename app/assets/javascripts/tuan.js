$(document).ready(function(){
  $("#ahihi").click(function(){
    var a = $('#txt').val().trim();
    if(a != ''){
      clear();
      var he = parseInt($('#select-end-code').val().toString());
      if(he == 999){
        stringToQrcode(a);
      }else{
        var b = stringToBinary(a, he);
        $("#rel").html(b);
        var cp = '<button type="button" class="btn btn-primary" id="mycopy">Copy</button>';
        if (!$("#mycopy").length){
          $('#show-rel').append(cp);
        }
      }
      var cl = '<button type="button" class="btn btn-light" id="myclear">Clear</button>';
      if(!$("#myclear").length){
        $('#show-rel').append(cl);
      }
    }
  });

  $("#aaaa").click(function(){
    var a = $('#txtCode').val().trim();
    if(a != ''){
      var he = parseInt($('#select-end-code').val().toString());
      var b = binaryToString(a.split(' '), he);
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
    clear();
    $(this).remove();
  });

  function clear(){
    $('#qrcode').html(' ');
    $("#rel").html('');
    $('#mycopy').remove();
    $('#txtCode').val('');
  }

  function stringToBinary(a, h){
    if(a.includes('http') && a.includes('//')){
    }
    else{
      a = 'https://' + a;
    }
    var b = '';
    for (var i = 0; i < a.length; i++) {
      b += a[i].charCodeAt(0).toString(h) + " ";
    }
    return b.trim();
  }

  function stringToQrcode(a){
    $('#qrcode').html('');
    $('#qrcode').qrcode(a.toString());
  }

  function binaryToString(a, h){
    var result = '';
    for (var i = 0; i < a.length; i++) {
      result += String.fromCharCode(parseInt(a[i], h));
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
