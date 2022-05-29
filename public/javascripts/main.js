$(document).on('click', 'a#profile', function (event) {
    event.preventDefault();
    var id = $(this).attr('data-id');
  
    $.get(`/getprofile/${id}`, function (data) {
        console.log(data);
      $('#profile-modal').modal('show');
        $('#nama').text(data.data[0].nama);
        $('#npm').text(data.data[0].npm);
        $('#angkatan').text(data.data[0].tahun_masuk);
        $('#tahun_lulus').text(data.data[0].tahun_lulus);
        $('#judul_skripsi').text(data.data[0].judul);
        $('#tempat_bekerja').text(data.data[0].perusahaan);
        $('#tahun_bekerja').text(data.data[0].tahun_bekerja);
        $('#tempat_lahir').text(data.data[0].tempat_lahir);
    });
});

$(document).ready(function(){
  const params = new URLSearchParams(window.location.search);
  var search_value = "";
  var masuk = "";
  var lulus = "";
  var perusahaan = "";

  if(params.has('masuk')){
    masuk = params.get('masuk');
  }
  if(params.has('lulus')){
    lulus = params.get('lulus');
  }
  if(params.has('perusahaan')){
    perusahaan = params.get('perusahaan');
  }
  if(params.has('search')){
    search_value = params.get('search');
  }

  $(document).on('click', '.filter_masuk', function(event){
    event.preventDefault(); 
    var masuk = $(this).val();
    console.log(masuk);
    
    if($(this)[0].hasAttribute("checked")){
      $(this).removeAttr('checked');
      masuk = "";
      if(params.has('search')){
        if(params.has('lulus')){
          if(params.has('perusahaan')){
            window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}&search=${search_value}`);
          }else{
            window.location.replace(`/?search=${search_value}&masuk=${masuk}&lulus=${lulus}`);
          }
        }else if(params.has('perusahaan')){
          window.location.replace(`/?search=${search_value}&masuk=${masuk}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?masuk=${masuk}&search=${search_value}`);
        }
      }else if(params.has('lulus')){
        if(params.has('perusahaan')){
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}`);
        }
      }else if(params.has('perusahaan')){
        window.location.replace(`/?masuk=${masuk}&perusahaan=${perusahaan}`);
      }else{
        window.location.replace(`/?masuk=${masuk}`);
      }

    }else{
      $(this).attr('checked','true');
      if(params.has('search')){
        if(params.has('lulus')){
          if(params.has('perusahaan')){
            window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}&search=${search_value}`);
          }else{
            window.location.replace(`/?search=${search_value}&masuk=${masuk}&lulus=${lulus}`);
          }
        }else if(params.has('perusahaan')){
          window.location.replace(`/?search=${search_value}&masuk=${masuk}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?masuk=${masuk}&search=${search_value}`);
        }
      }else if(params.has('lulus')){
        if(params.has('perusahaan')){
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}`);
        }
      }else if(params.has('perusahaan')){
        window.location.replace(`/?masuk=${masuk}&perusahaan=${perusahaan}`);
      }else{
        window.location.replace(`/?masuk=${masuk}`);
      }

      
    }
  });

  $(document).on('click', '.filter_lulus', function(event){
    event.preventDefault(); 
    var lulus = $(this).val();
    console.log(lulus);
    
    if($(this)[0].hasAttribute("checked")){
      $(this).removeAttr('checked');
      lulus = "";
      if(params.has('search')){
        if(params.has('masuk')){
          if(params.has('perusahaan')){
            window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}&search=${search_value}`);
          }else{
            window.location.replace(`/?search=${search_value}&masuk=${masuk}&lulus=${lulus}`);
          }
        }else if(params.has('perusahaan')){
          window.location.replace(`/?search=${search_value}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?lulus=${lulus}&search=${search_value}`);
        }
      }else if(params.has('masuk')){
        if(params.has('perusahaan')){
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}`);
        }
      }else if(params.has('perusahaan')){
        window.location.replace(`/?lulus=${lulus}&perusahaan=${perusahaan}`);
      }else{
        window.location.replace(`/?lulus=${lulus}`);
      }

    }else{
      $(this).attr('checked','true');
      if(params.has('search')){
        if(params.has('masuk')){
          if(params.has('perusahaan')){
            window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}&search=${search_value}`);
          }else{
            window.location.replace(`/?search=${search_value}&masuk=${masuk}&lulus=${lulus}`);
          }
        }else if(params.has('perusahaan')){
          window.location.replace(`/?search=${search_value}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?lulus=${lulus}&search=${search_value}`);
        }
      }else if(params.has('masuk')){
        if(params.has('perusahaan')){
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}`);
        }
      }else if(params.has('perusahaan')){
        window.location.replace(`/?lulus=${lulus}&perusahaan=${perusahaan}`);
      }else{
        window.location.replace(`/?lulus=${lulus}`);
      }
    }
  });

  $(document).on('click', '.filter_perusahaan', function(event){
    event.preventDefault(); 
    var perusahaan = $(this).val();
    console.log(perusahaan);
    
    if($(this)[0].hasAttribute("checked")){
      $(this).removeAttr('checked');
      perusahaan = "";
      if(params.has('search')){
        if(params.has('masuk')){
          if(params.has('lulus')){
            window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}&search=${search_value}`);
          }else{
            window.location.replace(`/?search=${search_value}&masuk=${masuk}&perusahaan=${perusahaan}`);
          }
        }else if(params.has('lulus')){
          window.location.replace(`/?search=${search_value}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?perusahaan=${perusahaan}&search=${search_value}`);
        }
      }else if(params.has('masuk')){
        if(params.has('lulus')){
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?masuk=${masuk}&perusahaan=${perusahaan}`);
        }
      }else if(params.has('lulus')){
        window.location.replace(`/?lulus=${lulus}&perusahaan=${perusahaan}`);
      }else{
        window.location.replace(`/?perusahaan=${perusahaan}`);
      }

    }else{
      $(this).attr('checked','true');
      if(params.has('search')){
        if(params.has('masuk')){
          if(params.has('lulus')){
            window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}&search=${search_value}`);
          }else{
            window.location.replace(`/?search=${search_value}&masuk=${masuk}&perusahaan=${perusahaan}`);
          }
        }else if(params.has('lulus')){
          window.location.replace(`/?search=${search_value}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?perusahaan=${perusahaan}&search=${search_value}`);
        }
      }else if(params.has('masuk')){
        if(params.has('lulus')){
          window.location.replace(`/?masuk=${masuk}&lulus=${lulus}&perusahaan=${perusahaan}`);
        }else{
          window.location.replace(`/?masuk=${masuk}&perusahaan=${perusahaan}`);
        }
      }else if(params.has('lulus')){
        window.location.replace(`/?lulus=${lulus}&perusahaan=${perusahaan}`);
      }else{
        window.location.replace(`/?perusahaan=${perusahaan}`);
      }
    }
  });
});