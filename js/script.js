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
                if(this.mailaddress === ''){
                    $('input[id="mailaddress"]').before($('<span>', {text: 'メールアドレスを入力してください'}));
                    flag = false;
                }else if(!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(this.mailaddress)){
                    $('input[id="mailaddress"]').before($('<span>', {text: 'メールアドレスを正しく入力してください'}));
                    flag = false;
                    $('input[id="mailaddress"]').val('');
                }
                if(this.message === ''){
                    $('textarea[id="message"]').before($('<span>', {text: 'メッセージを入力してください'}));
                    flag = false;
                }
                $('span').addClass('error');
                return flag;
            }
        }
        
        $('#submit').on('click', (e) => {
            e.preventDefault();
            const name = $('input[id="name"]').val();
            const mailaddress = $('input[id="mailaddress"]').val();
            const message = $('textarea[id="message"]').val();
            const contact = new Contact(name, mailaddress, message);
            console.log(contact);
            
            let flag = contact.validate();
            
            if(flag){
                console.log('入力OK');
                $('input').val('');
                $('textarea').val('');
                
                $.ajax({
                   type: 'POST',
                   url: 'PHP/mail.php',
                   datatype: 'json',
                   data: {
                       name: contact.name,
                       mailaddress: contact.mailaddress,
                       message: contact.message
                   }
                }).done(function(data){
                    console.log(data['result']);
                    if(data['result']) {
                        alert(contact.name + "さんのメッセージが送信されました");
                    }else{
                        alert(contact.name + "さんのメッセージの送信に失敗しました");
                    }
                }).fail(function(data){
                    console.log(data['result']);
                    alert(contact.name + "さんのメッセージの送信に失敗しました");
                });
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

