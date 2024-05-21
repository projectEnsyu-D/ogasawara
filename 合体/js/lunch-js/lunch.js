function money_total(){
    money = 0;
    for (i=0; i<document.menuForm.length; i++){
      if (document.menuForm.elements[i].checked){
        money += eval(document.menuForm.elements[i].value);
      }
    }
    document.totalForm.total.value = money + " 円";
  }