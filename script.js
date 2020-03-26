    $(function() {
    // ヘッダーの高さ分だけコンテンツを下げる
        var height=$('header').height();
        $('body').css('margin-top', height + 15); // 15pxだけ余裕をもたせる
    });

    $('#btn_todo').click(function(){
    // やること記入モーダルを開く
        // オーバーレイ用のHTMLコードを、[body]内の最後に生成する
        $('body').append('<div id="modal-overlay"></div>');

        $('#modal-overlay').fadeIn('slow');
        centeringModalSyncer();
        $('#modal-todo').fadeIn('slow');
    });

    function centeringModalSyncer(){
    // センタリングをする関数
        // 画面(ウィンドウ)の幅を取得し、変数[w]に格納
        var w = $(window).width();

        // 画面(ウィンドウ)の高さを取得し、変数[h]に格納
        var h = $(window).height();

        // コンテンツ(#modal-todo)の幅を取得し、変数[cw]に格納
        var cw = $('#modal-todo').outerWidth();

        // コンテンツ(#modal-todo)の高さを取得し、変数[ch]に格納
        var ch = $('#modal-todo').outerHeight();

        // コンテンツ(#modal-content)を真ん中に配置するのに、左端から何ピクセル離せばいいか？を計算して、変数[pxleft]に格納
        var pxleft = ((w - cw)/2);

        // コンテンツ(#modal-todo)を真ん中に配置するのに、上部から何ピクセル離せばいいか？を計算して、変数[pxtop]に格納
        var pxtop = ((h - ch)/2);

        // [#modal-todo]のCSSに[left]の値(pxleft)を設定
        $('#modal-todo').css({"left": pxleft + 'px'});

        // [#modal-todo]のCSSに[top]の値(pxtop)を設定
        $('#modal-todo').css({"top": pxtop + 'px'});
    }

    $('#modal-overlay,#modal-close').unbind().click(function(){
    // モーダル閉じる
        $('#modal-todo, #modal-overlay').fadeOut('slow',function(){
            //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
            $('#modal-overlay').remove();
            // フォームをリセットする
            $('#input-form')[0].reset();
        });
    });
    
    $('#todo_submit').click(function(){
    // 保存ボタン押下時処理
    var todoTitle = $('#todo-title').val();
    var todoContent = $('#todo-content').val();
        if(todoTitle == '' || todoContent == ''){
        // 空入力チェック
            alert('どっちも必須入力です！');
            return false;
        } else if(todoTitle.match(/^[ 　¥r¥n¥t]*$/) || todoContent.match(/^[ 　¥r¥n¥t]*$/)) {
        // スペース入力チェック
            alert('スペースのみは登録できません。');
            return false;
        }
        
        // 元画面にやることリストを生成する
        $('#todo-list-ul').append(`<li class="todo_list" id="">
                <div class="todo_list_title" id=""><span>` + todoTitle + `</span></div>
                <div class="todo_list_content" id=""><span>` + todoContent + `</span></div>
                <div class="todo_icon_area"><input type="checkbox" name="done" class="check_done" id="">
                    <i class="fas fa-trash delete"></i>
                </div>
            </li>
        `);
        
        $('#modal-todo, #modal-overlay').fadeOut('slow', function(){
            // フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
            $('#modal-overlay').remove();
            // フォームをリセットする
            $('#input-form')[0].reset();
        });
    });
    
    $(document).on('click', 'input[type="checkbox"]', function(){
    // 完了未完チェックのイベント
        if($(this).prop('checked') == true) {
        // 取り消し線をつける
            // TODO: 完了/未完了ラベルをつける
            // HACK: もうちょっとスマートな書き方みつける
            $(this).parents().children('.todo_list_title').css('text-decoration','line-through');
            $(this).parents().children('.todo_list_content').css('text-decoration','line-through');
        } else {
            $(this).parents().children('.todo_list_title').css('text-decoration','none');
            $(this).parents().children('.todo_list_content').css('text-decoration','none');
        }
    });
    
    $(document).on('click', 'i.delete', function(){
    // todoを削除するイベント
        // TODO: 削除確認ダイアログつける
        $(this).parents('li').remove();
    });