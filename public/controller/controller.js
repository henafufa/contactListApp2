// $(document).ready(function(){
// }); optional
$(function(){
    console.log('document loaded');
    var NAME='check';
    $("#detail").hide();
    $("#more").click(function(){
        $('#detail').show();
    });
    var contatcData=[];
    getContact();

   //display data returned from server into table 
    function displayData(){
        contatcData.forEach(function(element){
            $('#tdata').append("<tr>"+
            "<td>"+element.name+"</td>"+
            "<td>"+element.email+"</td>"+
            "<td>"+element.phone+"</td>"+
            "<td><button class='btn-update' id='edit'>Edit</button></td>"+
            "<td><button class='btn-delete' id='delete'>Delete</button></td>"+
           "</tr>"
           );
    
        });
        $('#edit').click(function(){
            console.log('edit clicked');
       });
       $('#delete').click(function(){
        console.log('delete clicked');
        });
    }

    //ajax request to post contact to the server
    function postContact(mydata){
            $.ajax({
                type:'POST',
                url: 'api/addContact',
                contentType:'application/json',
                data:JSON.stringify(mydata),
                success:function(res){
                        console.log('addContact succeed:', res)
                },
                error:function(er){
                        console.log('addContact error',er);
                }
            });
        }

    //ajax request to get contact list from server
    function getContact(){
        $.ajax({
            type:'GET',
            url:'api/getContact',
            contentType:'application/json',
            success:function(res){
                console.log('getContact succeed:', res);
                contatcData=res;
                console.log('storage in controller',contatcData);
                $('#tdata').html(res);
                displayData();
            },
            error:function(er){
                console.log('getContact error', er);
            }
        });
    }

     //optional not useful
    const ID = 04;
    function getUserId(){
        $.ajax({
            type:'GET',
            url:`api/user/${ID}`,
            contentType:'application/json',
            success:function(res){
                console.log(res);
            },
            error:function(err){
                console.log('request error', err);
            }
        });
    }

    //addContact button
    $('#add').click(function(){
        var data={
            name:$('#name').val(),
            email:$('#email').val(),
            phone:$('#phone').val()
        };
        console.log(data.name, data.email,data.phone);
        postContact(data);
        clearInput();
        console.log('after add', contatcData);
        $('#tdata').removeData();
        getContact();
    });

    //clear contact button
    $('#clear').click(function(){
        getUserId();
    });

    //to clear the input field after the add button clicked
    function clearInput(){
        $('#name').val("");
        $('#email').val("");
        $('#phone').val("");
    }
});