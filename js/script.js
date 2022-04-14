/* global $*/
$(function(){
	$('.ex1').textyleF();

        class Contact {
            name;
            mailaddress;
            message;
            
            constructor(name, mailaddress, message){
                this.name = name;
                this.mailaddress = mailaddress;
                this.message = message;
            }
            
            validate(){
                $('#form span').remove();
                let flag = true;
                if(this.name === ''){
                    $('input[id="name"]').before($('<span>', {text: '名前を入力してください'}));
                    flag = false;
                }
                if(this.email === ''){
                    $('input[id="mailaddress"]').before($('<span>', {text: 'メールアドレスを入力してください'}));
                    flag = false;
                }else if(!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(this.email)){
                    $('input[id="mailaddress"]').before($('<span>', {text: 'メールアドレスを正しく入力してください'}));
                    flag =false;
                    $('input[name="mailaddress"]').val('');
                }
                if(this.message === ''){
                    $('input[id="message"]').before($('<span>', {text: 'メッセージを入力してください'}));
                    flag = false;
                }
                $('span').addClass('error');
                return flag;
            }
        }
        
        $('#submit').on('click', () => {
            e.preventDefault();
            const name = $('input[id="name"]').val();
            const email = $('input[1d="mailaddress"]').val();
            const message = $('input[id="message"]').val();
            const contact = new Contact(name, email, message);
            
            let flag = contact.validate();
            
            if(flag){
                console.log('入力OK');
                $('input').val('');
                $('textarea').val('');
                
                // Ajax
                $.ajax({
                   type: 'post',
                   url: 'mail.php',
                   datatype: '',
                   data: {
                       name: $('#name').val(),
                       email: $('#mailaddress').val(),
                       message: $('#message').val()
                   }
                }).done(function(data){ //ajax通信が成功したら
                    if(data.result){
                        //メール送信に成功した時の処理
                        //画面にメッセージを表示、画面をリロードなど
                    }else{
                        //メール送信に失敗した時の処理
                        
                        //画面にメッセージを表示など
                    }
                });
            }else{
                console.log('入力ミス');
            }
        });
        
        $('a').on('click', function() {
            const adjust = 0;
            const speed = 1000;
            const href = $(this).attr("href");
            console.log('href: ' + href);
            const goal = $(href);
            console.log('goal offset_left: ' + goal.offset().left + 'px');
            console.log('goal offset_top: ' + goal.offset().top + 'px');
            
            const position_top = goal.offset().top + adjust;
            $('body, html').animate({scrollTop: position_top}, speed, 'swing');
            
            return false;
        });
});

