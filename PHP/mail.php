<?php
    if(!empty($_POST)){
        $name = $_POST['name'];
        $mailaddress = $_POST['mailaddress'];
        $message = $_POST['message'];
        
        //メール送信処理
        $from = $mailaddress;
        $to = 'mzk821@icloud.com';
        $subject = $name.'様からお問い合わせです';
        $description = $comment;
        
        //フォームの内容が空でなければメールを送信する
        if(!empty($from) && !empty($subject) && !empty($description)){
            md_language("Japanese");
            md_internal_encoding("UTF-8");
            
            //メール送信
            $result = md_send_mail($to, $subject, $description, "From:".$from);
            
            //送信結果を判定
            if($result){
                echo json_encode(array('result' => true, 'msg' => 'メールを送信しました'));
                
            }else{
                echo json_encode(array('result' => false));
            }
        }
        
        //フォームに空の項目がありエラー
        echo json_encode(array('result' => false, 'msg' => 'メール送信に失敗しました'));
    }