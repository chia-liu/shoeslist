console.clear();

//定義要用到的網址
var cataurl ="https://2017.awiclass.monoame.com/api/demo/shop"
var imgurl ="https://2017.awiclass.monoame.com/"
var items = []

function downloadList(){
  $.ajax({
    url: cataurl,
    success: function(res){
      console.log(res)
      items = res
      updateList()
    }, 
    error: function(){
      console.log('load again')
    }
  })
}

function updateList(){
  $("ul#shoplist").html("")
  items.forEach((item)=>{
    
    // var item = "<li>"+item.name+"</li>"
    
    // 可以使用``將要包覆的內容層級裝在裡面
    var item = `
      <li data-id="${item.id}">
        <img src="${imgurl}${item.img}">
        <h3>${item.name}</h3>
      </li>
    `
    
    var itemEl = $(item)
    itemEl.click(function(){
      var selectedId = $(this).attr("data-id")
      console.log(selectedId)
      updateSelect(selectedId)
    })
    
    $("ul#shoplist").append(itemEl)
    
  })
}

function updateSelect(id){
  $.ajax({
    url: cataurl + "/" +id,
    success: function(res){
      var content =`
        <ul>
          <li>產品名稱: ${res.name}</li>
          <li>價格: ${res.price}</li>
          <li>顏色: ${res.color}</li>
          <li>尚有庫存: ${res.count}</li>
          <li>描述: ${res.description}</li>
        </ul>
      `
      console.log(res)
      $(".selectinfo").html(content)
    }
  })
}