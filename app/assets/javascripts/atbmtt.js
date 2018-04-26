$(document).ready(function(){
  $("#ptnd-tk").click(function(){
    var a = parseInt($('#ptnd-soa').val().trim());
    var n = parseInt($('#ptnd-son').val().trim());
    var check = 0;
    if ($('#ptnd-check-all').is(":checked"))
    {
      a = 1;
      check = 1;
    }
    if (a > n){
      $('#ptnd-show-kq').html("a không thuộc Zn");
    }else if (!Number.isInteger(a) || !Number.isInteger(n)){
      $('#ptnd-show-kq').html("1 trong 2 gía trị không phải là số");
    }else if(UCLN(a, n) === 1){
      send_ajax(a, n, check, 'timptnd');
    }else{
      $('#ptnd-show-kq').html("Số a và Số n vi phạm điều kiện có UCLN là 1");
    }
  });

  $("#bigmod-tk").click(function(){
    var a = parseInt($('#bigmod-soa').val().trim());
    var x = parseInt($('#bigmod-sox').val().trim());
    var n = parseInt($('#bigmod-son').val().trim());

    send_ajax_big(a, x, n, 'timbigmod');
  });

  $("#ptnd-check-all").change(function(){
    var a = parseInt($('#ptnd-soa').val().trim());
    var n = parseInt($('#ptnd-son').val().trim());
    if (this.checked)
    {
      $('#ptnd-gr-soa').hide();
    }else{
      $('#ptnd-gr-soa').show();
    }
  });

  function send_ajax(a, n, c, url) {
    var check = 0;
    if ($('#ptnd-check-all').is(":checked"))
    {
      check = 1;
    }
    $.ajax({
      type: 'POST',
      url: url,
      data: {soa: a, son: n, check: c},
      dataType: 'json',
      success: function(data){
        if (check == 0){
          if (data.data == '1'){
            $('#ptnd-show-kq').html('Không tồn tại số nghịch đảo.');
          }else{
            $('#ptnd-show-kq').html(data.data);
          }
        }else{
          var show = '';
          for(i = 0; i < data.data.length; i++){
            show += 'Phần tử nghịch đảo của ' + data.data[i].split('-')[0] + ' trong Zn là : ' + data.data[i].split('-')[1] + '<br>';
          }
          $('#ptnd-show-kq').html(show);
        }
      },
      error: function (error_message){
        alert(error_message);
      }
    });
  }

  function send_ajax_big(a, x, n, url) {
    $.ajax({
      type: 'POST',
      url: url,
      data: {soa: a, sox: x, son: n},
      dataType: 'json',
      success: function(data){
        $('#bigmod-show-kq').html(data.data);
      },
      error: function (error_message){
        alert(error_message);
      }
    });
  }

  function UCLN(a, b) {
    while(a != b){
      if(a > b)
        a = a - b;
      else
        b = b - a;
    }
    return a;
  }
});
