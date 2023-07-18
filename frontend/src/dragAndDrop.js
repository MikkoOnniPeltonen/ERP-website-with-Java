$(function() {
    $("#salesList, #productionList, #inProductionList").sortable({
        connectWith: ".list-group"
    }).disableSelection();
});

$("#saveButton").click(function() {
    // Save the updated production list
});

$("#sendButton").click(function() {
    // Send the updated production list to the in production list
});

$("#updateButton").click(function() {
    var id = $("#productIdInput").val();
    var productionLine = $("#productionLineInput").val();
    
    $.ajax({
        url: "/update",
        type: "post",
        data: { id: id, productionLine: productionLine },
        success: function(data) {
            // Update the production line for the product in the UI
        }
    });
});
