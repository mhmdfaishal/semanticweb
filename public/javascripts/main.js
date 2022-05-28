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