
function getChannel() {
    var userName = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "esl_sc2", "cretetion", "TR7K","comster404","ogamingsc2","brunofin"];
    $.each(userName, function(index, value) {

        $.getJSON('https://api.twitch.tv/kraken/streams/' + value + '?callback=?', function(data) {
        	var status = data.stream;
        	var game;
        	if(typeof status=="undefined"){
        		status="offline";
        		game="Account Closed";
        	}
        	else if (status==null){
        		status="offline";
        		game="Offline";
        	}
        	else{
        		status="online";
        		game=data.stream.game;
        	}

            $.getJSON('https://api.twitch.tv/kraken/channels/' + value + '?callback=?', function(data) {
			var logo = data.logo == null ? "http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F" : data.logo
            var link = data.url;
            var name = data.display_name == null ? value:data.display_name;

                var html = ("<div class='row content "+status+"'><div class='col-sm-2 col-xs-3 logo'>"+
                	"<img class='logoImage' src=" + logo + "></div><div class='col-sm-8 col-xs-9 links'>"+
                	"<a target='_blank' href=" + link + ">" + name + "</a></div><div class='col-sm-8 col-xs-9 status'>"+game+"</div></div>");
                status=="online"?$('.display').prepend(html):$('.display').append(html);
            });

        });
    });
}


$(document).ready(function() {
    getChannel();

    $('.select>.row>div').click(function(){
   		var checkClass = $(this).attr("class");
   		if(checkClass.indexOf("status-all")>-1)
   		{
   			$('.offline').css("display","block");
   			$('.online').css("display","block");
   		}
   		else if(checkClass.indexOf("status-offline")>-1)
   		{
   			$('.offline').css("display","block");
   			$('.online').css("display","none");
   		}
   		else{
   			$('.offline').css("display","none");
   			$('.online').css("display","block");
   		}
    });

});