
function validateform(){
    var bookname=document.getElementById("bookname").value;
    var authorname=document.getElementById("authorname").value;
    var publishedyear=document.getElementById("publishedyear").value;
    var price=document.getElementById("price").value;



    if(bookname==""){    
        alert("name is required");
        return false;

    }
    if(authorname==""){
        alert("authorname is required");
        return false;

    }   
    if(publishedyear==""){
        alert("year is required");
        return false;
    }
    if(price==""){
        alert("prices is required");
        return false;
    }
    return true;


}
function showData(){
    var booklist;
    if(localStorage.getItem("booklist")==null){
        booklist=[];
    }
    else{
        booklist=JSON.parse(localStorage.getItem("booklist"));
    }
    var html="";
    booklist.forEach(function(element,index){
        html +="<tr>";
        html +="<td>"+ element.bookname + "</td>";
        html +="<td>"+ element.authorname + "</td>";
        html +="<td>"+ element.publishedyear + "</td>"; 
        html +="<td>"+ element.price + "</td>";
        html += `<td><button onclick="deleteData(${index})"
         class="btn btn-danger">Delete</button><button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button></td>`;

        //html += `<td><button onclick="deleteData(' + index + ')"
        //class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>`;
        //html+="</tr>";


    });

    document.querySelector("#crudtable tbody").innerHTML=html;



}
window.addEventListener('load', showData);

//document.onload = showData();


function AddData(){
    if(validateform() == true){
        
        var bookname=document.getElementById("bookname").value;
        var authorname=document.getElementById("authorname").value;
        var publishedyear=document.getElementById("publishedyear").value;
        var price=document.getElementById("price").value;
        var booklist;
        if(localStorage.getItem("booklist")==null){
            booklist=[];
        }
        else{
            booklist=JSON.parse(localStorage.getItem("booklist"));
        }
        booklist.push({
            bookname : bookname,
            authorname : authorname,
            publishedyear :publishedyear,
            price : price
        });
        localStorage.setItem("booklist",JSON.stringify(booklist));
        showData();
        document.getElementById("bookname").value="";
        document.getElementById("authorname").value="";
        document.getElementById("publishedyear").value="";
        document.getElementById("price").value="";
        





    }

}
function deleteData(index){
    var booklist;
    if(localStorage.getItem("booklist")==null){
        booklist=[];
    }
    else{
        booklist=JSON.parse(localStorage.getItem("booklist"));
    }
    booklist.splice(index,1);
    localStorage.setItem("booklist",JSON.stringify(booklist));
    showData();
    
}
function updateData(index){
    document.getElementById("Submit").style.display="none";
    document.getElementById("update").style.display="block";
    var booklist;
    if(localStorage.getItem("booklist")==null){
        booklist=[];
    }
    else{
        booklist=JSON.parse(localStorage.getItem("booklist"));
    }
    document.getElementById("bookname").value = booklist[index].bookname;
    document.getElementById("authorname").value =booklist[index].authorname;
    document.getElementById("publishedyear").value=booklist[index].publishedyear;
    document.getElementById("price").value=booklist[index].price;

    document.querySelector("#update").onclick =function(){
        if(validateform() == true){
            booklist[index].bookname = document.getElementById("bookname").value;
            booklist[index].authorname = document.getElementById("authorname").value;
            booklist[index].publishedyear = document.getElementById("publishedyear").value;
            booklist[index].price = document.getElementById("price").value;

            localStorage.setItem("booklist",JSON.stringify(booklist));
            showData();
            document.getElementById("bookname").value = "";
            document.getElementById("authorname").value = "";
            document.getElementById("publishedyear").value = "";
            document.getElementById("price").value = "";

            document.getElementById("Submit").style.display="block";
            document.getElementById("update").style.display="none";

        }

    }
}