// magic.js
$(document).ready(function() {

    var pageHome = $('#home');
    var pageLogin = $('#login');
    var exitApp = $('#exitApp');

    $('.text-err-barang').hide();
    $('#step2').hide();
    $('#step3').hide();

    $.get("core/MainController.php", function(data, status){

        var duce = jQuery.parseJSON(data);
        // Get Data length
        // console.log(Object.keys(duce).length);

        // Display the data in main table
        $.each(duce, function (index, item) {
            var eachrow = "<tr>"
                + "<td>" + index + "</td>"
                + "<td>" + item["kode"] + "</td>"
                + "<td>" + item["nama_barang"] + "</td>"
                + "<td>" + "Rp. " + parseFloat(item["harga"]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "</td>"
                + "</tr>";
            $('#mainData').append(eachrow);
        });

        $('#btnBeli').click(function () {
            var status_kode = 0;
            var status_barang = 0;

            var barang_true = [];
            for (var i =1; i <= countBarang; i++) {
                if ($('input#Kodebarang'+i).val() === ""){
                    $('.text-err-1-'+i).show();
                } else {
                    $('.text-err-1-'+i).hide();
                    status_kode += 1;
                }
                if ($('input#barang'+i).val() === ""){
                    $('.text-err-2-'+i).show();
                } else {
                    $('.text-err-2-'+i).hide();
                    status_barang += 1;
                }
                for (var a =1; a <= Object.keys(duce).length; a++) {
                    if ($('input#Kodebarang'+i).val() == duce[a].kode) {
                        barang_true.push($('input#Kodebarang'+i).val());
                    }
                }
            }
            if (!(status_kode == countBarang && status_barang == countBarang)) {
                alert('Tidak dapat memproses barang');
            } else {
                var counter = 0;
                var arr_result = [];
                $.each(duce, function (index, item) {

                    if ($.inArray(item["kode"], barang_true) !== -1)  {
                        counter++;
                        arr_result.push([
                            item.kode,
                            item.nama_barang,
                            $('input#barang'+counter).val(),
                            item.harga,
                            parseFloat($('input#barang'+counter).val()) * parseFloat(item.harga)
                        ]);
                    }
                });
                var $overall = 0;
                var nom = 0;
                $.each(arr_result, function (index, item) {
                    nom++;
                    $overall+= item[4];
                    var resultrow = "<tr>"
                        + "<td>" + nom + "</td>"
                        + "<td>" + item[0] + "</td>"
                        + "<td>" + item[1] + "</td>"
                        + "<td>" + item[2] + "</td>"
                        + "<td>" + "Rp. " + parseFloat(item[4]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "</td>"
                        + "</tr>";
                    $('#resultData').append(resultrow);
                });
                var totalresultrow = "<tr class='bg-info text-white'>"
                    + "<td></td>"
                    + "<td></td>"
                    + "<td></td>"
                    + "<td>Total Harga : </td>"
                    + "<td>" + "Rp. " + parseFloat($overall).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +"</td>"
                    + "</tr>";
                $('#resultData').append(totalresultrow);
                // console.log(arr_result);
                $('#step2').animate({
                    opacity: 0,
                }, 'slow', 'linear', function() {
                    $(this).hide();
                    $('#step3').show();
                });
            }
        });
    });

    exitApp.click(function () {
        localStorage.removeItem('user');
        console.log("User deleted");
        pageHome.hide();
        pageLogin.show();
        // location.reload();

    });

    if (localStorage.getItem("user") === null) {
        pageHome.hide();
        pageLogin.show();
    } else {
        pageHome.show();
        pageLogin.hide();
    }

    // process the form
    $('#formUser').submit(function(event) {
        $('.form-group').removeClass('has-error'); // remove the error class
        $('.help-block').remove(); // remove the error text
        var inputName = $('input[name=name]').val();
        var formData = {
            'name' : inputName,
        };
        // process the form
        $.ajax({
            type 		: 'POST',
            url 		: 'core/SigninController.php',
            data 		: formData,
            dataType 	: 'json',
            encode 		: true
        })
            .done(function(data) {
                console.log(data);
                if ( ! data.success) {
                    if (data.errors.name) {
                        $('#name').addClass('has-error'); // add the error class to show red input
                        $('#name').append('<div class="help-block">' + data.errors.name + '</div>'); // add the actual error message under our input
                    }
                } else {
                    // $('form').append('<div class="alert alert-success">' + data.message + '</div>');
                    localStorage.setItem('user', inputName);
                    $('#textWelcome').text("Selamat Datang, "+localStorage.getItem('user'));
                    console.log("Current User:" + localStorage.getItem('user'));
                    $('input[name=name]').val("");

                    pageLogin.hide();
                    pageHome.show();
                }
            })
            .fail(function(data) {
                console.log(data);
            });
        event.preventDefault();
    });
    var countBarang = 0;
    $('#btnBarang').click(function(){
        if ($('input#totalBarang').val() === ""){
            $('.text-err-barang').show();
        } else {
            var inputID = [];
            var inputKode = [];
            var inputBanyak = [];
            var indexNo = 0;
            countBarang = $('input#totalBarang').val();
            for (var i=1; i <= $('input#totalBarang').val(); i++) {
                indexNo++;
                inputID[i] = 'IDbarang'+i;
                inputKode[i] = 'Kodebarang'+i;
                inputBanyak[i] = 'barang'+i;
                var barangval = "<div class='form-group row'>" +
                    "<label for='barang' class='col-sm-3 col-form-label'>Barang ke - " + indexNo +  "</label>" +
                    "<div class='col-sm-4'><input type='text' class='form-control' id='"+inputKode[i]+"' placeholder='Masukan Kode Barang'></div>" +
                    "<div class='col-sm-3'><input type='number' class='form-control' id='"+inputBanyak[i]+"' placeholder='Jumlah'></div>" +
                    "<div class='col-md-4 offset-md-3 text-err-1-"+ i +"'><span class=\"text-danger \">* Kode barang is required</span></div>" +
                    "<div class='col-md-4 offset-md-3 text-err-2-"+ i +"'><span class=\"text-danger \">* Jumlah is required</span></div>" +
                    "</div>";

                $('#barangloop').append(barangval);
                $('.text-err-1-'+i).hide();
                $('.text-err-2-'+i).hide();
            }



            $('.text-err-barang').hide();
            $('#step1').animate({
                opacity: 0, // animate slideUp
            }, 'slow', 'linear', function() {
                $(this).hide();
                $('#step2').show();
                $('input#totalBarang').val("");
            });
        }
    });

    // Reset the form
    $('.btnReset').click(function () {
        location.reload();
    });
});
