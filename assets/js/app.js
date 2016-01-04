$(function() {
	$("#update").click(function(e){
		var a = document.getElementById('nama').value;
		if(a=='')
		{
			alert("Isi nama anda");
			return false;
		}
		var b = document.querySelector("#nim").value;
		if(b=='')
		{
			alert("Isi NIM anda!");
			return false;
		}
		if(b.length!=9)
		{
			alert("NIM Mikroskil berjumlah 9");
			return false;
		}
		for(var i=0;i<b.length;i++)
		{
			if(b[i]<'0' || b[i]>'9')
			{
				alert("Bukan NIM Mikroskil");
				return false;
			}
		}
		var c= document.querySelector("#email").value;
		if(c=='')
		{
			alert("Isi email yang bisa dihubungi");
			return false;
		}
		var d = document.querySelector("#notelp").value;
		if(d=='')
		{
			alert("Isi no.telp yang bisa dihubungi");
			return false;
		}
		/*$.ajax({
			url:'/user/createPeserta',
			data:{nama:a, nim:b, email:c, notelp:d},
			type:'POST',
			success : function(data){
				window.location.assign('/user/thankyou');
			}.bind(this)
		});*/
	});
});

var clock;

      $(document).ready(function() {

        // Grab the current date
        var currentDate = new Date();

        var futureDate  = new Date(currentDate.getFullYear(), 0, 7);

        // Calculate the difference in seconds between the future and current date
        var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

        if(diff<=0)
        {
        		diff=0;
        		var daftar = document.querySelector('#info');
        		daftar.innerHTML = "<h1 style='text-align:center;'>Pendaftaran Ditutup</h1>";
        }
        // Instantiate a coutdown FlipClock
        clock = $('.clock').FlipClock(diff, {
          clockFace: 'DailyCounter',
          countdown: true
        });
      });
