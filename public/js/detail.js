$(function(){
    $('.panel').on('click','.comment',function(){
        var toId = $(this).data('tid');
        var commentId = $(this).data('cid');
        
        if($('#toId').length){
            $('#toId').val(toId)
        }else{
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm')
        }

        if($('#commentId').length){
            $('#commentId').val(commentId)
        }else{
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm')
        }
    })
})