let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');
    

    inputRub.addEventListener('input', function() {
        function getCourse(url){
            return new Promise(function(resolve, reject){
                let request = new XMLHttpRequest();
        
                request.open('GET',url);
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
               
                // С этим обработчиком (событие readystatechange) promise не работает:
                // request.onreadystatechange = function () {
                //     if (request.readyState === 4 && request.status == 200) {
                //         resolve(request.response);
                //     } else {
                //         reject();
                //     }
                // };
                

                //Promise работает только с обработчиком на событие load 
                //- почему не знаю:
                request.addEventListener('load', function(){
                    if(request.readyState === 4){  
                    // if(request.status == 200){     //или можно < 400
                        resolve(request.response);
                    }
                    
                    else {
                        reject();
                    }
                });
                request.send();
            });
            
        }//конец функции getCourse
        
        getCourse('js/current.json')
       .then(function(response)  {
           console.log(response);
          return JSON.parse(response);
        }).then(function(data){
            console.log(data[0]);
            inputUsd.value = inputRub.value / data.usd;
        })
        .catch(() => {
            inputUsd.value = "Что-то пошло не так!";  
        })
    });

