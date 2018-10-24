function deleteRecord(id) {
    const url = ORIGINAL_URL + '?id=' + id;
    $.ajax({
        url,
        type: 'DELETE',
        success: function (result) {
            alert('success')
        },
        error: function (err) {
            alert(JSON.stringify(err.responseJSON))
        }
    })
}
$(document).ready(function () {
    $('.model_action_delete').click(function () {
        const id = $(this).attr('data-id');
        console.log(id)
        deleteRecord(id);
    })
})